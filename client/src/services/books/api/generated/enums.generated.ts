export const GqlBestSellersListName = {
  GqlChildrens: 'CHILDRENS',
  GqlFiction: 'FICTION',
  GqlGraphicBooksAndManga: 'GRAPHIC_BOOKS_AND_MANGA',
  GqlNonFiction: 'NON_FICTION',
  GqlYoungAdult: 'YOUNG_ADULT'
} as const;

export type GqlBestSellersListName = typeof GqlBestSellersListName[keyof typeof GqlBestSellersListName];
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