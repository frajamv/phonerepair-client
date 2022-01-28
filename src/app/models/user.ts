/**
 * Objeto usuario del sistema.
 */
export default interface User {
    user_id?: number;
    full_name: string;
    username: string;
    password: string;
    role_id: number;
}
