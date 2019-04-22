package org.chatbot.app.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Message.
 */
@Entity
@Table(name = "message")
public class Message implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message_title")
    private String messageTitle;

    @Column(name = "message_text")
    private String messageText;

    @Column(name = "archived")
    private Boolean archived;

    @Column(name = "created_at")
    private Instant createdAt;

    @OneToMany(mappedBy = "message")
    private Set<Annotation> annotations = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("messages")
    private Channel channel;

    @ManyToOne
    @JsonIgnoreProperties("messages")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessageTitle() {
        return messageTitle;
    }

    public Message messageTitle(String messageTitle) {
        this.messageTitle = messageTitle;
        return this;
    }

    public void setMessageTitle(String messageTitle) {
        this.messageTitle = messageTitle;
    }

    public String getMessageText() {
        return messageText;
    }

    public Message messageText(String messageText) {
        this.messageText = messageText;
        return this;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public Boolean isArchived() {
        return archived;
    }

    public Message archived(Boolean archived) {
        this.archived = archived;
        return this;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Message createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Set<Annotation> getAnnotations() {
        return annotations;
    }

    public Message annotations(Set<Annotation> annotations) {
        this.annotations = annotations;
        return this;
    }

    public Message addAnnotation(Annotation annotation) {
        this.annotations.add(annotation);
        annotation.setMessage(this);
        return this;
    }

    public Message removeAnnotation(Annotation annotation) {
        this.annotations.remove(annotation);
        annotation.setMessage(null);
        return this;
    }

    public void setAnnotations(Set<Annotation> annotations) {
        this.annotations = annotations;
    }

    public Channel getChannel() {
        return channel;
    }

    public Message channel(Channel channel) {
        this.channel = channel;
        return this;
    }

    public void setChannel(Channel channel) {
        this.channel = channel;
    }

    public User getUser() {
        return user;
    }

    public Message user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Message message = (Message) o;
        if (message.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), message.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Message{" +
            "id=" + getId() +
            ", messageTitle='" + getMessageTitle() + "'" +
            ", messageText='" + getMessageText() + "'" +
            ", archived='" + isArchived() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            "}";
    }
}
