// sections.jsx — all section components for Dra. Linda Mello LP
// Exported to window for app.jsx to use.

const WA_ICON = (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.61 4.45 1.67 6.32L3 29l6.86-1.6A12.9 12.9 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3Zm0 23.6c-1.96 0-3.78-.52-5.37-1.43l-.38-.22-4.07.94.96-3.96-.25-.4A10.55 10.55 0 0 1 5.4 16c0-5.86 4.74-10.6 10.6-10.6S26.6 10.14 26.6 16 21.86 26.6 16 26.6Zm6.04-7.93c-.33-.16-1.95-.96-2.25-1.07-.3-.11-.52-.16-.74.16-.22.33-.85 1.07-1.04 1.3-.19.22-.38.25-.71.08-.33-.16-1.39-.51-2.65-1.63-.98-.87-1.64-1.95-1.83-2.28-.19-.33-.02-.5.14-.66.15-.15.33-.38.49-.58.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.58-.08-.16-.74-1.78-1.01-2.43-.27-.65-.55-.55-.74-.56l-.63-.01c-.22 0-.58.08-.88.41-.3.33-1.15 1.12-1.15 2.74 0 1.62 1.18 3.19 1.35 3.41.16.22 2.32 3.55 5.62 4.97.79.34 1.4.54 1.88.69.79.25 1.51.21 2.08.13.63-.09 1.95-.79 2.22-1.56.27-.77.27-1.43.19-1.56-.08-.13-.3-.22-.63-.38Z"/>
  </svg>
);

