package org.chatbot.app.repository;

import org.chatbot.app.domain.Message;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Spring Data repository for the Message entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("select message from Message message where message.user.login = ?#{principal.username}")
    List<Message> findByUserIsCurrentUser();
    String req = "select distinct m.* from ((message m "+
    " inner join channel c on m.channel_id=c.id) "+
    "inner join team_user tr on c.team_id=tr.team_id) "+
    " where tr.user_id =:id";
    @Query(value = req, nativeQuery = true)
    List<Message> findByUserTeamChannel(@Param("id") Long id);
}
