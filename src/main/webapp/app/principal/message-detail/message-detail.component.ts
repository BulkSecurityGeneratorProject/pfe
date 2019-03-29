import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IMessage } from 'app/shared/model/message.model';
import { IAnnotation } from 'app/shared/model/annotation.model';
import { Subscription, Observable } from 'rxjs';
import { AnnotationService } from 'app/entities/annotation';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { AccountService, IUser, UserService } from 'app/core';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'app/entities/message/message.service';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'jhi-message-detail',
    templateUrl: './message-detail.component.html',
    styles: []
})
export class MessageDetailComponent implements OnInit, OnDestroy {
    @Input() currentMessage: IMessage;
    annotations: IAnnotation[];
    currentAccount: any;
    eventSubscriber: Subscription;
    users: IUser[];
    public edited = false;

    constructor(
        protected annotationService: AnnotationService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService,
        protected userService: UserService,
        protected messageService: MessageService
    ) {
        this.edited = false;
    }

    loadAllAnnotations() {
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
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    ngOnInit() {
        this.loadAllAnnotations();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.registerChangeInAnnotations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAnnotations() {
        this.eventSubscriber = this.eventManager.subscribe('annotationListModification', response => this.loadAllAnnotations());
    }
    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
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
}
