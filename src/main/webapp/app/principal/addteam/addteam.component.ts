import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITeam } from 'app/shared/model/team.model';
import { HttpResponse } from '@angular/common/http';
import { IUser, AccountService } from 'app/core';
import { TeamService } from 'app/entities/team';

@Component({
    selector: 'jhi-addteam',
    templateUrl: './addteam.component.html',
    styles: []
})
export class AddteamComponent implements OnInit {
    team: ITeam = {};
    @Input() users: IUser[];
    @Output() addingTeamEvent = new EventEmitter<ITeam>();
    account: Account;
    constructor(protected accountService: AccountService, protected teamService: TeamService) {}
    ngOnInit() {
        this.accountService.identity().then(account => {
            this.account = account;
        });
    }
    save() {
        this.team.users = [];
        this.team.users.push(this.account);
        this.teamService.create(this.team).subscribe((res: HttpResponse<ITeam>) => {
            this.addingTeamEvent.emit(res.body);
            this.team = {};
        });
    }
    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
