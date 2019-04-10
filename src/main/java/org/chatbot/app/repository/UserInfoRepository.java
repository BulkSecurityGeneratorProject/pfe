package org.chatbot.app.repository;

import java.util.List;

import org.chatbot.app.domain.UserInfo;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    @Query(value = "select user_info.* from USER_INFO  where user_id=:id",nativeQuery = true)
    List<UserInfo> findByUserId(@Param("id") Long id);
}
