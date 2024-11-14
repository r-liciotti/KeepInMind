import TextCard from "../components/Card/TextCard";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:max-w-5xl">
      <header className="mb-8 text-center">
        <div className="mb-1 flex items-center justify-center gap-4">
          <div className="avatar pb-2">
            <div className="size-16 rounded-full md:size-20">
              <img src="/logo.png" alt="avatar" />
            </div>
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-primary to-error bg-clip-text text-4xl font-black text-transparent md:text-5xl">
            KeepInMind
          </h1>
        </div>

        <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
          Benvenuti su KeepInMind
        </p>
      </header>

      <main className="space-y-6 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
        <TextCard
          title="La Nostra Missione"
          description="KeepInMind nasce con l'obiettivo di rendere visibile ciò che troppo spesso resta invisibile: i cambiamenti climatici e la qualità dell'aria che respiriamo."
        />

        <TextCard
          title="Storico Temperature"
          subTitle="Temperature degli Ultimi 60 Anni"
          description="Esplora le temperature storiche e osserva
              come sono cambiate negli ultimi sei decenni. Questo grafico mostra
              in modo trasparente l'aumento delle temperature, permettendoti di
              comprendere come il clima stia cambiando in modo tangibile nella
              tua città."
        />

        <TextCard
          title="Qualità dell'Aria"
          subTitle="Monitoraggio degli inquinanti"
          description="Analizza e presenta la qualità dell'aria della tua
              città, monitorando inquinanti chiave come CO₂, CO, polveri
              sottili, NO₂ e altri composti dannosi. Questo grafico ti consente
              di avere un quadro chiaro dell'ambiente in cui vivi."
        />
        <TextCard
          title="Perché KeepInMind?"
          subTitle="KeepInMind: il cambiamento inizia dalla consapevolezza"
          description="E' pensato per informare e sensibilizzare. Con l'accesso a
              questi dati, puoi prendere decisioni più consapevoli, contribuire
              alla discussione sul cambiamento climatico e fare un passo
              concreto verso la protezione dell'ambiente."
        />
        <div className="col-span-2 hidden items-center justify-center md:flex">
          <Link to={"/search"}>
            <button className="waves waves-light btn btn-primary btn-gradient btn-lg btn-wide h-14">
              Cerca la tua Città
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
