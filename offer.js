(function() {
  'use strict';

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

  function mostrarErro(msg) {
    var shell = document.getElementById('cardShell');
    var hint = document.getElementById('statusHint');
    if (hint) hint.className = 'error';
    if (hint) hint.textContent = msg;
    if (shell) shell.innerHTML = '';
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
      data = JSON.parse(json);
    } catch (e) {
      mostrarErro('Não foi possível ler os dados da oferta. Verifique se o link está completo.');
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
    iniciarCountdown(data && data.fimOfertaMs);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
})();
