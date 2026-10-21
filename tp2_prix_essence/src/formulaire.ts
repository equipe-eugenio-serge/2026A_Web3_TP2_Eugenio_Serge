// Code de départ : corrigé de référence généré par Claude (Anthropic, 2026), IA générative, 19 octobre 2026.
// Discussion Claude : https://claude.ai/share/74bc8524-479f-4be1-9a2f-ba5818508218
// Prompts (Claude) : « recommence et fait ceci de B1 a B8 :donne moi l'algorithme et la structure de B1 , quels sont les fichiers
//   que l'on doit avaoir a quoi ils servent , leurs roles et les etapes de de B1, les differents algorithmes de B1, » ;
//   « je ne veux pas l'utiliser je veux juste l'avoir comme refentiel: redonne moi la correction en respecatnt uniquement les notions de cours »
// Compréhension pas à pas : Gemini (Google), 19 octobre 2026. Prompts :
// Discussions Gemini : voir la liste des liens dans le README (liens 1 à 5).
//   « explique moi chaque notion module par module, tant que je n'ai pas bien compris un module on ne passe pas à l'autre » ;
//   « pourquoi scinder les expressions pour le mois et l'année et non le faire dans une seule ? » ;
//   « comment valider que le début précède la fin sans convertir en objet Date ? » ;
//   « pourquoi scinder les deux expressions et non la faire dans une seule » ;
//   « pourquoi a limiter a 2010 const ANNEE_MIN = 2010; const ANNEE_MAX = 2026; » ;
//   « donne moi la source pour eviter le plagiat de formulaire ts » ;
//   « explique moi ceci : function lireListe(id: string): HTMLSelectElement { return document.getElementById(id) as HTMLSelectElement; } » ;
//   « quel est la difference avec queryselector »
// Recherche de sources : Claude (Anthropic, 2026), 19 octobre 2026. Prompts : « dans quel fichier on a HTMLSelectElement dans le cours » ;
//   « ce n 'est pas rensiehne la source de HTMLSELECTELEMENT » ; « localecompare a ete vu a quel niveau ? »
// Cours : Filiatreault, K., Fonctions pour lire les éléments (p. 4, getElementById) ;
//         Filiatreault, K., Manipulations DOM (p. 2, createElement ; p. 3, append) ;
//         Filiatreault, K., Introduction à JavaScript (p. 11, boucle for ; p. 13, .value ; p. 14, textContent) ;
//         JS – Array Cheat Sheet (p. 2, localeCompare ; p. 4, forEach) ;
//         Lemelin, B., Théorie – TypeScript (p. 16, types objets ; p. 19, string | null ; p. 25, as) ;
//         exercice « DOM Voitures » (création d'éléments, message d'erreur).
//
// Choix : le mois et l'année sont des listes déroulantes. Leurs valeurs sont déjà du texte ("01", "2024"),
// ce qui évite toute conversion en nombre. La période devient "AAAA-MM", le format attendu par l'API EIA,
// et deux périodes de ce format se comparent directement avec localeCompare.
// « import type » : importe seulement un type (il disparaît du JavaScript final). Commande non enseignée.
// Source : documentation TypeScript, « Type-Only Imports and Export »,
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
// Obligatoire ici parce que le tsconfig.json du projet active verbatimModuleSyntax.
// Source : documentation TypeScript, https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax
// Recherche guidée par Claude (Anthropic, 2026), 19 octobre 2026. Prompts : « donne moi aussi la source de » ; « ajoute aussi la recherche guide par iag comme outil »
// HTMLSelectElement : type TypeScript d'une liste déroulante <select>. Commande non enseignée
// (le cours montre seulement HTMLButtonElement, Théorie – TypeScript, p. 25).
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
// localeCompare utilisé hors de sort() : retourne un nombre positif si debut vient après fin
// (même comparaison que pour le tri, JS – Array Cheat Sheet, p. 2).
// Source : MDN Web Docs, « String.prototype.localeCompare() »,
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
    if (choix.debut.localeCompare(choix.fin) > 0) {
        return "La date de début doit précéder la date de fin.";
    }
    return null;
}