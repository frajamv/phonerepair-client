import { Action } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import {ClientsState} from "./clients.reducer";

export const GET_CLIENTS = "[CLIENT] GET";
export const GET_CLIENTS_SUCCESS = "[CLIENT] GET SUCCESS";
export const GET_CLIENTS_FAIL = "[CLIENT] GET FAIL";

export class GetClients implements Action {
    readonly type = GET_CLIENTS;
    constructor() { }
}

export class GetClientsSuccess implements Action {
    readonly type = GET_CLIENTS_SUCCESS;
    constructor(public payload: ClientsState) { } // Comprobar cambiando any por arreglo de User.
}

export class GetClientsFail implements Action {
    readonly type = GET_CLIENTS_FAIL;
    constructor(public payload: HttpErrorResponse) { }
}

export type actions = GetClients | GetClientsSuccess | GetClientsFail;