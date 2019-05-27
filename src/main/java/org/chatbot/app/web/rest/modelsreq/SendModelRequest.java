package org.chatbot.app.web.rest.modelsreq;

import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.chatbot.app.domain.Annotation;
import org.chatbot.app.domain.Message;
import org.chatbot.app.repository.AnnotationRepository;
import org.chatbot.app.web.rest.sendannotation.SeeAService;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

public class SendModelRequest extends Thread {
    private String url;
    private Message message;
    private final AnnotationRepository annotationRepository;
    private float threshold;

    public SendModelRequest(String url, Message message, AnnotationRepository annotationRepository,float threshold) {
        this.url = url;
        this.message = message;
        this.threshold=threshold;
        this.annotationRepository = annotationRepository;
    }

    public void run() {
        Modmesg msg = new Modmesg();
        ModRep res = new ModRep();
        msg.setId(Long.toString(message.getId()));
        msg.setMessage(message.getMessageText());
        JSONObject json = new JSONObject();
        try {
            json.put("id", msg.getId());
            json.put("message", msg.getMessage());
        } catch (JSONException e2) {
            // TODO Auto-generated catch block
            e2.printStackTrace();
        }
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();

        try {
            HttpPost request = new HttpPost(url);
            StringEntity params = new StringEntity(json.toString());
            request.addHeader("content-type", "application/json");
            request.setEntity(params);
            CloseableHttpResponse response = httpClient.execute(request);
            System.out.println("response" + response.toString());
            ObjectMapper objectMapper = new ObjectMapper();
            HttpEntity t = response.getEntity();
            if(t!=null){
                res = objectMapper.readValue(t.getContent(), ModRep.class);
                System.out.println(res.toString());
                Annotation annotation=new Annotation();
                annotation.setMessage(message);
                annotation.setAnnotationType(Math.round(res.getProbability()));
                annotation.setAnnotationData(res.getLabel());
                if(res.getProbability()>=threshold)
                {
                    annotation=this.annotationRepository.save(annotation);
                    SeeAService s=new SeeAService();
                    s.sendSseEventsToUI(annotation);
                }
            }
          
        // handle response here...
        } catch (Exception ex) {
            // handle exception here
            //ex.printStackTrace();
            System.out.println("Probleme with models");
        } finally {
            try {
                httpClient.close();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        } 
    }
}