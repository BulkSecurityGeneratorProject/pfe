package org.chatbot.app.web.rest;
import java.util.Optional;

import org.chatbot.app.domain.Channel;
import org.chatbot.app.domain.Message;
import org.chatbot.app.repository.AnnotationRepository;
import org.chatbot.app.repository.ChannelRepository;
import org.chatbot.app.repository.MessageRepository;
import org.chatbot.app.web.rest.modelsreq.SendModelRequest;
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
    private final AnnotationRepository annotationRepository;

    public MessageInjectorRessource(MessageRepository messageRepository, ChannelRepository channelRepository,
            AnnotationRepository annotationRepository) {
        this.messageRepository = messageRepository;
        this.channelRepository = channelRepository;
        this.annotationRepository = annotationRepository;
    }

    @PostMapping("/zendesk")
    public String inject(@RequestBody Ticket ticket) {
        /* verification */
        Channel c = null;
        Optional<Channel> opt = channelRepository.findOneByChannelName(ticket.getUrl());
        System.out.println("channel found : "+opt.isPresent());
        if(opt.isPresent())
        c=opt.get();
        Message message = new Message();
        message.setMessageTitle(ticket.getSubject());
        message.setMessageText(ticket.getDescription());
        message.createdAt(ticket.getUpdatedAt().toInstant());
        message.setChannel(c);
        message.setArchived(false);
        Message result = messageRepository.save(message);
        String url1="http://3f619950.ngrok.io/prediction/";
        SendModelRequest request1=new SendModelRequest(url1,result,annotationRepository);
        request1.start();
        String url2="http://53329611.ngrok.io/prediction/";
        SendModelRequest request2=new SendModelRequest(url2,result,annotationRepository);
        request2.start();
        String url3="http://41f0466b.ngrok.io/prediction_sentiment/";
        SendModelRequest request3=new SendModelRequest(url3,result,annotationRepository);
        request3.start(); 
        String url4="https://8c41c6ed.ngrok.io/prediction_urgence/";
        SendModelRequest request4=new SendModelRequest(url4,result,annotationRepository);
        request4.start(); 
        return new String("succes");
    }
}