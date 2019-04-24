package org.chatbot.app.web.rest.modelsreq;

import java.io.Serializable;

public class Modmesg implements Serializable{
    String id;
    String message;
    /**
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id;
    }
    /**
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }
    /**
     * @return the id
     */
    public String getId() {
        return id;
    }
    @Override
    public String toString() {
        return super.toString();
    }
    /**
     * @return the message
     */
    public String getMessage() {
        return message;
    }
}