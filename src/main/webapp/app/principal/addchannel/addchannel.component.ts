import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Channel, IChannel } from 'app/shared/model/channel.model';
import { ChannelService, channelPopupRoute } from 'app/entities/channel';
import { ITeam } from 'app/shared/model/team.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ISource } from 'app/shared/model/source.model';
import { SourceService } from 'app/entities/source';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'jhi-addchannel',
    templateUrl: './addchannel.component.html',
    styles: []
})
export class AddchannelComponent implements OnInit {
    @Input() team: ITeam;
    @Output() addingChannelEvent = new EventEmitter<IChannel>();
    channel: Channel = {};
    sources: ISource[];
    constructor(protected channelService: ChannelService, protected sourceService: SourceService) {}
    ngOnInit() {
        this.loadAllSources();
    }
    save() {
        this.channel.team = this.team;
        this.channelService.create(this.channel).subscribe((res: HttpResponse<IChannel>) => {
            this.addingChannelEvent.emit(res.body);
            this.channel = {};
        });
    }
    loadAllSources() {
        this.sourceService
            .query()
            .pipe(
                filter((res: HttpResponse<ISource[]>) => res.ok),
                map((res: HttpResponse<ISource[]>) => res.body)
            )
            .subscribe(
                (res: ISource[]) => {
                    this.sources = res;
                },
                (res: HttpErrorResponse) => console.log(res)
            );
    }
}
