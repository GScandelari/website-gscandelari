# Guia: Favicon e Ícones Personalizados

**Aplicável ao:** Pacote Premium

---

## O que é Favicon?

Favicon é o pequeno ícone que aparece na aba do navegador, favoritos e resultados de busca. Transmite profissionalismo e identidade visual.

---

## 1. Formatos e Tamanhos Necessários

| Arquivo | Tamanho | Formato | Uso |
|---------|---------|---------|-----|
| `favicon.ico` | 32x32 px | ICO | Navegadores (padrão) |
| `favicon-16x16.png` | 16x16 px | PNG | Aba do navegador |
| `favicon-32x32.png` | 32x32 px | PNG | Aba do navegador (retina) |
| `apple-touch-icon.png` | 180x180 px | PNG | iPhone/iPad (salvar na tela) |
| `android-chrome-192x192.png` | 192x192 px | PNG | Android (instalar PWA) |
| `android-chrome-512x512.png` | 512x512 px | PNG | Android splash screen |
| `og-image.jpg` | 1200x630 px | JPG | Compartilhamento redes sociais |

---

## 2. Onde colocar os arquivos

Os ícones devem ser colocados na pasta `assets/` de cada versão do template:

```
version-a/
├── assets/
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   └── og-image.jpg
└── index.html
```

Para as versões multi-páginas, os mesmos arquivos servem para todas as páginas (caminho relativo `assets/`).

---

## 3. Código HTML para o `<head>`

Adicionar dentro do `<head>` de **todos os arquivos HTML**:

```html
<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="assets/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">

<!-- Web App Manifest (opcional) -->
<link rel="manifest" href="assets/site.webmanifest">
<meta name="theme-color" content="#CORTEMAPRINCIPAL">
```

### Cores por versão

| Versão | Tema | Cor sugerida para theme-color |
|--------|------|-------------------------------|
| A | Azul Clínico | `#2563EB` |
| B | Rosa Elegante | `#EC4899` |
| C | Roxo Premium | `#8B5CF6` |
| D | Verde Emerald | `#10B981` |
| E | Dourado/Amber | `#F59E0B` |

---

## 4. Web App Manifest (site.webmanifest)

Criar arquivo `assets/site.webmanifest`:

```json
{
  "name": "Dr(a). [Nome] - Harmonização Orofacial",
  "short_name": "Dr(a). [Nome]",
  "icons": [
    {
      "src": "android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#CORTEMAPRINCIPAL",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

---

## 5. Ferramentas Recomendadas

### Geração de favicon

- **[RealFaviconGenerator](https://realfavicongenerator.net/)** — Gera todos os formatos a partir de uma imagem
- **[Favicon.io](https://favicon.io/)** — Gerador a partir de texto, imagem ou emoji
- **[Canva](https://www.canva.com/)** — Para criar ícone personalizado antes de converter

### Otimização de imagens

- **[TinyPNG](https://tinypng.com/)** — Compressão PNG/JPG sem perda visível
- **[Squoosh](https://squoosh.app/)** — Conversão e compressão avançada (WebP)
- **[SVGOMG](https://jakearchibald.github.io/svgomg/)** — Otimização de SVGs

---

## 6. Processo de Criação

### Se o cliente tem logo:

1. Receber logo em alta resolução (preferencialmente SVG ou PNG transparente)
2. Usar RealFaviconGenerator para gerar todos os formatos
3. Baixar o pacote e colocar na pasta `assets/`
4. Adicionar código HTML no `<head>`

### Se o cliente NÃO tem logo:

1. Criar ícone simples no Canva (iniciais do nome ou ícone de dente)
2. Exportar em 512x512 PNG
3. Usar Favicon.io para gerar demais formatos
4. Seguir mesmo processo acima

---

## 7. Checklist de Entrega

- [ ] Favicon.ico gerado (32x32)
- [ ] PNG 16x16 e 32x32 gerados
- [ ] Apple Touch Icon (180x180) gerado
- [ ] Android Chrome icons (192 e 512) gerados
- [ ] OG Image (1200x630) criado
- [ ] Arquivos colocados na pasta `assets/`
- [ ] Código HTML adicionado no `<head>` de todos os arquivos
- [ ] Testado em Chrome, Safari e Firefox
- [ ] Testado compartilhando link no WhatsApp (preview com imagem)
