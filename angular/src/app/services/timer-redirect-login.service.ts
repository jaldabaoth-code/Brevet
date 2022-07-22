import { Injectable } from '@angular/core';
import { timer } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TimerRedirectLoginService {
    timeLeft : number = 5;

    constructor() { }

    observableTimer(): void {
        const source = timer(1000, 2000);

        source.subscribe(val => {
        this.timeLeft = this.timeLeft - val;
            if(this.timeLeft < 0){
              this.redirectToLogin();
            }
        });
    }

    redirectToLogin(): void {
        // Navigate to other page
        window.location.href = '/login';
    }
}
