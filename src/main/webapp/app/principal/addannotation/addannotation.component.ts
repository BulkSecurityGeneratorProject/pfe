import { Component, OnInit, Input } from '@angular/core';
import { IMessage } from 'app/shared/model/message.model';
import { IAnnotation } from 'app/shared/model/annotation.model';
import { AnnotationService } from 'app/entities/annotation/annotation.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-addannotation',
    templateUrl: './addannotation.component.html',
    styles: []
})
export class AddannotationComponent implements OnInit {
    @Input() msg: IMessage;
    @Input() annotations: IAnnotation[];
    annotation: IAnnotation = {};
    constructor(protected annotationService: AnnotationService) {}

    ngOnInit() {}
    save() {
        console.log('saving');
        if (this.annotation !== null) {
            this.annotation.message = this.msg;
            this.annotations.push(this.annotation);
            this.annotationService.create(this.annotation).subscribe(
                (res: HttpResponse<IAnnotation>) => {
                    console.log('succes');
                    this.annotation = {};
                },
                (res: HttpErrorResponse) => {
                    console.log('error');
                    this.annotation = {};
                }
            );
        }
    }
}
