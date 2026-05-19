// app.jsx — wires Dra. Linda Mello LP and exposes Tweaks (headline + CTA + theme)

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "v1",
  "cta": "v1",
  "theme": "dark"
}/*EDITMODE-END*/;

// Three headline + sub variations
const HEADLINES = {
  v1: {
    label: "v1 — Aspiracional",
    headline: [
      { text: "A beleza " },
      { text: "que te pertence", accent: true },
      { text: ", revelada com precisão." },
    ],
    sub: "Harmonização orofacial e corporal pela Dra. Linda Mello — referência em Santos, há sete anos transformando o que você vê no espelho.",
  },
  v2: {
    label: "v2 — Direta / Confiança",
    headline: [
      { text: "Cada detalhe do seu rosto, em " },
      { text: "harmonia", accent: true },
      { text: "." },
    ],
    sub: "Mais de 1.000 pacientes confiaram em quem trata harmonização como arte. Conheça o consultório da Dra. Linda Mello, em Santos.",
  },
  v3: {
    label: "v3 — Provocativa elegante",
    headline: [
      { text: "Você sempre soube como queria " },
      { text: "se ver", accent: true },
      { text: ". Agora é hora." },
    ],
    sub: "A Dra. Linda Mello traduz seus desejos em procedimentos seguros, sutis e definidores. HOF e harmonização corporal no coração de Santos.",
  },
};

const CTAS = {
  v1: "Agendar avaliação",
  v2: "Falar pelo WhatsApp",
  v3: "Iniciar minha jornada",
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply theme class to body
  React.useEffect(() => {
    document.body.classList.toggle("light", t.theme === "light");
  }, [t.theme]);

  const headlineSet = HEADLINES[t.headline] || HEADLINES.v1;
  const ctaText = CTAS[t.cta] || CTAS.v1;

  return (
    <>
      <Nav />
      <Hero headlineSet={headlineSet} ctaText={ctaText} />
      <Strip />
      <Procedimentos />
      <Sobre />
      <DorSolucao />
      <Benefits />
      <Reviews />
      <Influencers />
      <Brand />
      <FAQ />
      <Location />
      <FinalCTA ctaText={ctaText} />
      <Footer />
      <WAFloat />

      <TweaksPanel>
        <TweakSection label="Copy" />
        <TweakSelect
          label="Headline"
          value={t.headline}
          options={[
            { value: "v1", label: HEADLINES.v1.label },
            { value: "v2", label: HEADLINES.v2.label },
            { value: "v3", label: HEADLINES.v3.label },
          ]}
          onChange={(v) => setTweak("headline", v)}
        />
        <TweakRadio
          label="CTA principal"
          value={t.cta}
          options={["v1", "v2", "v3"]}
          onChange={(v) => setTweak("cta", v)}
        />
        <div style={{fontSize:"10.5px", color:"rgba(41,38,27,.55)", lineHeight:1.5, padding:"4px 0 8px"}}>
          v1 “Agendar avaliação” · v2 “Falar pelo WhatsApp” · v3 “Iniciar minha jornada”
        </div>

        <TweakSection label="Tema" />
        <TweakRadio
          label="Aparência"
          value={t.theme}
          options={["dark", "light"]}
          onChange={(v) => setTweak("theme", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
