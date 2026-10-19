
// Tout le contenu du fichier peut être exporté (ou importé) 
// en un seul ensemble.
// Sources : https://share.google/CzNHMIvitHAUeRupS
// Search Query : Can I export the whole content of a typescript file 
// into another file ?
export * as SwapiResourceTypes from './swapi_types';


// Les types définis dans ce code suit une forme globale 
// basée sur la structure d'objets retournés par l'API (swapi).
// Le type 'species' n'est pas traité dans ce travail, 
// mais nécessaire pour bien construire le type film.
export type Species = {
    id: number
}

// Le type 'vehicle' n'est pas traité dans ce travail, 
// mais nécessaire pour bien construire le type film.
export type Vehicle = {
    id: number
}

// Le type 'starship' n'est pas traité dans ce travail, 
// mais nécessaire pour bien construire le type film.
export type Starship = {
    id: number
}

// Structure d'un objet 'person' basé sur le retour de l'API
// Réf. : https://swapi.dev/api/people/5/
export type People = {
    id: number
    name: string, 
    mass: number, 
    height: number, 
    hair_color: string, 
    skin_color: string, 
    eye_color: string, 
    birth_year: string, 
    gender: string, 
    home_world: string, 
    films: Film[],
    species: Species[], 
    vehicles: Vehicle[], 
    starships: Starship[], 
    created: Date, 
    edited: Date, 
    url: string
};

// Structure d'un objet 'planet' basé sur le retour de l'API
// Réf. : https://swapi.dev/api/planets/1/
export type Planet = {
    id: number, 
    name: string, 
    rotation_period: number, 
    orbital_period: number, 
    diameter: number, 
    climate: string, 
    gravity: string, 
    terrain: string, 
    surface_water: number, 
    population: number, 
    residents: People[], 
    films: Film[], 
    created: Date,
    edited: Date,
    url: string
};

// Structure d'un objet film basé sur le retour de l'API
// Réf. : https://swapi.dev/api/films/3/
export type Film = {
    id: number, 
    title: string, 
    episode_id: number, 
    director : string, 
    producer: string, 
    opening_crawl: string, 
    release_date: Date, 
    //characters: PaymentComplete, 
    characters: People[], 
    planets: Planet[], 
    starships: Starship[], 
    vehicles: Vehicle[], 
    species: Species[], 
    created: Date, 
    edited: Date, 
    url: string
};

