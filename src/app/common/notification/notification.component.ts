import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { NotificationService } from './notification.service';


@Component({
    selector: 'notification',
    template: ''
})
export class NotificationComponent implements OnDestroy {

    private notificationSubscription: Subscription;

    constructor(private notificationService: NotificationService, private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.notificationSubscription = this.notificationService.notifications$
            .subscribe(notification => this.openSnackBar(notification.message, notification.action));
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
            verticalPosition: 'top', 
            horizontalPosition: 'end'
        });
    }

    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }
}
