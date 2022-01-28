import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as fromClients from "./clients.actions";
import { UserService } from "src/app/services/user/user.service";

@Injectable()
export class ClientsEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }

    getClients = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromClients.GET_CLIENTS),
            exhaustMap((action: any) =>
                this.userService.getAllClients().pipe(
                    map((clients: any) => {
                        return new fromClients.GetClientsSuccess(clients);
                    }),
                    catchError((err: HttpErrorResponse) => {
                        console.log(`Error en effect: ${err}`);
                        return of(new fromClients.GetClientsFail(err));
                    })
                )
            )
        )
    }, { dispatch: true });
}