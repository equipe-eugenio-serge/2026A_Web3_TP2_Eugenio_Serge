
// Tout le contenu d'un fichier peut être exporté (ou importé) 
// en un seul ensemble...
// Sources : https://share.google/CzNHMIvitHAUeRupS
// Search Query : Can I export the whole content of a typescript file 
// into another file ?
import { SwapiResourceTypes } from "./swapi_types";


const planet1 = {
    id: 1, 
    name: "Tatooine",
    rotation_period: "23",
    orbital_period: "304",
    diameter: "10465",
    climate: "arid",
    gravity: "1 standard",
    terrain: "desert",
    surface_water: "1",
    population: "200000", 
    residents: [], 
    films: [], 
    created: "2014-12-09T13:50:49.641000Z",
    edited: "2014-12-20T20:58:18.411000Z",
    url: "https://swapi.dev/api/planets/1/"
}

const planet2 = {
    id: 2, 
    name: "Alderaan",
    rotation_period: "24",
    orbital_period: "364",
    diameter: "12500",
    climate: "temperate",
    gravity: "1 standard",
    terrain: "grasslands, mountains",
    surface_water: "40",
    population: "2000000000", 
    residents: [], 
    films: [], 
    created: "2014-12-10T11:35:48.479000Z",
    edited: "2014-12-20T20:58:18.420000Z",
    url: "https://swapi.dev/api/planets/2/"
}

const planet3 = {
    id: 3, 
    name: "Yavin IV",
    rotation_period: "24",
    orbital_period: "4818",
    diameter: "10200",
    climate: "temperate, tropical",
    gravity: "1 standard",
    terrain: "jungle, rainforests",
    surface_water: "8",
    population: "1000", 
    residents: [], 
    films: [], 
    created: "2014-12-10T11:37:19.144000Z",
    edited: "2014-12-20T20:58:18.421000Z",
    url: "https://swapi.dev/api/planets/3/"
}

const planet4 = {
    id: 4, 
    name: "Hoth",
    rotation_period: "23",
    orbital_period: "549",
    diameter: "7200",
    climate: "frozen",
    gravity: "1.1 standard",
    terrain: "tundra, ice caves, mountain ranges",
    surface_water: "100",
    population: "unknown", 
    residents: [], 
    films: [], 
    created: "2014-12-10T11:39:13.934000Z",
    edited: "2014-12-20T20:58:18.423000Z",
    url: "https://swapi.dev/api/planets/4/"
}

const planet5 = {
    id: 5, 
    name: "Dagobah",
    rotation_period: "23",
    orbital_period: "341",
    diameter: "8900",
    climate: "murky",
    gravity: "N/A",
    terrain: "swamp, jungles",
    surface_water: "8",
    population: "unknown", 
    residents: [], 
    films: [], 
    created: "2014-12-10T11:42:22.590000Z",
    edited: "2014-12-20T20:58:18.425000Z",
    url: "https://swapi.dev/api/planets/5/"
}

const planet6 = {
    id: 6, 
    name: "Bespin",
    rotation_period: "12",
    orbital_period: "5110",
    diameter: "118000",
    climate: "temperate",
    gravity: "1.5 (surface), 1 standard (Cloud City)",
    terrain: "gas giant",
    surface_water: "0",
    population: "6000000",
    residents: [], 
    films: [], 
    created: "2014-12-10T11:43:55.240000Z",
    edited: "2014-12-20T20:58:18.427000Z",
    url: "https://swapi.dev/api/planets/6/"
}

const planet7 = {
    id: 7, 
    name: "Endor",
    rotation_period: "18",
    orbital_period: "402",
    diameter: "4900",
    climate: "temperate",
    gravity: "0.85 standard",
    terrain: "forests, mountains, lakes",
    surface_water: "8",
    population: "30000000",
    residents: [], 
    films: [], 
    created: "2014-12-10T11:50:29.349000Z",
    edited: "2014-12-20T20:58:18.429000Z",
    url: "https://swapi.dev/api/planets/7/"
}

const planet8 = {
    id: 8, 
    name: "Naboo",
    rotation_period: "26",
    orbital_period: "312",
    diameter: "12120",
    climate: "temperate",
    gravity: "1 standard",
    terrain: "grassy hills, swamps, forests, mountains",
    surface_water: "12",
    population: "4500000000",  
    residents: [], 
    films: [], 
    created: "2014-12-10T11:52:31.066000Z",
    edited: "2014-12-20T20:58:18.430000Z",
    url: "https://swapi.dev/api/planets/8/"
}

