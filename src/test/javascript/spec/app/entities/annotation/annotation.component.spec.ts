/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChatbotTestModule } from '../../../test.module';
import { AnnotationComponent } from 'app/entities/annotation/annotation.component';
import { AnnotationService } from 'app/entities/annotation/annotation.service';
import { Annotation } from 'app/shared/model/annotation.model';

describe('Component Tests', () => {
    describe('Annotation Management Component', () => {
        let comp: AnnotationComponent;
        let fixture: ComponentFixture<AnnotationComponent>;
        let service: AnnotationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChatbotTestModule],
                declarations: [AnnotationComponent],
                providers: []
            })
                .overrideTemplate(AnnotationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AnnotationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnnotationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Annotation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.annotations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
