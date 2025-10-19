package com.baha.backend.game;

import com.baha.backend.game.dto.GameResponse;
import com.baha.backend.game.dto.MoveResponse;

import java.util.List;
import java.util.Optional;

public interface GameService {

    Game createGame(String playerWhite, String playerBlack);
    Optional<Game> getGameById(Long id);
    List<Game> getAllGames();
    Move addMove(Long gameId, Move move);
    boolean finishGame(Long gameId);

    GameResponse getGameByIdResponse(Long id);
    MoveResponse convertToDto(Move move);
    GameResponse convertToDto(Game game);
}
