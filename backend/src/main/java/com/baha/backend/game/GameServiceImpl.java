package com.baha.backend.game;

import com.baha.backend.game.dto.GameResponse;
import com.baha.backend.game.dto.MoveResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService{
    private final GameRepository gameRepository;
    private final MoveRepository moveRepository;

    @Override
    public Game createGame(String playerWhite, String playerBlack) {
        Game game = Game.builder()
                .playerWhite(playerWhite)
                .playerBlack(playerBlack)
                .build();
        return gameRepository.save(game);
    }

    @Override
    public Optional<Game> getGameById(Long id) {
        return gameRepository.findById(id);
    }

    @Override
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    @Override
    @Transactional
    public Move addMove(Long gameId, Move move) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));

        move.setGame(game);
        Move savedMove = moveRepository.save(move);

        game.getMoves().add(savedMove);

        return savedMove;
    }

    @Override
    public boolean finishGame(Long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));
        game.setFinished(true);
        gameRepository.save(game);
        return true;
    }

    @Transactional
    public GameResponse getGameByIdResponse(Long id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found"));
        return convertToDto(game);
    }

    public GameResponse convertToDto(Game game) {
        GameResponse dto = new GameResponse();
        dto.setId(game.getId());
        dto.setPlayerWhite(game.getPlayerWhite());
        dto.setPlayerBlack(game.getPlayerBlack());
        dto.setFinished(game.isFinished());
        dto.setMoves(game.getMoves().stream().map(this::convertToDto).toList());
        return dto;
    }

    public MoveResponse convertToDto(Move move) {
        MoveResponse dto = new MoveResponse();
        dto.setId(move.getId());
        dto.setFromPosition(move.getFromPosition());
        dto.setToPosition(move.getToPosition());
        dto.setPiece(move.getPiece());
        dto.setCapture(move.isCapture());
        return dto;
    }
}
