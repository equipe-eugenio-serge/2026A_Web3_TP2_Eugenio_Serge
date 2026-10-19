
//import { Film } from "./swapi_types";
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
export const obtenirFilmAPI = (url: string) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => { 
                resolve(json)
            })
            .catch((error) => {
                reject(error);
            })
    });
};


// Appel asynchrone vers une ressource d'API (url)...
export const getResourceFromAPI = (ressourceUrl: string) => {
    return new Promise((resolve, reject) => {
        fetch(ressourceUrl)
            .then((response) => response.json())
            .then((json) => { 
                resolve(json)
            })
            .catch((error) => {
                reject(error);
                console.log(error);
            })
    });
};


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



