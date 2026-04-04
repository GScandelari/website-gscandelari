# Guia: Google Analytics 4 + Meta Pixel

**Aplicável ao:** Pacote Premium

---

## Parte 1 — Google Analytics 4 (GA4)

### O que é?

O Google Analytics 4 é a ferramenta gratuita do Google para monitorar visitantes, comportamento e conversões no site.

### Passo 1 — Criar conta no GA4

1. Acesse [analytics.google.com](https://analytics.google.com)
2. Clique em **"Começar a medir"**
3. Preencha:
   - Nome da conta: `[Nome do Dentista]`
   - Nome da propriedade: `Site - [Nome do Dentista]`
   - Fuso horário: Brasília (UTC-3)
   - Moeda: Real brasileiro (BRL)
4. Configure fluxo de dados: **Web**
5. Insira a URL do site
6. Copie o **ID de medição** (formato: `G-XXXXXXXXXX`)

### Passo 2 — Instalar no site

Adicionar o seguinte código no `<head>` de **todos os arquivos HTML**, antes do fechamento `</head>`:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

> **Substituir** `G-XXXXXXXXXX` pelo ID real do cliente.

### Passo 3 — Configurar eventos de conversão

Eventos importantes para rastrear:

| Evento | Descrição | Como rastrear |
|--------|-----------|---------------|
| `form_submit` | Envio do formulário de contato | Evento automático do GA4 |
| `click_whatsapp` | Clique no botão de WhatsApp | Evento personalizado |
| `click_phone` | Clique no telefone | Evento personalizado |
| `page_view` | Visualização de página | Automático |

**Código para evento de clique no WhatsApp:**

```html
<!-- Adicionar onclick no botão de WhatsApp -->
<a href="https://wa.me/55XXXXXXXXXXX" onclick="gtag('event', 'click_whatsapp', {'event_category': 'engagement'});">
```

### Passo 4 — Verificar instalação

1. Acesse o site com o navegador
2. No GA4, vá em **Relatórios > Tempo real**
3. Confirme que sua visita aparece

---

## Parte 2 — Meta Pixel (Facebook/Instagram)

### O que é?

O Meta Pixel é um trecho de código que rastreia visitantes do site para criar públicos e otimizar anúncios no Facebook e Instagram.

### Passo 1 — Criar o Pixel

1. Acesse o [Gerenciador de Eventos do Meta](https://business.facebook.com/events_manager)
2. Clique em **"Conectar fontes de dados"** > **"Web"** > **"Meta Pixel"**
3. Nomeie o Pixel: `Pixel - [Nome do Dentista]`
4. Copie o **ID do Pixel** (formato numérico)

### Passo 2 — Instalar no site

Adicionar o seguinte código no `<head>` de **todos os arquivos HTML**, após o GA4:

```html
<!-- Meta Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'PIXEL_ID_AQUI');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=PIXEL_ID_AQUI&ev=PageView&noscript=1"/></noscript>
```

> **Substituir** `PIXEL_ID_AQUI` pelo ID real do Pixel.

### Passo 3 — Configurar eventos padrão

Eventos recomendados para dentistas:

| Evento Meta | Quando disparar | Código |
|-------------|-----------------|--------|
| `Lead` | Envio do formulário | `fbq('track', 'Lead');` |
| `Contact` | Clique no WhatsApp | `fbq('track', 'Contact');` |
| `Schedule` | Agendamento | `fbq('track', 'Schedule');` |
| `ViewContent` | Visualizar página de serviços | `fbq('track', 'ViewContent');` |

### Passo 4 — Verificar instalação

1. Instale a extensão **Meta Pixel Helper** no Chrome
2. Acesse o site
3. A extensão deve mostrar o Pixel ativo com evento `PageView`

---

## Checklist de Entrega

- [ ] GA4 criado e configurado
- [ ] Código GA4 instalado em todos os HTMLs
- [ ] Eventos de conversão configurados (WhatsApp, formulário)
- [ ] Meta Pixel criado
- [ ] Código do Pixel instalado em todos os HTMLs
- [ ] Eventos do Pixel configurados (Lead, Contact)
- [ ] Verificação com Meta Pixel Helper OK
- [ ] Relatório em tempo real do GA4 funcionando

---

## Dicas para o Cliente

- **GA4:** Acessar semanalmente para acompanhar visitantes e fontes de tráfego
- **Meta Pixel:** Essencial para criar públicos personalizados e campanhas de remarketing
- Ambas as ferramentas são **gratuitas**
- Dados começam a ser coletados imediatamente após a instalação
