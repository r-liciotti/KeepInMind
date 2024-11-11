import { getData } from "../db";

interface TemperatureData {
    temperature2mMean: number;
}

async function calculateTemperatureIncrease(
    storageKey: string,
    yearsToAverage: number
): Promise<{ increase: number | null; percentageIncrease: number | null }> {
    console.log("storageKey", storageKey);

    const cachedData = await getData(storageKey);
    console.log("cachedData", cachedData);

    if (!cachedData) {
        console.error("Dati non disponibili in IndexedDB.");
        return { increase: null, percentageIncrease: null };
    }

    try {
        const data: TemperatureData[] = cachedData.data.data; // Estrarre i dati dal campo data

        // Verifica se ci sono abbastanza dati per il calcolo
        if (data.length < yearsToAverage * 2) {
            console.error("Non ci sono abbastanza dati per il calcolo.");
            return { increase: null, percentageIncrease: null };
        }

        // Calcola la media dei periodi iniziale e finale
        const startPeriod = data.slice(0, yearsToAverage);
        const endPeriod = data.slice(-yearsToAverage);

        const averageTempStart =
            startPeriod.reduce((sum, entry) => sum + entry.temperature2mMean, 0) /
            startPeriod.length;
        const averageTempEnd =
            endPeriod.reduce((sum, entry) => sum + entry.temperature2mMean, 0) /
            endPeriod.length;

        // Calcola incremento assoluto e percentuale
        const increase = averageTempEnd - averageTempStart;
        const percentageIncrease = (increase / averageTempStart) * 100;

        return { increase, percentageIncrease };
    } catch (error) {
        console.error("Errore nel parsing dei dati da IndexedDB:", error);
        return { increase: null, percentageIncrease: null };
    }
}

export default calculateTemperatureIncrease;
