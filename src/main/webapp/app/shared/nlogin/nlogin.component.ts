import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { LoginService, StateStorageService } from 'app/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-nlogin',
    templateUrl: './nlogin.component.html',
    styles: []
})
export class NloginComponent {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    constructor(private loginService: LoginService, private router: Router) {
        this.credentials = {};
    }
    login() {
        console.log('click');
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.authenticationError = false;
                this.router.navigate(['']);
                // window.history.back();
            })
            .catch(() => {
                this.authenticationError = true;
            });
    }
    register() {
        this.router.navigate(['/register']);
    }

    requestResetPassword() {
        this.router.navigate(['/reset', 'request']);
    }
}
