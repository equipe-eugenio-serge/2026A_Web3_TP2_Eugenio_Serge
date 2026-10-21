
import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
//import heroImg from './assets/hero.png'
//import litLogo from './assets/lit.svg'
//import viteLogo from './assets/vite.svg'

import {unsafeCSS} from 'lit'
import bootstrapCss from '../styles/bootstrap-6.0.0-alpha/css/bootstrap.min.css?inline';
//import bootstrapCss2 from 'bootstrap/dist/css/bootstrap.min.css?inline';
//import bootstrapStyles from '../styles/bootstrap-6.0.0-alpha/css/bootstrap.min.css' with { type: 'css' }

// Objets importés de l'api
import type { Film, Planet } from '../scripts/swapi_types.ts'
import '../scripts/swapi_types.ts'
import '../scripts/data_tests.ts'
//import { film1, film2, film3, film4, film5} from '../scripts/data_tests.ts'
import { SwapiResourceItems as Resources } from '../scripts/swapi_items.ts'
import { SwapiResourceTypes as ResourceTypes } from '../scripts/swapi_types.ts'

//const swapiFilmsCollection = Resources.starWarsFilms;
//const swapiPlanetsCollection = Resources.starWarsPlanets;

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('swapi-planets-carousel')
export class SwapiPlanetsCarousel extends LitElement {

    // Liste des planètes passée en propriété (fournie par défaut ici)
    @property({ type: Array })
    planetes = [
        { planetName: '', imageFileName: '' }
    ];

    @property({ type: Array }) 
    swapiPlanetsImages = [ { planetName: "", imageFileName: "" }];

    static styles1 = css`${unsafeCSS(bootstrapCss)}`;
    /**
     * The collection of films that will be displayed 
     * in the drop-down select list.
     */
    //@state() private apiFilmCollections: Film[] = [];
    @state() private currentSelectedFilm: Film | null = null;
    @state() private selectedFilmPlanets : Planet[] = [];
    @state() private selectedFilmImages =  [ { planetName: "", imageFileName: "" }];
    @state() private currentIndex = 0;
    @state() private isResourceLoading = false;
    @state() private apiBaseFilmUrl = "https://swapi.dev/api/films";
    @state() private hasActiveAnimation = true;
    @state() private currentAnimationSpeed = 1000; // Moyen par défaut (1000ms)

    @property({ type: Array })
    //apiFilmCollections = Resources.getFilmResourceFromAPI;
    //apiFilmCollections = Resources.getResourceCollections(1, 5);
    apiFilmCollections = Resources.getFilmResourceCollections(1, 5);
    //apiFilmCollections = Resources.obtenirFilmAPI(this.apiBaseFilmUrl);

    // Source : https://share.google/aimode/xEX97061NmKUnQm09
    private timerId: any = null;

    // Initialisation au montage du composant
    connectedCallback() {
        super.connectedCallback();
        this.startAnimationTimer();
        this.fetchFilmDropdownList();
    }

    // Nettoyage au démontage du composant pour éviter les fuites de mémoire
    disconnectedCallback() {
        super.disconnectedCallback();
        this.stopAnimationTimer();
    }
/*
    // To initialize the component...
    onLoadedCallBack() {
        super.connectedCallback();
        this.fetchFilmDropdownList();
    }*/

    private async fetchFilmDropdownList() {
        this.isResourceLoading = true;

        try {
            // Tests data...
            //this.apiFilmCollections = [film1, film2, film3, film4, film5];
            //const response = await Resources.getResourceCollections(1, 5, filmUrl);
            //const response = await Resources.obtenirFilmAPI(this.apiBaseFilmUrl);
            //const response = Resources.getFilmResourceAPI(this.apiBaseFilmUrl);
            //const response = await Resources.getResourceCollections(1, 6);
            const response = await Resources.getFilmResourceCollections(1, 6);
            //const response = await Resources.getFilmResourceFromAPI;
            this.apiFilmCollections = response;
            //this.currentSelectedFilm = null;
            if (this.apiFilmCollections.length > 0) {
                this.currentSelectedFilm = this.apiFilmCollections[0];
                this.selectedFilmPlanets = this.currentSelectedFilm?.planets || []; 
                this.buildSelectedItemImageList();         
            }
        }
        catch(error) {
            console.error("Failed fetching carousel data", error);
        }
    }


    private buildSelectedItemImageList() {

        // ToDoNext (Done !) : check for empty array results to apply filter for images...
        if (this.selectedFilmPlanets.length > 0) {
            // Extract the planet names into an array first for clean readability
            const filmPlanetNames = this.currentSelectedFilm?.planets.map(p => p.name) || [];

            // Filter, map, and spread the results directly into the associated array
            // Use of the spread operator (...) represented by the three dots to push 
            // items one by one into the 'selectedFilmImages' array. Without that spread 
            // operator (...), the method 'push' would only append the the entire images 
            // array produced by the 'filter' method.
            // Sources of Notes on correction using spread operator : 
            // https://share.google/aimode/xEX97061NmKUnQm09
            this.selectedFilmImages.push(...this.swapiPlanetsImages.filter(i => 
                                        filmPlanetNames.includes(i.planetName)));
            this.selectedFilmImages.push(...this.swapiPlanetsImages
                                        .filter(i => filmPlanetNames
                                            .includes(i.planetName)));
        } 
        //
    }
    ////////////////////////////

    // Gère le démarrage du setInterval
    private startAnimationTimer() {
        this.stopAnimationTimer(); // Sécurité : on nettoie l'ancien timer avant d'en créer un
        if (this.hasActiveAnimation) {
        this.timerId = setInterval(() => {
            this.suivant();
        }, this.currentAnimationSpeed);
        }
    }

