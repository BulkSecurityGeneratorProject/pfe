package org.chatbot.app.web.rest;

import org.chatbot.app.domain.Annotation;
import org.chatbot.app.domain.Channel;
import org.chatbot.app.domain.InviteUserTeam;
import org.chatbot.app.domain.Message;
import org.chatbot.app.domain.Source;
import org.chatbot.app.domain.Team;
import org.chatbot.app.domain.User;
import org.chatbot.app.domain.UserInfo;
import org.chatbot.app.repository.AnnotationRepository;
import org.chatbot.app.repository.ChannelRepository;
import org.chatbot.app.repository.MessageRepository;
import org.chatbot.app.repository.TeamRepository;
import org.chatbot.app.repository.UserInfoRepository;
import org.chatbot.app.repository.UserRepository;
import org.chatbot.app.security.SecurityUtils;
import org.chatbot.app.service.MailService;
import org.chatbot.app.service.UserService;
import org.chatbot.app.service.dto.PasswordChangeDTO;
import org.chatbot.app.service.dto.UserDTO;
import org.chatbot.app.web.rest.errors.*;
import org.chatbot.app.web.rest.vm.KeyAndPasswordVM;
import org.chatbot.app.web.rest.vm.ManagedInvitedUser;
import org.chatbot.app.web.rest.vm.ManagedUserVM;
import org.chatbot.app.web.rest.vm.ManagedUserVMCompany;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import java.time.Instant;
import java.util.*;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    private final UserRepository userRepository;

    private final UserService userService;

    private final MailService mailService;
    private final MessageRepository messageRepository;
    private final ChannelRepository channelRepository;
    private final AnnotationRepository annotationRepository;
    private final TeamRepository teamRepository;
    private final UserInfoRepository userInfoRepository;

    public AccountResource(UserRepository userRepository, UserService userService, MailService mailService, MessageRepository messageRepository,ChannelRepository channelRepository,AnnotationRepository annotationRepository,TeamRepository teamRepository,UserInfoRepository userInfoRepository) {

        this.userRepository = userRepository;
        this.userService = userService;
        this.mailService = mailService;
        this.channelRepository=channelRepository;
        this.teamRepository=teamRepository;
        this.annotationRepository=annotationRepository;
        this.messageRepository=messageRepository;
        this.userInfoRepository=userInfoRepository;
    }

    /**
     * POST  /register : register the user.
     *
     * @param managedUserVM the managed user View Model
     * @throws InvalidPasswordException 400 (Bad Request) if the password is incorrect
     * @throws EmailAlreadyUsedException 400 (Bad Request) if the email is already used
     * @throws LoginAlreadyUsedException 400 (Bad Request) if the login is already used
     */
    @PostMapping("/invite")
    @ResponseStatus(HttpStatus.CREATED)
    public void invite(@Valid @RequestBody ManagedInvitedUser managedInvitedUser){
        if (!checkPasswordLength(managedInvitedUser.getPassword())) {
            throw new InvalidPasswordException();
        }
        User user = userService.registerUser(managedInvitedUser, managedInvitedUser.getPassword());
        mailService.sendActivationEmail(user);
        teamRepository.invitation(user.getId(),managedInvitedUser.getTeam());
    }
    @PostMapping("/inviteExis")
    public void inviteExis(@Valid @RequestBody InviteUserTeam invitation){
        teamRepository.invitation(invitation.getUserId(),invitation.getTeamId());
    }
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@Valid @RequestBody ManagedUserVMCompany managedUserVM) {
        if (!checkPasswordLength(managedUserVM.getPassword())) {
            throw new InvalidPasswordException();
        }
        User user = userService.registerUser(managedUserVM, managedUserVM.getPassword());
        mailService.sendActivationEmail(user);
        if(user!=null)
        {
            List<Annotation> a=new ArrayList<Annotation>();
            List<Message> m=new ArrayList<Message>();
            List<Channel> c=new ArrayList<Channel>();

            Team t= new Team();
            t.getUsers().add(user);
            t.setTeamName(managedUserVM.getCompany());
            t=teamRepository.save(t);
            Source s=new Source();
            s.setId((long) 1);
            Channel c1=new Channel();
            c1.setChannelName("zendesk");
            c1.setTeam(t);
            c1.setSource(s);
            c.add(c1);
            c1=new Channel();
            c1.setChannelName("facebook");
            s=new Source();
            s.setId((long) 2);
            c1.setSource(s);
            c1.setTeam(t);
            c.add(c1);
            c=channelRepository.saveAll(c);

            Message m1=new Message();
            m1.setMessageTitle("frustration");
            m1.setMessageText("I just wanted to let you know that all of your help with getting (your business) off the ground is very much appreciated. Your support and efforts for our new venture certainly contributed to our success, and I want to thank you for that. Good luck in all of your endeavors. Keep in touch.");
            m1.setChannel(c.get(0));
            m1.setUser(user);
            m1.setArchived(false);
            m1.setCreatedAt(Instant.now());
            m.add(m1);

            m1=new Message();
            m1.setMessageTitle("Thanks a lot");
            m1.setMessageText("I can’t believe that you billed me without letting me know ahead of time! I was not expecting a charge at all, let alone one that was SO EXPENSIVE. How can you guys get away with this!?!?");
            m1.setChannel(c.get(1));
            m1.setArchived(false);
            m1.setCreatedAt(Instant.now());
            m.add(m1);
            m1=new Message();
            m1.setMessageTitle("I have lost my data");
            m1.setMessageText("I don’t understand what you are telling me. Earlier you said that I could fix the problem by doing one thing, now you’re saying that I have to do something else? Am I ever going to be able to get my data back?");
            m1.setChannel(c.get(0));
            m1.setArchived(false);
            m1.setCreatedAt(Instant.now());
            m.add(m1);
            m1=new Message();
            m1.setMessageTitle("Hbd");
            m1.setMessageText("Our sincerest wishes from Chatbot team on your birthday. May all your dreams come true! We are looking forward to continuing our relationship with you this year.");
            m1.setChannel(c.get(1));
            m1.setArchived(false);
            m1.setCreatedAt(Instant.now());
            m.add(m1);
            m1=new Message();
            m1.setMessageTitle("security");
            m1.setMessageText("Could you share a bit more information with me so that we can get to the bottom of this? For example, would you mind sending me the username associated with your account along with the date that you received the charge? Using that, I can take a look in our system and see how we can get this fixed for you.");
            m1.setChannel(c.get(0));
            m1.setUser(user);
            m1.setArchived(false);
            m1.setCreatedAt(Instant.now());
            m.add(m1);
            m1=new Message();
            m1.setMessageTitle("disappointed");
            m1.setMessageText("I thought everything was sorted, but when I went to go back and follow Mark’s advice it didn’t actually work. Feeling really disappointed. I’ll probably just stop using this product.");
            m1.setChannel(c.get(1));
            m1.setArchived(false);
            m1.setCreatedAt(Instant.now());
            m.add(m1);
            m1=new Message();
            m1.setMessageTitle("Acknowledge");
            m1.setMessageText("I noticed that you left a review on your interaction with me that mentioned that the solution I’d offered didn’t work for you, so I wanted to reach out and see if we could get it fixed.");
            m1.setChannel(c.get(0));
            m1.setArchived(false);
            m1.setCreatedAt(Instant.now());
            m.add(m1);

            m1=new Message();
            m1.setMessageTitle("Thanks");
            m1.setMessageText("Our management would like to thank you for patronizing our products and also thank you for the opportunity to serve you. Truly, it is our pleasure. You are a valued customer to us.");
            m1.setChannel(c.get(0));
            m1.setArchived(false);
            m1.setCreatedAt(Instant.now());
            m.add(m1);

            m=messageRepository.saveAll(m);

            Annotation a1=new Annotation();
            a1.setAnnotationType(1);
            a1.setAnnotationData("Satisfaction");
            a1.setMessage(m.get(1));
            a.add(a1);
            a1=new Annotation();
            a1.setAnnotationType(1);
            a1.setAnnotationData("Happy");
            a1.setMessage(m.get(1));
            a.add(a1);
            a1=new Annotation();
            a1.setAnnotationType(1);
            a1.setAnnotationData("Positive");
            a1.setMessage(m.get(1));
            a.add(a1);
            a1=new Annotation();
            a1.setAnnotationType(1);
            a1.setAnnotationData("NotIssue");
            a1.setMessage(m.get(1));
            a.add(a1);

            a1.setAnnotationType(0);
            a1.setAnnotationData("Insatisfaction");
            a1.setMessage(m.get(0));
            a.add(a1);
            a1=new Annotation();
            a1.setAnnotationType(0);
            a1.setAnnotationData("Unhappy");
            a1.setMessage(m.get(0));
            a.add(a1);
            a1=new Annotation();
            a1.setAnnotationType(0);
            a1.setAnnotationData("Issue");
            a1.setMessage(m.get(0));
            a.add(a1);

            a1=new Annotation();
            a1.setAnnotationType(0);
            a1.setAnnotationData("happy");
            a1.setMessage(m.get(3));
            a.add(a1);
            a1=new Annotation();
            a1.setAnnotationType(0);
            a1.setAnnotationData("Joy");
            a1.setMessage(m.get(3));
            a.add(a1);

            a1=new Annotation();
            a1.setAnnotationType(0);
            a1.setAnnotationData("unhappy");
            a1.setMessage(m.get(4));
            a.add(a1);
            a1=new Annotation();
            a1.setAnnotationType(0);
            a1.setAnnotationData("urgent");
            a1.setMessage(m.get(4));
            a.add(a1);
            a1=new Annotation();
            a1.setAnnotationType(0);
            a1.setAnnotationData("Issue");
            a1.setMessage(m.get(4));
            a.add(a1);

            a1=new Annotation();
            a1.setAnnotationType(0);
            a1.setAnnotationData("unhappy");
            a1.setMessage(m.get(5));
            a.add(a1);
            a1=new Annotation();
            a1.setAnnotationType(0);
            a1.setAnnotationData("urgent");
            a1.setMessage(m.get(5));
            a.add(a1);
            a1=new Annotation();
            a1.setAnnotationType(0);
            a1.setAnnotationData("disappointed");
            a1.setMessage(m.get(5));
            a.add(a1);

            a1=new Annotation();
            a1.setAnnotationType(0);
            a1.setAnnotationData("unhappy");
            a1.setMessage(m.get(6));
            a.add(a1);
            a1=new Annotation();
            a1.setAnnotationType(0);
            a1.setAnnotationData("sad");
            a1.setMessage(m.get(6));
            a.add(a1);


            a1=new Annotation();
            a1.setAnnotationType(0);
            a1.setAnnotationData("happy");
            a1.setMessage(m.get(7));
            a.add(a1);

            a=annotationRepository.saveAll(a);
            UserInfo uf=new UserInfo();
            uf.setUser(user);
            uf.setCompanyName(managedUserVM.getCompany());
            userInfoRepository.save(uf);
        }
    }

    /**
     * GET  /activate : activate the registered user.
     *
     * @param key the activation key
     * @throws RuntimeException 500 (Internal Server Error) if the user couldn't be activated
     */
    @GetMapping("/activate")
    public void activateAccount(@RequestParam(value = "key") String key) {
        Optional<User> user = userService.activateRegistration(key);
        if (!user.isPresent()) {
            throw new InternalServerErrorException("No user was found for this activation key");
        }
    }

    /**
     * GET  /authenticate : check if the user is authenticated, and return its login.
     *
     * @param request the HTTP request
     * @return the login if the user is authenticated
     */
    @GetMapping("/authenticate")
    public String isAuthenticated(HttpServletRequest request) {
        log.debug("REST request to check if the current user is authenticated");
        return request.getRemoteUser();
    }

    /**
     * GET  /account : get the current user.
     *
     * @return the current user
     * @throws RuntimeException 500 (Internal Server Error) if the user couldn't be returned
     */
    @GetMapping("/account")
    public UserDTO getAccount() {
        return userService.getUserWithAuthorities()
            .map(UserDTO::new)
            .orElseThrow(() -> new InternalServerErrorException("User could not be found"));
    }

    /**
     * POST  /account : update the current user information.
     *
     * @param userDTO the current user information
     * @throws EmailAlreadyUsedException 400 (Bad Request) if the email is already used
     * @throws RuntimeException 500 (Internal Server Error) if the user login wasn't found
     */
    @PostMapping("/account")
    public void saveAccount(@Valid @RequestBody UserDTO userDTO) {
        String userLogin = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new InternalServerErrorException("Current user login not found"));
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getLogin().equalsIgnoreCase(userLogin))) {
            throw new EmailAlreadyUsedException();
        }
        Optional<User> user = userRepository.findOneByLogin(userLogin);
        if (!user.isPresent()) {
            throw new InternalServerErrorException("User could not be found");
        }
        userService.updateUser(userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail(),
            userDTO.getLangKey(), userDTO.getImageUrl());
    }

    /**
     * POST  /account/change-password : changes the current user's password
     *
     * @param passwordChangeDto current and new password
     * @throws InvalidPasswordException 400 (Bad Request) if the new password is incorrect
     */
    @PostMapping(path = "/account/change-password")
    public void changePassword(@RequestBody PasswordChangeDTO passwordChangeDto) {
        if (!checkPasswordLength(passwordChangeDto.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        userService.changePassword(passwordChangeDto.getCurrentPassword(), passwordChangeDto.getNewPassword());
    }

    /**
     * POST   /account/reset-password/init : Send an email to reset the password of the user
     *
     * @param mail the mail of the user
     * @throws EmailNotFoundException 400 (Bad Request) if the email address is not registered
     */
    @PostMapping(path = "/account/reset-password/init")
    public void requestPasswordReset(@RequestBody String mail) {
       mailService.sendPasswordResetMail(
           userService.requestPasswordReset(mail)
               .orElseThrow(EmailNotFoundException::new)
       );
    }

    /**
     * POST   /account/reset-password/finish : Finish to reset the password of the user
     *
     * @param keyAndPassword the generated key and the new password
     * @throws InvalidPasswordException 400 (Bad Request) if the password is incorrect
     * @throws RuntimeException 500 (Internal Server Error) if the password could not be reset
     */
    @PostMapping(path = "/account/reset-password/finish")
    public void finishPasswordReset(@RequestBody KeyAndPasswordVM keyAndPassword) {
        if (!checkPasswordLength(keyAndPassword.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        Optional<User> user =
            userService.completePasswordReset(keyAndPassword.getNewPassword(), keyAndPassword.getKey());

        if (!user.isPresent()) {
            throw new InternalServerErrorException("No user was found for this reset key");
        }
    }

    private static boolean checkPasswordLength(String password) {
        return !StringUtils.isEmpty(password) &&
            password.length() >= ManagedUserVM.PASSWORD_MIN_LENGTH &&
            password.length() <= ManagedUserVM.PASSWORD_MAX_LENGTH;
    }
}
