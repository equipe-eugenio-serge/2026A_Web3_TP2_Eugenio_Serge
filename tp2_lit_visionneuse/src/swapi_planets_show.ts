
import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
//import heroImg from './assets/hero.png'
//import litLogo from './assets/lit.svg'
//import viteLogo from './assets/vite.svg'

import {unsafeCSS} from 'lit'
import bootstrapCss from '../styles/bootstrap-6.0.0-alpha/css/bootstrap.min.css?inline';
//import bootstrapCss2 from 'bootstrap/dist/css/bootstrap.min.css?inline';

// Objets importés de l'api
import type { Film, Planet } from '../scripts/swapi_types.ts'
import '../scripts/swapi_types.ts'
import { SwapiResourceItems as Resources } from '../scripts/swapi_items.ts'

//const swapiFilmsCollection = Resources.starWarsFilms;
//const swapiPlanetsCollection = Resources.starWarsPlanets;

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('swapi-planets-show')
export class SwapiPlanetShow extends LitElement {
    static styles1 = css`${unsafeCSS(bootstrapCss)}`;
    /**
     * The collection of films that will be displayed 
     * in the drop-down select list.
     */
    @state() private apiFilmCollections: Film[] = [];
    @state() private currentSelectedFilm: Film | null = null;
    @state() private selectedFilmPlanets : Planet[] = [];
    //@state() private selectedFilmImages : [] =  [ { planetName: "", imageFileName: "" }];
    //@state() private planetImagesCollection : [] = [];
    @state() private currentIndex = 0;
    @state() private isResourceLoading = false;

    @property({type: String}) selected = '';
    @property({ type: Array })
    filmCollections = Resources.getResourceCollections(1, 5);
    @property({ type: Array }) 
    swapiPlanetsImages = [ { planetName: "", imageFileName: "" }];
    
    // Dispatch a custom event (onSelectionChange) 
    // to listen to changes in the select element
    // Sources : 
    /*
    onSelectionChange(e: any) {
        this.selected = e.target?.value;
        this.dispatchEvent(new CustomEvent('item-selected', {
        detail: { value: this.selected }
        }));
    }*/

    render() {
        //const images = this.currentSelectedFilm?.images || [];
        //const planets = this.currentSelectedFilm?.planets || [];
        const image_planets = this.selectedFilmPlanets;/*
        if ((!this.apiFilmCollections) || 
            (this.apiFilmCollections?.length == 0)) {
            return html`No planet to display !`
        }*/

        return html`
            <section class="" id="center">
                <div class="row" id="">
                    <form action="" method="" class="w-50 my-auto">
                        <div class="form-group form-group-lg">
                            <label for="selectedFilm" class="form-label">
                                Sélection de film : 
                            </label>
                            <select class="form-select form-select-lg" id="selectedFilm" name="" @change=${this.onSelectionChange}>
                                <option value="0">Sélectionner un film</option>
                                ${this.apiFilmCollections.map((film: Film) => 
                                    html`<option value=\(${film.id} ? selected=\) ${this.currentSelectedFilm?.id} === ${film.id}>${film.title}</option>`)
                                }
                            </select>
                        </div>
                    </form>
                </div>
            </section>

            <div class="carousel-container">
                ${this.isResourceLoading 
                ? html`<div class="status-text">Loading options...</div>` 
                : image_planets.length === 0 
                    ? html`<div class="status-text">No images found.</div>`
                    : html`
                        <!-- Navigation Arrows -->
                        <button class="nav-btn prev" @click=${this.showPreviousSlide}>&#10094;</button>
                        <button class="nav-btn default" @click=${this.setSlidesAnimation}>&#10094;</button>
                        <button class="nav-btn next" @click=${this.showNextSlide}>&#10095;</button>

                        <!-- Sliding Viewport Track -->
                        <div class="carousel-track" style="transform: translateX(-${this.currentIndex * 100}%);">
                        ${image_planets.map((planet, index) => html`
                            <div class="slide">
                                <img src="../images/${planet.name}.jpg" alt="Carousel image ${index + 1}" loading="lazy">
                            </div>
                        `)}
                        </div>
                    `
                }
            </div>

            <!-- Navigation Dots (Indicators) -->
            ${image_planets.length > 0 ? html`
                <div class="indicators">
                ${image_planets.map((_, index) => html`
                    <button 
                    class="dot ${this.currentIndex === index ? 'active' : ''}" 
                    @click=${() => this.moveToTargetSlide(index)}
                    aria-label="Go to slide ${index + 1}">
                    </button>
                `)}
                </div>
            ` : ''}
        `
    }
//}