const Arrow = ({ size = 14 }) => (
  <svg viewBox="0 0 14 14" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M2 7h10M8.5 3.5 12 7l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Stars = ({ n = 5 }) => "★".repeat(n);

const WA_LINK = "https://wa.me/5513996037772?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o.";

// ─────────────────────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="logo">
          <span>Dra. Linda Mello</span>
          <span className="mono">Estética &amp; HOF</span>
        </a>
        <nav className="nav-links">
          <a href="#procedimentos">Procedimentos</a>
          <a href="#sobre">Sobre a Dra.</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#localizacao">Localização</a>
        </nav>
        <div className="nav-cta">
          <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-primary" style={{padding:"12px 18px", fontSize:"12px"}}>
            Agendar consulta <Arrow />
          </a>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function Hero({ headlineSet, ctaText }) {
  return (
    <section className="hero wrap" id="top" data-screen-label="01 Hero">
      <div className="hero-grid">
        <div>
          <span className="eyebrow">Clínica de estética avançada · Santos – SP</span>
          <h1 className="display-1" style={{marginTop:"28px"}}>
            {headlineSet.headline.map((part, i) =>
              part.accent
                ? <span key={i} className="accent-word">{part.text}</span>
                : <React.Fragment key={i}>{part.text}</React.Fragment>
            )}
          </h1>
          <p className="lead">{headlineSet.sub}</p>
          <div className="hero-actions">
            <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-primary">
              {ctaText} <Arrow />
            </a>
            <a href="#procedimentos" className="btn btn-ghost">
              Ver procedimentos
            </a>
          </div>
          <div className="hero-meta">
            <div>
              <div className="n">7+</div>
              <div className="l">Anos de prática</div>
            </div>
            <div>
              <div className="n">1.000<span style={{color:"var(--accent)"}}>+</span></div>
              <div className="l">Pacientes atendidos</div>
            </div>
            <div>
              <div className="n">4,9<span style={{color:"var(--accent)", fontSize:"22px"}}> ★</span></div>
              <div className="l">Avaliação Google</div>
            </div>
          </div>
        </div>
        <div>
          <div className="ph hero-portrait" data-label="Retrato editorial — Dra. Linda Mello (vertical, fundo neutro)"></div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTHORITY STRIP
// ─────────────────────────────────────────────────────────────────────────────
function Strip() {
  const items = [
    "Cirurgiã-Dentista · CRO-SP 136797",
    "Especialista em Harmonização Orofacial",
    "Rennova Partner Clinic",
    "Atendimento personalizado · Santos",
  ];
  return (
    <div className="strip">
      <div className="wrap strip-inner">
        {items.map((t, i) => (
          <span key={i}><span className="dot"></span>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROCEDIMENTOS
// ─────────────────────────────────────────────────────────────────────────────
const PROC_DATA = {
  orofacial: [
    { t: "Preenchimento labial", d: "Volume sutil, contorno definido e a hidratação que devolve sensualidade ao sorriso — com ácido hialurônico de última geração." },
    { t: "Bichectomia estética", d: "Afinamento do terço inferior do rosto, evidenciando maçãs e mandíbula em um traço mais elegante." },
    { t: "Toxina botulínica", d: "Suaviza rugas dinâmicas e tensões musculares preservando a expressão natural — nada congelado, tudo sutil." },
    { t: "Bioestimulador facial", d: "Estimula a produção própria de colágeno, restaurando firmeza e densidade da pele com resultado progressivo." },
    { t: "Lifting de papada (fios)", d: "Definição mandibular e contorno do pescoço por meio de fios bioabsorvíveis — sem cortes, com retorno rápido à rotina." },
    { t: "Harmonização completa", d: "Plano individualizado que combina técnicas para uma face equilibrada — proporções, ângulos e expressão em sintonia." },
  ],
  corporal: [
    { t: "Lipo enzimática", d: "Redução localizada de gordura e celulite em áreas pontuais — abdômen, flancos, culote, papada e queixo." },
    { t: "Bioestimulador corporal", d: "Firmeza para braços, glúteos e abdômen pós-emagrecimento — colágeno novo, pele densa e elástica." },
    { t: "Skinbooster corporal", d: "Hidratação profunda da pele em áreas que perdem viço primeiro: colo, mãos, joelhos e interno de coxa." },
    { t: "Glúteo de hialurônico", d: "Modelagem e projeção sem cirurgia, com volume calculado em milímetros e foco em naturalidade." },
    { t: "Tratamento de estrias", d: "Protocolo combinado com microagulhamento e bioestímulo para suavizar marcas e devolver textura." },
    { t: "Drenagem pós-procedimento", d: "Acompanhamento manual para acelerar a recuperação e potencializar os resultados de cada protocolo." },
  ],
};

function Procedimentos() {
  const [tab, setTab] = React.useState("orofacial");
  const items = PROC_DATA[tab];
  return (
    <section className="sec wrap" id="procedimentos" data-screen-label="02 Procedimentos">
      <div className="sec-head">
        <div>
          <span className="eyebrow">02 — Procedimentos</span>
          <h2 className="display-2" style={{marginTop:"24px"}}>
            Tratamentos que <span className="italic" style={{color:"var(--accent)"}}>respeitam</span> a sua essência.
          </h2>
        </div>
        <div>
          <p className="lead">
            Toda harmonização começa por uma avaliação clínica completa. Você sai com um plano único, conduzido com técnica, segurança e o olhar estético da Dra. Linda Mello.
          </p>
          <div style={{marginTop:"28px"}}>
            <div className="tabs" role="tablist">
              <button className={"tab " + (tab==="orofacial"?"active":"")} onClick={()=>setTab("orofacial")}>Orofacial</button>
              <button className={"tab " + (tab==="corporal"?"active":"")} onClick={()=>setTab("corporal")}>Corporal</button>
            </div>
          </div>
        </div>
      </div>

      <div className="proc-grid">
        {items.map((it, i) => (
          <article className="proc" key={tab+i}>
            <span className="idx">— {String(i+1).padStart(2,"0")}</span>
            <h3>{it.t}</h3>
            <p>{it.d}</p>
            <div className="more">
              <span>Saiba mais</span>
              <Arrow size={12} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SOBRE
// ─────────────────────────────────────────────────────────────────────────────
function Sobre() {
  return (
    <section className="sec wrap" id="sobre" data-screen-label="03 Sobre a Dra.">
      <div className="about-grid">
        <div className="ph about-img" data-label="Retrato profissional — Dra. Linda em atendimento (3:4)"></div>
        <div className="about-body">
          <span className="eyebrow">03 — A profissional</span>
          <h2 className="display-2" style={{margin:"22px 0 28px"}}>
            Há mais de sete anos, transformando rostos — sem nunca apagar quem você é.
          </h2>
          <p>
            A Dra. Linda Mello construiu uma clínica de referência em Santos a partir de uma convicção simples: <em style={{color:"var(--accent)", fontStyle:"italic"}}>beleza de verdade é a sua, revelada com técnica</em>. Cada paciente é estudado em detalhe — proporções, expressão, ritmo do rosto — antes de qualquer agulha tocar a pele.
          </p>
          <p>
            Formada em Odontologia e especialista em Harmonização Orofacial, dedicou-se a protocolos avançados de estética facial e corporal. Hoje, mais de mil pacientes confiam na precisão, na ética e no olhar curatorial que ela leva para cada procedimento.
          </p>
          <p>
            Trabalha apenas com produtos certificados e marcas de excelência — Rennova como base — e mantém um padrão clínico-hospitalar de segurança em todos os atendimentos.
          </p>
          <div className="signature">Dra. Linda Mello</div>
          <div className="credentials">
            <div className="cred"><div className="l">Formação</div><div className="v">Cirurgiã-Dentista</div></div>
            <div className="cred"><div className="l">Especialidade</div><div className="v">Harmonização Orofacial</div></div>
            <div className="cred"><div className="l">Experiência</div><div className="v">7+ anos clínicos</div></div>
            <div className="cred"><div className="l">Pacientes</div><div className="v">1.000+ atendidos</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DOR & SOLUÇÃO
// ─────────────────────────────────────────────────────────────────────────────
function DorSolucao() {
  return (
    <section className="sec wrap" data-screen-label="04 Dor e Solucao">
      <div className="sec-head">
        <div>
          <span className="eyebrow">04 — Onde você está · onde quer chegar</span>
          <h2 className="display-2" style={{marginTop:"24px"}}>
            Você se reconhece em alguma dessas frases?
          </h2>
        </div>
        <div>
          <p className="lead">
            A maioria das pacientes que chega ao consultório da Dra. Linda não quer um rosto diferente. Quer reencontrar o próprio — com mais luz, mais leveza e mais confiança.
          </p>
        </div>
      </div>

      <div className="ps-grid">
        <div className="ps-cell">
          <span className="eyebrow" style={{color:"var(--rose)"}}>O que você sente hoje</span>
          <h3 style={{marginTop:"18px"}}>O reflexo que não traduz quem eu sou.</h3>
          <ul>
            <li>Você olha no espelho e não vê o brilho que sente por dentro.</li>
            <li>Investe em skincare, mas algo no contorno do rosto incomoda.</li>
            <li>Tem medo de ficar com aparência artificial — "feita demais".</li>
            <li>Já viu resultados ruins em conhecidas e perdeu a coragem.</li>
            <li>Quer mexer, mas não sabe por onde começar nem em quem confiar.</li>
          </ul>
        </div>
        <div className="ps-cell alt">
          <span className="eyebrow">A proposta da Dra. Linda</span>
          <h3 style={{marginTop:"18px"}}>O reflexo que devolve sua confiança.</h3>
          <ul>
            <li>Plano individual desenhado a partir da sua anatomia, não de tendências.</li>
            <li>Avaliação minuciosa antes de qualquer procedimento.</li>
            <li>Técnica conservadora — fazemos o necessário, nunca além disso.</li>
            <li>Produtos certificados e segurança de padrão clínico-hospitalar.</li>
            <li>Acompanhamento pós-procedimento até o resultado final.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BENEFITS
// ─────────────────────────────────────────────────────────────────────────────
const BENS = [
  { t: "Naturalidade absoluta", d: "Ninguém precisa adivinhar o que você fez — só vão notar que você está mais bonita." },
  { t: "Plano sob medida", d: "Cada paciente recebe um protocolo desenhado para a sua face, sua idade e seu estilo de vida." },
  { t: "Segurança em primeiro lugar", d: "Ambiente clínico-hospitalar, produtos rastreados e técnicas com evidência científica." },
  { t: "Resultado progressivo", d: "Você evolui no seu tempo — sem mudanças bruscas, sem ‘antes e depois’ chocante." },
  { t: "Confiança que se sente", d: "Postura, sorriso e presença mudam. O espelho deixa de ser inimigo." },
  { t: "Atendimento dedicado", d: "Agenda enxuta, tempo de qualidade com a Dra. e acompanhamento próximo." },
];

function Benefits() {
  return (
    <section className="sec wrap" data-screen-label="05 Beneficios">
      <div className="sec-head">
        <div>
          <span className="eyebrow">05 — O que você leva consigo</span>
          <h2 className="display-2" style={{marginTop:"24px"}}>
            Não é sobre <span className="italic" style={{color:"var(--accent)"}}>parecer outra</span>.<br/>É sobre ser, enfim, você.
          </h2>
        </div>
        <div>
          <p className="lead">
            O resultado de um procedimento bem feito não está só na pele — está na forma como você passa a se mover pelo mundo.
          </p>
        </div>
      </div>

      <div className="bens">
        {BENS.map((b, i) => (
          <div className="ben" key={i}>
            <div className="n">— {String(i+1).padStart(2,"0")}</div>
            <h4>{b.t}</h4>
            <p>{b.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REVIEWS (Google)
// ─────────────────────────────────────────────────────────────────────────────
const REVIEWS = [
  { n:"Camila R.", i:"C", q:"Eu pesquisei muito antes de decidir. A Dra. Linda foi a única que me explicou o ‘porquê’ de cada coisa antes de fazer. Resultado natural, atendimento impecável.", d:"há 2 semanas" },
  { n:"Marina S.", i:"M", q:"Procedimento sem dor, ambiente lindo e o cuidado pós foi melhor que o próprio procedimento. Voltei outras vezes — recomendo de olhos fechados.", d:"há 1 mês" },
  { n:"Beatriz L.", i:"B", q:"Tinha medo de ficar com cara ‘feita’. Saí parecendo eu, só que descansada. Profissional ética, técnica e generosa com o tempo da paciente.", d:"há 1 mês" },
  { n:"Ana Paula F.", i:"A", q:"Fiz harmonização completa em etapas. A Dra. respeitou meu ritmo e meu orçamento. O resultado é exatamente o que eu sonhava — e mais.", d:"há 2 meses" },
  { n:"Juliana M.", i:"J", q:"O preenchimento labial mais natural que já fiz na vida. E o consultório é uma experiência à parte — me senti cuidada do começo ao fim.", d:"há 2 meses" },
  { n:"Renata C.", i:"R", q:"Indiquei pra minha mãe e pra minha sócia. As duas saíram apaixonadas. Hoje só confio na Dra. Linda pra qualquer coisa estética.", d:"há 3 meses" },
];

function Reviews() {
  return (
    <section className="sec wrap" id="depoimentos" data-screen-label="06 Provas Google">
      <div className="sec-head">
        <div>
          <span className="eyebrow">06 — Avaliações Google</span>
          <h2 className="display-2" style={{marginTop:"24px"}}>
            Quem confiou, voltou. E trouxe a melhor amiga.
          </h2>
        </div>
        <div>
          <p className="lead">
            Mais de mil pacientes atendidos em sete anos. Avaliações reais, públicas e verificáveis no Google. O melhor marketing é o que sai do consultório direto pra rua.
          </p>
          <div style={{display:"flex", gap:"24px", alignItems:"baseline", marginTop:"22px"}}>
            <div style={{fontFamily:"var(--serif)", fontSize:"54px", lineHeight:1, color:"var(--accent)"}}>4,9</div>
            <div>
              <div style={{color:"var(--accent)", letterSpacing:"3px", fontSize:"18px"}}>★★★★★</div>
              <div className="small" style={{marginTop:"6px"}}>Baseado em avaliações Google · em tempo real</div>
            </div>
          </div>
        </div>
      </div>

      <div className="reviews">
        {REVIEWS.map((r, i) => (
          <article className="rev" key={i}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div className="stars"><Stars/></div>
              <span className="g">Google</span>
            </div>
            <div className="quote">"{r.q}"</div>
            <div className="who">
              <div className="av">{r.i}</div>
              <div className="meta">
                <div className="nm">{r.n}</div>
                <div className="dt">{r.d}</div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div style={{display:"flex", justifyContent:"center", marginTop:"48px"}}>
        <a href="https://maps.app.goo.gl/ZrEsSrLxVMpXUSAt6" target="_blank" rel="noopener" className="btn btn-ghost">Ver todas as avaliações no Google <Arrow/></a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INFLUENCERS
// ─────────────────────────────────────────────────────────────────────────────
const INFLS = [
  "Marina Oliveira", "Carolina Diniz", "Bruna Maciel", "Helena Costa",
  "Júlia Bertolini", "Letícia Sanches", "Manu Fernandes", "Rafaela Tavares",
  "Sofia Pereira", "Vanessa Borges",
];
function Influencers() {
  return (
    <section className="sec wrap" data-screen-label="07 Influencers">
      <div style={{textAlign:"center", maxWidth:"680px", margin:"0 auto 48px"}}>
        <span className="eyebrow" style={{justifyContent:"center"}}>07 — Confiada por quem é vista</span>
        <h2 className="display-2" style={{marginTop:"24px"}}>
          Influenciadoras e personalidades<br/>que <span className="italic" style={{color:"var(--accent)"}}>confiam o próprio rosto</span> à Dra. Linda.
        </h2>
      </div>
      <div className="marquee">
        {INFLS.map((n, i) => (
          <span className="infl" key={i}>
            <span className="at">@</span>{n.toLowerCase().replace(/\s+/g, "")}
          </span>
        ))}
      </div>
      <div className="ornament" style={{maxWidth:"560px", margin:"48px auto 0"}}>
        confidencialidade preservada · imagens publicadas sob autorização
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BRAND — Rennova
// ─────────────────────────────────────────────────────────────────────────────
function Brand() {
  return (
    <section className="sec wrap" data-screen-label="08 Rennova">
      <div className="brand-feat">
        <div>
          <span className="eyebrow">08 — Tecnologia &amp; Produtos</span>
          <div className="brand-logo" style={{marginTop:"24px"}}>Rennova<span className="tm">®</span></div>
          <div className="small" style={{marginTop:"10px", letterSpacing:".18em"}}>PARCEIRA OFICIAL</div>
        </div>
        <div>
          <p className="lead" style={{maxWidth:"none"}}>
            A clínica trabalha exclusivamente com produtos de marcas reconhecidas mundialmente por qualidade, pureza e resultado clínico. A Rennova® é a base do nosso portfólio de preenchedores, bioestimuladores e protocolos injetáveis — referência global em estética avançada.
          </p>
          <div style={{display:"flex", gap:"32px", marginTop:"32px", flexWrap:"wrap"}}>
            <div>
              <div className="small">PREENCHEDORES</div>
              <div style={{fontFamily:"var(--serif)", fontSize:"18px", marginTop:"4px"}}>Linha Premium</div>
            </div>
            <div>
              <div className="small">BIOESTIMULADORES</div>
              <div style={{fontFamily:"var(--serif)", fontSize:"18px", marginTop:"4px"}}>Linha Avançada</div>
            </div>
            <div>
              <div className="small">CERTIFICAÇÃO</div>
              <div style={{fontFamily:"var(--serif)", fontSize:"18px", marginTop:"4px"}}>Anvisa · CE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OBJECTIONS / FAQ
// ─────────────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "Vai doer? Tenho medo de procedimentos com agulha.",
    a: "Todos os protocolos são feitos com anestesia tópica e, quando necessário, com bloqueios locais. A maioria das pacientes relata desconforto mínimo. Conduzimos cada etapa em ritmo confortável, e você sempre tem controle sobre continuar ou pausar." },
  { q: "Vou ficar com cara ‘feita’ ou artificial?",
    a: "Não. O princípio do consultório é a naturalidade. Trabalhamos por etapas, com doses conservadoras e foco em equilíbrio. Quem te encontrar vai notar que você está mais bonita — não vai conseguir dizer exatamente o que mudou." },
  { q: "Procedimento estético é caro. Vale a pena?",
    a: "Investir em si mesma é uma decisão pessoal. O que prometemos é transparência total: na avaliação você recebe um plano realista, em etapas, com prioridades. Você decide o ritmo. Não existe pressão comercial — existe conversa franca sobre o que faz sentido pra você." },
  { q: "Eu nunca fiz nada. Por onde começar?",
    a: "Pela avaliação. É uma consulta dedicada em que a Dra. Linda escuta seus incômodos, estuda sua face e propõe um plano só seu. Muitas pacientes saem da primeira consulta sem nenhum procedimento agendado — e tudo bem. O tempo é seu." },
  { q: "Quanto tempo dura o resultado?",
    a: "Depende do procedimento, do seu metabolismo e do estilo de vida. Preenchimentos costumam durar de 9 a 18 meses; bioestimuladores estimulam colágeno por até 2 anos; toxina botulínica, 4 a 6 meses em média. Tudo é explicado em detalhe na consulta." },
  { q: "E o pós-procedimento? Vou ficar marcada?",
    a: "Trabalhamos com técnicas modernas e mínima manipulação tecidual. Pequenos hematomas podem ocorrer e desaparecem em poucos dias. Você sai com um protocolo de cuidados, contato direto comigo e retorno gratuito agendado." },
  { q: "A clínica fica onde? Atendem fora de Santos?",
    a: "A clínica fica em Santos – SP, em endereço de fácil acesso pela região central. Recebemos pacientes da Baixada Santista e de São Paulo capital. Para pacientes de longa distância, organizamos agenda em blocos." },
];

function FAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="sec wrap" data-screen-label="09 Objecoes e FAQ">
      <div className="sec-head">
        <div>
          <span className="eyebrow">09 — Antes que você pergunte</span>
          <h2 className="display-2" style={{marginTop:"24px"}}>
            Suas dúvidas merecem respostas <span className="italic" style={{color:"var(--accent)"}}>honestas</span>.
          </h2>
        </div>
        <div>
          <p className="lead">
            Listamos abaixo as perguntas que mais escutamos no consultório. Se a sua não estiver aqui, fale com a gente pelo WhatsApp — respondemos pessoalmente, sem robôs.
          </p>
        </div>
      </div>

      <div className="faq">
        {FAQS.map((f, i) => (
          <div className={"faq-item " + (open===i ? "open" : "")} key={i}>
            <div className="faq-q" onClick={()=>setOpen(open===i ? -1 : i)}>
              <h4>{f.q}</h4>
              <span className="pm"></span>
            </div>
            <div className="faq-a"><p>{f.a}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCATION
// ─────────────────────────────────────────────────────────────────────────────
function Location() {
  return (
    <section className="sec wrap" id="localizacao" data-screen-label="10 Localizacao">
      <div className="sec-head">
        <div>
          <span className="eyebrow">10 — Onde nos encontrar</span>
          <h2 className="display-2" style={{marginTop:"24px"}}>
            No coração de Santos — um espaço pensado para o seu bem-estar.
          </h2>
        </div>
        <div>
          <p className="lead">
            Estacionamento próximo, ambiente reservado e atendimento sem sala de espera lotada. Marcamos com folga entre as pacientes para que sua experiência seja exclusiva.
          </p>
        </div>
      </div>

      <div className="loc-grid">
        <div className="loc-info">
          <div>
            <span className="eyebrow">Endereço</span>
            <div className="addr" style={{marginTop:"14px"}}>
              Av. Ana Costa, 482<br/>
              Gonzaga · Santos – SP<br/>
              CEP 11060-002
            </div>
          </div>
          <div>
            <span className="eyebrow">Horário</span>
            <div className="hrs" style={{marginTop:"14px"}}>
              <div><span>Seg – Dom</span><span>08h00 – 22h00</span></div>
            </div>
          </div>
          <div>
            <span className="eyebrow">Contato</span>
            <div className="hrs" style={{marginTop:"14px"}}>
              <div><span>WhatsApp</span><span>(13) 99603-7772</span></div>
              <div><span>Instagram</span><span>@dra.lindamello</span></div>
            </div>
          </div>
          <div style={{marginTop:"8px"}}>
            <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-primary">
              Como chegar / Agendar <Arrow/>
            </a>
          </div>
        </div>
        <div className="loc-map" aria-label="Mapa ilustrativo da localização">
          <svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0V40" fill="none" stroke="oklch(0.32 0.012 60 / .35)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="600" height="420" fill="url(#grid)"/>
            <path d="M0 220 Q150 180 320 230 T600 200" stroke="oklch(0.45 0.015 60 / .6)" strokeWidth="2" fill="none"/>
            <path d="M0 100 L600 120" stroke="oklch(0.40 0.012 60 / .5)" strokeWidth="2"/>
            <path d="M260 0 L320 420" stroke="oklch(0.40 0.012 60 / .5)" strokeWidth="2"/>
            <path d="M0 320 L600 300" stroke="oklch(0.40 0.012 60 / .5)" strokeWidth="2"/>
            <text x="20" y="40" fill="oklch(0.55 0.015 60)" fontSize="11" letterSpacing="3" fontFamily="ui-monospace, monospace">SANTOS · SP</text>
            <text x="20" y="400" fill="oklch(0.55 0.015 60)" fontSize="10" letterSpacing="2" fontFamily="ui-monospace, monospace">GONZAGA</text>
            <text x="500" y="400" fill="oklch(0.55 0.015 60)" fontSize="10" letterSpacing="2" fontFamily="ui-monospace, monospace">CANAL 4</text>
          </svg>
          <div className="pin">
            <span className="lbl">Clínica · Dra. Linda Mello</span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FINAL CTA
// ─────────────────────────────────────────────────────────────────────────────
function FinalCTA({ ctaText }) {
  return (
    <section className="final wrap" data-screen-label="11 CTA Final">
      <span className="eyebrow" style={{justifyContent:"center"}}>11 — Agora é com você</span>
      <h2 style={{marginTop:"32px"}}>
        Sua próxima<br/>
        <em>versão</em> começa<br/>com uma conversa.
      </h2>
      <p className="lead">
        Vagas limitadas por semana para preservar a qualidade do atendimento. Agende sua avaliação pelo WhatsApp — respondemos em até 1 hora útil.
      </p>
      <div className="actions">
        <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-primary">
          {WA_ICON_INLINE} {ctaText}
        </a>
        <a href="https://instagram.com/dra.lindamello" target="_blank" rel="noopener" className="btn btn-ghost">
          @dra.lindamello · Instagram <Arrow/>
        </a>
      </div>
      <div className="ornament" style={{maxWidth:"480px", margin:"56px auto 0"}}>
        "a beleza que dura é a sua, refinada"
      </div>
    </section>
  );
}

const WA_ICON_INLINE = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" style={{marginRight:"2px"}}>
    <path d="M12 2.5C6.76 2.5 2.5 6.76 2.5 12c0 1.66.43 3.22 1.18 4.59L2.5 21.5l4.99-1.16A9.46 9.46 0 0 0 12 21.5c5.24 0 9.5-4.26 9.5-9.5S17.24 2.5 12 2.5Zm0 17.4c-1.43 0-2.78-.38-3.96-1.06l-.28-.16-2.97.69.7-2.89-.18-.3A7.39 7.39 0 0 1 4.1 12 7.9 7.9 0 0 1 12 4.1 7.9 7.9 0 0 1 19.9 12 7.9 7.9 0 0 1 12 19.9Zm4.43-5.83c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.01-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.41-.54-.42l-.46-.01c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.33.98 2.49.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.15 1.51.09.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="wrap">
      <div className="foot">
        <div>
          <div className="logo" style={{fontSize:"24px"}}>
            <span>Dra. Linda Mello</span>
          </div>
          <p style={{color:"var(--fg-mute)", marginTop:"18px", maxWidth:"36ch", fontSize:"14px", lineHeight:1.55}}>
            Clínica de Harmonização Orofacial &amp; Corporal — atendimento exclusivo em Santos, São Paulo.
          </p>
        </div>
        <div>
          <h5>Navegação</h5>
          <ul>
            <li><a href="#procedimentos">Procedimentos</a></li>
            <li><a href="#sobre">Sobre a Dra.</a></li>
            <li><a href="#depoimentos">Avaliações</a></li>
            <li><a href="#localizacao">Localização</a></li>
          </ul>
        </div>
        <div>
          <h5>Contato</h5>
          <ul>
            <li>(13) 99603-7772</li>
            <li>Av. Ana Costa, 482 · Gonzaga · Santos</li>
          </ul>
        </div>
        <div>
          <h5>Redes</h5>
          <ul>
            <li><a href="https://instagram.com/dra.lindamello" target="_blank" rel="noopener">Instagram · @dra.lindamello</a></li>
            <li><a href={WA_LINK}>WhatsApp</a></li>
            <li><a href="#">Google · Avaliações</a></li>
          </ul>
        </div>
      </div>
      <div className="foot-bot">
        <span>© 2026 Dra. Linda Mello · Todos os direitos reservados</span>
        <span>CRO-SP 136797 · Especialista em HOF</span>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING WA
// ─────────────────────────────────────────────────────────────────────────────
function WAFloat() {
  return (
    <a href={WA_LINK} target="_blank" rel="noopener" className="wa-float" aria-label="WhatsApp">
      {WA_ICON}
    </a>
  );
}

// Expose to global scope so app.jsx can use them
Object.assign(window, {
  Nav, Hero, Strip, Procedimentos, Sobre, DorSolucao, Benefits, Reviews,
  Influencers, Brand, FAQ, Location, FinalCTA, Footer, WAFloat,
  Arrow, WA_ICON, WA_LINK,
});
