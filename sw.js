"use strict";

var VERSAO_CACHE = "casa-aaioses-publico-v2";
var ARQUIVOS = [
  "./",
  "./index.html",
  "./sobre.html",
  "./acolhimento.html",
  "./parceiros.html",
  "./doacoes.html",
  "./necessidades.html",
  "./contato.html",
  "./css/estilo.css",
  "./js/site.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", function (evento) {
  evento.waitUntil(
    caches.open(VERSAO_CACHE).then(function (cache) {
      return cache.addAll(ARQUIVOS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (evento) {
  evento.waitUntil(
    caches.keys().then(function (chaves) {
      return Promise.all(chaves.map(function (chave) {
        if (chave !== VERSAO_CACHE) {
          return caches.delete(chave);
        }
        return null;
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (evento) {
  if (evento.request.method !== "GET") {
    return;
  }

  var url = new URL(evento.request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  evento.respondWith(
    caches.match(evento.request).then(function (resposta) {
      if (resposta) {
        return resposta;
      }

      return fetch(evento.request).then(function (novaResposta) {
        if (!novaResposta || novaResposta.status !== 200 || novaResposta.type !== "basic") {
          return novaResposta;
        }

        var copia = novaResposta.clone();
        caches.open(VERSAO_CACHE).then(function (cache) {
          cache.put(evento.request, copia);
        });
        return novaResposta;
      }).catch(function () {
        if (evento.request.mode === "navigate") {
          return caches.match("./index.html");
        }
        return undefined;
      });
    })
  );
});
