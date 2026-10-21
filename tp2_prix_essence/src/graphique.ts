// Code de départ : corrigé de référence généré par Claude (Anthropic, 2026), IA générative, 19 octobre 2026.
// Discussion Claude : https://claude.ai/share/74bc8524-479f-4be1-9a2f-ba5818508218
// Prompts (Claude) : « recommence et fait ceci de B1 a B8 :donne moi l'algorithme et la structure de B1 , quels sont les fichiers
//   que l'on doit avaoir a quoi ils servent , leurs roles et les etapes de de B1, les differents algorithmes de B1, » ;
//   « je ne veux pas l'utiliser je veux juste l'avoir comme refentiel: redonne moi la correction en respecatnt uniquement les notions de cours »
// Compréhension : Gemini (Google), 19 octobre 2026. Prompts :
// Discussions Gemini : voir la liste des liens dans le README (liens 1 à 5).
//   « explique Librairie installée avec : npm install chart.js (elle doit apparaître dans « dependencies ») » ;
//   « comment savoir que c'est installer »
// Cours : Lemelin, B., Théorie – Vite, modules et dépendances (p. 12 et 27, npm install ; p. 24-25, dependencies ; p. 29, import d'un package) ;
//         Lemelin, B., Théorie – TypeScript (p. 19, Chart | null ; p. 25, as) ; JS – Tableaux (p. 6, map).
// Librairie : Chart.js 4, installée avec npm install chart.js (dans « dependencies »).
// Toutes les commandes Chart.js sont non enseignées. Source : documentation officielle, https://www.chartjs.org/docs/latest/
// « import type » : importe seulement un type (il disparaît du JavaScript final). Commande non enseignée.
// Source : documentation TypeScript, « Type-Only Imports and Export »,
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
// Obligatoire ici parce que le tsconfig.json du projet active verbatimModuleSyntax.
// Source : documentation TypeScript, https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax
// Recherche guidée par Claude (Anthropic, 2026), 19 octobre 2026. Prompts : « donne moi aussi la source de » ; « ajoute aussi la recherche guide par iag comme outil »

// Chart.js : import de la version « auto » (documentation : Getting Started → Integration)
import Chart from 'chart.js/auto';
import type { PointGraphique } from './conversion';

let graphique: Chart | null = null;

export function afficherGraphique(points: PointGraphique[], devise: string, nomEtat: string): void {
// HTMLCanvasElement : type TypeScript d'une balise <canvas>. Commande non enseignée
// (le cours montre seulement HTMLButtonElement, Théorie – TypeScript, p. 25).
// Source : MDN Web Docs, « HTMLCanvasElement », https://developer.mozilla.org/fr/docs/Web/API/HTMLCanvasElement
    const canvas = document.getElementById("graphique") as HTMLCanvasElement;

    if (graphique !== null) {

    // Chart.js : détruit l'ancien graphique (documentation : API → destroy)
        graphique.destroy();
    }

    const etiquettes = points.map(p => p.periode);
    const valeurs = points.map(p => p.prix);


   // Chart.js : création d'un graphique en ligne (documentation : Charts → Line Chart ; Axes → titre des axes)
    graphique = new Chart(canvas, {
        type: "line",
        data: {
            labels: etiquettes,
            datasets: [{ 
                label: "Prix de l'essence – " + nomEtat, 
                data: valeurs 
            }]
        },
        options: {
            scales: {
                x: { 
                    title: { display: true, text: "Mois" } 
                },
                y: { 
                    title: { display: true, text: "Prix par gallon (" + devise + ")" } 
                }
            }
        }
    });
}