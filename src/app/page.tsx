'use client'

import Game from "../../componentes/tic-tac-toe";
import TicTacToe from "../../componentes/dinamic-tic-tac-toe";

export default function Home() {
  return (
    <div>
      <Game />
      <TicTacToe />
    </div>
  );
}
