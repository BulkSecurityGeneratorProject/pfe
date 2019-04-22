import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ISource } from 'app/shared/model/source.model';
import { SourceService } from './source.service';

@Component({
    selector: 'jhi-source-update',
    templateUrl: './source-update.component.html'
})
export class SourceUpdateComponent implements OnInit {
    source: ISource;
    isSaving: boolean;

    constructor(protected sourceService: SourceService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ source }) => {
            this.source = source;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.source.id !== undefined) {
            this.subscribeToSaveResponse(this.sourceService.update(this.source));
        } else {
            this.subscribeToSaveResponse(this.sourceService.create(this.source));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISource>>) {
        result.subscribe((res: HttpResponse<ISource>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
