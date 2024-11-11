import TextCard from "../components/Card/TextCard";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container mx-auto md:max-w-5xl  px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl bg-gradient-to-r from-primary to-error bg-clip-text text-transparent font-black  mb-4">
          KeepInMind
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
          Benvenuti su KeepInMind
        </p>
      </header>

      <main className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-12">
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
        <div className="hidden md:flex items-center justify-center col-span-2  ">
          <Link to={"/search"}>
            <button className="btn btn-lg btn-wide  btn-gradient btn-primary waves waves-light h-14">
              Cerca la tua Città
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
