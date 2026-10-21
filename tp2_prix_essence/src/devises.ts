// Code de départ : corrigé de référence généré par Claude (Anthropic, 2026), IA générative, 19 octobre 2026.
// Discussion Claude : https://claude.ai/share/74bc8524-479f-4be1-9a2f-ba5818508218
// Prompts (Claude) : « recommence et fait ceci de B1 a B8 :donne moi l'algorithme et la structure de B1 , quels sont les fichiers
//   que l'on doit avaoir a quoi ils servent , leurs roles et les etapes de de B1, les differents algorithmes de B1, » ;
//   « je ne veux pas l'utiliser je veux juste l'avoir comme refentiel: redonne moi la correction en respecatnt uniquement les notions de cours »
// Compréhension : Gemini (Google), 19 octobre 2026. Prompts : « donne moi la source pour apilayer » ;
// Discussions Gemini : voir la liste des liens dans le README (liens 1 à 5).
//   « explique moi ceci const codes = Object.keys(donnees.symbols); » ;
//   « je ne comprends pourquoi tu dis qu on recois donnees sous forme de dictionnaire alors que on a const donnees = await reponse.json() as ReponseSymboles; » ;
//   « a quoi ca sert devises.sort((a, b) => a.nom.localeCompare(b.nom)); »
// Cours : Filiatreault, K., JS – Promises, async et await (p. 7 à 13) et exemple 05_await-fetch.js ;
//         Lemelin, B., Théorie – TypeScript (p. 6, throw ; p. 14, tableaux ; p. 16, types objets ; p. 25, as) ;
//         JS – Tableaux (p. 6, map) ; JS – Array Cheat Sheet (p. 2, sort et localeCompare).
// API : APILayer, Exchange Rates Data API, https://marketplace.apilayer.com/exchangerates_data-api


import { CLE_APILAYER, URL_SYMBOLES, URL_TAUX, construireUrl } from './config';

export type Devise = {  
   code:string,
   nom:string
};

// Signature d'index { [code: string]: number } : commande non enseignée.
// Source : documentation TypeScript, « Index Signatures », https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures
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
    
// Object.keys : retourne le tableau des noms de propriétés d'un objet.
// Source : document « Array – JavaScript (MDN) » fourni avec le cours.
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