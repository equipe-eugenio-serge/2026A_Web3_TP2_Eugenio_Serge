// Code de départ : corrigé de référence généré par Claude (Anthropic, 2026), IA générative, 19 octobre 2026.
// Discussion Claude : https://claude.ai/share/74bc8524-479f-4be1-9a2f-ba5818508218
// Prompts (Claude) : « recommence et fait ceci de B1 a B8 :donne moi l'algorithme et la structure de B1 , quels sont les fichiers
//   que l'on doit avaoir a quoi ils servent , leurs roles et les etapes de de B1, les differents algorithmes de B1, » ;
//   « je ne veux pas l'utiliser je veux juste l'avoir comme refentiel: redonne moi la correction en respecatnt uniquement les notions de cours » ;
//   « dans le cours on a vu DOMContenLoaded ? »
// Tests : Gemini (Google), 19 octobre 2026. Prompt : « comment tester sur vscode que ca fonctionne »
// Discussions Gemini : voir la liste des liens dans le README (liens 1 à 5).
// Cours : Filiatreault, K., Événements (p. 5, submit ; p. 6, addEventListener et DOMContentLoaded) ;
//         Filiatreault, K., Précisions sur les événements (p. 7, preventDefault) ;
//         Filiatreault, K., JS – Promises, async et await (p. 11 à 13, await et try/catch) ;
//         Filiatreault, K., exemple 03_promiseAll.js (Promise.all) ;
//         Lemelin, B., Théorie – TypeScript (p. 24, déstructuration ; p. 25, as) ;
//         JS – Array Cheat Sheet (p. 3, find).


import './style.css';
import { ETATS } from './etats';
import { obtenirDevisesAvecCache, obtenirTauxAvecCache } from './cache';
import { remplirDevises, remplirEtats, remplirPeriodes, lireFormulaire, validerFormulaire } from './formulaire';
import { obtenirPrix } from './eia';
import { obtenirTaux, convertirPrix } from './conversion';
import { afficherGraphique } from './graphique';
import { afficherMessage, effacerMessage } from './messages';

const afficherPrix = async (evenement: Event) => {
    evenement.preventDefault();
    effacerMessage();

    const choix = lireFormulaire();
    const erreur = validerFormulaire(choix);
    if (erreur !== null) {
        afficherMessage("erreur", erreur);
        return;
    }

    afficherMessage("chargement", "Chargement des données…");

    try {
        const [prix, tauxUSD] = await Promise.all([
            obtenirPrix(choix.code, choix.debut, choix.fin),
            obtenirTauxAvecCache()
        ]);

        const points = convertirPrix(prix, obtenirTaux(tauxUSD, choix.devise));

        let nomEtat = "";
        const etat = ETATS.find(e => e.code === choix.code);
        if (etat !== undefined) {
            nomEtat = etat.nom;
        }

        afficherGraphique(points, choix.devise, nomEtat);
        afficherMessage("succes", "Graphique affiché pour " + points.length + " mois.");
    }
    catch (e) {
        console.error(e);
        afficherMessage("erreur", (e as Error).message);
    }
};

const initialiser = async () => {
    remplirEtats();
    remplirPeriodes();

    // HTMLFormElement : type TypeScript d'une balise <form>. Commande non enseignée
    // (le cours montre seulement HTMLButtonElement, Théorie – TypeScript, p. 25).
    // Source : MDN Web Docs, « HTMLFormElement », https://developer.mozilla.org/fr/docs/Web/API/HTMLFormElement


    const formulaire = document.getElementById("formulaire") as HTMLFormElement;
    formulaire.addEventListener("submit", afficherPrix);

    try {
        const devises = await obtenirDevisesAvecCache();
        remplirDevises(devises);
    }
    catch (e) {
        console.error(e);
        afficherMessage("erreur", "Impossible de charger la liste des devises.");
    }
};

window.addEventListener("DOMContentLoaded", initialiser);