package org.chatbot.app.repository;

import java.util.List;
import java.util.Optional;

import org.chatbot.app.domain.Channel;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data repository for the Channel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChannelRepository extends JpaRepository<Channel, Long> {

    final String req = "select c.* from channel c, team_user tr " + "where " + "c.team_id=tr.team_id and "
            + "tr.user_id= :id ";
    @Query(value = req, nativeQuery = true)
    List<Channel> findByTeamChannel(@Param("id") Long id);

final String req2="select c.* from channel c where charindex(:url,c.domain)>=1";
@Query(value = req2,nativeQuery = true)
Optional<Channel> findOneByChannelName(@Param("url") String url);
}

//Controle
/*public static String extract(String s)
	{
		return s.split(".zendesk")[0].split("//")[1];
	}
	public static void main(String[] args) {
		String s="https://company.zendesk.com/api/v2/tickets/35436.json";
		System.out.println(extract(s));
    }
    */