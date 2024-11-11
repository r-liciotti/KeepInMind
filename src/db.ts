import { openDB } from "idb";

const DB_NAME = "WeatherDatabase";
const DB_VERSION = 1;
const STORE_NAME = "weatherData";

// Inizializza il database
export const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "key" });
            }
        },
    });
};

// Salva i dati nel database
export const saveData = async (key: string, data: any) => {
    const db = await initDB();
    await db.put(STORE_NAME, { key, data });
};

// Recupera i dati dal database
export const getData = async (key: string) => {
    const db = await initDB();
    return db.get(STORE_NAME, key);
};
