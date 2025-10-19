package com.baha.backend.websocket;

import com.baha.backend.game.GameService;
import com.baha.backend.game.Move;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Set;

@Controller
@RequiredArgsConstructor
public class GameWebSocketHandler {

    private final GameService gameService;
    private final OnlinePlayers onlinePlayers;

    @MessageMapping("/invite/game")
    @SendTo("/topic/invitations")
    public String invite(String payload) {
        String[] parts = payload.split(":");
        if (parts.length == 2) {
            String fromUser = parts[0];
            String toUser = parts[1];
            if (onlinePlayers.getPlayers().contains(toUser)) {
                return payload;
            }
        }
        return "invalid";
    }

    @MessageMapping("/move")
    @SendTo("/topic/moves")
    public Move move(Move move) {
        return gameService.addMove(move.getGame().getId(), move);
    }

    @MessageMapping("/online")
    @SendTo("/topic/online")
    public Set<String> getOnlinePlayers() {
        return onlinePlayers.getPlayers();
    }
}
