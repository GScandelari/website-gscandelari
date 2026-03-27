# Guia: SEO On-Page para Templates

**Aplicável ao:** Pacote Premium

---

## O que é SEO On-Page?

SEO On-Page refere-se às otimizações feitas diretamente no código HTML e conteúdo do site para melhorar o posicionamento nos mecanismos de busca.

---

## 1. Meta Tags Essenciais

### Title Tag

A tag mais importante para SEO. Deve conter a palavra-chave principal + localização.

```html
<title>Dr(a). [Nome] | Harmonização Orofacial em [Cidade] - [Procedimento Principal]</title>
```

**Regras:**
- Máximo 60 caracteres
- Palavra-chave no início
- Incluir cidade/região
- Única por página

**Exemplos por página:**

| Página | Title sugerido |
|--------|---------------|
| Início | `Dr(a). [Nome] \| Harmonização Orofacial em [Cidade]` |
| Sobre | `Sobre Dr(a). [Nome] - Especialista em Harmonização \| [Cidade]` |
| Serviços | `Serviços de Harmonização Orofacial \| Botox, Preenchimento - [Cidade]` |
| Avaliações | `Avaliações e Depoimentos \| Dr(a). [Nome] - [Cidade]` |
| Contato | `Agende sua Avaliação \| Dr(a). [Nome] - [Cidade]` |

### Meta Description

Descrição que aparece nos resultados do Google. Deve ser persuasiva e conter CTA.

```html
<meta name="description" content="Dr(a). [Nome], especialista em Harmonização Orofacial em [Cidade]. Botox, Preenchimento Labial, Bioestimuladores e mais. Agende sua avaliação pelo WhatsApp!">
```

**Regras:**
- 150-160 caracteres
- Incluir palavra-chave + cidade
- Finalizar com Call-to-Action (CTA)
- Única por página

### Meta Keywords (opcional)

```html
<meta name="keywords" content="harmonização orofacial [cidade], botox [cidade], preenchimento labial, dentista estético [cidade]">
```

> Nota: Google não usa mais keywords para ranking, mas outros buscadores podem usar.

---

## 2. Open Graph (Redes Sociais)

Tags que controlam como o site aparece quando compartilhado no Facebook, Instagram, LinkedIn e WhatsApp.

```html
<!-- Open Graph -->
<meta property="og:title" content="Dr(a). [Nome] | Harmonização Orofacial em [Cidade]">
<meta property="og:description" content="Especialista em Harmonização Orofacial. Botox, Preenchimento, Bioestimuladores. Agende sua avaliação!">
<meta property="og:image" content="https://[dominio]/assets/og-image.jpg">
<meta property="og:url" content="https://[dominio]/">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Dr(a). [Nome]">
```

**Imagem OG:**
- Tamanho recomendado: 1200 x 630 pixels
- Formato: JPG ou PNG
- Incluir: foto do profissional + nome + especialidade

### Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Dr(a). [Nome] | Harmonização Orofacial">
<meta name="twitter:description" content="Especialista em Harmonização Orofacial em [Cidade]">
<meta name="twitter:image" content="https://[dominio]/assets/og-image.jpg">
```

---

## 3. Schema Markup (Dados Estruturados)

Schema markup ajuda o Google a entender o conteúdo do site e pode gerar rich snippets nos resultados.

### Schema para Dentista (JSON-LD)

Adicionar antes do `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Dr(a). [Nome Completo]",
  "description": "Especialista em Harmonização Orofacial em [Cidade]",
  "url": "https://[dominio]",
  "telephone": "+55[DDD][NUMERO]",
  "email": "[email@dominio.com.br]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Endereço completo]",
    "addressLocality": "[Cidade]",
    "addressRegion": "[UF]",
    "postalCode": "[CEP]",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[LATITUDE]",
    "longitude": "[LONGITUDE]"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$",
  "image": "https://[dominio]/assets/foto-profissional.jpg",
  "sameAs": [
    "https://www.instagram.com/[instagram]",
    "https://www.facebook.com/[facebook]"
  ],
  "medicalSpecialty": "Dentistry",
  "availableService": [
    {
      "@type": "MedicalProcedure",
      "name": "Botox",
      "description": "Aplicação de toxina botulínica para harmonização facial"
    },
    {
      "@type": "MedicalProcedure",
      "name": "Preenchimento Labial",
      "description": "Preenchimento com ácido hialurônico para volume e contorno labial"
    }
  ]
}
</script>
```

### Schema para LocalBusiness

Complementar para SEO local:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Consultório Dr(a). [Nome]",
  "image": "https://[dominio]/assets/fachada.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Endereço]",
    "addressLocality": "[Cidade]",
    "addressRegion": "[UF]",
    "postalCode": "[CEP]",
    "addressCountry": "BR"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "[NUMERO_AVALIACOES]"
  }
}
</script>
```

---

## 4. Boas Práticas Adicionais

### Heading Tags (H1-H6)
- Apenas **1 H1 por página** (já implementado nos templates)
- H2 para seções principais
- H3 para sub-seções
- Incluir palavras-chave naturalmente

### Alt Text nas Imagens
```html
<img src="foto.jpg" alt="Dr(a). [Nome] realizando procedimento de preenchimento labial em [Cidade]">
```

### URLs amigáveis
- Multi-páginas já usam URLs limpas: `/sobre.html`, `/servicos.html`
- Para domínio personalizado: `www.drnome.com.br/servicos`

### Velocidade de carregamento
- Imagens otimizadas (WebP quando possível)
- CSS minificado
- Lazy loading para imagens abaixo da dobra

---

## Checklist de Implementação

- [ ] Title tag única e otimizada por página
- [ ] Meta description persuasiva por página
- [ ] Tags Open Graph configuradas
- [ ] Schema markup JSON-LD adicionado
- [ ] Alt text em todas as imagens
- [ ] Apenas 1 H1 por página
- [ ] Hierarquia de headings correta (H1 > H2 > H3)
- [ ] URLs amigáveis
- [ ] Imagens otimizadas
- [ ] Testar no [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Validar no [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/)
