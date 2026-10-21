// Code de départ : corrigé de référence généré par Claude (Anthropic, 2026), IA générative, 19 octobre 2026.
// Discussion Claude : https://claude.ai/share/74bc8524-479f-4be1-9a2f-ba5818508218
// Prompts (Claude) : « recommence et fait ceci de B1 a B8 :donne moi l'algorithme et la structure de B1 , quels sont les fichiers
//   que l'on doit avaoir a quoi ils servent , leurs roles et les etapes de de B1, les differents algorithmes de B1, » ;
//   « je ne veux pas l'utiliser je veux juste l'avoir comme refentiel: redonne moi la correction en respecatnt uniquement les notions de cours »
// Compréhension : Gemini (Google), 19 octobre 2026. Prompt :
// Discussions Gemini : voir la liste des liens dans le README (liens 1 à 5).
//   « [Code fourni] function zoneMessage(): HTMLDivElement { return document.getElementById("message") as HTMLDivElement; } »
// Recherche de sources : Claude (Anthropic, 2026), 19 octobre 2026. Prompts : « dans le cours on a parle de HTMLDivElement ? » ;
//   « donne moi la source de HTMLDIVElement » ; « donne moi d'autres plus explicites et formules moi la source »
// Cours : Filiatreault, K., Introduction à JavaScript (p. 14, textContent ; p. 15, className) ;
//         Lemelin, B., Théorie – TypeScript (p. 21, types de valeurs ; p. 25, as).
// HTMLDivElement : type TypeScript d'une balise <div>. Commande non enseignée
// (le cours montre seulement HTMLButtonElement, Théorie – TypeScript, p. 25).
// Sources : MDN Web Docs. (s. d.). HTMLDivElement. https://developer.mozilla.org/fr/docs/Web/API/HTMLDivElement ;
//   Microsoft. (s. d.). DOM Manipulation. TypeScript Documentation. https://www.typescriptlang.org/docs/handbook/dom-manipulation.html

export type TypeMessage = "chargement" | "erreur" | "succes";

function zoneMessage(): HTMLDivElement {
    return document.getElementById("message") as HTMLDivElement;
}

export function afficherMessage(type: TypeMessage, texte: string): void {
    const zone = zoneMessage();
    zone.textContent = texte;
    zone.className = "message message-" + type;
}

export function effacerMessage(): void {
    const zone = zoneMessage();
    zone.textContent = "";
    zone.className = "message";
}