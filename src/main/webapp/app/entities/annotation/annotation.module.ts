import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ChatbotSharedModule } from 'app/shared';
import {
    AnnotationComponent,
    AnnotationDetailComponent,
    AnnotationUpdateComponent,
    AnnotationDeletePopupComponent,
    AnnotationDeleteDialogComponent,
    annotationRoute,
    annotationPopupRoute
} from './';

const ENTITY_STATES = [...annotationRoute, ...annotationPopupRoute];

@NgModule({
    imports: [ChatbotSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AnnotationComponent,
        AnnotationDetailComponent,
        AnnotationUpdateComponent,
        AnnotationDeleteDialogComponent,
        AnnotationDeletePopupComponent
    ],
    entryComponents: [AnnotationComponent, AnnotationUpdateComponent, AnnotationDeleteDialogComponent, AnnotationDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatbotAnnotationModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
