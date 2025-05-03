import React from "react";
import SnakeCell from "./SnakeCell";
import FoodCell from "./FoodCell";
import { Position } from "../types";

interface GameBoardProps {
    boardSize: number;
    snake: Position[];
    food: Position;
}

const GameBoard: React.FC<GameBoardProps> = ({boardSize, snake, food}) => {
    const cells = [];

  for(let row = 0; row< boardSize; row++){
    for(let col = 0; col < boardSize; col++){
      const isSnake = snake.some(([r,c]) => r === row && c === col);
      const isFood = food[0] === row && food[1] === col;

      if(isSnake)
        cells.push(<SnakeCell key={`${row} - ${col}`}/>)
      else if(isFood)
        cells.push(<FoodCell key={`${row} - ${col}`}/>);
      else
        cells.push(<div key={`${row} - ${col}`} className = "cell"/>);
    }
  }
  return <div className="board">{cells}</div>
}
export default GameBoard;