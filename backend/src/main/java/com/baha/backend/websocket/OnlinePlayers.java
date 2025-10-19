package com.baha.backend.websocket;

import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
public class OnlinePlayers {
    private final Set<String> players = Collections.synchronizedSet(new HashSet<>());

    public Set<String> getPlayers() {
        return players;
    }

    public void addPlayer(String username) {
        players.add(username);
    }

    public void removePlayer(String username) {
        players.remove(username);
    }
}
