// Source : algorithme de B6 proposé par Claude (Anthropic, 2026), IA générative, le 19 octobre 2026.
// Prompt (algorithme) : « recommence et fait ceci de B1 a B8 :donne moi l'algorithme de B1 ,
//   quels sont les fichiers que l'on doit avaoir a quoi ils servent , leurs roles et les etapes de de B1,
//   les differents algorithmes de B1, »

// Cours : JS – Tableaux (p. 5, filter ; p. 6, map et Math.round) ;
//         JS – Array Cheat Sheet (p. 2, sort et localeCompare) ;
//         Lemelin, B., Théorie – TypeScript (p. 6, throw ; p. 15, fonctions ; p. 16, types objets).
// « import type » : importe seulement un type (il disparaît du JavaScript final).
// Commande non enseignée. Source : documentation TypeScript, « Type-Only Imports and Export »,
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
// Obligatoire ici parce que le tsconfig.json créé par Vite active l'option verbatimModuleSyntax.
// Source : documentation TypeScript, option « verbatimModuleSyntax »,
// https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax
// Outil : recherche guidée par une IA générative, Claude (Anthropic, 2026), le 19 octobre 2026.
// Prompt : « donne moi aussi la source de » (suivi de ce commentaire sur import type)
import type { ReponseTaux } from './devises';
import type { PrixEia } from './eia';

export type PointGraphique = {
    periode: string,
    prix: number
};

export function obtenirTaux(tauxUSD: ReponseTaux, devise: string): number {
    if (devise === "USD") {
        return 1;
    }
    const taux = tauxUSD.rates[devise];
    if (taux === undefined) {
        throw new Error("Le taux de change est introuvable pour la devise " + devise + ".");
    }
    return taux;
}

export function convertirPrix(prix: PrixEia[], taux: number): PointGraphique[] {
    const valides = prix.filter(p => p.value !== null);

    const points = valides.map(p => {
        const point: PointGraphique = {
            periode: p.period,
            prix: Math.round(p.value * taux * 100) / 100
        };
        return point;
    });

    points.sort((a, b) => a.periode.localeCompare(b.periode));
    return points;
}