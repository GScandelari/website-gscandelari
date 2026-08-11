# Metodologia de desenvolvimento assistido por IA (squad de agentes)

> Este documento descreve o processo usado para desenvolver o [`gscandelari-ecommerce-api`](https://github.com/GScandelari/gscandelari-ecommerce-api), uma API REST de e-commerce em arquitetura de microsserviços (Firebase, TypeScript, Stripe) construída do zero até produção real com Claude Code. Fica registrado aqui, no repositório do portfólio, porque não é específico desse projeto: é como eu abordo desenvolvimento assistido por IA de forma geral.

## A ideia central

Em vez de tratar IA como autocomplete glorificado, ou simplesmente pedir "escreva essa feature" e aceitar o que sai, construí o projeto simulando uma squad de desenvolvimento real: papéis especializados, em sequência, cada um com responsabilidade, ferramentas e regras de conduta próprias, definidos como *subagentes* do Claude Code (arquivos `.md` com persona, regras e formato de saída, em `.claude/agents/`). Um orquestrador — a sessão principal do Claude Code — decide quando acionar cada papel, implementa o código entre as etapas e não deixa nenhum agente pular a etapa anterior.

A ideia não é "IA decide tudo sozinha". É o oposto: cada papel existe pra impor os *gates* que um time humano bem disciplinado imporia a si mesmo. Não implementar sem spec fechada. Não fazer merge sem teste rastreável à regra de negócio. Não documentar o que não foi verificado. Nunca deployar produção sem aprovação explícita.

## Os 4 agentes da squad

### 1. `clarificador` — Tech Lead / Business Analyst

Entra primeiro, sempre. Toda ideia crua — "quero um sistema de X" — passa por ele antes de qualquer linha de código ou de qualquer outro agente da squad. A função é investigar ambiguidade: regras de negócio, entradas e saídas, integrações, arquitetura, o que conta como "pronto". Ele devolve perguntas diretas e numeradas, em rodadas sucessivas, até não sobrar lacuna nenhuma, e nunca infere ou presume o que não foi dito explicitamente.

Só produz a "Spec Técnica Aprovada" (o handoff formal pros próximos agentes) depois que o humano confirma, de forma explícita, que a especificação está completa e correta. Nenhum outro agente começa a trabalhar sem esse documento pronto.

### 2. `arquiteto-tarefas` — Agilista / PM

Assume a spec assim que ela é aprovada e fragmenta em módulos, épicos, histórias de usuário e tasks técnicas pequenas o bastante pra serem implementadas e testadas de forma independente, cada uma com critério de aceite objetivo e dependência explícita entre si. O resultado é um backlog rastreável — no projeto, o `BACKLOG.md`.

Uma coisa esse agente nunca faz: reabrir decisão de escopo ou regra de negócio. Encontrou uma lacuna? Sinaliza como bloqueio de volta pro `clarificador`. Não decide sozinho.

### 3. Implementação

Não existe como agente separado. Quem implementa é o orquestrador — a própria sessão principal — task a task, seguindo TDD: o teste vem primeiro, no estado "vermelho" esperado, e a implementação existe pra fazê-lo passar.

### 4. `qa-negocio` — Tester

Trabalha durante a implementação de cada módulo e antes de qualquer push. Traduz cada regra de negócio aprovada em casos de teste locais executáveis (BDD/TDD), rastreáveis pelo ID da regra (`RN01`, `RN02`...), e roda a suíte de verdade contra emuladores quando o projeto usa infraestrutura real (Firebase Emulator Suite), nunca contra produção. Declarar cobertura sem ter executado o teste simplesmente não é uma opção.

Regra de negócio sem teste correspondente, ou task sem critério de aceite testável, vira bloqueio sinalizado. Quem decide o que fazer com isso não é o `qa-negocio` — essa parte já foi fechada pelo `clarificador`.

### 5. `devops-tech-writer` — DevOps & Tech Writer

Entra depois que um módulo já tem código e teste, ou sempre que documentação, CI ou deploy precisam refletir uma mudança real. Mantém o README.md, o `CONTRIBUTING.md` (convenção de commits e branching), os pipelines de CI/CD e a estratégia de deploy, local e produção. A regra é simples de enunciar e chata de seguir na prática: verificar o repositório antes de documentar qualquer coisa, nunca descrever um estado aspiracional.

Documentação tem que corresponder ao estado real do código, nunca ao que "deveria" existir. CI roda lint e teste, com emuladores quando cabe, antes de qualquer deploy automático. Segredo nenhum é commitado — só documentado onde e como configurar.

## O ciclo completo, por fase

O projeto inteiro (5 fases: API core, integração de pagamento real via Stripe em modo teste, quebra em microsserviços, front-end de testes, cancelamento/reembolso) repetiu este ciclo a cada nova fase de escopo:

```
ideia crua
   │
   ▼
clarificador ──(perguntas numeradas, N rodadas até aprovação explícita)──▶ Spec Técnica Aprovada
   │
   ▼
arquiteto-tarefas ──▶ Backlog (módulos/épicos/tasks + critério de aceite + dependências)
   │
   ▼
implementação (TDD: teste vermelho → código → teste verde), task a task
   │
   ▼
qa-negocio ──▶ suíte rodada de verdade, rastreabilidade RN → teste → resultado
   │
   ▼
devops-tech-writer ──▶ README/CONTRIBUTING/CI atualizados para refletir o que foi implementado
   │
   ▼
push (branch curta → PR → CI obrigatório verde → merge em main)
```

`main` fica sempre deployável. Deploy pra produção real é sempre manual, sempre com aprovação explícita, nunca disparado automaticamente por merge — decisão registrada desde a primeira fase do projeto.

## Princípios que atravessam todos os papéis

Nenhum destes princípios está escrito em algum agente específico. São o que sobra depois de meses aplicando a squad de forma consistente, indo a produção de verdade repetidas vezes:

- **Nunca inferir regra de negócio.** Se não foi dito explicitamente, é pergunta, não suposição, mesmo quando parece óbvio.
- **Infraestrutura real encontra bugs que emulador e mock nunca encontram.** Vários bugs genuínos deste projeto — nome de export inválido para Cloud Functions, colisão de ID de function entre codebases, timing de carregamento de variável de ambiente em deploy, SDK de terceiro que não lança exceção em erro de API — só apareceram num deploy real, contra infraestrutura real. Nunca no Emulator Suite, nunca nos testes automatizados. Foi a disciplina de validar contra o ambiente real antes de considerar algo "pronto" que pegou todos eles.
- **Aprovação humana explícita antes de qualquer ação irreversível.** Deploy de produção, decomissionamento de um serviço, chamada a uma API externa real (Stripe, Resend) fora de modo teste: nada disso acontece sem o humano dizer "sim" pra aquela ação específica, mesmo que uma ação parecida já tenha sido aprovada antes.
- **Documentação nunca é aspiracional.** Todo README, todo comentário de código, toda descrição de endpoint é verificado contra o código real antes de ser escrito. Nunca "deveria funcionar assim".
- **Rastreabilidade ponta a ponta.** Toda regra de negócio tem um ID (RN01, RN02...), toda task do backlog referencia a regra que implementa, todo teste referencia a task, todo commit referencia a mudança. Dá pra ir de "por que esse código existe" até "qual conversa definiu isso" sem quebrar a cadeia em nenhum ponto.
- **Transparência sobre erros.** Bugs reais encontrados durante o processo, inclusive os que só apareceram em produção, foram documentados abertamente no histórico de commits e no README. Não escondidos. Isso é ativo, não passivo — faz parte do que este processo entrega.
- **Segurança por padrão.** Credenciais temporárias usadas pra debugging, como tokens OAuth extraídos de sessões já autenticadas, são deletadas imediatamente depois do uso. Service accounts de produção seguem princípio de menor privilégio, nunca a identidade default.

## Por que isso importa para o portfólio

Isso não é sobre usar IA pra escrever código mais rápido. É sobre usar IA de um jeito que reproduz — e em alguns pontos reforça — a disciplina de um time sênior: especificação fechada antes de implementar, teste rastreável a regra de negócio real, documentação que nunca mente sobre o estado do sistema, nenhuma ação de produção sem um humano decidindo que é a hora. O `gscandelari-ecommerce-api` é a prova de que isso produz sistema real, em produção, com regra de negócio de verdade. Não um CRUD de vitrine.
