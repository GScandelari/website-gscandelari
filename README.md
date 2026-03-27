# Dev Sites — GScandelari

Painel de vitrine de projetos web hospedados em [gscandelari.com.br](https://gscandelari.com.br). Usado para compartilhar propostas comerciais com clientes, permitindo que visualizem as versões de layout antes da aprovação.

---

## Estrutura do Projeto

```
Dev Sites/
├── index.html                        ← Painel principal (vitrine de projetos)
├── firebase-config.js                ← Credenciais Firebase (não versionado)
├── firebase-config.example.js        ← Template de configuração (referência)
├── firebase.json                     ← Configuração do Firebase Hosting
├── .firebaserc                       ← Projeto Firebase: website-scandelari
├── .gitignore
│
├── Dr. Douglas de Siqueira/          ← Cliente: Dr. Douglas de Siqueira
│   ├── version-a/                    ← One Page — Azul Clínico
│   ├── version-b/                    ← One Page — Rosa Elegante
│   └── version-c/                    ← Multi-páginas — Roxo Premium
│
├── Dra. Linda Mello/                 ← Cliente: Dra. Linda Mello
│   └── version-c-multi/              ← Multi-páginas — Roxo Premium
│
├── templates-site-dentista-estetica/ ← Templates base para dentistas
│   ├── version-a / version-a-multi   ← Azul Clínico
│   ├── version-b / version-b-multi   ← Rosa Elegante
│   ├── version-c / version-c-multi   ← Roxo Premium
│   ├── version-d / version-d-multi   ← Verde Emerald
│   └── version-e / version-e-multi   ← Dourado/Amber
│
└── templates-jiujitsu-athlete/       ← Template base para atleta de Jiu-Jitsu
    └── index.html                    ← Single Page — Dark + Laranja
```

---

## Como Funciona

1. Cada cliente recebe um link direto para a versão do layout proposta
   - Exemplo: `https://gscandelari.com.br/Dr.%20Douglas%20de%20Siqueira/version-a`
2. O cliente visualiza o site sem precisar de login ou instalação
3. Após aprovação, o template é personalizado com os dados reais do cliente

---

## Configuração do Firebase

O projeto usa Firebase Hosting para hospedagem e Firestore para o formulário de propostas no painel.

### Setup local

1. Copie o arquivo de exemplo:
   ```bash
   cp firebase-config.example.js firebase-config.js
   ```
2. Preencha `firebase-config.js` com as credenciais reais do projeto `website-scandelari`
3. O arquivo `firebase-config.js` está no `.gitignore` e nunca deve ser versionado

### Deploy

```bash
firebase deploy
```

> Requer [Firebase CLI](https://firebase.google.com/docs/cli) instalado e autenticado.

---

## Segurança

- As credenciais do Firebase ficam em `firebase-config.js` (ignorado pelo git)
- A API key está restrita ao domínio `gscandelari.com.br` via Google Cloud Console
- As regras do Firestore estão configuradas para não permitir leitura/escrita pública irrestrita

---

## Tecnologias

- HTML5 + Tailwind CSS (CDN)
- Font Awesome 6 (CDN)
- Firebase Hosting + Firestore
- FormSubmit (formulários nos templates)
