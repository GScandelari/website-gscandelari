# To-do: adicionar o `gscandelari-ecommerce-api` em "Projetos recentes"

## Sobre o projeto (contexto para quem for executar esta task)

**`gscandelari-ecommerce-api`** — API REST de e-commerce (Produtos, Pedidos, Pagamento, Cancelamento/Reembolso), projeto de portfólio em **produção real**, construído em arquitetura de microsserviços.

- **Repositório:** https://github.com/GScandelari/gscandelari-ecommerce-api
- **No ar (home page + API Gateway):** https://gscandelari-ecommerce-api.web.app
- **Documentação interativa (Swagger, PT/EN):** https://gscandelari-ecommerce-api.web.app/docs/ (e `/docs/en/`)

### O que o sistema faz
Ciclo completo de um pedido de e-commerce: catálogo de produtos, criação de pedido com decremento transacional de estoque, pagamento real via Stripe (sempre modo teste/sandbox — nunca dinheiro real), confirmação de pagamento assíncrona via webhook assinado, cancelamento (regras diferentes para Cliente e Admin dependendo do estado do pedido), reembolso (ação manual e deliberada do Admin, nunca automática), e notificação por e-mail (Resend) quando o pedido é confirmado ou cancelado.

### Arquitetura
Três microsserviços independentes atrás de um API Gateway (Firebase Hosting):
- **Orders** — dono de produtos e pedidos, expõe `/produtos` e `/pedidos`.
- **Payments** — toda a integração com o Stripe (PaymentIntent, webhook, reembolso), nunca escreve na coleção de pedidos.
- **Notifications** — reage a mudanças de status via Firestore Trigger, envia e-mail, sem nenhuma rota HTTP pública.

Cada serviço roda sob sua própria service account de runtime (menor privilégio), comunicação interna autenticada via ID token assinado do Google (não Firebase Auth).

### Stack técnica
TypeScript, Firebase Cloud Functions (2ª geração) + Express, Firestore, Firebase Auth (custom claims), Stripe (modo teste), Resend, Zod, Jest + Supertest, OpenAPI/Swagger, GitHub Actions (CI obrigatório + deploy manual aprovado), React + Vite (front-end de testes auxiliar).

### Como foi construído
Do zero até produção real com uma metodologia de squad de agentes de IA (clarificador → arquiteto-tarefas → qa-negócio → devops-tech-writer), com TDD real e validação contra infraestrutura de produção de verdade em cada fase — ver **[`METODOLOGIA-IA.md`](./METODOLOGIA-IA.md)**, já criado neste mesmo repositório, para o processo completo. Vale linkar esse arquivo (ou seu conteúdo) a partir do card também, se fizer sentido — é um diferencial forte pra quem for avaliar o portfólio.

---

## A task: adicionar um card em "Projetos recentes" (`index.html`)

A seção `#projetos` do `index.html` (âncora `Projetos recentes` no menu) lista os projetos em um grid (`sm:grid-cols-2 lg:grid-cols-3`), cada um como um card. Hoje tem 3: **Curva Mestra** (card "destaque", `sm:col-span-2 lg:col-span-1`, gradiente roxo/azul), **Dev Sites** e **Robótica Educacional** (cards regulares).

### Passo 1 — Decidir destaque ou card regular
Dado que é o projeto mais robusto do portfólio (produção real, microsserviços, regras de negócio completas — não um MVP nem um projeto educacional), considere dar a ele o tratamento "destaque" que hoje só a Curva Mestra tem (`sm:col-span-2 lg:col-span-1`, fundo com gradiente). Alternativa mais simples: adicionar como card regular, mesmo padrão de Dev Sites/Robótica. A escolha é sua — os dois exemplos abaixo cobrem os dois casos.

### Passo 2 — Imagem do card
Os 3 cards atuais usam uma imagem real em `imgs/` (`<img>`, não um ícone). Não existe ainda uma imagem para este projeto. Antes de integrar, gere ou capture uma (sugestões, do mais rápido ao mais trabalhoso):
- Screenshot da home page nova (`https://gscandelari-ecommerce-api.web.app`) — a página já tem uma identidade visual consistente com este site.
- Um diagrama simples da arquitetura (os 3 serviços + gateway).
- Um banner gerado (mesma paleta do site: `#3B82F6` → `#8B5CF6`).

Salve como `imgs/ecommerce-api.png` (ou `.jpg`) — é o nome usado nos exemplos abaixo.

### Passo 3 — Marcar o HTML
Inserir dentro de `<section id="projetos">`, no grid de cards (`index.html`, entre a abertura do grid e o "Ver todos os projetos no GitHub"). Exemplo como card regular (mesmo padrão de Dev Sites):

