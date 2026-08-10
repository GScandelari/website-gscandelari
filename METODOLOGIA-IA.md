# Metodologia de desenvolvimento assistido por IA (squad de agentes)

> Este documento descreve o processo usado para desenvolver o [`gscandelari-ecommerce-api`](https://github.com/GScandelari/gscandelari-ecommerce-api) — uma API REST de e-commerce em arquitetura de microsserviços (Firebase, TypeScript, Stripe), construída do zero até produção real com Claude Code. Registrado aqui, no repositório do portfólio, como referência da metodologia de trabalho — não é específico de um projeto, é a forma como abordo desenvolvimento assistido por IA em geral.

## A ideia central

Em vez de tratar a IA como um autocomplete glorificado ou pedir "escreva essa feature" e aceitar o que sai, o projeto foi construído simulando uma **squad de desenvolvimento de software real**, com papéis especializados e sequenciais — cada um com responsabilidade, ferramentas e regras de conduta próprias, definidos como *subagentes* do Claude Code (arquivos `.md` com persona, regras e formato de saída, em `.claude/agents/`). Um orquestrador (a sessão principal do Claude Code) decide quando acionar cada papel, faz a implementação de código entre as etapas, e nunca deixa nenhum agente pular a etapa anterior.

A ideia não é "IA decide tudo sozinha" — é o oposto: cada papel existe justamente para impor os *gates* que um time humano bem disciplinado imporia a si mesmo (não implementar sem spec fechada, não fazer merge sem teste rastreável à regra de negócio, não documentar o que não foi verificado, nunca deployar produção sem aprovação explícita).

## Os 4 agentes da squad

### 1. `clarificador` — Tech Lead / Business Analyst
**Quando entra em cena:** primeiro, sempre. Toda ideia crua ("quero um sistema de X") passa por ele antes de qualquer linha de código ou de qualquer outro agente.

**O que faz:** investiga ambiguidades — regras de negócio, entradas/saídas, integrações, arquitetura, critério de "pronto" — e devolve perguntas diretas e numeradas, em rodadas, até não sobrar nenhuma lacuna. Nunca infere ou presume nada que não foi dito explicitamente.

**Regra mais importante:** só produz a "Spec Técnica Aprovada" (o handoff formal para os próximos agentes) depois de uma confirmação explícita do humano de que a especificação está completa e correta. Nenhum outro agente começa a trabalhar sem esse documento.

### 2. `arquiteto-tarefas` — Agilista / PM
**Quando entra em cena:** logo depois da Spec Técnica Aprovada.

**O que faz:** fragmenta a spec em módulos, épicos, histórias de usuário e tasks técnicas pequenas o suficiente para serem implementadas e testadas de forma independente — cada uma com critério de aceite objetivo e dependências explícitas entre si. Produz um backlog rastreável (no projeto, isso é o `BACKLOG.md`).

**Regra mais importante:** nunca reabre decisão de escopo ou regra de negócio — se encontra uma lacuna, sinaliza como bloqueio de volta para o `clarificador`, não decide sozinho.

### 3. Implementação
Não é um agente separado — é o orquestrador (a sessão principal) que implementa o backlog task a task, seguindo TDD: os testes do próximo papel vêm primeiro (estado "vermelho" esperado), a implementação vem para fazê-los passar.

### 4. `qa-negocio` — Tester
**Quando entra em cena:** durante a implementação de cada módulo, e antes de qualquer push.

**O que faz:** traduz cada regra de negócio aprovada em casos de teste locais executáveis (BDD/TDD), rastreáveis pelo ID da regra (`RN01`, `RN02`...). Roda a suíte de verdade (nunca declara cobertura sem ter executado) — contra emuladores quando o projeto usa infraestrutura real (Firebase Emulator Suite), nunca contra produção.

**Regra mais importante:** sinaliza como bloqueio qualquer regra de negócio sem teste correspondente, ou task sem critério de aceite testável. Não toma decisão de produto — regra de negócio já foi fechada pelo `clarificador`.

### 5. `devops-tech-writer` — DevOps & Tech Writer
**Quando entra em cena:** depois que módulos têm código+teste, ou sempre que a documentação/CI/deploy precisa refletir uma mudança real.

**O que faz:** mantém README.md, `CONTRIBUTING.md` (convenção de commits e branching), pipelines de CI/CD e a estratégia de deploy (local e produção) — sempre **verificando o repositório antes de documentar**, nunca descrevendo um estado aspiracional.

**Regra mais importante:** documentação tem que refletir o estado real do código, nunca o que "deveria" existir. Pipelines de CI têm que rodar lint + teste (com emuladores quando aplicável) antes de qualquer deploy automático. Nenhum segredo é commitado — só documentado onde/como configurar.

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

`main` fica sempre deployável; deploy para produção real é **sempre manual e sempre com aprovação explícita**, nunca disparado automaticamente por merge — decisão registrada desde a primeira fase do projeto.

## Princípios que atravessam todos os papéis

Nenhum destes está escrito em nenhum agente individual — são o resultado de aplicar a squad de forma consistente ao longo de meses de trabalho real, incluindo indo a produção de verdade:

- **Nunca inferir regra de negócio.** Se não foi dito explicitamente, é pergunta, não suposição — mesmo que pareça óbvio.
- **Infraestrutura real encontra bugs que emulador/mock nunca encontram.** Vários bugs genuínos deste projeto (nome de export inválido para Cloud Functions, colisão de ID de function entre codebases, timing de carregamento de variável de ambiente em deploy, SDK de terceiro que não lança exceção em erro de API) só apareceram num deploy real contra infraestrutura real — nunca no Emulator Suite, nunca nos testes automatizados. A disciplina de sempre validar contra o ambiente real antes de considerar algo "pronto" é o que os pegou.
- **Aprovação humana explícita antes de qualquer ação irreversível.** Deploy de produção, decomissionamento de um serviço, qualquer chamada a uma API externa real (Stripe, Resend) fora de modo teste — nada disso acontece sem o humano dizer "sim" para aquela ação específica, mesmo que uma ação parecida já tenha sido aprovada antes.
- **Documentação nunca é aspiracional.** Todo README, todo comentário de código, toda descrição de endpoint é verificado contra o código real antes de ser escrito — nunca "deveria funcionar assim".
- **Rastreabilidade ponta a ponta.** Toda regra de negócio tem um ID (RN01, RN02...), toda task do backlog referencia a regra que implementa, todo teste referencia a task, todo commit referencia a mudança. Dá para ir de "por que esse código existe" até "qual conversa com o cliente definiu isso" sem quebrar a cadeia.
- **Transparência sobre erros.** Bugs reais encontrados durante o processo — inclusive os que só apareceram em produção — foram documentados abertamente no histórico de commits e no README, não escondidos. Isso é ativo, não passivo: faz parte do que este processo entrega.
- **Segurança por padrão.** Credenciais temporárias usadas para debugging (tokens OAuth extraídos de sessões já autenticadas, por exemplo) são deletadas imediatamente após o uso. Service accounts de produção seguem princípio de menor privilégio, nunca a identidade default.

## Por que isso importa para o portfólio

Este processo não é sobre "usar IA para escrever código mais rápido" — é sobre usar IA de um jeito que reproduz (e em alguns pontos reforça) a disciplina de engenharia de um time sênior: especificação fechada antes de implementar, testes rastreáveis a regras de negócio reais, documentação que nunca mente sobre o estado do sistema, e nenhuma ação de produção sem uma pessoa humana decidindo que é hora. O `gscandelari-ecommerce-api` é a prova de que esse processo produz um sistema real, em produção, com regras de negócio de verdade — não um CRUD de exemplo.
