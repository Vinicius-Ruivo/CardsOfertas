/**
 * Parser para dados de ofertas educacionais (formato TSV/tabela)
 * Respeita os valores EXATAMENTE como recebidos - sem formatação ou alteração.
 *
 * MAPEAMENTO (conforme planilha):
 * M  = Matrícula              → 1ª PARCELA (ALUNO) | P1 SEM FACILITA
 * 1° = Percentual 1º Sem      → % BOLSA TOTAL (Bolsa a negociar)
 * 1° = Mensalidade 1º Sem     → Triplo: PARCELA COM BOLSA + FACILITA (1ª) | Sem: PARCELA COM BOLSA TOTAL (Lançar CloudApp) ou MENSALIDADE COM BOLSA TT
 * 2° = Percentual 2º+ Sem     → % BOLSA TOTAL (2ª) ou % BOLSA TOTAL DEMAIS SEM.
 * 2° = Mensalidade 2º+ Sem    → Triplo: PARCELA COM BOLSA + FACILITA (2ª) | Sem: PARCELA COM BOLSA TOTAL (2ª) ou MENSALIDADE COM BOLSA TT DEMAIS SEM.
 * Formato alternativo 1: PREÇO BRUTO, P1 SEM FACILITA, % BOLSA TOTAL (Bolsa a negociar), PARCELA COM BOLSA TOTAL (Lançar no CloudApp), % BOLSA TOTAL DEMAIS SEM., MENSALIDADE COM BOLSA TT DEMAIS SEM.
 * Formato alternativo 2 (com Facilita): P1 COM FACILITA, PARCELA COM BOLSA + FACILITA (1º sem), última PARCELA COM BOLSA + FACILITA ou PARCELCOM BOLSA + FACILITA (demais).
 * Formato Pravaler: 1ª PARCELA (ALUNO), % BOLSA TOTAL (x2), PARCELA COM FINANCIAMENTO PRA VALER (1ª = 1º sem, 2ª = demais).
 * Formato Bolsa Conv. Corp.: uma única mensalidade e um único % de bolsa (a partir do 1º sem).
 *   Colunas: % BOLSA CONV. CORP., PARCELA COM BOLSA CONV. CORP. → retorna apenasUmaMensalidade: true.
 */

function limparValor(val) {
  if (val == null) return '';
  return String(val).trim();
}

function normalizarHeader(h) {
  return limparValor(h)
    .toUpperCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ');
}

function parsearLinha(linha, separador) {
  return linha.split(separador).map(c => limparValor(c));
}

function encontrarIndice(headers, textos) {
  for (let i = 0; i < headers.length; i++) {
    const h = normalizarHeader(headers[i]);
    for (const t of textos) {
      const norm = normalizarHeader(t);
      if (h.includes(norm) || norm.includes(h)) return i;
    }
  }
  return -1;
}

/** Retorna o valor exatamente como está - apenas trim em bordas */
function valorExato(val) {
  return limparValor(val);
}

/**
 * Extrai os dados necessários do texto colado (formato tabela com headers)
 * @param {string} texto - Texto colado (cabeçalho + linha de dados)
 * @param {string} condicao - 'triplo' | 'duplo' | 'sem' | 'pravaler' | 'lider'
 */
