package org.chatbot.app.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Annotation.
 */
@Entity
@Table(name = "annotation")
public class Annotation implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "annotation_type")
    private Integer annotationType;

    @Column(name = "annotation_data")
    private String annotationData;

    @ManyToOne
    @JsonIgnoreProperties("annotations")
    private Message message;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAnnotationType() {
        return annotationType;
    }

    public Annotation annotationType(Integer annotationType) {
        this.annotationType = annotationType;
        return this;
    }

    public void setAnnotationType(Integer annotationType) {
        this.annotationType = annotationType;
    }

    public String getAnnotationData() {
        return annotationData;
    }

    public Annotation annotationData(String annotationData) {
        this.annotationData = annotationData;
        return this;
    }

    public void setAnnotationData(String annotationData) {
        this.annotationData = annotationData;
    }

    public Message getMessage() {
        return message;
    }

    public Annotation message(Message message) {
        this.message = message;
        return this;
    }

    public void setMessage(Message message) {
        this.message = message;
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
        Annotation annotation = (Annotation) o;
        if (annotation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), annotation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Annotation{" +
            "id=" + getId() +
            ", annotationType=" + getAnnotationType() +
            ", annotationData='" + getAnnotationData() + "'" +
            "}";
    }
}
