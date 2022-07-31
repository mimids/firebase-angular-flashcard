
//FlashCards
export interface FlashCardList{
    id?: string | null;
    uid: string;
    name: string;
}
export interface FlashCard{
    id? : string;
    name: string;
    uid:string
    word?: string | null;
    meaning?: string | null;
    lang_word?: string | null;
    lang_meaning?: string | null;
    categorys?: string[];
    isRight?: boolean | null;
}

//Vocabulary
export interface Vocabulary{
    id?: string | null;
    word?: string | null;
    meaning?: string | null;
    lang_word?: string | null;
    lang_meaning?: string | null;
    categorys?: string[];

};
//Category
export interface Category{
    category: string;
    item: string[];
};

export enum CommonWord {
    ALL='ALL',
}