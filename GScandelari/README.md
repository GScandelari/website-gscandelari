# GScandelari — Portfólio Pessoal

Site pessoal de Guilherme Stanke Scandelari, hospedado em [gscandelari.com.br](https://gscandelari.com.br).

---

## Estrutura

```
GScandelari/
├── index.html          ← Página principal (portfólio)
├── carreira.html       ← Histórico profissional
├── formacao.html       ← Formação acadêmica e habilidades
├── 404.html            ← Página de erro personalizada
├── favicon/            ← Ícones (ico, png, webmanifest)
├── imgs/               ← Imagens do portfólio (logo, profile, etc.)
└── dev-sites/          ← Painel de projetos para clientes (ver README interno)
```

---

## Tecnologias

- HTML5 + Tailwind CSS (CDN)
- Font Awesome 6 (CDN)
- Google Fonts — Inter
- Firebase Hosting

---

## Deploy

Este diretório é a raiz pública (`public: "GScandelari"`) do Firebase Hosting configurado em `firebase.json` na raiz do repositório.

```bash
firebase deploy --only hosting
```
