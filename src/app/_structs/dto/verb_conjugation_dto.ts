export interface VerbConjugationDTO {
    id: number;
    verb: {
        id: number;
        verb: string;
        level: string;
    }
    ;
    mood: string;
    tense: string;
    subjectPronoun: string | null;
    conjugation: string | null;
    conjugationDict:  {
        [key: string]: string | null;
    };
}


/*    
    "id": 452,
    "verb": {
        "id": 2,
        "verb": "essere",
        "level": "A1"
    },
    "mood": "Participio",
    "tense": "Presente",
    "subjectPronoun": null,
    "conjugation": null,
    "conjugationDict": {
        "tu": "stai essente",
        "lui": "sta essente",
        "voi": "state essente",
        "loro": "stanno essente",
        "io": "sto essente",
        "noi": "stiamo essente"
    }
*/
