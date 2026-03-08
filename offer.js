(function() {
  'use strict';

  var UNISUL_CIDADES = ['ARARANGUA', 'BRACO DO NORTE', 'CONTINENTE', 'CRICIUMA', 'FLORIANOPOLIS', 'ITAJAI', 'PEDRA BRANCA', 'TUBARAO'];
  var UNISOCIESC_CIDADES = ['ANITA GARIBALDI', 'BLUMENAU', 'JARAGUA DO SUL', 'SAO BENTO DO SUL'];
  var FADERGS_CIDADES = ['CENTRO'];
  var UNIRITTER_CIDADES = ['CANOAS', 'FAPA', 'ZONA SUL'];
  var UNICURITIBA_CIDADES = ['MILTON VIANNA FILHO'];

  var LINKS_PORTAL = {
    unisul: ['https://cloudapp.animaeducacao.com.br/area-candidato/unisul'],
    uniritter: ['https://cloudapp.animaeducacao.com.br/area-candidato/uniritter'],
    fadergs: ['https://cloudapp.animaeducacao.com.br/area-candidato/fadergs'],
    unicuritiba: ['https://cloudapp.animaeducacao.com.br/area-candidato/unicuritiba'],
    unisociesc: [
      'https://cloudapp.animaeducacao.com.br/area-candidato/sociesc?_gl=1%2a2sc0qs%2a_gcl_au%2aMTA3MzU1ODEyNS4xNzU5OTY3MDc5%2a_ga%2aNzM5Mjk0MjIxLjE3NTk5NjcwODA.%2a_ga_NPZSEF46RQ%2aczE3NTk5NjcwNzkkbzEkZzEkdDE3NTk5NjcyMjUkajQwJGwwJGgxMTE4Njk0NTky',
      'https://cloudapp.animaeducacao.com.br/area-candidato/sociesc?_gl=1%2a1y9laxm%2a_gcl_au%2aMTA3MzU1ODEyNS4xNzU5OTY3MDc5%2a_ga%2aNzM5Mjk0MjIxLjE3NTk5NjcwODA.%2a_ga_NPZSEF46RQ%2aczE3NTk5NjcwNzkkbzEkZzEkdDE3NTk5NjcyMjUkajQwJGwwJGgxMTE4Njk0NTky'
    ]
  };

  function removerAcentos(str) {
    return String(str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function normalizarCidade(cidade) {
    return removerAcentos(cidade).toUpperCase().trim();
  }

  function identificarInstituicao(cidade) {
    var c = normalizarCidade(cidade);
    if (UNICURITIBA_CIDADES.indexOf(c) >= 0) return 'unicuritiba';
    if (UNIRITTER_CIDADES.indexOf(c) >= 0) return 'uniritter';
    if (FADERGS_CIDADES.indexOf(c) >= 0) return 'fadergs';
    if (UNISOCIESC_CIDADES.indexOf(c) >= 0) return 'unisociesc';
    if (UNISUL_CIDADES.indexOf(c) >= 0) return 'unisul';
    return 'unisul';
  }

  function base64UrlToUtf8(encoded) {
    if (!encoded) return '';
    var input = String(encoded).replace(/-/g, '+').replace(/_/g, '/');
    var mod = input.length % 4;
    if (mod) input += '='.repeat(4 - mod);
    var binary = atob(input);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  function expandirDadosCompactos(payloadCompacto) {
    return {
      curso: payloadCompacto.c || 'Curso',
      cidade: payloadCompacto.ci || 'Florianópolis',
      grau: payloadCompacto.g || 'Bacharelado',
      modalidade: payloadCompacto.mo || 'Presencial',
      turno: payloadCompacto.tu || 'Noturno',
      qtdMeses: payloadCompacto.qm || '',
      matricula: payloadCompacto.ma || '99,00',
      matriculaBruto: payloadCompacto.mb || '299,90',
      bolsa1Sem: payloadCompacto.b1 || '60%',
      bolsaDemais: payloadCompacto.bd || payloadCompacto.b1 || '40%',
      mensalidade1Sem: payloadCompacto.m1 || '299,90',
      mensalidadeDemais: payloadCompacto.md || payloadCompacto.m1 || '499,90',
      apenasUmaMensalidade: payloadCompacto.a === 1,
      condicao: payloadCompacto.co || 'sem',
      fimOfertaMs: payloadCompacto.f || 0,
    };
  }

  function mostrarErro(msg) {
    var shell = document.getElementById('cardShell');
    var hint = document.getElementById('statusHint');
    var ctaArea = document.getElementById('ctaArea');
    if (hint) hint.className = 'error';
    if (hint) hint.textContent = msg;
    if (shell) shell.innerHTML = '';
    if (ctaArea) {
      ctaArea.style.display = 'none';
      ctaArea.innerHTML = '';
    }
  }

  function renderizarCtaPortal(data) {
    var ctaArea = document.getElementById('ctaArea');
    if (!ctaArea) return;

    var instituicao = identificarInstituicao(data && data.cidade);
    var links = LINKS_PORTAL[instituicao] || [];
    if (!links.length) {
      ctaArea.style.display = 'none';
      ctaArea.innerHTML = '';
      return;
    }

    var textoSuporte = instituicao === 'unisociesc'
      ? 'Se o primeiro acesso nao funcionar, volte e tente a segunda opcao.'
      : 'Clique no botao abaixo para acessar seu portal do candidato.';

    var botoes = links.map(function(link, idx) {
      var principal = idx === 0 ? '' : ' secondary';
      var label = instituicao === 'unisociesc'
        ? 'Opcao ' + (idx + 1) + ' - Portal do candidato'
        : 'Vamos garantir a sua vaga agora mesmo';
      return '<a class="portal-btn' + principal + '" href="' + link + '" target="_blank" rel="noopener noreferrer">' + label + '</a>';
    }).join('');

    ctaArea.innerHTML = ''
      + '<h2>Vamos garantir a sua vaga agora mesmo</h2>'
      + '<p>' + textoSuporte + '</p>'
      + '<div class="cta-buttons">' + botoes + '</div>';
    ctaArea.style.display = 'flex';
  }

  function iniciarCountdown(fimOfertaMs) {
    var el = document.getElementById('cardCountdown');
    if (!el || !fimOfertaMs) return;
    var endTime = Number(fimOfertaMs);
    if (!Number.isFinite(endTime)) return;
    function pad(n) { return n < 10 ? '0' + n : String(n); }
    function update() {
      var left = endTime - Date.now();
      if (left <= 0) {
        el.textContent = 'Expirado';
        clearInterval(timerId);
        return;
      }
      var h = Math.floor(left / 3600000);
      var m = Math.floor((left % 3600000) / 60000);
      var s = Math.floor((left % 60000) / 1000);
      el.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
    }
    var timerId = setInterval(update, 1000);
    update();
  }

  function main() {
    if (typeof window.GemCardPreview === 'undefined' || !window.GemCardPreview.renderizarPreview) {
      mostrarErro('Não foi possível carregar o renderizador da oferta.');
      return;
    }

    var params = new URLSearchParams(window.location.search);
    var dataEncoded = params.get('d');
    if (!dataEncoded) {
      mostrarErro('Link inválido. O parâmetro da oferta não foi encontrado.');
      return;
    }

    var data;
    try {
      var json = base64UrlToUtf8(dataEncoded);
      var payload = JSON.parse(json);
      var version = params.get('v');
      data = version === '2' ? expandirDadosCompactos(payload) : payload;
    } catch (e) {
      mostrarErro('Não foi possível ler os dados da oferta. Verifique se o link está completo.');
      return;
    }

    var fimOferta = Number(data && data.fimOfertaMs);
    if (Number.isFinite(fimOferta) && Date.now() > fimOferta) {
      mostrarErro('Esta oferta expirou. Solicite um novo link atualizado.');
      return;
    }

    var shell = document.getElementById('cardShell');
    if (!shell) return;

    shell.innerHTML = window.GemCardPreview.renderizarPreview(data);

    var hint = document.getElementById('statusHint');
    if (hint) {
      hint.textContent = 'Oferta carregada com sucesso.';
    }

    if (data && data.curso) {
      document.title = 'Oferta - ' + data.curso;
    }
    renderizarCtaPortal(data);
    iniciarCountdown(data && data.fimOfertaMs);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
})();
