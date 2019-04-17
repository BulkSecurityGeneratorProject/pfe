import { Component, OnInit, Input } from '@angular/core';
import { ITeam } from 'app/shared/model/team.model';
import { Register } from 'app/account/register/register.service';

@Component({
    selector: 'jhi-inviteteammate',
    templateUrl: './inviteteammate.component.html',
    styles: []
})
export class InviteteammateComponent implements OnInit {
    registerAccount: any = {};
    @Input() team: ITeam;
    constructor(protected registerService: Register) {}

    ngOnInit() {}
    register() {
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
