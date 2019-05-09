package org.chatbot.app.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Chatbot.
 * <p>
 * Properties are configured in the application.yml file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {
public final Model model =new Model();
/**
 * @return the model
 */
public Model getModel() {
    return model;
}
 public class Model{
    String urgence;
    String problem;
    String emotion;
    String sentiment;
    float emotionThreshold;
    float problemThreshold;
    float urgenceThreshold;
    float sentimentThreshold;
    String dburl;
    /**
     * @param dburl the dburl to set
     */
    public void setDburl(String dburl) {
        this.dburl = dburl;
    }
    /**
     * @return the dburl
     */
    public String getDburl() {
        return dburl;
    }
    /**
     * @param emotionThreshold the emotionThreshold to set
     */
    public void setEmotionThreshold(float emotionThreshold) {
        this.emotionThreshold = emotionThreshold;
    }
    /**
     * @return the emotionThreshold
     */
    public float getEmotionThreshold() {
        return emotionThreshold;
    }
    /**
     * @param sentimentThreshold the sentimentThreshold to set
     */
    public void setSentimentThreshold(float sentimentThreshold) {
        this.sentimentThreshold = sentimentThreshold;
    }
    /**
     * @return the sentimentThreshold
     */
    public float getSentimentThreshold() {
        return sentimentThreshold;
    }
    /**
     * @param problemThreshold the problemThreshold to set
     */
    public void setProblemThreshold(float problemThreshold) {
        this.problemThreshold = problemThreshold;
    }
    /**
     * @return the problemThreshold
     */
    public float getProblemThreshold() {
        return problemThreshold;
    }
    /**
     * @param urgenceThreshold the urgenceThreshold to set
     */
    public void setUrgenceThreshold(float urgenceThreshold) {
        this.urgenceThreshold = urgenceThreshold;
    }
    /**
     * @return the urgenceThreshold
     */
    public float getUrgenceThreshold() {
        return urgenceThreshold;
    }
    public String getEmotion() {
        return emotion;
    }
    public void setEmotion(String emotion) {
        this.emotion = emotion;
    }
    public String getProblem() {
        return problem;
    }
    public void setProblem(String problem) {
        this.problem = problem;
    }
    public String getUrgence() {
        return urgence;
    }
    public void setUrgence(String urgence) {
        this.urgence = urgence;
    }
    public String getSentiment() {
        return sentiment;
    }
    public void setSentiment(String sentiment) {
        this.sentiment = sentiment;
    }

} 
}