    onLoadedCallBack() {
        super.connectedCallback();
        this.fetchFilmDropdownList();
    }

    private async fetchFilmDropdownList() {
        this.isResourceLoading = true;

        try {
            const filmUrl = "films/";
            const response = await Resources.getResourceCollections(1, 5, filmUrl);
            this.apiFilmCollections = response;
            //this.currentSelectedFilm = null;
            if (this.apiFilmCollections.length > 0) {
                this.currentSelectedFilm = this.apiFilmCollections[0];
                this.selectedFilmPlanets = this.currentSelectedFilm.planets;

                // ToDoNext : check for empty array results to apply filter for images...
                if (this.selectedFilmPlanets.length > 0) {
                }                 
            }
        }
        catch(error) {
            console.error("Failed fetching carousel data", error);
        }
    }

    // Handle films dropdown list choice updates...
    private onSelectionChange(e: Event) {
        const selectElement = e.target as HTMLSelectElement;
        const selectedItem = this.apiFilmCollections.find((item) => item.id === parseInt(selectElement.value));
        
        this.currentSelectedFilm = selectedItem || null;
        this.selectedFilmPlanets = this.currentSelectedFilm?.planets || [];
        // Reset index view to first image on context shift
        this.currentIndex = 0; 
    }

    // ToDo :
    private setSlidesAnimation(timeoutDelay: Number) {
        const timeoutField = document.getElementById('timeoutDelay');
        let timeoutValue = (timeoutField?.textContent ? 
                        parseInt(timeoutField?.textContent) : 1000);
        // Défilement Lent : 1500 ms
        // Défilement Rapide : 500 ms
        // Défilement moyen : 1000 ms
    }

    private showNextSlide() {
        if (!this.currentSelectedFilm) return;
        const max = this.currentSelectedFilm.planets.length;
        this.currentIndex = (this.currentIndex + 1) % max;
    }

    private showPreviousSlide() {
        if (!this.currentSelectedFilm) return;
        const max = this.currentSelectedFilm.planets.length;
        this.currentIndex = (this.currentIndex - 1 + max) % max;
    }

    private moveToTargetSlide(index: number) {
        this.currentIndex = index;
    }