    // Gère l'arrêt du setInterval
    private stopAnimationTimer() {
        if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
        }
    }

    // https://share.google/aimode/xEX97061NmKUnQm09
    // Passage à l'image suivante (avec boucle)
    private suivant() {
        if (this.planetes.length === 0) return;
        this.currentIndex = (this.currentIndex + 1) % this.planetes.length;
    }

    // Clic manuel Suivant : change de slide et réinitialise le délai si actif
    private actionSuivant() {
        this.suivant();
        if (this.hasActiveAnimation) {
        this.startAnimationTimer();
        }
    }

    // Clic manuel Précédent (avec boucle inversée) et réinitialise le délai si actif
    private actionPrecedent() {
        if (this.swapiPlanetsImages.length === 0) return;
        this.currentIndex = (this.currentIndex - 1 + this.swapiPlanetsImages.length) % this.swapiPlanetsImages.length;
        if (this.hasActiveAnimation) {
        this.startAnimationTimer();
        }
    }

    // Bascule l'état de la rotation automatique (Activer / Arrêter)
    private basculerRotation() {
        this.hasActiveAnimation = !this.hasActiveAnimation;
        if (this.hasActiveAnimation) {
            this.startAnimationTimer();
        } 
        else {
            this.stopAnimationTimer();
        }
    }

    // Changement dynamique de la vitesse
    private changeAnimationSpeed(e: Event) {
        const selectElement = e.target as HTMLSelectElement;
        this.currentAnimationSpeed = parseInt(selectElement.value, 10);
        // On stoppe et redémarre la minuterie courante avec la nouvelle vitesse
        if (this.hasActiveAnimation) {
        this.startAnimationTimer();
        }
    }

    render() {
        if (!this.swapiPlanetsImages || this.swapiPlanetsImages.length === 0) {
        return html`<p>Aucune planète à afficher.</p>`;
        }

        //this.planetes = this.selectedFilmImages;
        const planete = this.swapiPlanetsImages[this.currentIndex];

    return html`
        <section class="mt-1rem" id="center">
            <div class="row" id="">
                <form action="" method="" class="w-50 my-auto">
                    <div class="form-group form-group-lg">
                        <label for="selectedFilm" class="form-label">
                            Sélection de film : 
                        </label>
                        <select class="form-select form-select-lg" id="selectedFilm" name="" @change=${this.onSelectionChange}>
                            <option value=0>Sélectionner un film</option>
                            ${this.apiFilmCollections.map((film: Film) => 
                                html`<option value=${film.id} selected= 
                                ${this.currentSelectedFilm?.id} === ${film.id}>${film.title}
                                </option>`)
                            }
                        </select>
                    </div>
                </form>
            </div>
        </section>

        <div class="wrapper">
            <img class="image-planete" src="../images/${planete.imageFileName}" alt="${planete.planetName}">
            <h2 class="nom-planete">Planète : ${planete.planetName}</h2>
            <!--<h2 class="nom-planete1">${planete.planetName} - Nombre de films : ${this.swapiPlanetsImages.length}</h2>-->
        </div>

        <div class="controles">
            <button @click="${this.actionPrecedent}">&#10094; Précédent</button>
            <button @click="${this.basculerRotation}">
            ${this.hasActiveAnimation ? 'Arrêter' : 'Activer'}
            </button>
            <button @click="${this.actionSuivant}">Suivant &#10095;</button>
        </div>

        <div class="form-group mb-1rem">
            <label for="speed-select">Vitesse de rotation :</label>
            <select id="speed-select" .value="${String(this.currentAnimationSpeed)}" @change="${this.changeAnimationSpeed}">
            <!--
            <option value="2500">+ Lent (2500 ms)</option>-->
            <option value="1500">Lent (1500 ms)</option>
            <option value="1000">Moyen (1000 ms)</option>
            <option value="500">Rapide (500 ms)</option><!--
            <option value="250">+ Rapide (250 ms)</option>-->
            </select>
        </div>
        `;
    }


    // Handle films dropdown list choice updates...
    private onSelectionChange(e: Event) {
        const selectElement = e.target as HTMLSelectElement;
        const selectedItem = this.apiFilmCollections.find((item) => 
                            item.id === parseInt(selectElement.value));
        
        this.currentSelectedFilm = selectedItem || null;
        this.selectedFilmPlanets = this.currentSelectedFilm?.planets || [];

        this.buildSelectedItemImageList();

        // Reset index view to first image on context shift
        this.currentIndex = 0; 
    }
    static styles = [
    //bootstrapStyles, 
    //bootstrapCss, 
    css`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: sans-serif;
            gap: 15px;
        }

        .wrapper {
            position: relative;
            width: 75%;
            height: 25rem;
            overflow: hidden;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .image-planete {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .nom-planete {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            text-align: center;
            text-transform: capitalize;
            /*p::first-letter: capitalize;*/
            padding: 10px;
            margin: 1rem;
            font-size: 2.5rem;
        }
        .nom-planete1 {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            text-align: center;
            text-transform: capitalize;
            /*p::first-letter: capitalize;*/
            padding: 10px;
            margin: 0;
            font-size: 1.2rem;
        }
        .controles {
            display: flex;
            gap: 10px;
        }
        button, select {
            padding: 8px 12px;
            font-size: 1rem;
            cursor: pointer;
        }
        .mb-1rem {
            margin-bottom: 1rem;
        }

        .mt-1rem {
            margin-top: 1rem;
        }
    `];
}


declare global {
    interface HTMLElementTagNameMap {
        'swapi-planets-carousel': SwapiPlanetsCarousel
    }
}
