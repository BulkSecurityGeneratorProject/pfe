import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAnnotation } from 'app/shared/model/annotation.model';
import { AnnotationService } from './annotation.service';
import { IMessage } from 'app/shared/model/message.model';
import { MessageService } from 'app/entities/message';

@Component({
    selector: 'jhi-annotation-update',
    templateUrl: './annotation-update.component.html'
})
export class AnnotationUpdateComponent implements OnInit {
    annotation: IAnnotation;
    isSaving: boolean;

    messages: IMessage[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected annotationService: AnnotationService,
        protected messageService: MessageService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ annotation }) => {
            this.annotation = annotation;
        });
        this.messageService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMessage[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMessage[]>) => response.body)
            )
            .subscribe((res: IMessage[]) => (this.messages = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.annotation.id !== undefined) {
            this.subscribeToSaveResponse(this.annotationService.update(this.annotation));
        } else {
            this.subscribeToSaveResponse(this.annotationService.create(this.annotation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnnotation>>) {
        result.subscribe((res: HttpResponse<IAnnotation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackMessageById(index: number, item: IMessage) {
        return item.id;
    }
}