const planet9 = {
    id: 9, 
    name: "Coruscant",
    rotation_period: "24",
    orbital_period: "368",
    diameter: "12240",
    climate: "temperate",
    gravity: "1 standard",
    terrain: "cityscape, mountains",
    surface_water: "unknown",
    population: "1000000000000", 
    residents: [], 
    films: [], 
    created: "2014-12-10T11:54:13.921000Z",
    edited: "2014-12-20T20:58:18.432000Z",
    url: "https://swapi.dev/api/planets/9/"
}

const planet10 = {
    id: 10, 
    residents: [], 
    films: [], 
}

const planet11 = {
    id: 11,  
    residents: [], 
    films: [], 
}

const planet27 = {
    id: 27,  
    residents: [], 
    films: [], 
}

// Remarques: Données de tests pour exécutions en local...
// Pour tout film considéré, les champs correspondants 
// dans les variables de type 'planet' (ou les autres types) 
// ne peuvent pas être renseignés conformément à de l'API...
// A noter que nous obtenons des erreurs de compliation causées 
// par l'ordre de déclaration. Donc, une variable 'film1' peut 
// être validée dans la liste de valeurs d'une autre variable 
// 'planet1' seulement si film1 est déclarée avant planet1. 
// Et si tel est le cas, planet1 ne peut pas être dans la liste 
// des valeurs de film1 !!!
const film1 = {
    id: 1, 
    title: "A New Hope",
    episode_id: 4,
    opening_crawl: "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire...", 
    director: "George Lucas",
    producer: "Gary Kurtz, Rick McCallum",
    release_date: "1977-05-25", 
    characters: [], 
    planets: [planet1, planet2, planet3], 
    starships: [], 
    vehicles: [], 
    species: [], 
    created: "2014-12-10T14:23:31.880000Z",
    edited: "2014-12-20T19:49:45.256000Z",
    url: "https://swapi.dev/api/films/1/"
}

const film2 = {
    id: 2, 
    title: "The Empire Strikes Back",
    episode_id: 5,
    opening_crawl: "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed...", 
    director: "Irvin Kershner",
    producer: "Gary Kurtz, Rick McCallum",
    release_date: "1980-05-17",
    characters: [], 
    planets: [planet4, planet5, planet6, planet27], 
    starships: [], 
    vehicles: [], 
    species: [], 
    created: "2014-12-12T11:26:24.656000Z",
    edited: "2014-12-15T13:07:53.386000Z",
    url: "https://swapi.dev/api/films/2/"
}

const film3 = {
    id: 3, 
    title: "Return of the Jedi", 
    episode_id: 6, 
    opening_crawl: "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt...", 
    director: "Richard Marquand",
    producer: "Howard G. Kazanjian, George Lucas, Rick McCallum",
    release_date: "1983-05-25",
    characters: [], 
    planets: [planet1, planet5, planet7, planet8, planet9], 
    starships: [], //N-N relation : cause erreur de compilation...
    vehicles: [], 
    species: [],
    created: "2014-12-18T10:39:33.255000Z",
    edited: "2014-12-20T09:48:37.462000Z",
    url: "https://swapi.dev/api/films/3/"
}

const film4 = {
    id: 4, 
    title: "The Phantom Menace",
    episode_id: 1,
    opening_crawl: "Turmoil has engulfed the\r\nGalactic Republic. The taxation\r\nof trade routes to outlying star\r\nsystems is in dispute...", 
    director: "George Lucas",
    producer: "Rick McCallum",
    release_date: "1999-05-19", 
    characters: [], 
    planets: [planet1, planet8, planet9], 
    starships: [], //N-N relation : cause erreur de compilation...
    vehicles: [], 
    species: [],
    created: "2014-12-19T16:52:55.740000Z",
    edited: "2014-12-20T10:54:07.216000Z",
    url: "https://swapi.dev/api/films/4/"
}

const film5 = {
    id: 5, 
    title: "Attack of the Clones",
    episode_id: 2, 
    opening_crawl: "There is unrest in the Galactic\r\nSenate. Several thousand solar\r\nsystems have declared their\r\nintentions to leave the Republic...", 
    director: "George Lucas", 
    producer: "Rick McCallum", 
    release_date: "2002-05-16", 
    characters: [], 
    planets: [planet1, planet8, planet9, planet10, planet11], 
    starships: [], //N-N relation : cause erreur de compilation...
    vehicles: [], 
    species: [], 
    created: "2014-12-20T10:57:57.886000Z", 
    edited: "2014-12-20T20:18:48.516000Z", 
    url: "https://swapi.dev/api/films/5/"
}