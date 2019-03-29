import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { UserRouteAccessService } from 'app/core';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { NavigationComponent } from './navigation/navigation.component';
const principalRoute: Routes = [
    {
        path: 'pm',
        component: NavigationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'messages.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
@NgModule({
    declarations: [MessagesComponent, MessageDetailComponent, NavigationComponent],
    imports: [CommonModule, RouterModule.forChild(principalRoute), FormsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrincipalModule {}
