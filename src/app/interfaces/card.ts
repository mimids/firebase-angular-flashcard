//Answer

export type Answer = {
    id?: string | null;
    vocabularyID?: string | null;
    isRight?: boolean | null;
};


export type AnswerInput = {
    id?: string | null;
    vocabularyID?: string | null;
    isRight?: boolean | null;
};

// Card

export type Card = {
    id: string;
    answers?: Answer | null;
    name?: string | null;
    createdAt: string;
    updatedAt: string;
};

export type CreateCardInput = {
    id?: string | null;
    answers?: AnswerInput | null;
    name?: string | null;
  };

export type UpdateCardInput = {
    id: string;
    answers?: AnswerInput | null;
    name?: string | null;
};
export type DeleteCardInput = {
    id: string;
};

//Vocabulary

export type Vocabulary = {
    id?: string | null;
    word?: string | null;
    meaning?: string | null;
    lang_word?: string | null;
    lang_meaning?: string | null;
    categoryID?: string | null;
    createdAt: string;
    updatedAt: string;
};
export type CreateVocabularyInput = {
    id?: string | null;
    word?: string | null;
    meaning?: string | null;
    lang_word?: string | null;
    lang_meaning?: string | null;
    categoryID?: string | null;
};
export type UpdateVocabularyInput = {
    id: string;
    word?: string | null;
    meaning?: string | null;
    lang_word?: string | null;
    lang_meaning?: string | null;
    categoryID?: string | null;
};

export type DeleteVocabularyInput = {
    id: string;
};

// category



export type Category = {
    [key: string]: {[key: string]: any};
};
export type CreateCategoryInput = {
    id?: string | null;
    name?: string | null;
};
export type UpdateCategoryInput = {
    id: string;
    name?: string | null;
};
export type DeleteCategoryInput = {
    id: string;
};
