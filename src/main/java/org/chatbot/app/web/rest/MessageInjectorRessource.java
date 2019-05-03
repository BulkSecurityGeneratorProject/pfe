package org.chatbot.app.web.rest;

import java.time.Instant;
import java.util.Optional;

import org.chatbot.app.config.ApplicationProperties;
import org.chatbot.app.domain.Channel;
import org.chatbot.app.domain.Message;
import org.chatbot.app.repository.AnnotationRepository;
import org.chatbot.app.repository.ChannelRepository;
import org.chatbot.app.repository.MessageRepository;
import org.chatbot.app.web.rest.modelsreq.SendModelRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zendesk.client.v2.model.Ticket;

@RestController
@RequestMapping("/inject")
public class MessageInjectorRessource {

    private  MessageRepository messageRepository;
    private  ChannelRepository channelRepository;
    private  AnnotationRepository annotationRepository;
    private final ApplicationProperties applicationProperties;

    public MessageInjectorRessource(MessageRepository messageRepository, ChannelRepository channelRepository,
            AnnotationRepository annotationRepository, ApplicationProperties applicationProperties) {
        this.messageRepository = messageRepository;
        this.channelRepository = channelRepository;
        this.annotationRepository = annotationRepository;
        this.applicationProperties=applicationProperties;
    }

    @PostMapping("/zendesk")
    public ResponseEntity<String> inject(@RequestBody Ticket ticket) {
        /* verification */
        Channel c = null;
        Optional<Channel> opt = channelRepository.findOneByChannelName(ticket.getUrl());
        if(opt.isPresent())
        {
            c=opt.get();
            System.out.println("channel found ");
        }
        else 
        System.out.println("channel not found ");
        Message message = new Message();
        message.setMessageTitle(ticket.getSubject());
        message.setMessageText(ticket.getDescription());
        message.setCreatedAt(Instant.now());;
        message.setChannel(c);
        message.setArchived(false);
        Message result = messageRepository.save(message);
        String url1=applicationProperties.getModel().getEmotion();
        if(url1.length()!=0){
            SendModelRequest request1=new SendModelRequest(url1,result,annotationRepository,applicationProperties.getModel().getEmotionThreshold());
            request1.start();
        }
        String url2=applicationProperties.getModel().getSentiment();
        if(url2.length()!=0)
        {
            SendModelRequest request2=new SendModelRequest(url2,result,annotationRepository,applicationProperties.getModel().getSentimentThreshold());
            request2.start(); 
        }
        String url3=applicationProperties.getModel().getProblem();
        if(url3.length()!=0)
        {
            SendModelRequest request3=new SendModelRequest(url3,result,annotationRepository,applicationProperties.getModel().getProblemThreshold());
            request3.start();
        }
        String url4=applicationProperties.getModel().getUrgence();
        if(url4.length()!=0){
            SendModelRequest request4=new SendModelRequest(url4,result,annotationRepository,applicationProperties.getModel().getUrgenceThreshold());
            request4.start(); 
        }
        return new ResponseEntity<String>("{\"message\" : \"received\"}",org.springframework.http.HttpStatus.OK);
    }
}