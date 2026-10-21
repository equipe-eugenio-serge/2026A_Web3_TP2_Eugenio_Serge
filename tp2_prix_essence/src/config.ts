// Collaboration équipe / IA générative : Claude (Anthropic, 2026), 17 et 19 octobre 2026.
// Discussion Claude : https://claude.ai/share/74bc8524-479f-4be1-9a2f-ba5818508218
// Prompts (Claude, 17 octobre 2026) : « JE SUIS AU B1 » ; « on a pas vu ca dans le code donne moi le code qui est ce qu on a vu » ;
//   « donne moi l'algorithme et la structure de B1 , quels sont les fichiers que l'on doit avaoir a quoi ils servent ,
//   leurs roles et les etapes de de B1, les differents algorithmes de B1 » ; « si je gardre ca c'est correct ? » ;
//   « exemple de l'algorithme 2 sur la base du cours Algorithme 2 : construire l'URL d'une requête » ; « pour le main c'est corretc ? »
// Prompt (Claude, 19 octobre 2026, ajout de URL_SYMBOLES) : « je ne veux pas l'utiliser je veux juste l'avoir comme refentiel:
//   redonne moi la correction en respecatnt uniquement les notions de cours »
// Part de l'équipe : obtention et test des clés d'API ; première version du fichier et du test fetch ; validation dans la console.
// Part de l'IA : correction de la syntaxe (export, template literals), fonction construireUrl, constante URL_SYMBOLES.
// Cours : Filiatreault, K., Introduction à JavaScript (p. 8, constantes) ;
//         Lemelin, B., Théorie – TypeScript (p. 15, fonctions typées) ;
//         Lemelin, B., Théorie – Vite, modules et dépendances (p. 19-20, export/import) ;
//         Filiatreault, K., exemple 05_await-fetch.js (template literals).
// API : APILayer, Exchange Rates Data API, https://marketplace.apilayer.com/exchangerates_data-api ;
//       U.S. Energy Information Administration, API v2, https://www.eia.gov/opendata/browser/petroleum/pri/gnd
// Clés obtenues par l'équipe, comme le demande l'énoncé du TP2.


export const CLE_APILAYER = 'Lc8uNGETFW3BzFT9VzPUH5IONc8tHqRU';
export const CLE_EIA = 'Ifo3ANU0v0yvXPLkAdVkpbXjmRxQiPjsoP7RZVun';

export const URL_TAUX = 'https://api.apilayer.com/exchangerates_data/latest';
export const URL_EIA = 'https://api.eia.gov/v2/petroleum/pri/gnd/data/';

export function construireUrl(adresseBase: string, parametres: string, nomCle: string, cle: string): string {
    return `${adresseBase}?${parametres}&${nomCle}=${cle}`;
}

