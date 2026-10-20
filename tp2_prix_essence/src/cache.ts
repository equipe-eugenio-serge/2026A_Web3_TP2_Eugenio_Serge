// Source : algorithme de B6 proposé par Claude (Anthropic, 2026), IA générative, le 19 octobre 2026.
// Prompt (algorithme) : « recommence et fait ceci de B1 a B8 :donne moi l'algorithme de B1 ,
//   quels sont les fichiers que l'on doit avaoir a quoi ils servent , leurs roles et les etapes de de B1,
//   les differents algorithmes de B1, »
// Cours : Lemelin, B., Exercice Révision TypeScript, README (localStorage.setItem/getItem,
//         JSON.stringify, JSON.parse … as Type, test !== null) ;
//         Lemelin, B., Théorie – TypeScript (p. 19, nullabilité ; p. 25, as) ;
//         Filiatreault, K., JS – Promises, async et await (p. 13, try/catch).


import type { Devise, ReponseTaux } from './devises';
import { obtenirDevises, obtenirTauxUSD } from './devises';

const CLE_CACHE_TAUX = "tp2-taux-usd";
const CLE_CACHE_DEVISES = "tp2-devises";

export const TAUX_PAR_DEFAUT: ReponseTaux = {
    success: true,
    base: "USD",
    date: "2026-10-17",
    rates: { 
        CAD: 1.41575, 
        EUR: 0.889904, 
        GBP: 0.77123, 
        DKK: 6.6432, 
        EGP: 48.52, 
        HUF: 362.45, 
        BRL: 5.065104,
        USD: 1.0 
    }
};

export const DEVISES_PAR_DEFAUT: Devise[] = [
    { code: "CAD", nom: "Dollar canadien" },
    { code: "EUR", nom: "Euro" },
    { code: "GBP", nom: "Livre sterling" },
    { code: "DKK", nom: "Couronne danoise" },
    { code: "EGP", nom: "Livre égyptienne" },
    { code: "HUF", nom: "Forint hongrois" },
    { code: "BRL", nom: "Réal brésilien" },
    { code: "USD", nom: "Dollar américain" }
];

export const obtenirTauxAvecCache = async () => {
    const texte = localStorage.getItem(CLE_CACHE_TAUX);
    if (texte !== null) {
        return JSON.parse(texte) as ReponseTaux;
    }

    try {
        const taux = await obtenirTauxUSD();
        localStorage.setItem(CLE_CACHE_TAUX, JSON.stringify(taux));
        return taux;
    }
    catch (e) {
        console.error(e);
        return TAUX_PAR_DEFAUT;
    }
};

export const obtenirDevisesAvecCache = async () => {
    const texte = localStorage.getItem(CLE_CACHE_DEVISES);
    if (texte !== null) {
        return JSON.parse(texte) as Devise[];
    }

    try {
        const devises = await obtenirDevises();
        localStorage.setItem(CLE_CACHE_DEVISES, JSON.stringify(devises));
        return devises;
    }
    catch (e) {
        console.error(e);
        return DEVISES_PAR_DEFAUT;
    }
};
