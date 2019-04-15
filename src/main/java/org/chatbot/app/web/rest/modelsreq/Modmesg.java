package org.chatbot.app.web.rest.modelsreq;
public class Modmesg {
    long id;
    String message;
    /**
     * @param id the id to set
     */
    public void setId(long id) {
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
    public long getId() {
        return id;
    }
    /**
     * @return the message
     */
    public String getMessage() {
        return message;
    }
}