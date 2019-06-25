import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMessage } from 'app/shared/model/message.model';
import { MessageService } from 'app/entities/message';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-archivemessage',
    templateUrl: './archivemessage.component.html',
    styles: []
})
export class ArchivemessageComponent implements OnInit {
    @Input() msg: IMessage;
    @Output() archimessageEvent = new EventEmitter<string>();
    constructor(protected messageService: MessageService) {}
    ngOnInit() {}
    archive() {
        this.msg.archived = true;
        this.messageService.update(this.msg).subscribe(
            (res: HttpResponse<IMessage>) => {
                this.archimessageEvent.emit('message archived successfully');
            },
            (response: HttpErrorResponse) => {
                console.log(response);
            }
        );
    }
}
