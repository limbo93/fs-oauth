import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-main',
    templateUrl: './app-main.component.html'
})
export class MainComponent {

    constructor(private authService: AuthService) {

    }
}