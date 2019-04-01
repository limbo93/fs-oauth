import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './app-main.routes';
import { MainComponent } from './app-main.component';
import { SuperSecretComponent } from './super-secret/super-secret.component';

@NgModule({
    imports: [
        RouterModule.forChild(mainRoutes),
    ],
    declarations: [
        MainComponent,
        SuperSecretComponent
    ],
    providers: []
})
export class MainModule { }