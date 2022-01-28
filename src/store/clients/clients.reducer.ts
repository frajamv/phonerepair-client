import * as fromClients from "./clients.actions";

export interface ClientsState {
    clients: any;
    loading: boolean;
}

const initialState: ClientsState = {
    clients: [],
    loading: false,
};

export function clientsReducer(
    state: ClientsState = initialState,
    action: fromClients.actions
): ClientsState {
    switch (action.type) {
        case fromClients.GET_CLIENTS:
            return {
                ...state,
                loading: true,
            };
        case fromClients.GET_CLIENTS_SUCCESS:
            return {
                ...state,
                clients: action.payload,
                loading: false,
            };
        case fromClients.GET_CLIENTS_FAIL:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}