package org.chatbot.app.repository;

import java.util.List;

import org.chatbot.app.domain.Channel;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Channel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChannelRepository extends JpaRepository<Channel, Long> {

    String req = "select c.* from channel c, team_user tr " + "where "
    + "c.team_id=tr.team_id and " + "tr.user_id= :id ";
@Query(value = req, nativeQuery = true)
List<Channel> findByTeamChannel(@Param("id") Long id);

}
