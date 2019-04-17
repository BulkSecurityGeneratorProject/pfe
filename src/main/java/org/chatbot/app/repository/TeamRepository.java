package org.chatbot.app.repository;

import org.chatbot.app.domain.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

/**
 * Spring Data  repository for the Team entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    @Query(value = "select distinct team from Team team left join fetch team.users",
        countQuery = "select count(distinct team) from Team team")
    Page<Team> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct team from Team team left join fetch team.users")
    List<Team> findAllWithEagerRelationships();

    @Query("select team from Team team left join fetch team.users where team.id =:id")
    Optional<Team> findOneWithEagerRelationships(@Param("id") Long id);

    @Query(value = "select distinct t.* from Team t inner join team_user tr on tr.TEAM_ID =t.id where tr.user_id=:id", nativeQuery = true)
    List<Team>findTeamByUserId(@Param("id") Long id);

    @Modifying
    @Query(value = "insert into team_user (user_id,team_id) VALUES (:user,:id)", nativeQuery = true)
    @Transactional
    void invitation(@Param("user") Long user, @Param("id") Long id);
}
