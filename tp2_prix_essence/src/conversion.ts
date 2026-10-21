// Code de départ : corrigé de référence généré par Claude (Anthropic, 2026), IA générative, 19 octobre 2026.
// Discussion Claude : https://claude.ai/share/74bc8524-479f-4be1-9a2f-ba5818508218
// Prompts (Claude) : « recommence et fait ceci de B1 a B8 :donne moi l'algorithme et la structure de B1 , quels sont les fichiers
//   que l'on doit avaoir a quoi ils servent , leurs roles et les etapes de de B1, les differents algorithmes de B1, » ;
//   « je ne veux pas l'utiliser je veux juste l'avoir comme refentiel: redonne moi la correction en respecatnt uniquement les notions de cours » ;
//   « donne moi la source lie a au prompte de l'algorithme B6 »
// Compréhension : Gemini (Google), 19 octobre 2026. Prompts : « explique moi les fonctions flechees » ;
// Discussions Gemini : voir la liste des liens dans le README (liens 1 à 5).
//   « explique moi pourquoi le tsconfig.json créé par Vite active l'option verbatimModuleSyntax »
// Cours : JS – Tableaux (p. 5, filter ; p. 6, map et Math.round) ;
//         JS – Array Cheat Sheet (p. 2, sort et localeCompare) ;
//         Lemelin, B., Théorie – TypeScript (p. 6, throw ; p. 15, fonctions ; p. 16, types objets ; p. 19, undefined).
// Signature d'index (tauxUSD.rates[devise]) : commande non enseignée, voir la source dans devises.ts.
// « import type » : importe seulement un type (il disparaît du JavaScript final). Commande non enseignée.
// Source : documentation TypeScript, « Type-Only Imports and Export »,
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
// Obligatoire ici parce que le tsconfig.json du projet active verbatimModuleSyntax.
// Source : documentation TypeScript, https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax
// Recherche guidée par Claude (Anthropic, 2026), 19 octobre 2026. Prompts : « donne moi aussi la source de » ; « ajoute aussi la recherche guide par iag comme outil »

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