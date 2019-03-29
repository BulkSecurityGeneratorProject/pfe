import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { IMessage } from 'app/shared/model/message.model';
import { Subscription } from 'rxjs';
import { MessageService } from 'app/entities/message';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-messages',
    templateUrl: './messages.component.html',
    styles: ['messages.scss']
})
export class MessagesComponent implements OnInit {
    currentAccount: any;
    eventSubscriber: Subscription;
    currentMessage: IMessage = null;
    @Input() messagesDisp: IMessage[];
    constructor(protected accountService: AccountService) {}
    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
    }
}
