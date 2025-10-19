package com.baha.backend.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequiredArgsConstructor
public class OnlinePlayersController {
    private final OnlinePlayers onlinePlayers;

    @GetMapping("/api/players/online")
    public Set<String> getOnlinePlayers() {
        return onlinePlayers.getPlayers();
    }
}
