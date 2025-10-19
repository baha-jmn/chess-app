package com.baha.backend.game;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Move {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fromPosition;
    private String toPosition;
    private String piece;
    private boolean capture;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Game game;
}
