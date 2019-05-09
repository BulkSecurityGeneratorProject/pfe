package org.chatbot.app.web.rest.modelsreq;

import java.io.IOException;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.chatbot.app.config.ApplicationProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

public class SendModelAnnotation extends Thread {
    String message;
    String annotation;
    private final ApplicationProperties applicationProperties;
    String url;

    public SendModelAnnotation(String message, String annotation,ApplicationProperties applicationProperties)
      {  this.message = message;
        this.annotation = annotation;
        this.applicationProperties=applicationProperties;
        url=applicationProperties.getModel().getDburl();
    }

    public void run() {
        JSONObject json = new JSONObject();
        try {
            json.put("message", message);
            json.put("annotation", annotation);
        } catch (JSONException e2) {
            // TODO Auto-generated catch block
            e2.printStackTrace();
        }
        try {
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        //HttpGet req=new HttpGet(url);
        HttpPost request = new HttpPost(url);
        StringEntity params = new StringEntity(json.toString());
        request.addHeader("content-type", "application/json");
        request.setEntity(params);
        CloseableHttpResponse response;
        response = httpClient.execute(request);
        System.out.println("response" + response.toString());
        System.out.println("message "+message);
        System.out.println("annotation " +annotation);
        } catch (ClientProtocolException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}