import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ITeam } from 'app/shared/model/team.model';
import { IChannel } from 'app/shared/model/channel.model';
import { IMessage } from 'app/shared/model/message.model';
import { TeamService } from 'app/entities/team';
import { ChannelService } from 'app/entities/channel';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'app/entities/message';
import { IAnnotation } from 'app/shared/model/annotation.model';
import { AnnotationService } from 'app/entities/annotation';
import { AccountService, LoginService, IUser, UserService } from 'app/core';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-navigation',
    templateUrl: './navigation.component.html',
    styles: ['messages.scss']
})
export class NavigationComponent implements OnInit {
    teams: ITeam[];
    channels: IChannel[];
    messagesDisp: IMessage[];
    messages: IMessage[];
    annotData: String[];
    currentMessage: IMessage = null;
    annotations: IAnnotation[];
    users: IUser[];
    public edited = false;
    t: Map<String, number>;
    currentAccount: Account;
    constructor(
        protected teamService: TeamService,
        protected channelService: ChannelService,
        protected messageService: MessageService,
        protected annotationService: AnnotationService,
        protected accountService: AccountService,
        protected loginService: LoginService,
        protected route: Router,
        protected userService: UserService
    ) {
        this.currentMessage = null;
        this.edited = false;
    }
    ngOnInit() {
        this.loadAllTaams();
        this.laodAllChannels();
        this.loadAllMessages();
        this.loadAllAnnotations();
        this.loadAllUsers();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
    }
    logout() {
        this.loginService.logout();
        this.route.navigate(['']);
    }
    loadAllMessages() {
        this.messageService
            .query()
            .pipe(
                filter((res: HttpResponse<IMessage[]>) => res.ok),
                map((res: HttpResponse<IMessage[]>) => res.body)
            )
            .subscribe((res: IMessage[]) => {
                this.messages = res;
                this.currentMessage = res[0];
                this.messagesDisp = res;
            });
    }
    loadAllAnnotations() {
        this.annotationService
            .query()
            .pipe(
                filter((res: HttpResponse<IAnnotation[]>) => res.ok),
                map((res: HttpResponse<IAnnotation[]>) => res.body)
            )
            .subscribe((res: IAnnotation[]) => {
                this.annotations = res;
                this.filteringAnnotations();
            });
    }
    loadAllTaams() {
        this.teamService
            .query()
            .pipe(
                filter((res: HttpResponse<ITeam[]>) => res.ok),
                map((res: HttpResponse<ITeam[]>) => res.body)
            )
            .subscribe((res: ITeam[]) => {
                this.teams = res;
            });
    }
    laodAllChannels() {
        this.channelService
            .query()
            .pipe(
                filter((res: HttpResponse<IChannel[]>) => res.ok),
                map((res: HttpResponse<ITeam[]>) => res.body)
            )
            .subscribe((res: ITeam[]) => {
                this.channels = res;
            });
    }
    loadAllUsers() {
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res));
    }
    filterByTeam(team: ITeam) {
        this.messagesDisp = this.messages.filter(message => message.channel.team.id === team.id);
    }
    filterByChannel(channel: IChannel) {
        this.messagesDisp = this.messages.filter(message => message.channel.id === channel.id);
    }
    save() {
        if (this.currentMessage.id !== undefined) {
            this.messageService.update(this.currentMessage).subscribe((res: HttpResponse<IMessage>) => {
                console.log('update');
            });
        } else {
            this.messageService.create(this.currentMessage).subscribe((res: HttpResponse<IMessage>) => {
                console.log('save');
            });
        }
    }
    changeCurrentMessage(message: IMessage) {
        this.currentMessage = message;
    }
    receiveAddAnnotation($event) {
        this.annotations.push($event);
        this.filteringAnnotations();
    }
    receiveAddedTeam($event) {
        this.teams.push($event);
    }
    receiveAddedChannel($event) {
        this.channels.push($event);
    }
    receiveArchiveMsg($event) {
        this.loadAllMessages();
        this.loadAllAnnotations();
        this.currentMessage = this.messages[0];
    }
    filteringAnnotations() {
        this.annotData = this.annotations.map(a => a.annotationData.toLowerCase());
        const m = this.annotData.reduce((map, value) => {
            map.set(value, (map.get(value) || 0) + 1);
            return map;
        }, new Map());
        m[Symbol.iterator] = function*() {
            yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
        };
        this.t = m;
    }
}
@Pipe({
    name: 'filterUnique',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        const uniqueArray = Array.from(new Set(value));
        return uniqueArray;
    }
}
