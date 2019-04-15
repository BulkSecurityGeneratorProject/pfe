import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserRouteAccessService } from 'app/core';
import { NavigationComponent } from './navigation/navigation.component';
import { FilterPipe } from './navigation/navigation.component';
import { AddannotationComponent } from './addannotation/addannotation.component';
const principalRoute: Routes = [
    {
        path: 'pm',
        component: NavigationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'messages.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'm',
        component: AddannotationComponent
    }
];
@NgModule({
    declarations: [NavigationComponent, FilterPipe, AddannotationComponent],
    imports: [CommonModule, RouterModule.forChild(principalRoute), FormsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrincipalModule {}
