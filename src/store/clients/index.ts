import { ActionReducerMap } from '@ngrx/store';
import { clientsReducer, ClientsState } from './clients.reducer';

export const rootReducer = {};

export default interface AppState {
    clients: ClientsState;
};

export const reducers: ActionReducerMap<AppState, any> = {
    clients: clientsReducer
};