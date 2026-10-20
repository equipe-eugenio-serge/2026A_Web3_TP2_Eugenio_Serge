//Source : Assistance à la compréhension et conception pas-à-pas assistée par IA (Gemini, Google), 19 octobre 2026.
// Prompts utilisés dans la démarche :
//   - « explique moi chaque notion module par module, tant que je n'ai pas bien compris un module on ne passe pas à l'autre »
//   - « pourquoi scinder les expressions pour le mois et l'année et non le faire dans une seule ? »
//   - « comment valider que le début précède la fin sans convertir en objet Date ? »
// Cours : Filiatreault, K., Fonctions pour lire les éléments (p. 4, getElementById) ;
//         Filiatreault, K., Manipulations DOM (p. 2, createElement ; p. 3, append) ;
//         Filiatreault, K., Introduction à JavaScript (p. 11, boucle for ; p. 14, textContent ; .value) ;
//         JS – Array Cheat Sheet (p. 2, localeCompare ; p. 4, forEach) ;
//         Lemelin, B., Théorie – TypeScript (p. 16, types objets ; p. 19, string | null ; p. 25, as).
//
// Choix : le mois et l'année sont des listes déroulantes. Leurs valeurs sont déjà du texte ("01", "2024"),
// ce qui évite toute conversion en nombre. La période devient "AAAA-MM", le format attendu par l'API EIA,
// et deux périodes de ce format se comparent directement avec localeCompare.
// « import type » : importe seulement un type (il disparaît du JavaScript final).
// Source : documentation TypeScript, « Type-Only Imports and Export »,
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
// Obligatoire ici parce que le tsconfig.json créé par Vite active l'option verbatimModuleSyntax.
// Source : documentation TypeScript, option « verbatimModuleSyntax »,
// https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax
// Outil : recherche guidée par une IA générative, Claude (Anthropic, 2026), le 19 octobre 2026.
// Prompt : « donne moi aussi la source de » (suivi de ce commentaire sur import type)
// HTMLSelectElement : type TypeScript d'une liste déroulante <select>:
// Source : MDN Web Docs, « HTMLSelectElement », https://developer.mozilla.org/fr/docs/Web/API/HTMLSelectElement


import type { Devise } from './devises';
import type { CodeEtat } from './etats';
import { ETATS } from './etats';


export type Choix = {
    devise: string,
    code: CodeEtat,
    debut: string,
    fin: string
};

const MOIS = [
    { valeur: "01", nom: "Janvier" }, 
    { valeur: "02", nom: "Février" },
    { valeur: "03", nom: "Mars" }, 
    { valeur: "04", nom: "Avril" },
    { valeur: "05", nom: "Mai" }, 
    { valeur: "06", nom: "Juin" },
    { valeur: "07", nom: "Juillet" }, 
    { valeur: "08", nom: "Août" },
    { valeur: "09", nom: "Septembre" },
     { valeur: "10", nom: "Octobre" },
    { valeur: "11", nom: "Novembre" },
     { valeur: "12", nom: "Décembre" }
];


const ANNEE_MIN = 2010;
const ANNEE_MAX = 2026;

function lireListe(id: string): HTMLSelectElement {
    return document.getElementById(id) as HTMLSelectElement;
}

function ajouterOption(liste: HTMLSelectElement, valeur: string, texte: string): void {
    const option = document.createElement("option");
    option.value = valeur;
    option.textContent = texte;
    liste.append(option);
}

export function remplirDevises(devises: Devise[]): void {
    const liste = lireListe("devise");
    liste.innerHTML = "";
    devises.forEach(devise => {
        ajouterOption(liste, devise.code, devise.nom + " (" + devise.code + ")");
    });
    liste.value = "CAD";
}

export function remplirEtats(): void {
    const liste = lireListe("etat");
    ETATS.forEach(etat => {
        ajouterOption(liste, etat.code, etat.nom);
    });
}

function remplirMois(id: string, valeurParDefaut: string): void {
    const liste = lireListe(id);
    MOIS.forEach(mois => {
        ajouterOption(liste, mois.valeur, mois.nom);
    });
    liste.value = valeurParDefaut;
}

function remplirAnnees(id: string, valeurParDefaut: string): void {
    const liste = lireListe(id);
    for (let annee = ANNEE_MIN; annee <= ANNEE_MAX; annee++) {
        ajouterOption(liste, "" + annee, "" + annee);
    }
    liste.value = valeurParDefaut;
}

export function remplirPeriodes(): void {
    remplirMois("mois-debut", "01");
    remplirAnnees("annee-debut", "2024");
    remplirMois("mois-fin", "12");
    remplirAnnees("annee-fin", "2024");
}

export function lireFormulaire(): Choix {
    const choix: Choix = {
        devise: lireListe("devise").value,
        code: lireListe("etat").value as CodeEtat,
        debut: lireListe("annee-debut").value + "-" + lireListe("mois-debut").value,
        fin: lireListe("annee-fin").value + "-" + lireListe("mois-fin").value
    };
    return choix;
}

export function validerFormulaire(choix: Choix): string | null {
    if (choix.devise === "") {
        return "Veuillez choisir une devise.";
    }
    if (choix.debut.localeCompare(choix.fin) > 0) {
        return "La date de début doit précéder la date de fin.";
    }
    return null;
}