export interface Promotion {
    codePromo: string,
    libelle: string,
    sujet: string,
    description: string,
    valeurPromo: number,
    typePromo: number,
    dateDebut: string | Date,
    dateFin: string | Date,
    imgPath: string
}