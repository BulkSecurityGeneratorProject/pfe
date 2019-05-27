package org.chatbot.app.web.rest.sendmessage;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.chatbot.app.domain.Message;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public class SeeMService{
    
    public void sendSseEventsToUI(Message notification) { // your model class
        System.out.println("sending");
        List<SseEmitter> sseEmitterListToRemove = new ArrayList<>();
        SseMessageController.emitters.forEach((SseEmitter emitter) -> {
            try {
                emitter.send(notification, MediaType.APPLICATION_JSON);
            } catch (IOException e) {
                emitter.complete();
                sseEmitterListToRemove.add(emitter);
                e.printStackTrace();
            }
        });
        SseMessageController.emitters.removeAll(sseEmitterListToRemove);
    }
}