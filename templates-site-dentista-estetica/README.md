# Templates Site Dentista - Harmonização Orofacial

Templates profissionais e prontos para uso de sites para dentistas especializados em Harmonização Orofacial. 5 temas de cores, cada um com versão One Page e Multi-páginas — 10 templates no total. Responsivos, modernos e otimizados para conversão.

---

## Estrutura do Projeto

```
templates-site-dentista-estetica/
├── README.md                   ← Este arquivo
├── PROPOSTA-COMERCIAL.md       ← Proposta comercial com pacotes de preço
├── version-a/                  ← One Page (tema azul clínico)
│   └── index.html
├── version-a-multi/            ← Multi-páginas (tema azul clínico)
│   ├── index.html
│   ├── sobre.html
│   ├── servicos.html
│   ├── avaliacoes.html
│   └── contato.html
├── version-b/                  ← One Page (tema rosa elegante)
│   └── index.html
├── version-b-multi/            ← Multi-páginas (tema rosa elegante)
│   ├── index.html
│   ├── sobre.html
│   ├── servicos.html
│   ├── avaliacoes.html
│   └── contato.html
├── version-c/                  ← One Page (tema roxo premium)
│   └── index.html
├── version-c-multi/            ← Multi-páginas (tema roxo premium)
│   ├── index.html
│   ├── sobre.html
│   ├── servicos.html
│   ├── avaliacoes.html
│   └── contato.html
├── version-d/                  ← One Page (tema verde emerald)
│   └── index.html
├── version-d-multi/            ← Multi-páginas (tema verde emerald)
│   ├── index.html
│   ├── sobre.html
│   ├── servicos.html
│   ├── avaliacoes.html
│   └── contato.html
├── version-e/                  ← One Page (tema dourado/amber)
│   └── index.html
├── version-e-multi/            ← Multi-páginas (tema dourado/amber)
│   ├── index.html
│   ├── sobre.html
│   ├── servicos.html
│   ├── avaliacoes.html
│   └── contato.html
└── assets/
    └── placeholder.jpg         ← Imagem placeholder
```

---

## Versões Disponíveis

Cada tema possui duas variantes: **One Page** (landing page única) e **Multi-Páginas** (5 páginas completas).

### Tema A — Azul Clínico
- **Cor principal:** `#2563eb` (blue-600)
- **Estilo:** Profissional, clínico, confiável
- **Ícone:** `fa-tooth`
- `version-a/` — One Page
- `version-a-multi/` — Multi-páginas (5 páginas)

### Tema B — Rosa Elegante
- **Cor principal:** `#e11d48` (rose-600)
- **Estilo:** Feminino, elegante, sofisticado
- **Ícone:** `fa-spa`
- `version-b/` — One Page
- `version-b-multi/` — Multi-páginas (5 páginas)

### Tema C — Roxo Premium
- **Cor principal:** `#7c3aed` (violet-600)
- **Estilo:** Premium, luxuoso, com detalhes dourados
- **Ícone:** `fa-tooth`
- `version-c/` — One Page
- `version-c-multi/` — Multi-páginas (5 páginas)

### Tema D — Verde Emerald
- **Cor principal:** `#059669` (emerald-600)
- **Estilo:** Natural, equilibrado, saúde
- **Ícone:** `fa-tooth`
- `version-d/` — One Page
- `version-d-multi/` — Multi-páginas (5 páginas)

### Tema E — Dourado/Amber
- **Cor principal:** `#d97706` (amber-600)
- **Estilo:** Luxuoso, exclusivo, sofisticado
- **Ícone:** `fa-tooth`
- `version-e/` — One Page
- `version-e-multi/` — Multi-páginas (5 páginas)

### Estrutura das variantes

**One Page** — Landing page completa em arquivo único:
- Seções: Hero, Sobre, Serviços, Avaliações, Localização, Marcas, Contato, Footer

**Multi-Páginas** — Site com 5 páginas interligadas:
- `index.html` — Página inicial com hero e destaques
- `sobre.html` — Sobre o profissional
- `servicos.html` — 8 tratamentos detalhados (descrição, tempo, preço médio)
- `avaliacoes.html` — Avaliações e depoimentos de pacientes
- `contato.html` — Formulário de contato + mapa + canais

---

## Como Usar

### 1. Abrir localmente
Basta abrir o arquivo `index.html` de qualquer versão no navegador:
```bash
# Exemplo: abrir a Version A
open version-a/index.html    # macOS
start version-a/index.html   # Windows
xdg-open version-a/index.html # Linux
```

### 2. Personalizar os textos
Faça uma busca e substitua (Ctrl+H) pelos seguintes placeholders:

| Placeholder | Substituir por |
|---|---|
| `[NOME DO DENTISTA]` | Nome completo do profissional |
| `[CRO-SP XXXXX]` | Registro no CRO (ex: CRO-SP 12345) |
| `[WHATSAPP]` | Número com DDD sem espaços (ex: 11999998888) |
| `[TELEFONE]` | Número de telefone com DDD |
| `[ENDEREÇO]` | Endereço completo da clínica |
| `[RUA, NÚMERO - BAIRRO]` | Logradouro |
| `[CIDADE - UF, CEP XXXXX-XXX]` | Cidade, estado e CEP |
| `[UNIVERSIDADE]` | Universidade de graduação |
| `[INSTITUIÇÃO PÓS]` | Instituição da pós-graduação |
| `[INSTAGRAM]` | Nome de usuário do Instagram (sem @) |
| `[FACEBOOK]` | Nome/ID da página do Facebook |
| `[EMAIL@DOMINIO.COM.BR]` | E-mail profissional |
| `[SEU-EMAIL@DOMINIO.COM]` | E-mail para receber formulários (FormSubmit) |
| `[SEU-DOMINIO]` | Domínio do site (ex: dranome.com.br) |
| `[XXX]` | Números (pacientes, avaliações etc.) |
| `[X]` | Anos de experiência |
| `[Nome da Paciente X]` | Nome dos depoimentos |

