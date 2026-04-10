# Estudo: Compatibilidade de Hospedagem — Vercel, Netlify e Firebase

---

## Visão Geral

Os templates são **sites estáticos** (HTML, CSS, JS) sem backend ou framework. Isso os torna compatíveis com qualquer plataforma de hospedagem de sites estáticos.

---

## 1. Comparativo das Plataformas

| Recurso | Vercel | Netlify | Firebase Hosting |
|---------|--------|---------|------------------|
| **Plano gratuito** | Sim | Sim | Sim (Spark) |
| **Bandwidth (free)** | 100 GB/mês | 100 GB/mês | 10 GB/mês |
| **Deploys/mês** | Ilimitados | Ilimitados | Ilimitados |
| **Domínio custom** | Sim (grátis) | Sim (grátis) | Sim (grátis) |
| **SSL/HTTPS** | Automático | Automático | Automático |
| **CDN global** | Edge Network | Cloudflare | Google CDN |
| **Deploy via CLI** | `vercel` | `netlify deploy` | `firebase deploy` |
| **Deploy via Git** | Sim | Sim | Sim (com GitHub Actions) |
| **Deploy via drag & drop** | Não | Sim | Não |
| **Headers customizados** | `vercel.json` | `_headers` | `firebase.json` |
| **Redirects** | `vercel.json` | `_redirects` | `firebase.json` |
| **Forms** | Não nativo | Netlify Forms | Não nativo |
| **Analytics** | Vercel Analytics (pago) | Netlify Analytics (pago) | Google Analytics (grátis) |
| **Ideal para** | Projetos JS/React | Sites estáticos | Ecossistema Google |

---

## 2. Firebase Hosting — Detalhes

### Por que Firebase?

- Faz parte do ecossistema Google (integra com Analytics, Firestore, etc.)
- CDN global do Google (velocidade)
- Plano gratuito generoso para sites de baixo tráfego
- Suporta hosting de múltiplos sites no mesmo projeto
- Ideal para clientes que já usam Google Workspace

### Limitações do plano gratuito (Spark)

| Recurso | Limite |
|---------|--------|
| Armazenamento | 10 GB |
| Transferência | 10 GB/mês |
| Domínios customizados | Ilimitados |
| SSL | Automático |

> 10 GB/mês é suficiente para a maioria dos sites de dentistas (estimativa: ~500-1000 visitas/mês com páginas de ~2-3 MB = ~2-3 GB/mês).

### Passo a passo de deploy no Firebase

#### Pré-requisitos
- Node.js instalado
- Conta Google

#### Instalação

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicializar projeto
firebase init hosting
```

#### Configuração

Quando perguntado:
1. **Public directory:** `.` (ou pasta do template, ex: `version-a`)
2. **Single-page app?** `No`
3. **Auto builds with GitHub?** `No` (ou `Yes` se quiser CI/CD)

#### Deploy

```bash
firebase deploy --only hosting
```

#### Arquivo `firebase.json` para os templates

```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "**/*.md"
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|ico)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(css|js)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=604800"
          }
        ]
      }
    ],
    "cleanUrls": true,
    "trailingSlash": false
  }
}
```

---

## 3. Vercel — Detalhes

### Passo a passo de deploy

#### Opção 1: CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Na pasta do template
cd version-a
vercel

# Deploy de produção
vercel --prod
```

#### Opção 2: Git (GitHub)

1. Push do template para repositório GitHub
2. Conectar repo no [vercel.com](https://vercel.com)
3. Deploy automático a cada push

#### Arquivo `vercel.json`

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 4. Netlify — Detalhes

### Passo a passo de deploy

#### Opção 1: Drag & Drop

1. Acesse [app.netlify.com](https://app.netlify.com)
2. Arraste a pasta do template para a área de deploy
3. Pronto! Site publicado

#### Opção 2: CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Na pasta do template
cd version-a
netlify deploy --prod --dir .
```

#### Opção 3: Git (GitHub)

1. Push para GitHub
2. Conectar no Netlify
3. Deploy automático

#### Arquivo `_headers`

Criar na raiz do template:

```
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/*.css
  Cache-Control: public, max-age=604800
/*.js
  Cache-Control: public, max-age=604800
```

---

## 5. Configuração de Domínio Personalizado

### Processo geral (igual para as 3 plataformas)

1. Cliente compra domínio em registrador (Registro.br, GoDaddy, etc.)
2. No painel da plataforma, adicionar domínio custom
3. Configurar DNS no registrador:
   - **Tipo A:** Apontar para IP da plataforma
   - **Tipo CNAME:** Apontar `www` para o subdomínio da plataforma
4. Aguardar propagação DNS (até 48h)
5. SSL/HTTPS ativado automaticamente

### DNS específico

| Plataforma | Registro CNAME |
|------------|----------------|
| Vercel | `cname.vercel-dns.com` |
| Netlify | `[site].netlify.app` |
| Firebase | Verificação TXT + registros A fornecidos |

---

## 6. Recomendação Final

| Cenário | Plataforma Recomendada |
|---------|----------------------|
| Cliente quer simplicidade máxima | **Netlify** (drag & drop) |
| Cliente usa ecossistema Google | **Firebase** |
| Desenvolvedor quer performance + CI/CD | **Vercel** |
| Cliente já tem hospedagem própria | Usar hospedagem do cliente |
| Deploy rápido para demonstração | **Netlify** ou **Vercel** |

### Ordem de preferência padrão

1. **Firebase** — Ecossistema Google, bom para SEO com Analytics integrado
2. **Vercel** — Performance excelente, CDN global
3. **Netlify** — Mais fácil para leigos, drag & drop
4. **Hospedagem do cliente** — Quando já possui

---

## 7. Compatibilidade dos Templates

Todos os 10 templates (5 one page + 5 multi-páginas) são **100% compatíveis** com as 3 plataformas, pois:

- São arquivos HTML/CSS/JS estáticos
- Não requerem server-side rendering
- Não usam frameworks que precisem de build
- Todas as dependências são carregadas via CDN (Tailwind, Font Awesome)
- FormSubmit funciona independente da hospedagem

**Nenhuma adaptação é necessária** para deploy em qualquer uma das plataformas.
