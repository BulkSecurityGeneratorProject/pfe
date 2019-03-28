package org.chatbot.app.web.rest;
import org.chatbot.app.domain.Channel;
import org.chatbot.app.domain.Message;
import org.chatbot.app.repository.ChannelRepository;
import org.chatbot.app.repository.MessageRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zendesk.client.v2.model.Ticket;

@RestController
@RequestMapping("/inject")
public class MessageInjectorRessource {

    private final MessageRepository messageRepository;
    private final ChannelRepository channelRepository;

    public MessageInjectorRessource(MessageRepository messageRepository,ChannelRepository channelRepository) {
        this.messageRepository = messageRepository;
        this.channelRepository=channelRepository;
    }
    @PostMapping("/zendesk")
    public String inject(@RequestBody Ticket ticket) {
        /* verification*/
        Channel c = channelRepository.findOneByChannelName(ticket.getUrl()).get();
        if(c != null)
       {
        Message message=new Message();
        message.setMessageTitle(ticket.getSubject());
        message.setMessageText(ticket.getDescription());
        message.setChannel(c);
        messageRepository.save(message);
        return new String("succes");
       } 
       return new String("failure");
}
}