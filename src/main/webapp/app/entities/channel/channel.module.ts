import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ChatbotSharedModule } from 'app/shared';
import {
    ChannelComponent,
    ChannelDetailComponent,
    ChannelUpdateComponent,
    ChannelDeletePopupComponent,
    ChannelDeleteDialogComponent,
    channelRoute,
    channelPopupRoute
} from './';

const ENTITY_STATES = [...channelRoute, ...channelPopupRoute];

@NgModule({
    imports: [ChatbotSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ChannelComponent,
        ChannelDetailComponent,
        ChannelUpdateComponent,
        ChannelDeleteDialogComponent,
        ChannelDeletePopupComponent
    ],
    entryComponents: [ChannelComponent, ChannelUpdateComponent, ChannelDeleteDialogComponent, ChannelDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatbotChannelModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
