package org.chatbot.app.repository;

import java.util.List;

import org.chatbot.app.domain.Annotation;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;


/**
 * Spring Data  repository for the Annotation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnnotationRepository extends JpaRepository<Annotation, Long> {

    final String req = "select distinct a.* from (((annotation a "+
    "inner join message m on m.id=a.message_id) "+
    " inner join channel c on m.channel_id=c.id) "+
    " inner join team_user tr on c.team_id=tr.team_id)"+
    " where tr.user_id =:id";
    @Query(value = req,nativeQuery = true)
    List<Annotation> findByUserId(@Param("id") Long id);
}