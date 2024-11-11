import Fuse from "fuse.js";
import data from "../assets/data/countries+states.json";
import { State } from "../interfaces/Country"; // Importa l'interfaccia State

function SearchCityByName(nome: string): State[] {
  const fuse = new Fuse(data, {
    keys: ["states.name"], // Cerca all'interno di `states.name`
    threshold: 0.3, // Flessibilità della ricerca
    minMatchCharLength: nome.length, // Lunghezza minima del match
  });

  const results = fuse.search(nome, { limit: 5 });

  // Inizializziamo un array per raccogliere i risultati
  const matchingResults: State[] = [];

  results.forEach((result) => {
    // Filtra gli stati corrispondenti al nome cercato e restituisci l'intero oggetto `State`
    const matchingStates = result.item.states.filter((state) =>
      state.name.toLowerCase().includes(nome.toLowerCase())
    );

    // Aggiungi gli stati trovati all'array dei risultati
    matchingResults.push(...(matchingStates as State[]));
  });

  //console.log("risultati ", matchingResults);
  return matchingResults;
}

export default SearchCityByName;
