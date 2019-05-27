import { Injectable } from '@angular/core';
import { AuthServerProvider } from 'app/core';
import { IMessage } from '../model/message.model';
import { Observable } from 'rxjs';
import { IAnnotation } from '../model/annotation.model';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    sseMUrl = 'http://localhost:8080/inject/not/message' + '?access_token=';
    sseAUrl = 'http://localhost:8080/inject/not/annotation' + '?access_token=';
    constructor(private authServerProvider: AuthServerProvider) {
        this.sseAUrl += this.authServerProvider.getToken();
        this.sseMUrl += this.authServerProvider.getToken();
    }
    observeMessages(): Observable<IMessage> {
        return new Observable<IMessage>(obs => {
            const es = new EventSource(this.sseMUrl);
            es.addEventListener('message', evt => {
                console.log(evt.data);
                obs.next(JSON.parse(evt.data));
            });
            return () => es.close();
        });
    }
    observeAnnotations(): Observable<IAnnotation> {
        return new Observable<IAnnotation>(obs => {
            const es = new EventSource(this.sseAUrl);
            es.addEventListener('message', evt => {
                console.log(evt.data);
                obs.next(JSON.parse(evt.data));
            });
            return () => es.close();
        });
    }
}
