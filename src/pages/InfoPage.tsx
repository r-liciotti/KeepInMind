import TipiParticelleCard from "../components/Card/TipiParticelleCard";
import TableLegendCard from "../components/Card/TableLegendCard";
import TextCard from "../components/Card/TextCard";

export default function About() {
  return (
    <div className="container mx-auto md:max-w-5xl  px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl bg-gradient-to-r from-primary to-error bg-clip-text text-transparent font-black  mb-4">
          KeepInMind
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
          Comprendi i Dati
        </p>
      </header>

      <main className="space-y-6 md:space-y-0 md:grid md:grid-cols-1 md:gap-12">
        <TextCard
          title="Comprendiamo i dati"
          description="Per utilizzare KeepInMind al meglio abbiamo bisogno di comprendere al meglio i dati che ci mostra, qui di seguito una legenda"
        />
        <TextCard
          subTitle="Perchè è importante conoscere l'aumento delle temperature?"
          title="Storico Temperature"
          description="Negli ultimi 100 anni, la temperatura media globale è aumentata in modo significativo a causa delle attività umane. Per affrontare questa emergenza, è stato siglato l'Accordo di Parigi. Questo accordo internazionale mira a limitare l'aumento della temperatura globale ben al di sotto dei 2°C rispetto ai livelli preindustriali. L'obiettivo di 1,5°C è cruciale per evitare gli impatti più gravi del cambiamento climatico. Per raggiungerlo, è necessario ridurre drasticamente le emissioni di gas serra e adottare misure di adattamento ai cambiamenti climatici."
        />
        <TableLegendCard />
        <TipiParticelleCard />
      </main>
    </div>
  );
}
