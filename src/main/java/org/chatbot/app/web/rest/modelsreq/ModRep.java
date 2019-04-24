package org.chatbot.app.web.rest.modelsreq;

import java.io.Serializable;

public class ModRep implements Serializable{
    private long id;
    private String message;
    private String label;
    private float probability;
    private String intent;
    /**
     * @return the id
     */
    public long getId() {
        return id;
    }
    /**
     * @return the label
     */
    public String getLabel() {
        return label;
    }
    /**
     * @return the message
     */
    public String getMessage() {
        return message;
    }
    /**
     * @return the probability
     */
    public float getProbability() {
        return probability;
    }
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
     * @param label the label to set
     */
    public void setLabel(String label) {
        this.label = label;
    }
    /**
     * @param probability the probability to set
     */
    public void setProbability(float probability) {
        this.probability = probability;
    }
    public  String toString(){
        return "id : "+id+"\nmessage : "+message+"\nlabel : "+label+ "\nprobability "+probability+
        "\n";
    }
    /**
     * @param intent the intent to set
     */
    public void setIntent(String intent) {
        this.intent = intent;
    }
    /**
     * @return the intent
     */
    public String getIntent() {
        return intent;
    }
} 