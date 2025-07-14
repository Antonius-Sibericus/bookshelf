export type BookType = {
    description: string,
    heading: string,
    tag: string,
    author: string,
    pages: number,
    isInStock: boolean,
    year: number,
    isbn: number,
    isSoftCover: boolean,
    categoryTag: string,
    themeTag: string,
    id: string,
    publisherId: string,
    createdAt?: Date,
    updatedAt?: Date
}