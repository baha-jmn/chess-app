package com.baha.backend.game.dto;

import lombok.Data;

import java.util.List;

@Data
public class GameResponse {
    private Long id;
    private String playerWhite;
    private String playerBlack;
    private boolean finished;
    private List<MoveResponse> moves;
}
