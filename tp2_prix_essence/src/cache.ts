// Code de départ : corrigé de référence généré par Claude (Anthropic, 2026), IA générative, 19 octobre 2026.
// Discussion Claude : https://claude.ai/share/74bc8524-479f-4be1-9a2f-ba5818508218
// Prompts (Claude) : « recommence et fait ceci de B1 a B8 :donne moi l'algorithme et la structure de B1 , quels sont les fichiers
//   que l'on doit avaoir a quoi ils servent , leurs roles et les etapes de de B1, les differents algorithmes de B1, » ;
//   « je ne veux pas l'utiliser je veux juste l'avoir comme refentiel: redonne moi la correction en respecatnt uniquement les notions de cours »
// Compréhension : Gemini (Google), 19 octobre 2026. Prompts :
// Discussions Gemini : voir la liste des liens dans le README (liens 1 à 5).
//   « quelle est la vaeleur de tp2-taux-usd const CLE_CACHE_TAUX = "tp2-taux-usd"; const CLE_CACHE_DEVISES = "tp2-devises"; je ne comprends pas ce qui est stocker const texte = localStorage.getItem(CLE_CACHE_TAUX); » ;
//   « explique moi cle_cache_taux et json.stringify(taux) dans localStorage.setItem(CLE_CACHE_TAUX, JSON.stringify(taux)); »
// Taux par défaut : CAD, EUR et BRL obtenus lors du test de l'API apilayer du 17 octobre 2026 ;
//   GBP, DKK, EGP et HUF : valeurs approximatives non vérifiées, reprises d'une version de code générée par IA.
// Cours : Lemelin, B., Exercice Révision TypeScript, README (localStorage.setItem/getItem, JSON.stringify, JSON.parse … as Type, test !== null) ;
//         Lemelin, B., Théorie – TypeScript (p. 19, nullabilité ; p. 25, as) ;
//         Filiatreault, K., JS – Promises, async et await (p. 13, try/catch).
// « import type » : importe seulement un type (il disparaît du JavaScript final). Commande non enseignée.
// Source : documentation TypeScript, « Type-Only Imports and Export »,
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
// Obligatoire ici parce que le tsconfig.json du projet active verbatimModuleSyntax.
// Source : documentation TypeScript, https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax
// Recherche guidée par Claude (Anthropic, 2026), 19 octobre 2026. Prompts : « donne moi aussi la source de » ; « ajoute aussi la recherche guide par iag comme outil »


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
