export enum TYPES {
    CREATE_USER
}

export interface User {
    name: string,
    lastName: string,
    password: string,
    email: string
}

/**
 * TYPES:
 * 
 * 
 */
export interface CREATE_USER {
    type: TYPES.CREATE_USER,
    payload: User
}


export type Actions =
    | CREATE_USER