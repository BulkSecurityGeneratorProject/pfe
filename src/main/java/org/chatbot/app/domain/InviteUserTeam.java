package org.chatbot.app.domain;
public class InviteUserTeam{
    private Long userId;
    private Long teamId;
    /**
     * @param userId the userId to set
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    /**
     * @return the userId
     */
    public Long getUserId() {
        return userId;
    }
    /**
     * @param teamId the teamId to set
     */
    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }
    /**
     * @return the teamId
     */
    public Long getTeamId() {
        return teamId;
    }
}