### 3. Personalizar o Google Maps
No código, encontre o `<iframe>` do Google Maps e substitua pela URL embed da localização real:
1. Acesse [Google Maps](https://maps.google.com)
2. Busque o endereço da clínica
3. Clique em **Compartilhar** → **Incorporar um mapa**
4. Copie o código do iframe
5. Substitua o iframe placeholder no código

### 4. Configurar o FormSubmit
1. No código, encontre `https://formsubmit.co/[SEU-EMAIL@DOMINIO.COM]`
2. Substitua `[SEU-EMAIL@DOMINIO.COM]` pelo e-mail real
3. Na primeira submissão, o FormSubmit enviará um e-mail de confirmação
4. Após confirmar, o formulário estará ativo
5. Mais detalhes em: [formsubmit.co](https://formsubmit.co/)

### 5. Substituir as imagens
- **Foto do profissional:** Substitua as URLs do Unsplash por fotos reais
- **Fotos dos pacientes (depoimentos):** Substitua as URLs do Pravatar por fotos reais (com autorização)
- **Logo das marcas:** Substitua os placeholders de texto por logos reais (Allergan, Merz, Galderma, Sinclair)

---

## Como Publicar

### Vercel (Recomendado) — 3 cliques
1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Faça upload da pasta da versão escolhida (ex: `version-a/`)
3. Clique em **Deploy** — pronto!

### Netlify — 3 cliques
1. Acesse [netlify.com](https://netlify.com)
2. Arraste a pasta da versão escolhida para a área de upload
3. Seu site estará no ar em segundos!

### GitHub Pages
1. Crie um repositório no GitHub
2. Faça push dos arquivos da versão escolhida
3. Vá em **Settings** → **Pages** → Selecione a branch `main`
4. Seu site estará disponível em `seuusuario.github.io/repo`

### Hospedagem Tradicional (Hostgator, Locaweb etc.)
1. Acesse o painel de controle (cPanel)
2. Abra o **Gerenciador de Arquivos**
3. Faça upload dos arquivos para a pasta `public_html`

---

## Como Trocar as Cores

Cada versão usa o Tailwind CSS com cores customizadas via `tailwind.config`. Para trocar a cor principal:

### Passo 1: Encontre o bloco de configuração no `<head>`:
```html
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: { 50:'...', 100:'...', ..., 900:'...' }
        }
      }
    }
  }
</script>
```

### Passo 2: Substitua a paleta `primary` pela cor desejada.

**Paletas prontas para usar:**

**Azul — Tema A:**
```javascript
primary: { 50:'#eff6ff',100:'#dbeafe',200:'#bfdbfe',300:'#93c5fd',400:'#60a5fa',500:'#3b82f6',600:'#2563eb',700:'#1d4ed8',800:'#1e40af',900:'#1e3a8a' }
```

**Rosa — Tema B:**
```javascript
primary: { 50:'#fff1f2',100:'#ffe4e6',200:'#fecdd3',300:'#fda4af',400:'#fb7185',500:'#f43f5e',600:'#e11d48',700:'#be123c',800:'#9f1239',900:'#881337' }
```

**Roxo — Tema C:**
```javascript
primary: { 50:'#f5f3ff',100:'#ede9fe',200:'#ddd6fe',300:'#c4b5fd',400:'#a78bfa',500:'#8b5cf6',600:'#7c3aed',700:'#6d28d9',800:'#5b21b6',900:'#4c1d95' }
// Tema C também usa cores gold: { 400:'#facc15',500:'#eab308',600:'#ca8a04' }
```

**Verde Emerald — Tema D:**
```javascript
primary: { 50:'#ecfdf5',100:'#d1fae5',200:'#a7f3d0',300:'#6ee7b7',400:'#34d399',500:'#10b981',600:'#059669',700:'#047857',800:'#065f46',900:'#064e3b' }
```

**Dourado/Amber — Tema E:**
```javascript
primary: { 50:'#fffbeb',100:'#fef3c7',200:'#fde68a',300:'#fcd34d',400:'#fbbf24',500:'#f59e0b',600:'#d97706',700:'#b45309',800:'#92400e',900:'#78350f' }
```

---

## Tecnologias Utilizadas

- **Tailwind CSS 3** (via CDN Play) — Framework CSS utility-first
- **Font Awesome 6** (via CDN) — Ícones
- **FormSubmit** — Formulário de contato sem backend
- **Google Maps Embed** — Mapa de localização
- **HTML5 puro** — Sem frameworks JavaScript

---

## Checklist de Lançamento

- [ ] Substituir todos os placeholders `[...]`
- [ ] Adicionar fotos reais do profissional
- [ ] Configurar iframe do Google Maps com endereço real
- [ ] Configurar FormSubmit com e-mail real
- [ ] Testar formulário de contato
- [ ] Testar botão flutuante do WhatsApp
- [ ] Testar responsividade (mobile, tablet, desktop)
- [ ] Testar todos os links de navegação
- [ ] Adicionar favicon personalizado
- [ ] Configurar domínio personalizado
- [ ] Adicionar Google Analytics / Meta Pixel (opcional)

---

## Licença

Uso comercial permitido. Templates desenvolvidos para revenda e personalização para clientes dentistas.
