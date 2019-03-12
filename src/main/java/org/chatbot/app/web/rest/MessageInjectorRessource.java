package org.chatbot.app.web.rest;

import org.chatbot.app.domain.Message;
import org.chatbot.app.repository.MessageRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/inject")
public class MessageInjectorRessource {

    private final MessageRepository messageRepository;

    public MessageInjectorRessource(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }
    @PostMapping("/zendesk")
    public boolean inject(@RequestBody Message message) {
    messageRepository.save(message);
    return true;
}
}