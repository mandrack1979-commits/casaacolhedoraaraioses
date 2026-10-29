(function () {
  "use strict";

  var scriptAtual = document.currentScript;
  var raiz = scriptAtual
    ? new URL("../", scriptAtual.src)
    : new URL("./", window.location.href);

  function iniciarNavegacao() {
    var caminhoAtual = window.location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll(".navegacao a");
    Array.prototype.forEach.call(links, function (link) {
      var destino = link.getAttribute("href") || "";
      var arquivo = destino.split("/").pop();
      if (arquivo === caminhoAtual) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function registrarServiceWorker() {
    if (!("serviceWorker" in navigator)) {
      return;
    }
    if (window.location.protocol !== "http:" && window.location.protocol !== "https:") {
      return;
    }
    navigator.serviceWorker.register(new URL("sw.js", raiz).href).catch(function () {
      return null;
    });
  }

  function iniciarInstalacao() {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return;
    }

    var botao = document.createElement("button");
    botao.type = "button";
    botao.className = "botao botao--principal botao-instalacao";
    botao.textContent = "Instalar aplicativo";
    botao.setAttribute("aria-label", "Instalar a Casa Acolhedora Aaioses como aplicativo");
    botao.hidden = true;
    document.body.appendChild(botao);

    var promptInstalacao = null;

    window.addEventListener("beforeinstallprompt", function (evento) {
      evento.preventDefault();
      promptInstalacao = evento;
      botao.hidden = false;
    });

    botao.addEventListener("click", function () {
      if (!promptInstalacao) {
        return;
      }
      botao.hidden = true;
      promptInstalacao.prompt();
      promptInstalacao.userChoice.then(function () {
        promptInstalacao = null;
      }).catch(function () {
        promptInstalacao = null;
      });
    });

    window.addEventListener("appinstalled", function () {
      promptInstalacao = null;
      botao.hidden = true;
    });
  }

  document.addEventListener("DOMContentLoaded", iniciarNavegacao);
  registrarServiceWorker();
  iniciarInstalacao();
})();
