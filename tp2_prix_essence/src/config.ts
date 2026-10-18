// src/config.ts
// Source : structure et fonction construireUrl proposées par Claude (Anthropic, 2026),
// le 17 octobre 2026. Prompt : « donne moi l'algorithme et la structure de B1 ».
// Cours : Lemelin, B., Théorie – Vite, modules et dépendances (p. 19-20, export/import) ;
//         Lemelin, B., Théorie – TypeScript (p. 15, fonctions typées).

export const CLE_APILAYER = 'Lc8uNGETFW3BzFT9VzPUH5IONc8tHqRU';
export const CLE_EIA = 'Ifo3ANU0v0yvXPLkAdVkpbXjmRxQiPjsoP7RZVun';

export const URL_TAUX = 'https://api.apilayer.com/exchangerates_data/latest';
export const URL_EIA = 'https://api.eia.gov/v2/petroleum/pri/gnd/data/';

export function construireUrl(adresseBase: string, parametres: string, nomCle: string, cle: string): string {
    return `${adresseBase}?${parametres}&${nomCle}=${cle}`;
}

