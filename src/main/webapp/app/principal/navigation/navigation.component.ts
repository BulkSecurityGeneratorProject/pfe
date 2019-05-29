import { Component, OnInit, Pipe, PipeTransform, OnDestroy } from '@angular/core';
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
import { AccountService, LoginService, IUser, UserService, AuthServerProvider, WindowRef } from 'app/core';
import { Router } from '@angular/router';
import { SourceService } from 'app/entities/source';
import { Subscription } from 'rxjs';
import { NotificationService } from 'app/shared/notification/notification.service';

@Component({
    selector: 'jhi-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['navigation.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
    teams: ITeam[];
    channels: IChannel[];
    messagesDisp: IMessage[];
    messages: IMessage[];
    annotationGrouped: any[];
    currentMessage: IMessage = null;
    annotations: IAnnotation[];
    notifications: IMessage[] = [];
    users: IUser[];
    newMessages: Subscription;
    newAnnotations: Subscription;
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
        protected userService: UserService,
        protected sourceService: SourceService,
        private authServerProvider: AuthServerProvider,
        protected notificationService: NotificationService
    ) {
        this.currentMessage = null;
        this.edited = false;
    }
    ngOnInit() {
        this.loadAllTaams();
        this.laodAllChannels();
        this.loadAllMessages();
        this.loadAllAnnotations();
        this.loadGroupedAnnotations();
        this.loadAllUsers();
        this.connectNewMessages();
        this.connectNewAnnotations();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
    }
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
        this.newAnnotations.unsubscribe();
        this.newMessages.unsubscribe();
    }
    connectNewMessages() {
        this.newMessages = this.notificationService.observeMessages().subscribe((n: IMessage) => {
            if (this.channels.find(channel => channel.id === n.channel.id)) {
                this.messages.unshift(n);
                this.notifications.unshift(n);
            }
        });
        /* const authToken = this.authServerProvider.getToken();
        const source = new EventSource('http://localhost:8080/inject/not/message'+'?access_token=' + authToken);
        source.addEventListener('message', message => {
            let n: IMessage;
            n = JSON.parse(message.data);
            if (this.channels.find(channel => channel.id === n.channel.id)) {
                this.messages.unshift(n);
                this.notifications.unshift(n);
            }
        });  */
    }
    connectNewAnnotations() {
        this.newAnnotations = this.notificationService.observeAnnotations().subscribe((n: IAnnotation) => {
            if (this.messages.find(message => message.id === n.message.id)) {
                console.log(n);
                this.annotations.push(n);
            }
        });
        /*  const authToken = this.authServerProvider.getToken();
        const source = new EventSource('http://localhost:8080/inject/not/annotation'+'?access_token=' + authToken);
        source.addEventListener('message', message => {
            let n: IAnnotation;
            n = JSON.parse(message.data);
            if (this.messages.find(message => message.id === n.message.id)) {
                console.log(n);
                this.annotations.push(n);
            }  
        }); */
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
    removeMessage(message) {
        this.currentMessage = message;
        this.notifications = this.notifications.filter(value => value !== message);
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
            });
    }
    loadGroupedAnnotations() {
        this.annotationService
            .groupedAnnotions()
            .pipe(
                filter((res: HttpResponse<any[]>) => res.ok),
                map((res: HttpResponse<any[]>) => res.body)
            )
            .subscribe(
                (res: any[]) => {
                    console.log('ok');
                    this.annotationGrouped = res;
                    console.log(res);
                },
                (response: HttpErrorResponse) => {
                    console.log('error req ' + response.message);
                }
            );
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
        if (this.messagesDisp.length !== 0) {
            this.currentMessage = this.messagesDisp[0];
        } else {
            this.currentMessage = null;
        }
    }
    filterByChannel(channel: IChannel) {
        this.messagesDisp = this.messages.filter(message => message.channel.id === channel.id);
        if (this.messagesDisp.length !== 0) {
            this.currentMessage = this.messagesDisp[0];
        } else {
            this.currentMessage = null;
        }
    }
    filterByAnnotation(a: String) {
        this.messagesDisp = [];
        for (let index = 0; index < this.annotations.length; index++) {
            const element = this.annotations[index];
            if (element.annotationData.toLowerCase() === a) {
                this.messagesDisp.push(element.message);
            }
        }
        this.currentMessage = this.messagesDisp[0];
    }
    ellipsis(text: string): string {
        let result = text.substring(0, 20);
        if (text.length > 20) result += ' ...';
        return result;
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
    /*     filteringAnnotations() {
        this.annotData = this.annotations.map(a => a.annotationData.toLowerCase());
        const m = this.annotData.reduce((map, value) => {
            map.set(value, (map.get(value) || 0) + 1);
            return map;
        }, new Map());
        m[Symbol.iterator] = function*() {
            yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
        };
        this.t = m;
    } */
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
