package org.chatbot.app.web.rest.modelsreq;
public class ModRep {
    private long id;
    private String message;
    private String label;
    private float probability;
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
}