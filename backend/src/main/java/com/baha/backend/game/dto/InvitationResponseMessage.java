package com.baha.backend.game.dto;

import lombok.Data;

@Data
public class InvitationResponseMessage {
    private String fromPlayer;
    private String toPlayer;
    private boolean accepted;
}
