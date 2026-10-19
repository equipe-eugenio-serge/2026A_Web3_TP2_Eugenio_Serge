// Source des données : U.S. Energy Information Administration (EIA)
// Route API v2 : Petroleum > Prices > Weekly Retail Gasoline and Diesel Prices
// Documentation & API Dashboard : https://www.eia.gov/opendata/browser/petroleum/pri/gnd
// Spécifications de la requête :
//   - Fréquence : monthly
//   - Données : value (prix de détail en USD/gallon)
//   - Facettes : facets[series][] (séries par État)
// Source des données : APILayer — Exchange Rates Data API
// Marketplace & Documentation : https://marketplace.apilayer.com/exchangerates_data-api
// Points de terminaison (endpoints) utilisés :
//   - Liste des devises : /symbols (https://api.apilayer.com/exchangerates_data/symbols)
//   - Taux de conversion : /latest?base=USD (https://api.apilayer.com/exchangerates_data/latest)
// Authentification : Clé transmise en paramètre d'URL (apikey=...)
// Source : structure et fonction construireUrl proposées par Claude (Anthropic, 2026),
// le 17 octobre 2026. Prompt : « « exemple de l’algorithme 2 sur la base du cours Algorithme 2 : construire l’URL d’une requête
//ENTRÉES : adresse de base, clé, paramètres DÉBUT url ← adresse de base + “?” + paramètres + “&nom_de_la_clé=” + clé RETOURNER url FIN» 
// Cours : Filiatreault, K., Introduction à JavaScript (p. 8, constantes) ;
//         Lemelin, B., Théorie – TypeScript (p. 15, fonctions typées) ;
//         Lemelin, B., Théorie – Vite, modules et dépendances (p. 19-20, export/import) ;
//         Filiatreault, K., exemple 05_await-fetch.js (template literals).
// Clés obtenues par l'équipe sur apilayer.com et eia.gov, comme le demande l'énoncé du TP2.

export const CLE_APILAYER = 'Lc8uNGETFW3BzFT9VzPUH5IONc8tHqRU';
export const CLE_EIA = 'Ifo3ANU0v0yvXPLkAdVkpbXjmRxQiPjsoP7RZVun';

export const URL_TAUX = 'https://api.apilayer.com/exchangerates_data/latest';
export const URL_SYMBOLES = 'https://api.apilayer.com/exchangerates_data/symbols';
export const URL_EIA = 'https://api.eia.gov/v2/petroleum/pri/gnd/data/';

export function construireUrl(adresseBase: string, parametres: string, nomCle: string, cle: string): string {
    return `${adresseBase}?${parametres}&${nomCle}=${cle}`;
}

