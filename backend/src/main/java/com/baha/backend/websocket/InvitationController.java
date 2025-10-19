package com.baha.backend.websocket;

import com.baha.backend.game.dto.InvitationMessage;
import com.baha.backend.game.dto.InvitationResponseMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class InvitationController {

    private final SimpMessagingTemplate messagingTemplate;

    public InvitationController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/invite")
    public void sendInvitation(@Payload InvitationMessage invitationMessage) {
        messagingTemplate.convertAndSend(
                "/topic/invitations/" + invitationMessage.getToPlayer(),
                invitationMessage
        );
    }

    @MessageMapping("/invite-response")
    public void respondToInvitation(@Payload InvitationResponseMessage response) {
        messagingTemplate.convertAndSend(
                "/topic/invitations/" + response.getFromPlayer(),
                response
        );
    }
}
