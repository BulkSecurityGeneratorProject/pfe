package org.chatbot.app.web.rest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
public class SseMessageController {
    public static final List<SseEmitter> emitters=Collections.synchronizedList(new ArrayList<>());
    @RequestMapping(path = "/inject/not", method = RequestMethod.GET)
    public SseEmitter stream() throws Exception{
        SseEmitter emitter=new SseEmitter();
        emitters.add(emitter);
        emitter.onCompletion(() -> emitters.remove(emitter));
        return emitter; 
    }
}