    static styles = css`
        :host {
        --text: #6b6375;
        --text-h: #08060d;
        --bg: #fff;
        --border: #e5e4e7;
        --code-bg: #f4f3ec;
        --accent: #aa3bff;
        --accent-bg: rgba(170, 59, 255, 0.1);
        --accent-border: rgba(170, 59, 255, 0.5);
        --social-bg: rgba(244, 243, 236, 0.5);
        --shadow:
            rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;

        --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
        --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
        --mono: ui-monospace, Consolas, monospace;

        font: 18px/145% var(--sans);
        letter-spacing: 0.18px;

        width: 1126px;
        max-width: 100%;
        margin: 0 auto;
        text-align: center;
        border-inline: 1px solid var(--border);
        min-height: 100svh;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        color: var(--text);
        }

        @media (prefers-color-scheme: dark) {
        :host {
            --text: #9ca3af;
            --text-h: #f3f4f6;
            --bg: #16171d;
            --border: #2e303a;
            --code-bg: #1f2028;
            --accent: #c084fc;
            --accent-bg: rgba(192, 132, 252, 0.15);
            --accent-border: rgba(192, 132, 252, 0.5);
            --social-bg: rgba(47, 48, 58, 0.5);
            --shadow:
            rgba(0, 0, 0, 0.4) 0 10px 15px -3px,
            rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
        }

        #social .button-icon {
            filter: invert(1) brightness(2);
        }
        }

        h1,
        h2,
            ::slotted(h1),
            ::slotted(h2) {
            font-family: var(--heading);
            font-weight: 500;
            color: var(--text-h);
        }

        h1,
        ::slotted(h1) {
            font-size: 56px;
            letter-spacing: -1.68px;
            margin: 32px 0;
        }

        h2 {
            font-size: 24px;
            line-height: 118%;
            letter-spacing: -0.24px;
            margin: 0 0 8px;
        }

        p {
            margin: 0;
        }

        code {
            font-family: var(--mono);
            font-size: 15px;
            line-height: 135%;
            display: inline-flex;
            padding: 4px 8px;
            border-radius: 4px;
            color: var(--text-h);
            background: var(--code-bg);
        }

        .counter {
            font-family: var(--mono);
            font-size: 16px;
            display: inline-flex;
            padding: 5px 10px;
            border-radius: 5px;
            color: var(--accent);
            background: var(--accent-bg);
            border: 2px solid transparent;
            transition: border-color 0.3s;
            margin-bottom: 24px;
            cursor: pointer;
        }

        .counter:hover {
            border-color: var(--accent-border);
        }

        .counter:focus-visible {
            outline: 2px solid var(--accent);
            outline-offset: 2px;
        }

        .hero {
            position: relative;
        }

        .hero .base,
        .hero .framework,
        .hero .vite {
            inset-inline: 0;
            margin: 0 auto;
        }

        .hero .base {
            width: 170px;
            position: relative;
            z-index: 0;
        }

        .hero .framework,
        .hero .vite {
            position: absolute;
        }

        .hero .framework {
            z-index: 1;
            top: 34px;
            height: 28px;
            transform: perspective(2000px) rotateZ(300deg) rotateX(44deg)
            rotateY(39deg) scale(1.4);
        }

        .hero .vite {
            z-index: 0;
            top: 107px;
            height: 26px;
            width: auto;
            color: var(--vite-logo);
            transform: perspective(2000px) rotateZ(300deg) rotateX(40deg)
            rotateY(39deg) scale(0.8);
        }

        #center {
            display: flex;
            flex-direction: column;
            gap: 25px;
            place-content: center;
            place-items: center;
            flex-grow: 1;
        }

        #next-steps {
            display: flex;
            border-top: 1px solid var(--border);
            text-align: left;
        }

        #next-steps > div {
            flex: 1 1 0;
            padding: 32px;
        }

        #next-steps .icon {
            margin-bottom: 16px;
            width: 22px;
            height: 22px;
        }

        #docs {
            border-right: 1px solid var(--border);
        }

        #next-steps ul {
            list-style: none;
            padding: 0;
            display: flex;
            gap: 8px;
            margin: 32px 0 0;
        }

        #next-steps ul .logo {
            height: 18px;
        }

        #next-steps ul .logo svg {
            height: 100%;
            width: auto;
        }

        #next-steps ul a {
            color: var(--text-h);
            font-size: 16px;
            border-radius: 6px;
            background: var(--social-bg);
            display: flex;
            padding: 6px 12px;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            transition: box-shadow 0.3s;
        }

        #next-steps ul a:hover {
            box-shadow: var(--shadow);
        }

        #next-steps ul .button-icon {
            height: 18px;
            width: 18px;
        }

        #spacer {
            height: 88px;
            border-top: 1px solid var(--border);
        }

        .ticks {
            position: relative;
            width: 100%;
        }

        .ticks::before,
        .ticks::after {
            content: '';
            position: absolute;
            top: -4.5px;
            border: 5px solid transparent;
        }

        .ticks::before {
            left: 0;
            border-left-color: var(--border);
        }

        .ticks::after {
            right: 0;
            border-right-color: var(--border);
        }

        @media (max-width: 1024px) {
        :host {
            font-size: 16px;
            width: 100%;
            max-width: 100%;
        }

        h1,
        ::slotted(h1) {
            font-size: 36px;
            margin: 20px 0;
        }

        h2,
        ::slotted(h2) {
            font-size: 20px;
        }

        #center {
            padding: 32px 20px 24px;
            gap: 18px;
        }

        #next-steps {
            flex-direction: column;
            text-align: center;
        }

        #next-steps > div {
            padding: 24px 20px;
        }

        #docs {
            border-right: none;
            border-bottom: 1px solid var(--border);
        }

        #next-steps ul {
            margin-top: 20px;
            flex-wrap: wrap;
            justify-content: center;
        }

        #next-steps ul li {
            flex: 1 1 calc(50% - 8px);
        }

        #next-steps ul a {
            width: 100%;
            justify-content: center;
            box-sizing: border-box;
        }

        #spacer {
            height: 48px;
        }
    }
    `
}

declare global {
    interface HTMLElementTagNameMap {
        'swapi-planet-show': SwapiPlanetShow
    }
}
