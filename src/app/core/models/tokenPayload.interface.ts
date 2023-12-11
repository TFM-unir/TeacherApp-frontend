// comprobar/consultar si esto es una buena práctica

export interface tokenPayload {
    user_id: number;
    user_name: string;
    user_email: string;
    user_birthday: string;
    user_role: number;
    user_status: number;
    user_location: number;
    user_creation_date: string;
    user_update_date: string;
    exp: number;
    iat: number;
}
