import { Component, OnInit } from '@angular/core';
import { ITeam } from 'app/shared/model/team.model';
import { IChannel } from 'app/shared/model/channel.model';
import { IMessage } from 'app/shared/model/message.model';
import { TeamService } from 'app/entities/team';
import { ChannelService } from 'app/entities/channel';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'app/entities/message';

@Component({
    selector: 'jhi-navigation',
    templateUrl: './navigation.component.html',
    styles: []
})
export class NavigationComponent implements OnInit {
    teams: ITeam[];
    channels: IChannel[];
    messagesDisp: IMessage[];
    messages: IMessage[];
    constructor(protected teamService: TeamService, protected channelService: ChannelService, protected messageService: MessageService) {}
    ngOnInit() {
        this.loadAllTaams();
        this.laodAllChannels();
        this.loadAllMessages();
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
                this.messagesDisp = res;
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
    filterByTeam(team: ITeam) {
        this.messagesDisp = this.messages.filter(message => message.channel.team.id === team.id);
    }
    filterByChannel(channel: IChannel) {
        this.messagesDisp = this.messages.filter(message => message.channel.id === channel.id);
    }
}