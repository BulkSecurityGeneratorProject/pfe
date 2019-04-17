package org.chatbot.app.web.rest.vm;

public class ManagedInvitedUser extends ManagedUserVM{
Long team;
/**
 * @return the team
 */
public Long getTeam() {
    return team;
}
/**
 * @param team the team to set
 */
public void setTeam(Long team) {
    this.team = team;
}
}