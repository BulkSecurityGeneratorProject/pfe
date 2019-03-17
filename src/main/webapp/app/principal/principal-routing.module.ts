/* import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [{
  path: '/pm',
  component: MessagesComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'chatbotApp.message.home.title'
  },
  canActivate: [UserRouteAccessService]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
 */
//Not Used yet
