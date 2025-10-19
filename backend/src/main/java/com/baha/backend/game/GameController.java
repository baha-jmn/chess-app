package com.baha.backend.game;

import com.baha.backend.game.dto.GameCreateRequest;
import com.baha.backend.game.dto.GameResponse;
import com.baha.backend.game.dto.MoveRequest;
import com.baha.backend.game.dto.MoveResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @PostMapping("/create")
    public ResponseEntity<GameResponse> createGame(@RequestBody GameCreateRequest request) {
        Game game = gameService.createGame(request.getWhite(), request.getBlack());
        return ResponseEntity.ok(gameService.convertToDto(game));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameResponse> getGame(@PathVariable Long id) {
        return ResponseEntity.ok(gameService.getGameByIdResponse(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Game>> getAllGames() {
        return ResponseEntity.ok(gameService.getAllGames());
    }

    @PostMapping("/{id}/move")
    public ResponseEntity<MoveResponse> addMove(@PathVariable Long id, @RequestBody MoveRequest moveRequest) {
        Move move = new Move();
        move.setFromPosition(moveRequest.getFromPosition());
        move.setToPosition(moveRequest.getToPosition());
        move.setPiece(moveRequest.getPiece());

        Move savedMove = gameService.addMove(id, move);
        return ResponseEntity.ok(gameService.convertToDto(savedMove));
    }

    @PostMapping("/{id}/finish")
    public ResponseEntity<Boolean> finishGame(@PathVariable Long id) {
        return ResponseEntity.ok(gameService.finishGame(id));
    }

}