function parsearDadosOferta(texto, condicao = 'sem') {
  if (!texto || !texto.trim()) return null;

  const linhas = texto.trim().split(/\r?\n/).filter(l => l.trim());
  if (linhas.length < 2) return null;

  const usaTab = linhas[0].includes('\t') || linhas[1].includes('\t');
  const separador = usaTab ? /\t+/ : /\s{2,}/;
  let headers = parsearLinha(linhas[0], separador);
  let colunas = parsearLinha(linhas[1], separador);

  if (headers.length <= 1 && colunas.length > 1) {
    headers = parsearLinha(linhas[0], /\s{2,}/);
    colunas = parsearLinha(linhas[1], /\s{2,}/);
  }
  if (headers.length <= 1) {
    headers = parsearLinha(linhas[0], /\t+/);
    colunas = parsearLinha(linhas[1], /\t+/);
  }

  const get = (patterns) => {
    const i = encontrarIndice(headers, patterns);
    return i >= 0 ? colunas[i] : '';
  };

  const possuiBolsaIncentivoTemporario = headers.some((header) => {
    const h = normalizarHeader(header);
    return h.includes('BOLSA INCENTIVO') && h.includes('TEMPORARIO');
  });
  const possuiBlocoBolsattFinal = headers.some((header) => {
    const h = normalizarHeader(header);
    return h.includes('BOLSA TT') && h.includes('DEMAIS SEM');
  });
  // Regra específica: quando vier o layout com "BOLSA INCENTIVO TEMPORARIO" + bloco final de BOLSA TT,
  // ignorar os 4 últimos campos do bloco TT e usar os valores anteriores de BOLSA TOTAL/PARCELA COM BOLSA TOTAL.
  const ignorarBlocoFinalBolsaTT = possuiBolsaIncentivoTemporario && possuiBlocoBolsattFinal;

  // Detecção formato "Bolsa Conv. Corp.": uma única mensalidade e um único % de bolsa (não mostra demais semestres)
  let apenasUmaMensalidade = false;
  let bolsaConvCorp = '';
  let mensalidadeConvCorp = '';
  for (let i = 0; i < headers.length; i++) {
    const h = normalizarHeader(headers[i]);
    if (h.includes('BOLSA') && h.includes('CONV') && h.includes('CORP')) {
      if (h.includes('PARCELA') || h.includes('PARCEL')) {
        mensalidadeConvCorp = valorExato(colunas[i]);
      } else {
        bolsaConvCorp = valorExato(colunas[i]) || bolsaConvCorp;
      }
    }
  }
  if (mensalidadeConvCorp) {
    apenasUmaMensalidade = true;
  }

  // Matrícula: P1 COM FACILITA (formato com Facilita) | P1 SEM FACILITA | 1ª PARCELA (ALUNO)
  const matricula = get(['P1 COM FACILITA', 'P1 SEM FACILITA', '1ª PARCELA', '1A PARCELA', 'PARCELA ALUNO']);

  // 1º sem = percentual: preferir coluna "Bolsa a negociar"; 2º+ = preferir "DEMAIS SEM"
  let idxBolsa1Sem = -1;
  let idxBolsaDemais = -1;
  let idxBolsaDemaisSemTT = -1;
  const indicesBolsaTotal = [];
  for (let i = 0; i < headers.length; i++) {
    const h = normalizarHeader(headers[i]);
    if (!h.includes('BOLSA TOTAL')) continue;
    indicesBolsaTotal.push(i);
    if (h.includes('BOLSA A NEGOCIAR') || h.includes('NEGOCIAR')) {
      idxBolsa1Sem = i;
    }
    if (h.includes('DEMAIS SEM') || h.includes('DEMAIS SEM.')) {
      idxBolsaDemais = i;
    }
    if (!h.includes('DEMAIS SEM') && !h.includes('NEGOCIAR')) {
      idxBolsaDemaisSemTT = i;
    }
  }
  if (idxBolsa1Sem < 0 && indicesBolsaTotal.length > 0) idxBolsa1Sem = indicesBolsaTotal[0];
  if (ignorarBlocoFinalBolsaTT && idxBolsaDemaisSemTT >= 0) idxBolsaDemais = idxBolsaDemaisSemTT;
  if (idxBolsaDemais < 0 && indicesBolsaTotal.length > 1) idxBolsaDemais = indicesBolsaTotal[indicesBolsaTotal.length - 1];
  if (idxBolsaDemais < 0) idxBolsaDemais = idxBolsa1Sem;
  const bolsa1Sem = idxBolsa1Sem >= 0 ? colunas[idxBolsa1Sem] : get(['% BOLSA TOTAL (Bolsa a negociar)']);
  const bolsaDemais = idxBolsaDemais >= 0 ? colunas[idxBolsaDemais] : bolsa1Sem;

  // Mensalidades: Triplo/Duplo = PARCELA COM BOLSA + FACILITA; Sem/Pravaler = PARCELA COM BOLSA TOTAL ou MENSALIDADE COM BOLSA TOTAL/TT
  const indicesFacilita = [];
  const indicesBolsaTotalParcela = [];  // PARCELA COM BOLSA TOTAL (qualquer)
  const indicesMensalidadeBolsaTotal = []; // MENSALIDADE COM BOLSA TOTAL (sem TT)
  const indicesPravaler = []; // PARCELA COM FINANCIAMENTO PRA VALER: 1ª = 1º sem, 2ª = demais
  let idxParcela1Sem = -1;   // preferir "Lançar no CloudApp"
  let idxMensalidadeTT1Sem = -1; // MENSALIDADE COM BOLSA TT (sem DEMAIS) = 1º sem em alguns formatos
  let idxMensalidadeDemais = -1; // MENSALIDADE COM BOLSA TT DEMAIS SEM
  for (let i = 0; i < headers.length; i++) {
    const h = normalizarHeader(headers[i]);
    // PARCELA COM BOLSA + FACILITA (aceita typo "PARCELCOM" em alguns exports)
    if ((h.includes('PARCELA') || h.includes('PARCEL')) && h.includes('BOLSA') && h.includes('FACILITA')) {
      indicesFacilita.push(i);
    }
    if (h.includes('PARCELA') && h.includes('BOLSA TOTAL') && !h.includes('FACILITA')) {
      indicesBolsaTotalParcela.push(i);
      if ((h.includes('LANCAR') || h.includes('CLOUDAPP') || h.includes('CLOUD APP')) && idxParcela1Sem < 0) {
        idxParcela1Sem = i;
      }
    }
    if (h.includes('MENSALIDADE') && h.includes('BOLSA TT')) {
      if (h.includes('DEMAIS SEM') || h.includes('DEMAIS SEM.')) {
        idxMensalidadeDemais = i;
      } else if (idxMensalidadeTT1Sem < 0) {
        idxMensalidadeTT1Sem = i;
      }
    }
    // Pravaler: PARCELA COM FINANCIAMENTO PRA VALER (1ª = 1º sem, 2ª = demais)
    if (h.includes('PARCELA') && h.includes('FINANCIAMENTO') && (h.includes('PRA VALER') || h.includes('PRAVALER'))) {
      indicesPravaler.push(i);
    }
    // MENSALIDADE COM BOLSA TOTAL (sem TT)
    if (h.includes('MENSALIDADE') && h.includes('BOLSA TOTAL') && !h.includes('BOLSA TT')) {
      indicesMensalidadeBolsaTotal.push(i);
    }
  }
  // Regra: exceto Pravaler e Líder, o 2º e 3º valores de PARCELA COM BOLSA TOTAL
  // podem ser rematrícula, então são ignorados quando houver ao menos 4 ocorrências.
  let indicesBolsaTotalParcelaValidos = indicesBolsaTotalParcela;
  if (condicao !== 'pravaler' && condicao !== 'lider' && indicesBolsaTotalParcela.length >= 4) {
    indicesBolsaTotalParcelaValidos = indicesBolsaTotalParcela.filter((_, idx) => idx !== 1 && idx !== 2);
  }

  if (idxParcela1Sem >= 0 && !indicesBolsaTotalParcelaValidos.includes(idxParcela1Sem)) {
    idxParcela1Sem = -1;
  }
  if (idxParcela1Sem < 0 && indicesBolsaTotalParcelaValidos.length > 0) idxParcela1Sem = indicesBolsaTotalParcelaValidos[0];

  // Última "PARCELA COM BOLSA TOTAL" (excluindo a do 1º sem) = valor demais semestres em alguns formatos (ex.: 1.249,58)
  let idxParcelaDemais = -1;
  for (let k = indicesBolsaTotalParcelaValidos.length - 1; k >= 0; k--) {
    if (indicesBolsaTotalParcelaValidos[k] !== idxParcela1Sem) {
      idxParcelaDemais = indicesBolsaTotalParcelaValidos[k];
      break;
    }
  }

  let mensalidade1Sem, mensalidadeDemais;
  const usaFacilita = condicao === 'triplo' || condicao === 'duplo';
  if (condicao === 'lider') {
    // Regra exclusiva da bolsa Líder:
    // usar a 1ª e a 2ª "PARCELA COM BOLSA TOTAL" como
    // mensalidade do 1º semestre e mensalidade dos demais semestres.
    if (indicesBolsaTotalParcela.length >= 2) {
      mensalidade1Sem = colunas[indicesBolsaTotalParcela[0]];
      mensalidadeDemais = colunas[indicesBolsaTotalParcela[1]];
    } else if (indicesBolsaTotalParcela.length === 1) {
      mensalidade1Sem = colunas[indicesBolsaTotalParcela[0]];
      mensalidadeDemais = colunas[indicesBolsaTotalParcela[0]];
    } else {
      mensalidade1Sem = idxParcela1Sem >= 0 ? colunas[idxParcela1Sem] : '';
      mensalidadeDemais = idxParcelaDemais >= 0 ? colunas[idxParcelaDemais] : mensalidade1Sem;
    }
  } else if (usaFacilita && indicesFacilita.length >= 2) {
    mensalidade1Sem = colunas[indicesFacilita[0]];
    // Demais semestres = última coluna PARCELA COM BOLSA + FACILITA (ex.: 821,86), não a segunda (933,67)
    mensalidadeDemais = colunas[indicesFacilita[indicesFacilita.length - 1]];
  } else if (usaFacilita && indicesFacilita.length === 1) {
    mensalidade1Sem = colunas[indicesFacilita[0]];
    mensalidadeDemais = colunas[indicesFacilita[0]];
  } else {
    // Pravaler: 1º sem e demais = PARCELA COM FINANCIAMENTO PRA VALER (1ª e 2ª colunas)
    if (condicao === 'pravaler' && indicesPravaler.length >= 2) {
      mensalidade1Sem = colunas[indicesPravaler[0]];
      mensalidadeDemais = colunas[indicesPravaler[1]];
    } else if (condicao === 'pravaler' && indicesPravaler.length === 1) {
      mensalidade1Sem = colunas[indicesPravaler[0]];
      mensalidadeDemais = colunas[indicesPravaler[0]];
    } else if (condicao === 'pravaler' && indicesPravaler.length === 0 && indicesMensalidadeBolsaTotal.length >= 2) {
      // fallback: formato sem coluna PRA VALER explícita
      mensalidade1Sem = colunas[indicesMensalidadeBolsaTotal[0]];
      mensalidadeDemais = colunas[indicesMensalidadeBolsaTotal[1]];
    } else if (condicao === 'pravaler' && indicesMensalidadeBolsaTotal.length === 1) {
      mensalidade1Sem = colunas[indicesMensalidadeBolsaTotal[0]];
      mensalidadeDemais = colunas[indicesMensalidadeBolsaTotal[0]];
    } else {
      mensalidade1Sem = idxParcela1Sem >= 0 ? colunas[idxParcela1Sem] : (indicesBolsaTotalParcelaValidos.length > 0 ? colunas[indicesBolsaTotalParcelaValidos[0]] : '');
      if (!ignorarBlocoFinalBolsaTT && !valorExato(mensalidade1Sem) && idxMensalidadeTT1Sem >= 0) {
        mensalidade1Sem = colunas[idxMensalidadeTT1Sem];
      }
      if (!valorExato(mensalidade1Sem) && indicesMensalidadeBolsaTotal.length > 0) {
        mensalidade1Sem = colunas[indicesMensalidadeBolsaTotal[0]];
      }
      // Demais semestres: preferir MENSALIDADE COM BOLSA TT DEMAIS SEM; se vazia, usar última PARCELA COM BOLSA TOTAL ou 2ª MENSALIDADE COM BOLSA TOTAL
      const valorMensalidadeDemaisTT = idxMensalidadeDemais >= 0 ? valorExato(colunas[idxMensalidadeDemais]) : '';
      if (!ignorarBlocoFinalBolsaTT && valorMensalidadeDemaisTT) {
        mensalidadeDemais = colunas[idxMensalidadeDemais];
      } else if (indicesMensalidadeBolsaTotal.length >= 2) {
        mensalidadeDemais = colunas[indicesMensalidadeBolsaTotal[1]];
      } else if (idxParcelaDemais >= 0) {
        mensalidadeDemais = colunas[idxParcelaDemais];
      } else {
        mensalidadeDemais = indicesBolsaTotalParcelaValidos.length > 1 ? colunas[indicesBolsaTotalParcelaValidos[1]] : mensalidade1Sem;
      }
    }
  }

  // Quantidade de meses do curso (QTD MESES, QUANT. MESES, etc.)
  const qtdMeses = valorExato(get(['QTD MESES', 'QUANT. MESES', 'QUANTIDADE MESES', 'QUANT MESES']));

  const resultado = {
    curso: valorExato(get(['CURSO'])) || 'Curso',
    cidade: valorExato(get(['UNIDADE'])) || 'Florianópolis',
    grau: valorExato(get(['NIVEL', 'NÍVEL'])) || 'Bacharelado',
    modalidade: valorExato(get(['MODALIDADE'])) || 'Presencial',
    turno: valorExato(get(['TURNO'])) || 'Noturno',
    qtdMeses: qtdMeses || '',
    matricula: valorExato(matricula) || '99,00',
    matriculaBruto: valorExato(get(['PREÇO BRUTO', 'PRECO BRUTO'])) || '299,90',
    bolsa1Sem: valorExato(bolsa1Sem) || '60%',
    bolsaDemais: valorExato(bolsaDemais) || valorExato(bolsa1Sem) || '40%',
    mensalidade1Sem: valorExato(mensalidade1Sem) || '299,90',
    mensalidadeDemais: valorExato(mensalidadeDemais) || valorExato(mensalidade1Sem) || '499,90',
    apenasUmaMensalidade: false,
  };

  if (apenasUmaMensalidade) {
    resultado.apenasUmaMensalidade = true;
    resultado.bolsa1Sem = bolsaConvCorp || resultado.bolsa1Sem;
    resultado.bolsaDemais = resultado.bolsa1Sem;
    resultado.mensalidade1Sem = mensalidadeConvCorp;
    resultado.mensalidadeDemais = '';
  }

  return resultado;
}

if (typeof window !== 'undefined') {
  window.GemCardParser = { parsearDadosOferta };
}
