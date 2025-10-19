import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessLobbyComponent } from './chess-lobby.component';

describe('ChessLobbyComponent', () => {
  let component: ChessLobbyComponent;
  let fixture: ComponentFixture<ChessLobbyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChessLobbyComponent]
    });
    fixture = TestBed.createComponent(ChessLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
