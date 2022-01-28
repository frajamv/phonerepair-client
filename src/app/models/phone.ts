import User from "./user";

/**
 * Objeto teléfono de un usuario del sistema.
 */
export interface Phone {
    phone_id?: number,
    brand: string,
    reference: string,
    purchase_year: number,
    user_id: number,
    user?: User
}
