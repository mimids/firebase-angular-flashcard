//FlashCards

export interface FlashCard{
    user: string;
    listId : number;
    word?: string | null;
    meaning?: string | null;
    lang_word?: string | null;
    lang_meaning?: string | null;
    category?: string[];
}


//Answer

export interface Answer{
    id?: string | null;
    vocabularyID?: string | null;
    isRight?: boolean | null;
};


// Card

export interface Card{
    id: string;
    answers?: Answer | null;
    name?: string | null;

};


//Vocabulary

export interface Vocabulary{
    id?: string | null;
    word?: string | null;
    meaning?: string | null;
    lang_word?: string | null;
    lang_meaning?: string | null;
    category?: string[];

};

export interface Category{
    category: string;
    item: string[];
};

