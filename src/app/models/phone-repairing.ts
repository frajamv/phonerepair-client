import { Phone } from "./phone";

/**
 * Objeto reparación de teléfono del sistema.
 */
export interface PhoneRepairing {
    id?: number,
    phone_entrance_status: string,
    phone_exit_status: string,
    repairing_cost: number,
    created_at?: Date,
    phone_id: number,
    phone?: Phone
}
