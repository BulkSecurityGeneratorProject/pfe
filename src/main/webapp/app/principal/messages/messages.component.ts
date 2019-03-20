import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMessage } from 'app/shared/model/message.model';
import { Subscription } from 'rxjs';
import { MessageService } from 'app/entities/message';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IAnnotation } from 'app/shared/model/annotation.model';
import { AnnotationService } from 'app/entities/annotation';

@Component({
    selector: 'jhi-messages',
    templateUrl: './messages.component.html',
    styles: ['messages.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
    messages: IMessage[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentMessage: IMessage;
    annotations: IAnnotation[];

    constructor(
        protected messageService: MessageService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService,
        protected annotationService: AnnotationService
    ) {}

    loadAll() {
        this.messageService
            .query()
            .pipe(
                filter((res: HttpResponse<IMessage[]>) => res.ok),
                map((res: HttpResponse<IMessage[]>) => res.body)
            )
            .subscribe(
                (res: IMessage[]) => {
                    this.messages = res;
                    /*lancer une requete pour avoir les annotation pour chaque message*/
                    this.currentMessage = res[0];
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.annotationService
            .query()
            .pipe(
                filter((res: HttpResponse<IAnnotation[]>) => res.ok),
                map((res: HttpResponse<IAnnotation[]>) => res.body)
            )
            .subscribe(
                (res: IAnnotation[]) => {
                    this.annotations = res;
                },
                (res: HttpErrorResponse) => {
                    this.onError(res.message);
                }
            );
    }
    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMessages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }
    trackId(index: number, item: IMessage) {
        return item.id;
    }

    registerChangeInMessages() {
        this.eventSubscriber = this.eventManager.subscribe('messageListModification', response => this.loadAll());
    }
}
