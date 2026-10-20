// Source : algorithme de B6 proposé par Claude (Anthropic, 2026), IA générative, le 19 octobre 2026.
// Prompt (algorithme) : « recommence et fait ceci de B1 a B8 :donne moi l'algorithme de B1 ,
//   quels sont les fichiers que l'on doit avaoir a quoi ils servent , leurs roles et les etapes de de B1,
//   les differents algorithmes de B1, »
// Cours : Lemelin, B., Théorie – Vite, modules et dépendances (p. 12, npm install ; p. 24-25, dependencies) ;
//         Lemelin, B., Théorie – TypeScript (p. 19, Chart | null ; p. 25, as) ; JS – Tableaux (p. 6, map).
//
// Librairie installée avec : npm install chart.js   (elle doit apparaître dans « dependencies »)
// Toutes les commandes Chart.js ci-dessous sont non enseignées.
// Source : documentation officielle de Chart.js, https://www.chartjs.org/docs/latest/

import Chart from 'chart.js/auto';
import type { PointGraphique } from './conversion';

let graphique: Chart | null = null;

export function afficherGraphique(points: PointGraphique[], devise: string, nomEtat: string): void {
    const canvas = document.getElementById("graphique") as HTMLCanvasElement;

    if (graphique !== null) {
        graphique.destroy();
    }

    const etiquettes = points.map(p => p.periode);
    const valeurs = points.map(p => p.prix);

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