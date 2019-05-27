package org.chatbot.app.web.rest.sendannotation;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.chatbot.app.domain.Annotation;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public class SeeAService{
    
        public void sendSseEventsToUI(Annotation notification) { // your model class
            System.out.println("sending");
            List<SseEmitter> sseEmitterListToRemove = new ArrayList<>();
            SeeAnnotationController.emitters.forEach((SseEmitter emitter) -> {
                try {
                    emitter.send(notification, MediaType.APPLICATION_JSON);
                } catch (IOException e) {
                    emitter.complete();
                    sseEmitterListToRemove.add(emitter);
                    e.printStackTrace();
                }
            });
            SeeAnnotationController.emitters.removeAll(sseEmitterListToRemove);
        }
}