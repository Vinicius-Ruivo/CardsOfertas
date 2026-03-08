/**
 * Gem Card Educacionais - Popup Controller
 */

let ultimoCardData = null;
let countdownIntervalId = null;
const SHARE_BASE_URL_KEY = 'gemPublicOfferBaseUrl';

function utf8ToBase64Url(texto) {
  const bytes = new TextEncoder().encode(texto);
  let binario = '';
  for (let i = 0; i < bytes.length; i++) {
    binario += String.fromCharCode(bytes[i]);
  }
  return btoa(binario).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function normalizarBaseOfertaUrl(url) {
  if (!url) return '';
  let base = String(url).trim();
  if (!base) return '';
  if (!/^https?:\/\//i.test(base)) base = `https://${base}`;
  if (!/\/offer\.html(?:[?#].*)?$/i.test(base)) {
    base = base.endsWith('/') ? `${base}offer.html` : `${base}/offer.html`;
  }
  return base;
}

function compactarDadosOferta(cardData) {
  return {
    c: cardData.curso || '',
    ci: cardData.cidade || '',
    g: cardData.grau || '',
    mo: cardData.modalidade || '',
    tu: cardData.turno || '',
    qm: cardData.qtdMeses || '',
    ma: cardData.matricula || '',
    mb: cardData.matriculaBruto || '',
    b1: cardData.bolsa1Sem || '',
    bd: cardData.bolsaDemais || '',
    m1: cardData.mensalidade1Sem || '',
    md: cardData.mensalidadeDemais || '',
    a: cardData.apenasUmaMensalidade ? 1 : 0,
    co: cardData.condicao || 'sem',
    f: cardData.fimOfertaMs || 0,
  };
}

function gerarLinkPublicoOferta(cardData, baseUrl) {
  const payload = compactarDadosOferta(cardData);
  const encoded = utf8ToBase64Url(JSON.stringify(payload));
  const separador = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separador}v=2&d=${encoded}`;
}

function nomeArquivoDownload() {
  if (!ultimoCardData) return 'card-oferta.html';
  const curso = (ultimoCardData.curso || 'Curso')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[/\\:*?"<>|]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '') || 'Curso';
  const tipo = ultimoCardData.condicao === 'triplo'
    ? 'Triplo_Facilita'
    : ultimoCardData.condicao === 'duplo'
      ? 'Duplo_Facilita'
      : ultimoCardData.condicao === 'pravaler'
        ? 'Pravaler'
        : ultimoCardData.condicao === 'lider'
          ? 'Lider'
          : 'Sem_Facilita';
  return `Bolsa_${curso}_${tipo}.html`;
}

function baixarCard() {
  const cardElement = document.querySelector('#cardPreview > div');
  if (!cardElement) return;

  const cardHTML = cardElement.outerHTML;
  const fimOfertaMs = Date.now() + 3 * 60 * 60 * 1000;

  const scriptCountdown = `
<script>
(function() {
  var endTime = ${fimOfertaMs};
  var el = document.getElementById('cardCountdown');
  if (!el) return;
  function pad(n) { return n < 10 ? '0' + n : n; }
  function update() {
    var left = endTime - Date.now();
    if (left <= 0) { el.textContent = 'Expirado'; return; }
    var h = Math.floor(left / 3600000);
    var m = Math.floor((left % 3600000) / 60000);
    var s = Math.floor((left % 60000) / 1000);
    el.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
  }
  setInterval(update, 1000);
  update();
})();
<\/script>`;

  const htmlCompleto = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Card Oferta Educacional</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
      background: #e2e8f0;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .card-wrapper {
      width: 100%;
      max-width: 550px;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
      border-radius: 45px;
      overflow: hidden;
    }
    .gem-card { min-width: 0; }
    @media (max-width: 480px) {
      body { padding: 16px 12px; }
      .card-wrapper { border-radius: 28px; }
      .gem-card {
        padding: 22px 20px !important;
        border-radius: 28px !important;
        overflow: hidden !important;
      }
      .gem-card > div:first-of-type { top: 18px !important; right: 16px !important; max-width: 48% !important; overflow: hidden !important; display: flex !important; justify-content: flex-end !important; }
      .gem-card-header { margin-bottom: 20px !important; padding-right: 52% !important; }
      .gem-card-curso { font-size: 28px !important; line-height: 1.2 !important; margin-bottom: 16px !important; }
      .gem-card-bolsa-pct { font-size: 22px !important; margin-bottom: 22px !important; line-height: 1.3 !important; }
      .gem-card-infos {
        flex-direction: column !important;
        gap: 12px !important;
        margin-bottom: 22px !important;
        font-size: 15px !important;
      }
      .gem-card-infos span { display: inline-flex !important; }
      .gem-card-unidade { margin-bottom: 22px !important; line-height: 1.4 !important; flex-wrap: wrap !important; }
      .gem-card-valores { gap: 22px !important; margin-bottom: 26px !important; }
      .gem-valor-item { line-height: 1.45 !important; }
      .gem-valor-item p { margin-bottom: 6px !important; }
      .gem-valor-linha { flex-direction: column !important; align-items: flex-start !important; gap: 4px !important; }
      .gem-valor-linha-semestre { flex-direction: row !important; align-items: baseline !important; gap: 8px !important; }
      .gem-valor-destaque { font-size: 24px !important; display: block !important; }
      .gem-valor-riscado { font-size: 13px !important; }
      .gem-card .gem-valor-item p:last-child { margin-top: 6px !important; }
      .gem-card-datetime {
        margin-left: -8px !important; margin-right: -8px !important;
        padding: 20px 18px !important;
        border-radius: 14px !important;
        margin-top: 28px !important; margin-bottom: 24px !important;
      }
      .gem-card-datetime p:first-child { font-size: 15px !important; margin-bottom: 12px !important; line-height: 1.4 !important; }
      .gem-card-datetime p:last-child { font-size: 16px !important; line-height: 1.4 !important; }
      .gem-card-datetime #cardCountdown { font-size: 20px !important; display: inline-block !important; margin-top: 2px !important; }
      .tarja-facilita { margin-left: -20px !important; margin-right: -20px !important; padding: 14px 20px !important; }
      .tarja-facilita p { font-size: 13px !important; line-height: 1.4 !important; }
    }
    @media (max-width: 360px) {
      body { padding: 12px 10px; }
      .gem-card { padding: 18px 16px !important; }
      .gem-card-curso { font-size: 24px !important; margin-bottom: 14px !important; }
      .gem-card-bolsa-pct { font-size: 19px !important; margin-bottom: 18px !important; }
      .gem-card-valores { gap: 20px !important; }
      .gem-valor-destaque { font-size: 22px !important; }
      .gem-card-datetime { padding: 16px 14px !important; }
      .gem-card-datetime #cardCountdown { font-size: 18px !important; }
    }
    @media print {
      body { background: #fff; padding: 0; }
      .card-wrapper { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="card-wrapper">${cardHTML}</div>
  ${scriptCountdown}
</body>
</html>`;

  const blob = new Blob([htmlCompleto], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nomeArquivoDownload();
  a.click();
  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('dataForm');
  const erroMsg = document.getElementById('erroMsg');
  const downloadBtn = document.getElementById('downloadBtn');
  const shareLinkBtn = document.getElementById('shareLinkBtn');
  const previewSection = document.getElementById('previewSection');
  const timerModeRadios = document.querySelectorAll('input[name="timerMode"]');
  const manualTimerFields = document.getElementById('manualTimerFields');
  const timerHoursInput = document.getElementById('timerHours');
  const timerMinutesInput = document.getElementById('timerMinutes');
  const tutorialBtn = document.getElementById('tutorialBtn');
  const avaliarBtn = document.getElementById('avaliarBtn');
  const duvidasBtn = document.getElementById('duvidasBtn');
  const liderInfoBtn = document.getElementById('liderInfoBtn');
  const TOUR_SEEN_VERSION_KEY = 'gemTourSeenVersion';
  const AVALIACAO_URL = 'https://chromewebstore.google.com/detail/begkhhonmejpikjcokojphflmjlningj?utm_source=item-share-cb';

  function aplicarTimerMode(mode) {
    if (!manualTimerFields) return;
    if (mode === 'manual') {
      manualTimerFields.classList.remove('hidden');
    } else {
      manualTimerFields.classList.add('hidden');
    }
  }

  if (!form) return;

  function iniciarTourAtualizacao() {
    if (document.querySelector('.tour-overlay') || document.querySelector('.tour-tooltip')) {
      return;
    }

    const tourSteps = [
      {
        selector: '#dadosOferta',
        title: 'Cole os dados',
        text: 'Cole aqui a tabela copiada do Power BI.'
      },
      {
        selector: '#tipoBolsaSection',
        title: 'Escolha da bolsa',
        text: 'Selecione o tipo de bolsa. Agora você também pode usar a opcão Lider.'
      },
      {
        selector: '#timerSection',
        title: 'Gatilho de Escassez',
        text: 'Defina o cronometro em modo aleatorio ou manual para controlar a validade da oferta.'
      },
      {
        selector: '#gerarCardBtn',
        title: 'Por fim',
        text: 'Clique em Gerar Card. O preview aparece abaixo e você pode baixar para encaminhar para o candidato.'
      }
    ];

    const overlay = document.createElement('div');
    overlay.className = 'tour-overlay';

    const tooltip = document.createElement('div');
    tooltip.className = 'tour-tooltip';
    tooltip.setAttribute('data-pos', 'bottom');

    let currentStep = 0;
    let currentTarget = null;

    function removerHighlightAtual() {
      if (currentTarget) currentTarget.classList.remove('tour-highlight');
      currentTarget = null;
    }

    function encerrarTour() {
      removerHighlightAtual();
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      if (tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize, true);
    }

    function mostrarAvisoFinalTour() {
      const overlayFinal = document.createElement('div');
      overlayFinal.className = 'tour-overlay';

      const tooltipFinal = document.createElement('div');
      tooltipFinal.className = 'tour-tooltip tour-tooltip-center';
      tooltipFinal.innerHTML = `
        <p class="tour-step">Lembrete importante</p>
        <p class="tour-title">Conferir valores</p>
        <p class="tour-text">Sempre confira os valores antes de passar para o candidato.</p>
        <div class="tour-controls">
          <div class="tour-left"></div>
          <div class="tour-right">
            <button type="button" class="tour-btn tour-btn-primary" id="tourFinalOkBtn">Entendi</button>
          </div>
        </div>
      `;

      function fecharAvisoFinal() {
        if (overlayFinal.parentNode) overlayFinal.parentNode.removeChild(overlayFinal);
        if (tooltipFinal.parentNode) tooltipFinal.parentNode.removeChild(tooltipFinal);
      }

      document.body.appendChild(overlayFinal);
      document.body.appendChild(tooltipFinal);
      overlayFinal.addEventListener('click', fecharAvisoFinal);
      const okBtn = tooltipFinal.querySelector('#tourFinalOkBtn');
      if (okBtn) okBtn.addEventListener('click', fecharAvisoFinal);
    }

    function onResize() {
      renderStep(currentStep);
    }

    function getTarget(step) {
      const el = document.querySelector(step.selector);
      if (!el) return null;
      return el;
    }

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function posicionarTooltip(target) {
      const rect = target.getBoundingClientRect();
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      const tooltipW = Math.min(300, viewportW - 20);
      const tooltipH = tooltip.offsetHeight || 170;
      const margem = 10;
      const podeAbaixo = rect.bottom + margem + tooltipH <= viewportH - 4;
      const pos = podeAbaixo ? 'bottom' : 'top';
      const top = pos === 'bottom'
        ? rect.bottom + margem
        : rect.top - tooltipH - margem;
      const left = clamp(rect.left, 10, viewportW - tooltipW - 10);

      tooltip.style.top = `${Math.max(6, top)}px`;
      tooltip.style.left = `${left}px`;
      tooltip.style.width = `${tooltipW}px`;
      tooltip.setAttribute('data-pos', pos);
    }

    function renderStep(stepIndex) {
      const step = tourSteps[stepIndex];
      const target = getTarget(step);
      if (!target) {
        encerrarTour();
        return;
      }

      target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      removerHighlightAtual();
      currentTarget = target;
      currentTarget.classList.add('tour-highlight');

      const ultimoPasso = stepIndex === tourSteps.length - 1;
      tooltip.innerHTML = `
        <p class="tour-step">Passo ${stepIndex + 1} de ${tourSteps.length}</p>
        <p class="tour-title">${step.title}</p>
        <p class="tour-text">${step.text}</p>
        <div class="tour-controls">
          <div class="tour-left">
            <button type="button" class="tour-btn" id="tourSkipBtn">Pular</button>
            ${stepIndex > 0 ? '<button type="button" class="tour-btn" id="tourPrevBtn">Voltar</button>' : ''}
          </div>
          <div class="tour-right">
            <button type="button" class="tour-btn tour-btn-primary" id="tourNextBtn">${ultimoPasso ? 'Concluir' : 'Proximo'}</button>
          </div>
        </div>
      `;

      posicionarTooltip(target);

      const prevBtn = tooltip.querySelector('#tourPrevBtn');
      const nextBtn = tooltip.querySelector('#tourNextBtn');
      const skipBtn = tooltip.querySelector('#tourSkipBtn');

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          currentStep = Math.max(0, currentStep - 1);
          renderStep(currentStep);
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          if (ultimoPasso) {
            encerrarTour();
            setTimeout(mostrarAvisoFinalTour, 80);
            return;
          }
          currentStep = Math.min(tourSteps.length - 1, currentStep + 1);
          renderStep(currentStep);
        });
      }
      if (skipBtn) {
        skipBtn.addEventListener('click', encerrarTour);
      }
    }

    document.body.appendChild(overlay);
    document.body.appendChild(tooltip);
    overlay.addEventListener('click', encerrarTour);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize, true);
    renderStep(0);
  }

  (function exibirTourNaPrimeiraAberturaDaVersao() {
    const versaoAtual = (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getManifest)
      ? chrome.runtime.getManifest().version
      : '0';
    const versaoVista = localStorage.getItem(TOUR_SEEN_VERSION_KEY);
    if (versaoVista === versaoAtual) return;
    localStorage.setItem(TOUR_SEEN_VERSION_KEY, versaoAtual);
    setTimeout(iniciarTourAtualizacao, 260);
  })();

  if (tutorialBtn) {
    tutorialBtn.addEventListener('click', iniciarTourAtualizacao);
  }

  if (avaliarBtn) {
    avaliarBtn.addEventListener('click', () => {
      if (document.querySelector('.tour-overlay') || document.querySelector('.tour-tooltip')) {
        return;
      }

      const overlayAvaliacao = document.createElement('div');
      overlayAvaliacao.className = 'tour-overlay';

      const tooltipAvaliacao = document.createElement('div');
      tooltipAvaliacao.className = 'tour-tooltip tour-tooltip-center';
      tooltipAvaliacao.innerHTML = `
        <p class="tour-step">Avaliação da extensão</p>
        <p class="tour-title">Deseja avaliar agora?</p>
        <p class="tour-text">Você será direcionado para a página da extensão no Chrome Web Store.</p>
        <div class="tour-controls">
          <div class="tour-left">
            <button type="button" class="tour-btn" id="avaliacaoCancelarBtn">Cancelar</button>
          </div>
          <div class="tour-right">
            <button type="button" class="tour-btn tour-btn-primary" id="avaliacaoConfirmarBtn">Avaliar</button>
          </div>
        </div>
      `;

      function fecharAvisoAvaliacao() {
        if (overlayAvaliacao.parentNode) overlayAvaliacao.parentNode.removeChild(overlayAvaliacao);
        if (tooltipAvaliacao.parentNode) tooltipAvaliacao.parentNode.removeChild(tooltipAvaliacao);
      }

      function abrirPaginaAvaliacao() {
        if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.create) {
          chrome.tabs.create({ url: AVALIACAO_URL });
          return;
        }
        window.open(AVALIACAO_URL, '_blank');
      }

      document.body.appendChild(overlayAvaliacao);
      document.body.appendChild(tooltipAvaliacao);
      overlayAvaliacao.addEventListener('click', fecharAvisoAvaliacao);

      const cancelarBtn = tooltipAvaliacao.querySelector('#avaliacaoCancelarBtn');
      const confirmarBtn = tooltipAvaliacao.querySelector('#avaliacaoConfirmarBtn');

      if (cancelarBtn) cancelarBtn.addEventListener('click', fecharAvisoAvaliacao);
      if (confirmarBtn) {
        confirmarBtn.addEventListener('click', () => {
          fecharAvisoAvaliacao();
          abrirPaginaAvaliacao();
        });
      }
    });
  }

  if (duvidasBtn) {
    duvidasBtn.addEventListener('click', () => {
      if (document.querySelector('.tour-overlay') || document.querySelector('.tour-tooltip')) {
        return;
      }

      const overlayDuvidas = document.createElement('div');
      overlayDuvidas.className = 'tour-overlay';

      const tooltipDuvidas = document.createElement('div');
      tooltipDuvidas.className = 'tour-tooltip tour-tooltip-center';
      tooltipDuvidas.innerHTML = `
        <p class="tour-step">Canal de contato</p>
        <p class="tour-title">Dúvidas</p>
        <p class="tour-text">Qualquer dúvida, sugestão ou elogio, pode me chamar no 👥 Teams: Vinicius Dias da Silva.</p>
        <div class="tour-controls">
          <div class="tour-left"></div>
          <div class="tour-right">
            <button type="button" class="tour-btn tour-btn-primary" id="duvidasOkBtn">Entendi</button>
          </div>
        </div>
      `;

      function fecharAvisoDuvidas() {
        if (overlayDuvidas.parentNode) overlayDuvidas.parentNode.removeChild(overlayDuvidas);
        if (tooltipDuvidas.parentNode) tooltipDuvidas.parentNode.removeChild(tooltipDuvidas);
      }

      document.body.appendChild(overlayDuvidas);
      document.body.appendChild(tooltipDuvidas);
      overlayDuvidas.addEventListener('click', fecharAvisoDuvidas);
      const okBtn = tooltipDuvidas.querySelector('#duvidasOkBtn');
      if (okBtn) okBtn.addEventListener('click', fecharAvisoDuvidas);
    });
  }

  if (liderInfoBtn) {
    liderInfoBtn.addEventListener('click', () => {
      if (document.querySelector('.tour-overlay') || document.querySelector('.tour-tooltip')) {
        return;
      }

      const overlayInfo = document.createElement('div');
      overlayInfo.className = 'tour-overlay';

      const tooltipInfo = document.createElement('div');
      tooltipInfo.className = 'tour-tooltip tour-tooltip-center';
      tooltipInfo.innerHTML = `
        <p class="tour-step">Informação da bolsa Líder</p>
        <p class="tour-title">Copiar-seleção do BI</p>
        <p class="tour-text">Certifique de pedir para sua supervisão o "copiar-seleção" do BI.</p>
        <div class="tour-controls">
          <div class="tour-left"></div>
          <div class="tour-right">
            <button type="button" class="tour-btn tour-btn-primary" id="liderInfoOkBtn">Entendi</button>
          </div>
        </div>
      `;

      function fecharAvisoLider() {
        if (overlayInfo.parentNode) overlayInfo.parentNode.removeChild(overlayInfo);
        if (tooltipInfo.parentNode) tooltipInfo.parentNode.removeChild(tooltipInfo);
      }

      document.body.appendChild(overlayInfo);
      document.body.appendChild(tooltipInfo);
      overlayInfo.addEventListener('click', fecharAvisoLider);
      const okBtn = tooltipInfo.querySelector('#liderInfoOkBtn');
      if (okBtn) okBtn.addEventListener('click', fecharAvisoLider);
    });
  }

  function abrirModalTourPadrao(options) {
    if (document.querySelector('.tour-overlay') || document.querySelector('.tour-tooltip')) return null;

    const overlay = document.createElement('div');
    overlay.className = 'tour-overlay';

    const tooltip = document.createElement('div');
    tooltip.className = 'tour-tooltip tour-tooltip-center';
    tooltip.innerHTML = options.html;

    function close() {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      if (tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
    }

    document.body.appendChild(overlay);
    document.body.appendChild(tooltip);
    overlay.addEventListener('click', close);

    return { overlay, tooltip, close };
  }

  function abrirModalMensagem(titulo, texto) {
    const modal = abrirModalTourPadrao({
      html: `
        <p class="tour-step">Link da oferta</p>
        <p class="tour-title">${titulo}</p>
        <p class="tour-text">${texto}</p>
        <div class="tour-controls">
          <div class="tour-left"></div>
          <div class="tour-right">
            <button type="button" class="tour-btn tour-btn-primary" id="modalOkBtn">Entendi</button>
          </div>
        </div>
      `
    });
    if (!modal) return;
    const okBtn = modal.tooltip.querySelector('#modalOkBtn');
    if (okBtn) okBtn.addEventListener('click', modal.close);
  }

  function abrirModalLinkManual(link) {
    const modal = abrirModalTourPadrao({
      html: `
        <p class="tour-step">Copiar link manualmente</p>
        <p class="tour-title">Não foi possível copiar automaticamente</p>
        <p class="tour-text">Selecione e copie o link abaixo:</p>
        <input id="manualLinkInput" class="tour-input" type="text" readonly>
        <div class="tour-controls">
          <div class="tour-left"></div>
          <div class="tour-right">
            <button type="button" class="tour-btn tour-btn-primary" id="manualLinkOkBtn">Entendi</button>
          </div>
        </div>
      `
    });
    if (!modal) return;
    const input = modal.tooltip.querySelector('#manualLinkInput');
    if (input) {
      input.value = link;
      input.focus();
      input.select();
    }
    const okBtn = modal.tooltip.querySelector('#manualLinkOkBtn');
    if (okBtn) okBtn.addEventListener('click', modal.close);
  }

  function solicitarBaseUrl(onConfirm) {
    const modal = abrirModalTourPadrao({
      html: `
        <p class="tour-step">Configuração inicial</p>
        <p class="tour-title">URL pública do offer.html</p>
        <p class="tour-text">Informe a URL pública para gerar links dos cards (ex.: https://seu-dominio.com/offer.html).</p>
        <input id="shareBaseUrlInput" class="tour-input" type="text" placeholder="https://seu-dominio.com/offer.html">
        <div class="tour-controls">
          <div class="tour-left">
            <button type="button" class="tour-btn" id="shareCancelBtn">Cancelar</button>
          </div>
          <div class="tour-right">
            <button type="button" class="tour-btn tour-btn-primary" id="shareSaveBtn">Salvar</button>
          </div>
        </div>
      `
    });
    if (!modal) return;

    const input = modal.tooltip.querySelector('#shareBaseUrlInput');
    const cancelBtn = modal.tooltip.querySelector('#shareCancelBtn');
    const saveBtn = modal.tooltip.querySelector('#shareSaveBtn');
    if (input) input.value = 'https://seu-dominio.com/offer.html';

    if (cancelBtn) cancelBtn.addEventListener('click', modal.close);
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const base = normalizarBaseOfertaUrl(input ? input.value : '');
        if (!base) {
          abrirModalMensagem('URL inválida', 'Informe uma URL pública válida para continuar.');
          return;
        }
        localStorage.setItem(SHARE_BASE_URL_KEY, base);
        modal.close();
        onConfirm(base);
      });
    }
  }

  if (shareLinkBtn) {
    shareLinkBtn.addEventListener('click', async () => {
      if (!ultimoCardData) {
        mostrarErro('Gere o card antes de criar o link público.');
        return;
      }

      let baseUrl = localStorage.getItem(SHARE_BASE_URL_KEY) || '';
      if (!baseUrl) {
        solicitarBaseUrl(async (urlConfigurada) => {
          const linkNovo = gerarLinkPublicoOferta(ultimoCardData, urlConfigurada);
          try {
            await navigator.clipboard.writeText(linkNovo);
            abrirModalMensagem('Link copiado', 'O link da oferta foi copiado. Agora você pode colar no WhatsApp.');
          } catch (e) {
            abrirModalLinkManual(linkNovo);
          }
        });
        return;
      }

      const link = gerarLinkPublicoOferta(ultimoCardData, baseUrl);
      try {
        await navigator.clipboard.writeText(link);
        abrirModalMensagem('Link copiado', 'O link da oferta foi copiado. Agora você pode colar no WhatsApp.');
      } catch (e) {
        abrirModalLinkManual(link);
      }
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', baixarCard);
  }

  // Carrega preferências salvas (modo / horas / minutos) ao abrir a extensão
  (function carregarPreferenciasTimer() {
    const savedMode = localStorage.getItem('gemTimerMode');
    const savedHours = localStorage.getItem('gemTimerHours');
    const savedMinutes = localStorage.getItem('gemTimerMinutes');

    if (timerModeRadios && timerModeRadios.length) {
      const modeToUse = (savedMode === 'manual' || savedMode === 'random') ? savedMode : 'random';
      timerModeRadios.forEach(radio => {
        radio.checked = radio.value === modeToUse;
      });
      aplicarTimerMode(modeToUse);
    }

    if (timerHoursInput && savedHours !== null) timerHoursInput.value = savedHours;
    if (timerMinutesInput && savedMinutes !== null) timerMinutesInput.value = savedMinutes;
  })();

  if (timerModeRadios && timerModeRadios.length) {
    timerModeRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (!radio.checked) return;
        localStorage.setItem('gemTimerMode', radio.value);
        aplicarTimerMode(radio.value);
      });
    });
  }

  if (timerHoursInput) {
    timerHoursInput.addEventListener('input', () => {
      localStorage.setItem('gemTimerHours', timerHoursInput.value);
    });
  }
  if (timerMinutesInput) {
    timerMinutesInput.addEventListener('input', () => {
      localStorage.setItem('gemTimerMinutes', timerMinutesInput.value);
    });
  }

  function mostrarErro(msg) {
    if (erroMsg) {
      erroMsg.textContent = msg;
      erroMsg.classList.remove('hidden');
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (erroMsg) erroMsg.classList.add('hidden');
    if (previewSection) previewSection.classList.add('hidden');

    try {
      const textoEl = document.getElementById('dadosOferta');
      const texto = textoEl ? textoEl.value.trim() : '';

      if (!texto) {
        mostrarErro('Primeiro cole os dados do PowerBI no campo acima.');
        return;
      }

      const condicao = form.querySelector('input[name="condicao"]:checked')?.value || 'sem';

      if (typeof window.GemCardParser === 'undefined' || !window.GemCardParser.parsearDadosOferta) {
        mostrarErro('Erro ao carregar o parser. Recarregue a extensão.');
        return;
      }

      const data = window.GemCardParser.parsearDadosOferta(texto, condicao);

      if (!data) {
        mostrarErro('Não foi possível ler os dados. Cole a tabela com a linha de cabeçalho e pelo menos uma linha de dados (use Tab entre as colunas, ou copie do Excel/Power BI).');
        return;
      }

      data.condicao = condicao;

      const timerModeRadio = document.querySelector('input[name="timerMode"]:checked');
      const mode = timerModeRadio ? timerModeRadio.value : 'random';

      if (mode === 'manual') {
        const hEl = document.getElementById('timerHours');
        const mEl = document.getElementById('timerMinutes');

        let horas = hEl ? parseInt(hEl.value, 10) || 0 : 0;
        let minutos = mEl ? parseInt(mEl.value, 10) || 0 : 0;

        if (horas < 0) horas = 0;
        if (horas > 24) horas = 24;
        if (minutos < 0) minutos = 0;
        if (minutos > 59) minutos = 59;

        let duracaoMs = (horas * 60 + minutos) * 60 * 1000;
        // Se o usuário deixar 0h 0min, garante pelo menos 1h
        if (duracaoMs <= 0) {
          duracaoMs = 60 * 60 * 1000;
        }
        data.fimOfertaMs = Date.now() + duracaoMs;
      } else {
        // Aleatório entre 1h e 5h, com minutos e segundos aleatórios
        var minMs = 1 * 60 * 60 * 1000;        // 1 hora em ms
        var maxMs = 5 * 60 * 60 * 1000;        // 5 horas em ms
        var duracaoMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
        data.fimOfertaMs = Date.now() + duracaoMs;
      }
      ultimoCardData = data;

      if (countdownIntervalId) {
        clearInterval(countdownIntervalId);
        countdownIntervalId = null;
      }

      if (typeof window.GemCardPreview === 'undefined' || !window.GemCardPreview.renderizarPreview) {
        mostrarErro('Erro ao carregar o preview. Recarregue a extensão.');
        return;
      }

      const cardPreview = document.getElementById('cardPreview');
      if (!cardPreview) {
        mostrarErro('Erro na interface. Recarregue a extensão.');
        return;
      }

      cardPreview.innerHTML = window.GemCardPreview.renderizarPreview(data);
      if (previewSection) {
        previewSection.classList.remove('hidden');
        previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      var countdownEl = cardPreview.querySelector('#cardCountdown');
      if (countdownEl && data.fimOfertaMs) {
        function pad(n) { return n < 10 ? '0' + n : n; }
        function updateCountdown() {
          var left = data.fimOfertaMs - Date.now();
          if (left <= 0) { countdownEl.textContent = 'Expirado'; clearInterval(countdownIntervalId); countdownIntervalId = null; return; }
          var h = Math.floor(left / 3600000);
          var m = Math.floor((left % 3600000) / 60000);
          var s = Math.floor((left % 60000) / 1000);
          countdownEl.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
        }
        countdownIntervalId = setInterval(updateCountdown, 1000);
        updateCountdown();
      }
    } catch (err) {
      console.error('Erro ao gerar card:', err);
      mostrarErro('Ocorreu um erro: ' + (err.message || String(err)) + '. Verifique os dados e tente de novo.');
    }
  });
});
