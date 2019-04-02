import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { IMessage } from 'app/shared/model/message.model';
import { Subscription, Observable } from 'rxjs';
import { MessageService } from 'app/entities/message';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { AccountService, IUser, UserService } from 'app/core';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IAnnotation } from 'app/shared/model/annotation.model';
import { AnnotationService } from 'app/entities/annotation';

@Component({
    selector: 'jhi-messages',
    templateUrl: './messages.component.html',
    styles: ['messages.scss']
})
export class MessagesComponent implements OnInit {
    currentAccount: any;
    eventSubscriber: Subscription;
    currentMessage: IMessage = null;
    annotations: IAnnotation[];
    users: IUser[];
    public edited = false;
    @Input() messagesDisp: IMessage[];
    constructor(
        protected accountService: AccountService,
        protected annotationService: AnnotationService,
        protected userService: UserService,
        protected messageService: MessageService
    ) {
        this.currentMessage = null;
        this.edited = false;
    }
    loadAllAnnotations() {
        this.annotationService
            .query()
            .pipe(
                filter((res: HttpResponse<IAnnotation[]>) => res.ok),
                map((res: HttpResponse<IAnnotation[]>) => res.body)
            )
            .subscribe((res: IAnnotation[]) => {
                this.annotations = res;
            });
    }
    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.loadAllAnnotations();
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res));
    }
    save() {
        if (this.currentMessage.id !== undefined) {
            this.subscribeToSaveResponse(this.messageService.update(this.currentMessage));
        } else {
            this.subscribeToSaveResponse(this.messageService.create(this.currentMessage));
        }
    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMessage>>) {
        result.subscribe((res: HttpResponse<IMessage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        console.log('succes');
    }

    protected onSaveError() {
        console.log('error');
    }
    changeCurrentMessage(message: IMessage) {
        this.currentMessage = message;
    }
}
