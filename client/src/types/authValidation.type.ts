export type AuthValidationType = {
    id: number,
    name: string,
    type: string,
    placeholder: string,
    errorMessage: string,
    label: string,
    pattern?: string,
    required?: boolean
}