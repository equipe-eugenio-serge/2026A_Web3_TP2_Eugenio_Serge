//source: MDN Web Docs. (s. d.). HTMLDivElement. Mozilla. Consulté le 19 octobre 2026, à https://developer.mozilla.org/fr/docs/Web/API/HTMLDivElement
// Source : algorithme de B6 proposé par Claude (Anthropic, 2026), IA générative, le 19 octobre 2026.
// Prompt (algorithme) : « recommence et fait ceci de B1 a B8 :donne moi l'algorithme de B1 ,
//   quels sont les fichiers que l'on doit avaoir a quoi ils servent , leurs roles et les etapes de de B1,
//   les differents algorithmes de B1, »
// Cours : Filiatreault, K., Introduction à JavaScript (p. 14, textContent ; p. 15, className) ;
//         Lemelin, B., Théorie – TypeScript (p. 21, types de valeurs ; p. 25, as).

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