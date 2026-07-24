export type GqlBookDetailsInput = {
  authors?: Array<string> | null | undefined;
  id: string | number;
  isExternalId: boolean;
  isbn10?: string | null | undefined;
  isbn13?: string | null | undefined;
  title: string;
};

export const GqlCategory = {
  GqlArt: 'ART',
  GqlBusiness: 'BUSINESS',
  GqlChildrens: 'CHILDRENS',
  GqlClassics: 'CLASSICS',
  GqlFantasy: 'FANTASY',
  GqlFiction: 'FICTION',
  GqlGraphicBooksAndManga: 'GRAPHIC_BOOKS_AND_MANGA',
  GqlHorror: 'HORROR',
  GqlLgbtq: 'LGBTQ',
  GqlMystery: 'MYSTERY',
  GqlNonFiction: 'NON_FICTION',
  GqlPhilosophy: 'PHILOSOPHY',
  GqlPoetry: 'POETRY',
  GqlReligion: 'RELIGION',
  GqlRomance: 'ROMANCE',
  GqlScienceFiction: 'SCIENCE_FICTION',
  GqlThriller: 'THRILLER',
  GqlYoungAdult: 'YOUNG_ADULT'
} as const;

export type GqlCategory = typeof GqlCategory[keyof typeof GqlCategory];