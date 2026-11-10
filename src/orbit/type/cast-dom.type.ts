export interface CastDom {
    readonly methodStage: number;
    readonly careerStage: number;
    readonly workStage: number;
    readonly text: readonly (readonly HTMLElement[])[];
    readonly methodSection: HTMLElement | null;
    readonly methodBox: HTMLElement | null;
    readonly methodSlots: readonly HTMLElement[];
    readonly methodSteps: readonly HTMLElement[];
    readonly methodTitles: readonly HTMLElement[];
    readonly careerNodes: readonly HTMLElement[];
    readonly careerDates: readonly HTMLElement[];
    readonly careerSection: HTMLElement | null;
    readonly workBox: HTMLElement | null;
    readonly workList: HTMLElement | null;
    readonly workRows: readonly HTMLElement[];
    readonly workTitles: readonly HTMLElement[];
    readonly workNames: readonly string[];
    readonly label: HTMLElement | null;
}
