export type TagsByPk = {
    taggings: Tagging[]
}

export type Tagging = {
    book: Book
}

export type Book = {
    title: string
    id: number
    image?: Image
    contributions: Contribution[]
    pages: number
    release_year: number
    editions: Edition[]
    taggings: Tagging2[]
}

export type Image = {
    url?: string
}

export type Contribution = {
    author: Author
}

export type Author = {
    name: string
}

export type Edition = {
    isbn_10?: string
    isbn_13?: string
    pages?: number
}

export type Tagging2 = {
    tag: Tag
}

export type Tag = {
    tag: string
}

export type GetBooksByCategoryQuery = {
    tags_by_pk: TagsByPk
}

export type GetBooksByCategoryQueryVariables = {
    id: number
    offset: number
    limit: number
}
