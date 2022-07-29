
//FlashCards
export interface FlashCardList{
    id?: string | null;
    uid: string;
    name: string;
}
export interface FlashCard{
    user: string;
    name: string;
    id : number;
    word?: string | null;
    meaning?: string | null;
    lang_word?: string | null;
    lang_meaning?: string | null;
    category?: string[];
    isRight?: boolean | null;
}

//Vocabulary
export interface Vocabulary{
    id?: string | null;
    word?: string | null;
    meaning?: string | null;
    lang_word?: string | null;
    lang_meaning?: string | null;
    category?: string[];

};
//Category
export interface Category{
    category: string;
    item: string[];
};

