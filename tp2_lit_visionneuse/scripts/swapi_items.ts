
import type { Film } from "./swapi_types";
//import { People } from "./swapi_types";
//import { Planet } from "./swapi_types";
//import { Species } from "./swapi_types";
//import { Vehicle } from "./swapi_types";
//import { Starship } from "./swapi_types";

/* 
    Tout le contenu peut être exporté (ou importé) en un seul ensemble
    Sources : https://share.google/CzNHMIvitHAUeRupS
    Search Query : Can I export the whole content of a typescript file 
    into another file ?
*/

import { SwapiResourceTypes } from "./swapi_types";
export * as SwapiResourceItems from './swapi_items';


"use strict";

/**
 * 
 * @param url :
 * @returns 
 * Compiling errors queried and resolved using explanations from search/IA.
 * Reference : https://share.google/aimode/DsX8AnhmSTfZXXCY0
 * Questions posées : j'ai le code suivant..., pourquoi le compilateur me dit 
 * que la fonction obtenirFilmAPI() est de type 'any' ? 
 * What's wrong with this code : (I copy my function code into the search engine...) ? 
 */
export const obtenirFilmAPI2 = (url: string) : Promise<SwapiResourceTypes.Film[]> => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => { 
                resolve(json)
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
    });
};


export const getFilmResourceFromAPI = async (resourceUrl: string) : 
    Promise<SwapiResourceTypes.Film[]> => {
    return new Promise((resolve, reject) => {
        fetch(resourceUrl)
            .then((response) => response.json())
            .then((json) => { 
                resolve(json.results || json)
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
    });
};

// Sources (corrections) : 
export const getFilmResourceAPI = async (resourceUrl: string) : 
    Promise<SwapiResourceTypes.Film> => {
    return await new Promise((resolve, reject) => {
        fetch(resourceUrl)
            .then((response) => response.json())
            .then((json) => { 
                resolve(json.results || json)
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
    });
};

/**
 * 
 * @param resourceUrl 
 * @returns 
 * 
 * Correction to initial code provided :
 * Sources : https://share.google/aimode/13v0M1jphEmdq771A
 */
export const getFilmResourceAPI_0 = async (resourceUrl: string): 
    Promise<SwapiResourceTypes.Film> => {
    try {
        const response = await fetch(resourceUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch film resource:", error);
        throw error; // Re-throw so the caller knows the operation failed
    }
};



// Sources : https://share.google/aimode/DsX8AnhmSTfZXXCY0
export const obtenirFilmAPI = async (url: string): 
    Promise<SwapiResourceTypes.Film[]> => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error ! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        // You can handle the error here or let it bubble up
        console.log(error);
        throw error; 
    }
};


// Appel asynchrone vers une ressource d'API (url)...
export const getResourceFromAPI = (ressourceUrl: string) => {
    return new Promise((resolve, reject) => {
        fetch(ressourceUrl)
            .then((response) => response.json())
            .then((json) => { 
                resolve(json.results || json)
            })
            .catch((error) => {
                reject(error);
                //console.log(error);
            })
    });
};



/* 
    Avec un appel à la fonction (précédente) 'getResourceFromAPI(...), 
    la fonction ci-dessous retourne un ensemble ciblé de resource 
    entre deux bornes d'identifiants considérés...
*/
export function getFilmResourceCollections(firstResourceId: number, 
                            lastResourceId: number, 
                            baseResourceUrl: string = "https://swapi.dev/api/films/") {
    
    // Exemple d'url complet : 
    // const filmUrl = "https://swapi.dev/api/films/1";
    // const planetUrl = "https://swapi.dev/api/planets/3";

    const collectionResources: SwapiResourceTypes.Film[] = [];

    // Aucun identifiant à valeur négative en paramètres n'est accepté.
    // Toute valeur négative est systématiquement remplacée la valeur '1'.
    if (firstResourceId <= 0) {
        firstResourceId = 1;
    }
    else if (lastResourceId <= 0) {
        lastResourceId = 1;
    }    

    // Basculer les valeurs entre les deux identifiants en paramètres 
    // dans le cas où le dernier identifiant est inférieur au premier.
    if (lastResourceId < firstResourceId) {
        const tempResourceId = lastResourceId;
        lastResourceId = firstResourceId;
        firstResourceId = tempResourceId;
    }

    /**
     * Critères (exemples) de conformité des paramètres d'url :
     * baseApiUrl : https://swapi.dev/api/
     * baseResourceUrl : films/
     * firstResourceId ou lastResourceId : 3
     */
    for (let resourceId: number = firstResourceId; resourceId <= lastResourceId; resourceId++) {
        const currentResourceUrl = baseResourceUrl + resourceId;
        //const currentResource: Film = await getFilmResourceAPI(currentResourceUrl);
        // Bug correction from Google / Gemini...
        // Sources : 
        getFilmResourceAPI(currentResourceUrl).then((currentResource: Film) => {
            collectionResources.push(currentResource)
        });
    } 

    return collectionResources;
}

//==============================================================


/* 
    Avec un appel à la fonction (précédente) 'getResourceFromAPI(...), 
    la fonction ci-dessous retourne un ensemble ciblé de resource 
    entre deux bornes d'identifiants considérés...
*/
export function getResourceCollections(firstResourceId: number, 
                            lastResourceId: number, 
                            baseResourceUrl: string = "films/", 
                            baseApiUrl: string = "https://swapi.dev/api/") {
    
    // Exemple d'url complet : 
    // const filmUrl = "https://swapi.dev/api/films/1";
    // const planetUrl = "https://swapi.dev/api/planets/3";

    const collectionResources: any[] = [];

    // Aucun identifiant à valeur négative en paramètres n'est accepté.
    // Toute valeur négative est systématiquement remplacée la valeur '1'.
    if (firstResourceId <= 0) {
        firstResourceId = 1;
    }
    else if (lastResourceId <= 0) {
        lastResourceId = 1;
    }    

    // Basculer les valeurs entre les deux identifiants en paramètres 
    // dans le cas où le dernier identifiant est inférieur au premier.
    if (lastResourceId < firstResourceId) {
        const tempResourceId = lastResourceId;
        lastResourceId = firstResourceId;
        firstResourceId = tempResourceId;
    }

    /**
     * Critères (exemples) de conformité des paramètres d'url :
     * baseApiUrl : https://swapi.dev/api/
     * baseResourceUrl : films/
     * firstResourceId ou lastResourceId : 3
     */
    for (let resourceId: number = firstResourceId; resourceId <= lastResourceId; resourceId++) {
        const currentResourceUrl = baseApiUrl + baseResourceUrl + resourceId;
        const currentResource = getResourceFromAPI(currentResourceUrl);

        collectionResources.push(currentResource);
    } 

    return collectionResources;
}

const filmResourceUrl = "films/";
const planetResourceUrl = "planets/";
const swapiUrl = "https://swapi.dev/api/";

// Objects pouvant être utilisés comme valeurs par défaut dans le custom element de lit. 
// ou bien construits par de nouveaux appels à la fonction 'getResourceCollections(...).
export const starWarsFilms : SwapiResourceTypes.Film[] = getResourceCollections(1, 5, swapiUrl, filmResourceUrl);
export const starWarsPlanets : SwapiResourceTypes.Planet[] = getResourceCollections(1, 10, swapiUrl, planetResourceUrl);



