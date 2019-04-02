import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model';

@Component({
    selector: 'app-main',
    templateUrl: './app-main.component.html',
    styleUrls: ['./app-main.component.scss']
})
export class MainComponent implements OnInit {

    user: User = {};

    constructor(public authService: AuthService) {

    }

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
            if(user && !user.photoURL){
                this.user.photoURL="/assets/default-image.png";
            }
        });
    }
}