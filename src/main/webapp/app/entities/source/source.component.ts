import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISource } from 'app/shared/model/source.model';
import { AccountService } from 'app/core';
import { SourceService } from './source.service';

@Component({
    selector: 'jhi-source',
    templateUrl: './source.component.html'
})
export class SourceComponent implements OnInit, OnDestroy {
    sources: ISource[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected sourceService: SourceService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.sourceService
            .query()
            .pipe(
                filter((res: HttpResponse<ISource[]>) => res.ok),
                map((res: HttpResponse<ISource[]>) => res.body)
            )
            .subscribe(
                (res: ISource[]) => {
                    this.sources = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSources();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISource) {
        return item.id;
    }

    registerChangeInSources() {
        this.eventSubscriber = this.eventManager.subscribe('sourceListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
