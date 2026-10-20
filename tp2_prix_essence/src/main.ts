// Source : algorithme de B6 proposé par Claude (Anthropic, 2026), IA générative, le 19 octobre 2026.
// Prompt (algorithme) : « recommence et fait ceci de B1 a B8 :donne moi l'algorithme de B1 ,
//   quels sont les fichiers que l'on doit avaoir a quoi ils servent , leurs roles et les etapes de de B1,
//   les differents algorithmes de B1, »
// Cours : Filiatreault, K., Événements (p. 5, submit ; p. 6, addEventListener et DOMContentLoaded) ;
//         Filiatreault, K., Précisions sur les événements (p. 7, preventDefault) ;
//         Filiatreault, K., JS – Promises, async et await (p. 11 à 13) et exemple 03_promiseAll.js (Promise.all) ;
//         Lemelin, B., Théorie – TypeScript (p. 24, déstructuration ; p. 25, as) ; JS – Array Cheat Sheet (p. 3, find).

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