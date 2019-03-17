package org.chatbot.app.repository;

import org.chatbot.app.domain.Annotation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Annotation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnnotationRepository extends JpaRepository<Annotation, Long> {
}
