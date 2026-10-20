// Source des données : APILayer — Exchange Rates Data API
// Marketplace & Documentation : https://marketplace.apilayer.com/exchangerates_data-api
// Points de terminaison (endpoints) utilisés :
//   - Liste des devises : /symbols (https://api.apilayer.com/exchangerates_data/symbols)
//   - Taux de conversion : /latest?base=USD (https://api.apilayer.com/exchangerates_data/latest)
// Authentification : Clé transmise en paramètre d'URL (apikey=...)
// Source : algorithme de B6 proposé par Claude (Anthropic, 2026), IA générative, le 19 octobre 2026.
// Prompt (algorithme) : « recommence et fait ceci de B1 a B8 :donne moi l'algorithme de B1 ,
//   quels sont les fichiers que l'on doit avaoir a quoi ils servent , leurs roles et les etapes de de B1,
//   les differents algorithmes de B1, »
// Cours : Filiatreault, K., JS – Promises, async et await (p. 7 à 13);
//         Lemelin, B., Théorie – TypeScript (p. 6, throw ; p. 14, tableaux ; p. 16, types objets ; p. 25, as) ;
//         JS – Tableaux (p. 3, push ; p. 6, map) ; JS – Array Cheat Sheet (p. 2, sort/localeCompare ; p. 3, find).


import { CLE_APILAYER, URL_SYMBOLES, URL_TAUX, construireUrl } from './config';

export type Devise = {  
   code:string,
   nom:string
};

export type ReponseTaux = {
    success: boolean,
    base: string,
    date: string,
    rates: { [code: string]: number }
};

type ReponseSymboles = {
    success: boolean,
    symbols: { [code: string]: string }
};

export const obtenirDevises = async () => {
    const url = construireUrl(URL_SYMBOLES, "", "apikey", CLE_APILAYER);
    const reponse = await fetch(url);
    const donnees = await reponse.json() as ReponseSymboles;

    if (!donnees.success) {
        throw new Error("Impossible de charger la liste des devises.");
    }

    const codes = Object.keys(donnees.symbols);

    const devises: Devise[] = codes.map(code => {
        const devise: Devise = { code: code, nom: donnees.symbols[code] };
        return devise;
    });


    devises.sort((a, b) => a.nom.localeCompare(b.nom));
    return devises;
};

export const obtenirTauxUSD = async () => {
    const url = construireUrl(URL_TAUX, "base=USD", "apikey", CLE_APILAYER);
    const reponse = await fetch(url);
    const donnees = await reponse.json() as ReponseTaux;

    if (!donnees.success) {
        throw new Error("Les taux de change sont indisponibles.");
    }

return donnees;
};