```html
<!-- E-commerce API -->
<div class="group bg-white/3 border border-white/8 rounded-2xl overflow-hidden card-hover">
  <div class="h-40 flex items-center justify-center">
    <img src="imgs/ecommerce-api.png" alt="gscandelari-ecommerce-api" class="h-full w-full object-cover" />
  </div>
  <div class="p-5">
    <div class="flex items-center gap-2 mb-2 flex-wrap">
      <span class="text-xs px-2 py-0.5 bg-orange-500/10 text-orange-400 rounded-full border border-orange-500/20">Firebase</span>
      <span class="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">TypeScript</span>
      <span class="text-xs px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">Stripe</span>
      <span class="text-xs px-2 py-0.5 bg-pink-500/10 text-pink-400 rounded-full border border-pink-500/20">Microsserviços</span>
    </div>
    <h3 class="font-semibold text-white mb-2">gscandelari-ecommerce-api</h3>
    <p class="text-gray-400 text-sm leading-relaxed mb-4" data-i18n="project.ecommerceapi.desc">
      API REST de e-commerce em produção real, arquitetura de microsserviços (Orders/Payments/Notifications),
      com pagamento real via Stripe em modo teste, cancelamento/reembolso e testes automatizados.
    </p>
    <div class="flex items-center gap-4">
      <a href="https://github.com/GScandelari/gscandelari-ecommerce-api" target="_blank" rel="noopener noreferrer"
         class="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
        <i class="fab fa-github"></i> <span data-i18n="project.ecommerceapi.github">Ver no GitHub</span>
      </a>
      <a href="https://gscandelari-ecommerce-api.web.app" target="_blank" rel="noopener noreferrer"
         class="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
        <i class="fas fa-arrow-up-right-from-square"></i> <span data-i18n="project.ecommerceapi.demo">Ver projeto no ar</span>
      </a>
    </div>
  </div>
</div>
```

Se preferir o tratamento "destaque" (como Curva Mestra), troque a `div` externa por:
```html
<div class="group sm:col-span-2 lg:col-span-1 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl overflow-hidden card-hover">
```
e considere adicionar um badge de status (`<span class="absolute top-3 right-3 ...">Produção</span>`, mesmo padrão do badge "MVP" da Curva Mestra, dentro do bloco de imagem com `position: relative`).

### Passo 4 — Traduções
Adicionar as 3 chaves novas em **ambos** `translations/pt.json` e `translations/en.json` (mesma convenção `project.<slug>.<campo>` já usada pelos outros projetos):

`translations/pt.json`:
```json
"project.ecommerceapi.desc": "API REST de e-commerce em produção real, arquitetura de microsserviços (Orders/Payments/Notifications), com pagamento real via Stripe em modo teste, cancelamento/reembolso e testes automatizados.",
"project.ecommerceapi.github": "Ver no GitHub",
"project.ecommerceapi.demo": "Ver projeto no ar"
```

`translations/en.json`:
```json
"project.ecommerceapi.desc": "REST e-commerce API in real production, microservices architecture (Orders/Payments/Notifications), with real Stripe payments in test mode, cancellation/refund and automated tests.",
"project.ecommerceapi.github": "View on GitHub",
"project.ecommerceapi.demo": "View live project"
```

### Passo 5 — Verificação local antes de subir
1. Se adicionar alguma classe Tailwind nova que ainda não é usada em nenhum outro lugar do site, rode `npm run build:css` (`tailwind.config.js` já escaneia `index.html` — não precisa mexer nele).
2. Abra `index.html` localmente (ou sirva com qualquer servidor estático) e confira:
   - O card aparece corretamente no grid, responsivo (mobile/tablet/desktop).
   - O toggle de idioma (botão `EN`/`PT` no header) troca a descrição e os textos dos links corretamente.
   - Os 2 links abrem nas URLs certas, em nova aba.
3. `git diff` para conferir que só tocou `index.html`, `translations/pt.json`, `translations/en.json` e a nova imagem em `imgs/`.

### Passo 6 — Deploy
**Diferente do `gscandelari-ecommerce-api`, este site publica automaticamente**: qualquer push em `main` já vai para o Firebase Hosting via GitHub Actions (ver `README.md` deste repositório, seção "Deploy") — não precisa (e não existe) um passo de deploy manual aqui. Ou seja: só commitar e dar push já é suficiente para a mudança ir ao ar. Não confunda com o fluxo de deploy manual/aprovado do outro projeto.

---

## Depois de concluído
Pode apagar este arquivo (`to-do.md`) — ele existe só como instrução para esta task pontual, não é documentação permanente do projeto (isso é o `README.md`). O `METODOLOGIA-IA.md` deve permanecer.
