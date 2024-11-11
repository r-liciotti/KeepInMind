function TipiParticelleCard() {
  return (
    <div className="rounded-box ring-primary/20 to-primary/10 from-base-100/10 w-full gap-6 bg-gradient-to-br p-6 text-start ring-1 sm:flex">
      <div className="flex flex-col gap-1.5 sm:w-7/12 md:w-full ">
        <p className="text-primary text-lg font-semibold  flex items-center">
          Tipi di Particelle
        </p>
        <h1 className="text-base-content/90 text-2xl font-bold  leading-tight">
          PM2.5 (Particolato di 2.5µm)
        </h1>
        <p className="text-base-content/80 mb-2 text-base font-normal">
          Particelle inquinanti con un diametro inferiore a 2.5 micrometri. Sono
          talmente piccole che possono penetrare in profondità nei polmoni e
          causare problemi respiratori e cardiovascolari. Sono generate
          principalmente da processi di combustione, come i motori dei veicoli e
          la combustione di legna e carbone.
        </p>
        <h1 className="text-base-content/90 text-2xl font-bold  leading-tight">
          PM10 (Particolato di 10µm)
        </h1>
        <p className="text-base-content/80 mb-2 text-base font-normal">
          Particelle più grandi, con un diametro inferiore a 10 micrometri.
          Sebbene più grandi delle PM2.5, sono comunque dannose per la salute
          umana e possono causare irritazioni alle vie respiratorie. Provengono
          da polveri stradali, attività industriali e naturali come il polline.
        </p>
        <h1 className="text-base-content/90 text-2xl font-bold  leading-tight">
          CO (Monossido di carbonio)
        </h1>
        <p className="text-base-content/80 mb-2 text-base font-normal">
          Gas incolore e inodore prodotto dalla combustione incompleta di
          combustibili fossili come benzina, gas e carbone. Può ridurre
          l'ossigenazione del sangue, causando mal di testa, stanchezza e, in
          alte concentrazioni, intossicazione.
        </p>
        <h1 className="text-base-content/90 text-2xl font-bold  leading-tight">
          CO2 (Anidride carbonica)
        </h1>
        <p className="text-base-content/80 mb-2 text-base font-normal">
          Gas naturale prodotto dalla respirazione degli esseri viventi e dalla
          combustione di combustibili fossili. È uno dei principali gas
          responsabili dell’effetto serra, contribuendo al cambiamento
          climatico.
        </p>
        <h1 className="text-base-content/90 text-2xl font-bold  leading-tight">
          NO2 (Diossido di azoto)
        </h1>
        <p className="text-base-content/80 mb-2 text-base font-normal">
          Gas tossico prodotto principalmente dalla combustione dei motori e
          dagli impianti industriali. È irritante per le vie respiratorie e
          contribuisce alla formazione dello smog e delle piogge acide.
        </p>
        <h1 className="text-base-content/90 text-2xl font-bold  leading-tight">
          Dust (Polvere)
        </h1>
        <p className="text-base-content/80 mb-2 text-base font-normal">
          Particelle solide di varia origine, come polvere stradale, attività
          edilizie, eolica, e possono contenere anche frammenti di PM10 e PM2.5.
          La polvere può causare problemi respiratori, allergie e ridurre la
          qualità dell'aria.
        </p>
      </div>
    </div>
  );
}

export default TipiParticelleCard;
