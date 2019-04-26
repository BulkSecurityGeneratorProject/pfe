import { Component, OnInit, Input } from '@angular/core';
import { ITeam } from 'app/shared/model/team.model';
import { Register } from 'app/account/register/register.service';
import { IUser } from 'app/core';
import { TeamService } from 'app/entities/team';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-inviteteammate',
    templateUrl: './inviteteammate.component.html',
    styleUrls: ['inviteteammate.scss']
})
export class InviteteammateComponent implements OnInit {
    registerAccount: any = {};
    user: IUser = {};
    @Input() team: ITeam;
    @Input() users: IUser[];
    constructor(protected registerService: Register) {}

    ngOnInit() {}
    invite() {
        const a: any = {
            userId: this.user.id,
            teamId: this.team.id
        };
        this.registerService.inviteExis(a).subscribe(
            () => {
                console.log('invitation send successfully');
            },
            (response: HttpErrorResponse) => {
                console.log(response);
            }
        );
    }
    register() {
        if (this.users.find(user => user.login === this.registerAccount.login)) {
            this.user = this.users.find(user => user.login === this.registerAccount.login);
            this.invite();
        } else if (this.users.find(user => user.email === this.registerAccount.email)) {
            this.user = this.users.find(user => user.email === this.registerAccount.email);
            this.invite();
        } else {
            this.registerAccount.team = this.team.id;
            console.log('team ' + this.team.id);
            this.registerAccount.password = '00000000';
            this.registerAccount.langKey = 'en';
            this.registerService.invite(this.registerAccount).subscribe(
                () => {
                    console.log('invitation sent successfully');
                },
                response => console.log(response)
            );
        }
    }
}
