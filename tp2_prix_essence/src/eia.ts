// Code de départ : corrigé de référence généré par Claude (Anthropic, 2026), IA générative, 19 octobre 2026.
// Discussion Claude : https://claude.ai/share/74bc8524-479f-4be1-9a2f-ba5818508218
// Prompts (Claude) : « donne moi l'algorithme et la structure de B4 , quels sont les fichiers que l'on doit avaoir a quoi ils servent ,
//   leurs roles et les etapes de de B4, les differents algorithmes de B4 » ;
//   « recommence et fait ceci de B1 a B8 :donne moi l'algorithme et la structure de B1 , quels sont les fichiers que l'on doit avaoir
//   a quoi ils servent , leurs roles et les etapes de de B1, les differents algorithmes de B1, » ;
//   « je ne veux pas l'utiliser je veux juste l'avoir comme refentiel: redonne moi la correction en respecatnt uniquement les notions de cours »
// Compréhension : Gemini (Google), 19 octobre 2026. Prompts : « ou est qu on prend la structure de construireUrlEia » ;
// Discussions Gemini : voir la liste des liens dans le README (liens 1 à 5).
//   « compare les parametres de cet url a celui de notre code et explique egalement » ; « aide moi mettre la source de eia » ;
//   « explique moi ceci => dans export const obtenirPrix = async (...) » ; « le body a quel format ? » ;
//   « explique moi ceci if (!donnees.response) » ; « if (donnees.response.data.length === 0) » ; « cplique moi === »
// API : U.S. Energy Information Administration, API v2, route petroleum/pri/gnd (fréquence mensuelle),
//       https://www.eia.gov/opendata/browser/petroleum/pri/gnd
// Cours : Filiatreault, K., JS – Promises, async et await (p. 7 à 12) ;
//         Lemelin, B., Théorie – TypeScript (p. 6, throw ; p. 15, fonctions ; p. 16, types objets ; p. 25, as) ;
//         Filiatreault, K., Introduction à JavaScript (p. 9, concaténation).
// « import type » : importe seulement un type (il disparaît du JavaScript final). Commande non enseignée.
// Source : documentation TypeScript, « Type-Only Imports and Export »,
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
// Obligatoire ici parce que le tsconfig.json du projet active verbatimModuleSyntax.
// Source : documentation TypeScript, https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax
// Recherche guidée par Claude (Anthropic, 2026), 19 octobre 2026. Prompts : « donne moi aussi la source de » ; « ajoute aussi la recherche guide par iag comme outil »

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





