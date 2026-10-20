// Source : algorithme de B6 proposé par Claude (Anthropic, 2026), IA générative, le 19 octobre 2026.
// Prompt (algorithme) : « recommence et fait ceci de B1 a B8 :donne moi l'algorithme de B1 ,
//   quels sont les fichiers que l'on doit avaoir a quoi ils servent , leurs roles et les etapes de de B1,
//   les differents algorithmes de B1, »
// Source : énoncé du TP2 (Filiatreault, K., 2026, Partie 2).
// Cours : Lemelin, B., Théorie – TypeScript (p. 21, types de valeurs ; p. 16, types objets ; p. 14, tableaux).


export type CodeEtat = "EMM_EPM0_PTE_SNY_DPG" | "EMM_EPM0_PTE_SNY_DPG" | "EMM_EPM0_PTE_SCA_DPG" | "EMM_EPM0_PTE_SFL_DPG" | "EMM_EPM0_PTE_SCO_DPG" | "EMM_EPM0_PTE_SMA_DPG" | "EMM_EPM0_PTE_STX_DPG";

export type Etat = {
    nom: string;
    code: CodeEtat;
};

export const ETATS: Etat[] = [
    { nom: "New York", code: "EMM_EPM0_PTE_SNY_DPG" },
    { nom: "Californie", code: "EMM_EPM0_PTE_SCA_DPG" },
    { nom: "Floride", code: "EMM_EPM0_PTE_SFL_DPG" },
    { nom: "Colorado", code: "EMM_EPM0_PTE_SCO_DPG" },
    { nom: "Massachusetts", code: "EMM_EPM0_PTE_SMA_DPG" },
    { nom: "Texas", code: "EMM_EPM0_PTE_STX_DPG" }
];