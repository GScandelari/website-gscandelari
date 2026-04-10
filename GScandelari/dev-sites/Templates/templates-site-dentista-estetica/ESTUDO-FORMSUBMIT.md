# Estudo: Melhorias FormSubmit

---

## Situação Atual

Os templates utilizam o [FormSubmit](https://formsubmit.co/) como solução de formulário de contato. O serviço é gratuito, sem backend próprio, e envia os dados do formulário diretamente para o e-mail configurado.

**Configuração atual nos templates:**
```html
<form action="https://formsubmit.co/[EMAIL]" method="POST">
  <!-- campos do formulário -->
</form>
```

---

## 1. Melhorias Disponíveis no FormSubmit

### 1.1 Redirecionamento personalizado (Página de agradecimento)

```html
<input type="hidden" name="_next" value="https://[dominio]/obrigado.html">
```

- Redireciona para uma página personalizada após envio
- **Já previsto no Pacote Premium** como "Página de agradecimento personalizada"
- Permite rastrear conversões no GA4 e Meta Pixel

### 1.2 Assunto personalizado do e-mail

```html
<input type="hidden" name="_subject" value="Nova mensagem do site - [Nome do Dentista]">
```

- Facilita identificação no e-mail do cliente

### 1.3 Captcha do FormSubmit

```html
<input type="hidden" name="_captcha" value="true">
```

- O FormSubmit já possui captcha padrão (reCAPTCHA)
- Para **desabilitar** (não recomendado): `value="false"`

### 1.4 Anti-spam (Honeypot)

```html
<input type="text" name="_honey" style="display:none">
```

- Campo invisível que bots preenchem
- FormSubmit rejeita envios com este campo preenchido
- **Recomendação:** Adicionar em todos os templates

### 1.5 Auto-resposta

```html
<input type="hidden" name="_autoresponse" value="Obrigado por entrar em contato! Retornaremos em breve.">
```

- Envia e-mail automático para o remetente
- Melhora experiência do paciente
- **Recomendação:** Implementar em todos os templates

### 1.6 Template de e-mail personalizado

```html
<input type="hidden" name="_template" value="table">
```

Opções:
- `box` — Layout em caixa (padrão)
- `table` — Layout em tabela (mais organizado)

### 1.7 Cópia do e-mail (CC)

```html
<input type="hidden" name="_cc" value="outro@email.com">
```

- Envia cópia para outro e-mail (ex.: secretária, recepção)

---

## 2. Notificação por WhatsApp

O FormSubmit **não oferece** integração nativa com WhatsApp. Alternativas:

### Opção A: API do WhatsApp Business (paga)

- Usar webhook do FormSubmit ou serviço intermediário
- Custo: depende do provedor (Twilio, MessageBird, etc.)
- Complexidade: Alta

### Opção B: Zapier / Make (Integromat)

1. FormSubmit envia e-mail
2. Zapier/Make detecta o e-mail (Gmail trigger)
3. Envia notificação via WhatsApp API ou Telegram
- Custo: Plano gratuito limitado, plano pago ~$20/mês
- Complexidade: Média

### Opção C: Notificação por Telegram (alternativa gratuita)

1. Criar bot no Telegram
2. Usar serviço como IFTTT ou n8n para conectar e-mail ao bot
3. Receber notificação instantânea
- Custo: Gratuito
- Complexidade: Média

### Opção D: CallMeBot (gratuito, limitado)

- API gratuita que envia mensagens WhatsApp
- Limitação: apenas para o número cadastrado (não para o cliente)
- Complexidade: Baixa

**Recomendação:** Para a maioria dos clientes, a notificação por e-mail é suficiente. Oferecer Zapier/Make como serviço adicional para quem quiser WhatsApp.

---

## 3. Validação Avançada de Formulário

### 3.1 Validação HTML5 (já nos templates)

```html
<input type="tel" required pattern="[0-9]{10,11}">
<input type="email" required>
```

### 3.2 Validação JavaScript adicional (sugestão)

```javascript
// Máscara de telefone
function maskPhone(input) {
  let value = input.value.replace(/\D/g, '');
  if (value.length > 11) value = value.slice(0, 11);
  if (value.length > 6) {
    value = `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7)}`;
  } else if (value.length > 2) {
    value = `(${value.slice(0,2)}) ${value.slice(2)}`;
  }
  input.value = value;
}
```

### 3.3 Feedback visual

- Adicionar classes de sucesso/erro nos campos
- Mensagens de erro personalizadas em português

---

## 4. Alternativas ao FormSubmit

| Serviço | Custo | Limite gratuito | Vantagens |
|---------|-------|-----------------|-----------|
| **FormSubmit** | Gratuito | Ilimitado | Sem cadastro, simples |
| **Formspree** | Freemium | 50 envios/mês | Dashboard, integrações |
| **Getform** | Freemium | 50 envios/mês | File uploads, webhooks |
| **Web3Forms** | Gratuito | 250 envios/mês | Sem reCAPTCHA, rápido |
| **EmailJS** | Freemium | 200 envios/mês | Sem backend, templates |
| **Firebase Functions** | Pay-as-you-go | Generoso free tier | Controle total |

**Recomendação:** Manter FormSubmit como padrão (gratuito e confiável). Considerar Web3Forms como alternativa se necessário.

---

## 5. Melhorias Recomendadas para Implementação Imediata

| Melhoria | Prioridade | Esforço |
|----------|-----------|---------|
| Campo honeypot anti-spam | Alta | Baixo |
| Auto-resposta ao paciente | Alta | Baixo |
| Assunto personalizado do e-mail | Média | Baixo |
| Template "table" para e-mail | Média | Baixo |
| Página de agradecimento (Premium) | Média | Médio |
| Máscara de telefone | Baixa | Médio |
| CC para e-mail secundário | Baixa | Baixo |

---

## Conclusão

O FormSubmit atende bem às necessidades dos templates atuais. As melhorias de maior impacto e menor esforço são: **honeypot anti-spam**, **auto-resposta** e **assunto personalizado**. A notificação por WhatsApp requer serviços externos e deve ser oferecida como adicional.
