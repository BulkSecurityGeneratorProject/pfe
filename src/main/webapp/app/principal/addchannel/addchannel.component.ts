import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Channel, IChannel } from 'app/shared/model/channel.model';
import { ChannelService, channelPopupRoute } from 'app/entities/channel';
import { ITeam } from 'app/shared/model/team.model';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-addchannel',
    templateUrl: './addchannel.component.html',
    styles: []
})
export class AddchannelComponent implements OnInit {
    @Input() team: ITeam;
    @Output() addingChannelEvent = new EventEmitter<IChannel>();
    channel: Channel = {};
    constructor(protected channelService: ChannelService) {}
    ngOnInit() {}
    save() {
        this.channel.team = this.team;
        this.channelService.create(this.channel).subscribe((res: HttpResponse<IChannel>) => {
            this.addingChannelEvent.emit(res.body);
            this.channel = {};
        });
    }
}
