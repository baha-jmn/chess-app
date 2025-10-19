package com.baha.backend.game.dto;

import lombok.Data;

@Data
public class MoveResponse {
    private Long id;
    private String fromPosition;
    private String toPosition;
    private String piece;
    private boolean capture;
}