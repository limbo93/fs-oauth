import { Routes } from '@angular/router';
import { MainComponent } from './app-main.component';
import { SuperSecretComponent } from './super-secret/super-secret.component';


export const mainRoutes: Routes = [
    { path: '', component: MainComponent },
    { path: 'secret', component: SuperSecretComponent }
]