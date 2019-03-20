import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MessagesComponent } from './messages/messages.component';
import { UserRouteAccessService } from 'app/core';
const principalRoute: Routes = [
    {
        path: 'pm',
        component: MessagesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'messages.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
@NgModule({
    declarations: [MessagesComponent],
    imports: [CommonModule, RouterModule.forChild(principalRoute)],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrincipalModule {}
