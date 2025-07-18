export function dataFormation(
    heading: string,
    tag: string,
    author: string,
    description: string,
    pages: number,
    isInStock: boolean,
    year: number,
    isbn: string,
    isSoftCover: boolean,
    categoryTag: string,
    themeTag: string,
    image: File
): FormData {
    const formData = new FormData()
    formData.append('heading', heading)
    formData.append('tag', tag)
    formData.append('author', author)
    formData.append('description', description)
    formData.append('pages', JSON.stringify(pages))
    formData.append('isInStock', JSON.stringify(isInStock))
    formData.append('year', JSON.stringify(year))
    formData.append('isbn', isbn)
    formData.append('isSoftCover', JSON.stringify(isSoftCover))
    formData.append('categoryTag', categoryTag)
    formData.append('themeTag', themeTag)
    formData.append('image', image)
    return formData
}