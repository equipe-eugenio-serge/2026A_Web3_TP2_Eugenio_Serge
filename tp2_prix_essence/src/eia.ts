// Source des données : U.S. Energy Information Administration (EIA)
// Route API v2 : Petroleum > Prices > Weekly Retail Gasoline and Diesel Prices
// Documentation & API Dashboard : https://www.eia.gov/opendata/browser/petroleum/pri/gnd
// Spécifications de la requête :
//   - Fréquence : monthly
//   - Données : value (prix de détail en USD/gallon)
//   - Facettes : facets[series][] (séries par État)
// Source : algorithme de B6 proposé par Claude (Anthropic, 2026), IA générative, le 19 octobre 2026.
// Prompt (algorithme) : « recommence et fait ceci de B1 a B8 :donne moi l'algorithme de B1 ,
//   quels sont les fichiers que l'on doit avaoir a quoi ils servent , leurs roles et les etapes de de B1,
//   les differents algorithmes de B1, »

// Cours : Filiatreault, K., JS – Promises, async et await (p. 7 à 12) ;
//         Lemelin, B., Théorie – TypeScript (p. 6, throw ; p. 15, fonctions ; p. 16, types objets ; p. 25, as) ;
//         Filiatreault, K., Introduction à JavaScript (p. 9, concaténation).

import { CLE_EIA, URL_EIA, construireUrl } from './config';


import type { CodeEtat } from './etats';

export type PrixEia = {
    period: string,
    value: number
};

type ResponseEia = {

    response: {

        data: PrixEia[]
    }
};


export function construireUrlEia(code: CodeEtat, debut: string, fin: string): string {
    const parametres = "frequency=monthly"
        + "&data[0]=value"
        + "&facets[series][]=" + code
        + "&start=" + debut
        + "&end=" + fin
        + "&sort[0][column]=period&sort[0][direction]=asc";
    return construireUrl(URL_EIA, parametres, "api_key", CLE_EIA);
}

export const obtenirPrix = async (code: CodeEtat, debut: string, fin: string) => {
    const reponse = await fetch(construireUrlEia(code, debut, fin));
    const donnees = await reponse.json() as ResponseEia;

    if (!donnees.response) {
        throw new Error("La réponse de l'API EIA est invalide.");
    }
    if (donnees.response.data.length === 0) {
        throw new Error("Aucune donnee n'est disponible actuellement pour cet État et cette période.");
    }

    return donnees.response.data;
};





