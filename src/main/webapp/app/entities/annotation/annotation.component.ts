import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAnnotation } from 'app/shared/model/annotation.model';
import { AccountService } from 'app/core';
import { AnnotationService } from './annotation.service';

@Component({
    selector: 'jhi-annotation',
    templateUrl: './annotation.component.html'
})
export class AnnotationComponent implements OnInit, OnDestroy {
    annotations: IAnnotation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected annotationService: AnnotationService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
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
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAnnotations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAnnotation) {
        return item.id;
    }

    registerChangeInAnnotations() {
        this.eventSubscriber = this.eventManager.subscribe('annotationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
