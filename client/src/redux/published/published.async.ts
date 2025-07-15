import { createAsyncThunk } from '@reduxjs/toolkit'
import type { BooksResponseType } from '../../types/responsesTypes/booksResponse.type'
import PublishedService from '../../app/services/published.service'

export const fetchPublished = createAsyncThunk<BooksResponseType>(
    'published/fetchPublished',
    async (): Promise<BooksResponseType> => {
        const { data } = await PublishedService.getPubished()
        return data
    }
)