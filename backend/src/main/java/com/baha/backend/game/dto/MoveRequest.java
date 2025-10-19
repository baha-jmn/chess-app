package com.baha.backend.game.dto;

import lombok.Data;

@Data
public class MoveRequest {
    private String fromPosition;
    private String toPosition;
    private String piece;
}