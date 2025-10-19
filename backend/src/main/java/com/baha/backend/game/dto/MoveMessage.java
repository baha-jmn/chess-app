package com.baha.backend.game.dto;

import lombok.Data;

@Data
public class MoveMessage {
    private Long gameId;
    private String fromPosition;
    private String toPosition;
    private String piece;
    private boolean capture;
}