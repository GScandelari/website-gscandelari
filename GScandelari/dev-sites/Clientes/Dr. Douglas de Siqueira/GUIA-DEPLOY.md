# Fluxo de Deploy — Dr. Douglas de Siqueira

> Site: `version-a_v2` → Firebase Hosting (projeto dedicado)
> Stack: HTML puro + Tailwind CDN + Font Awesome CDN
> Firebase CLI instalada: ✅ v14.24.0

---

## Visão geral do fluxo

```
version-a_v2/index.html
        │
        ▼
  [1] pack.py           ← resolve caminhos, remove banner, copia assets
        │
        ▼
    dist/               ← pasta pronta para deploy
  ├── index.html
  ├── foto_perfil.png
  └── assets/
      ├── Allergan.png
      ├── Galderma.png
      ├── Merz.png
      ├── Sinclair.png
      ├── Rennova.png
      └── Rennova Care.png
        │
        ▼
  [2] Firebase Console  ← criar projeto + ativar Hosting
        │
        ▼
  [3] firebase deploy   ← publicar em *.web.app
        │
        ▼
  [4] Domínio custom    ← apontar drdouglasdesiqueira.com.br
```

---

## FASE 1 — Packing (preparar o deploy)

O `version-a_v2/index.html` usa caminhos relativos que só funcionam localmente:
- `../foto_perfil.png`
- `../../templates-site-dentista-estetica/Marcas%20Logo/*.png`

O script `pack.py` resolve isso automaticamente.

### Executar o packing

No terminal, dentro da pasta `Dr. Douglas de Siqueira/`:

```bash
python3 pack.py
```

O script vai:
1. Criar (ou limpar) a pasta `dist/`
2. Copiar o `index.html` e reescrever os caminhos
3. Remover o bloco do **banner template** (faixa amarela)
4. Copiar `foto_perfil.png` para `dist/`
5. Copiar os 6 logos de marcas para `dist/assets/`
6. Copiar o `firebase.json` e `.firebaserc` para `dist/`

**Verificar antes de seguir:** abra `dist/index.html` no navegador e confirme que:
- [ ] Banner amarelo NÃO aparece
- [ ] Foto do Dr. Douglas aparece corretamente
- [ ] Logos das marcas aparecem no carrossel
- [ ] Links de WhatsApp e Instagram funcionam
- [ ] Formulário aponta para o e-mail correto
- [ ] Mapa do Google Maps carrega

---

## FASE 2 — Criar o projeto Firebase

### 2.1 — Criar o projeto no console

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **"Adicionar projeto"**
3. Nome do projeto: `dr-douglas-desiqueira` (ou similar)
4. Google Analytics: opcional (pode desativar)
5. Clique em **"Criar projeto"**

### 2.2 — Ativar o Firebase Hosting

Dentro do projeto criado:
1. No menu lateral, clique em **Hosting**
2. Clique em **"Primeiros passos"**
3. Siga o wizard (pode pular os passos de CLI — faremos manualmente)
4. Anote o **Project ID** (ex: `dr-douglas-desiqueira-abc12`)

### 2.3 — Atualizar o .firebaserc

Abra `dist/.firebaserc` e substitua o Project ID:

```json
{
  "projects": {
    "default": "SEU-PROJECT-ID-AQUI"
  }
}
```

---

## FASE 3 — Deploy

### 3.1 — Autenticar no Firebase (se ainda não estiver logado)

```bash
firebase login
```

### 3.2 — Entrar na pasta dist e fazer deploy

```bash
cd "/mnt/c/Users/scand/OneDrive/Área de Trabalho/Dev Sites/Dr. Douglas de Siqueira/dist"
firebase deploy --only hosting
```

### 3.3 — Resultado esperado

```
=== Deploying to 'dr-douglas-desiqueira-abc12'...
i  deploying hosting
✔  hosting[dr-douglas-desiqueira-abc12]: file upload complete
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/dr-douglas-desiqueira-abc12
Hosting URL: https://dr-douglas-desiqueira-abc12.web.app
```

**Teste o link `.web.app` antes de configurar o domínio.**

---

## FASE 4 — Domínio customizado

### 4.1 — No Firebase Console

1. Vá em **Hosting → Adicionar domínio personalizado**
2. Digite o domínio: `drdouglasdesiqueira.com.br`
3. O Firebase vai gerar dois registros DNS para verificação

### 4.2 — No painel do registrador de domínio

Adicione os registros DNS fornecidos pelo Firebase:

| Tipo | Nome | Valor |
|------|------|-------|
| TXT  | @    | `firebase=CÓDIGO-DE-VERIFICAÇÃO` |
| A    | @    | `151.101.1.195` |
| A    | @    | `151.101.65.195` |
| CNAME | www | `dr-douglas-desiqueira-abc12.web.app` |

> ⏱ Propagação DNS: de 30 min até 24h. O Firebase emite SSL automaticamente (Let's Encrypt) após a verificação.

### 4.3 — Atualizar o link `_next` do FormSubmit

Após confirmar o domínio, abra `dist/index.html` e atualize:

```html
<input type="hidden" name="_next" value="https://drdouglasdesiqueira.com.br/obrigado" />
```

Então faça um novo deploy:

```bash
firebase deploy --only hosting
```

---

## FASE 5 — Checklist pós-deploy

**Funcional:**
- [ ] Site abre em `https://drdouglasdesiqueira.com.br`
- [ ] HTTPS ativo (cadeado verde)
- [ ] Link do WhatsApp abre conversa correta
- [ ] Formulário envia e-mail para `drdouglasdesiqueira@gmail.com`
- [ ] Redirect pós-formulário funciona (`/obrigado`)
- [ ] Widget do JotForm (avaliações Google) carrega
- [ ] Mapa do Google Maps carrega
- [ ] Carrossel de marcas anima corretamente

**Visual:**
- [ ] Foto do dentista carrega
- [ ] Logos das marcas carregam
- [ ] Site responsivo no celular
- [ ] Navbar fixa funciona
- [ ] Links de âncora posicionam corretamente (scroll-padding)

---

## Atualizações futuras

Para qualquer alteração no site:

1. Edite `version-a_v2/index.html` (nunca edite `dist/` diretamente)
2. Execute `python3 pack.py` novamente
3. Verifique `dist/index.html` no navegador
4. Execute `firebase deploy --only hosting` dentro de `dist/`

---

## Referências rápidas

| Item | Valor |
|------|-------|
| Firebase Console | console.firebase.google.com |
| Hosting URL (preview) | `https://SEU-PROJECT-ID.web.app` |
| E-mail formulário | drdouglasdesiqueira@gmail.com |
| WhatsApp | 5513988169625 |
| JotForm Widget ID | `019d024c6b9277d2b51eab884c53f05b3138` |
