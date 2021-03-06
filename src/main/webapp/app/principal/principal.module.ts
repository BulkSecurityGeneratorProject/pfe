import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserRouteAccessService } from 'app/core';
import { NavigationComponent } from './navigation/navigation.component';
import { FilterPipe } from './navigation/navigation.component';
import { AddannotationComponent } from './addannotation/addannotation.component';
import { AddchannelComponent } from './addchannel/addchannel.component';
import { AddteamComponent } from './addteam/addteam.component';
import { InviteteammateComponent } from './inviteteammate/inviteteammate.component';
import { ArchivemessageComponent } from './archivemessage/archivemessage.component';
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
    declarations: [
        NavigationComponent,
        FilterPipe,
        AddannotationComponent,
        AddchannelComponent,
        AddteamComponent,
        InviteteammateComponent,
        ArchivemessageComponent
    ],
    imports: [CommonModule, RouterModule.forChild(principalRoute), FormsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrincipalModule {}
