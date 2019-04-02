import { Injectable } from '@angular/core'
import { Subject } from 'rxjs';


export interface NotificationEvent {
    action?: string,
    message: string
}

@Injectable()
export class NotificationService {

    constructor() { }

    private notificationSource = new Subject<NotificationEvent>();

    notifications$ = this.notificationSource.asObservable();

    send(notification: NotificationEvent) {
        this.notificationSource.next(notification);
    }

    sendSuccessMsg(msg: string) {
        this.send({
            action: "Success!",
            message: msg
        });
    }

    sendErrorMsg(msg: string) {
        this.send({
            action: "Error!",
            message: msg
        });
    }

    sendInfoMsg(msg: string) {
        this.send({
            action: "Info!",
            message: msg
        });
    }

    showWarningMessage(msg: string) {
        this.send({
            action: "Warning!",
            message: msg
        });
    }

}