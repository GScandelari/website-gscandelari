# GScandelari — Website & Dev Sites

Repositório do site pessoal [gscandelari.com.br](https://gscandelari.com.br) e do painel de projetos web para clientes.

---

## Estrutura do Projeto

```
Dev Sites/                              ← Raiz do repositório git
├── firebase.json                       ← Configuração do Firebase Hosting (public: "GScandelari")
├── .firebaserc                         ← Projeto Firebase: website-scandelari
├── .gitignore
│
└── GScandelari/                        ← Raiz pública do Firebase Hosting
    ├── index.html                      ← Portfólio pessoal (gscandelari.com.br/)
    ├── carreira.html                   ← Página de carreira
    ├── formacao.html                   ← Página de formação
    ├── 404.html                        ← Página de erro personalizada
    ├── favicon/                        ← Ícones do site (ico, png, webmanifest)
    ├── imgs/                           ← Imagens do portfólio (logo, profile, etc.)
    │
    └── dev-sites/                      ← Painel de vitrine (gscandelari.com.br/dev-sites)
        ├── index.html                  ← Painel principal com lista de projetos
        ├── favicon.png
        ├── firebase-config.js          ← Credenciais Firebase (não versionado)
        ├── firebase-config.example.js  ← Template de configuração (referência)
        │
        ├── Clientes/                   ← Projetos de clientes
        │   ├── Dr. Douglas de Siqueira/
        │   │   ├── version-a/          ← One Page — Azul Clínico
        │   │   ├── version-a_v2/       ← One Page — Azul Clínico (Refatorado)
        │   │   ├── version-b/          ← One Page — Rosa Elegante
        │   │   ├── version-b_v2/       ← One Page — Rosa Elegante (Refatorado)
        │   │   ├── version-c/          ← Multi-páginas — Roxo Premium
        │   │   └── dist/               ← Build de produção atual
        │   │
        │   └── Dra. Linda Mello/
        │       └── version-c-multi/    ← Multi-páginas — Roxo Premium
        │
        └── Templates/                  ← Templates base reutilizáveis
            ├── templates-site-dentista-estetica/
            │   ├── version-a / version-a-multi   ← Azul Clínico
            │   ├── version-b / version-b-multi   ← Rosa Elegante
            │   ├── version-c / version-c-multi   ← Roxo Premium
            │   ├── version-d / version-d-multi   ← Verde Emerald
            │   └── version-e / version-e-multi   ← Dourado/Amber
            │
            └── templates-jiujitsu-athlete/
                └── index.html          ← Single Page — Dark + Laranja
```

---

## URLs Principais

| URL | Conteúdo |
|-----|----------|
| `gscandelari.com.br/` | Portfólio pessoal |
| `gscandelari.com.br/carreira` | Página de carreira |
| `gscandelari.com.br/formacao` | Página de formação |
| `gscandelari.com.br/dev-sites` | Painel de projetos |
| `gscandelari.com.br/dev-sites/Clientes/Dr.%20Douglas%20de%20Siqueira/version-c` | Exemplo de cliente |

> Redirects 301 estão configurados de `/Clientes/**` e `/Templates/**` para `/dev-sites/Clientes/**` e `/dev-sites/Templates/**` (compatibilidade com links antigos).

---

## Como Funciona

1. Cada cliente recebe um link direto para a versão do layout proposta via painel `/dev-sites`
2. O cliente visualiza o site sem login ou instalação
3. Após aprovação, o template é personalizado com os dados reais do cliente

---

## Configuração do Firebase

O projeto usa Firebase Hosting para hospedagem e Firestore para o formulário de propostas no painel Dev Sites.

### Setup local

1. Copie o arquivo de exemplo:
   ```bash
   cp GScandelari/dev-sites/firebase-config.example.js GScandelari/dev-sites/firebase-config.js
   ```
2. Preencha `firebase-config.js` com as credenciais reais do projeto `website-scandelari`
3. O arquivo `firebase-config.js` está no `.gitignore` e **nunca deve ser versionado**

### Deploy

```bash
firebase deploy --only hosting
```

> Requer [Firebase CLI](https://firebase.google.com/docs/cli) instalado e autenticado.

---

## Segurança

- Credenciais do Firebase ficam em `firebase-config.js` (ignorado pelo git e pelo deploy)
- As pastas `.claude`, `.firebase`, `.kiro`, `.vscode` são explicitamente ignoradas no deploy
- A API key está restrita ao domínio `gscandelari.com.br` via Google Cloud Console
- Regras do Firestore configuradas para não permitir leitura/escrita pública irrestrita

---

## Tecnologias

- HTML5 + Tailwind CSS (CDN)
- Font Awesome 6 (CDN)
- Firebase Hosting + Firestore
- FormSubmit (formulários nos templates de clientes)
