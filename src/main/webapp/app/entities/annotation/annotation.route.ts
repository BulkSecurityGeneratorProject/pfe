import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Annotation } from 'app/shared/model/annotation.model';
import { AnnotationService } from './annotation.service';
import { AnnotationComponent } from './annotation.component';
import { AnnotationDetailComponent } from './annotation-detail.component';
import { AnnotationUpdateComponent } from './annotation-update.component';
import { AnnotationDeletePopupComponent } from './annotation-delete-dialog.component';
import { IAnnotation } from 'app/shared/model/annotation.model';

@Injectable({ providedIn: 'root' })
export class AnnotationResolve implements Resolve<IAnnotation> {
    constructor(private service: AnnotationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAnnotation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Annotation>) => response.ok),
                map((annotation: HttpResponse<Annotation>) => annotation.body)
            );
        }
        return of(new Annotation());
    }
}

export const annotationRoute: Routes = [
    {
        path: '',
        component: AnnotationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chatbotApp.annotation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AnnotationDetailComponent,
        resolve: {
            annotation: AnnotationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chatbotApp.annotation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AnnotationUpdateComponent,
        resolve: {
            annotation: AnnotationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chatbotApp.annotation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AnnotationUpdateComponent,
        resolve: {
            annotation: AnnotationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chatbotApp.annotation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const annotationPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AnnotationDeletePopupComponent,
        resolve: {
            annotation: AnnotationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chatbotApp.annotation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
