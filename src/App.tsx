import React, { useEffect, useState } from 'react';
import './App.css'
import { Position } from './types';
import { generateFood } from './utils/generateFood';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';

const BOARD_SIZE = 10;
document.documentElement.style.setProperty('--board-size', BOARD_SIZE.toString());  //BOARD_SIZE.toString(): Converts the value of the JavaScript variable BOARD_SIZE into a string, because CSS variables must be strings.

const App: React.FC = () => {
  const [snakePosition, setSnakePosition] = useState<Position[]>([[0,0]]);
  const [direction, setDirection] = useState<Position>([0,1]);
  const [food, setFood] = useState<Position>(generateFood([[0,0]], BOARD_SIZE));
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(()=> {
    const interval = setInterval(() => { //runs every 200 milliseconds
      setSnakePosition(prev => {
        const newHead: Position = [
          prev[0][0] + direction[0], //new row
          prev[0][1] + direction[1], // new column
        ];
        const hitSelf = prev.some(([r,c]) => r === newHead[0] && c === newHead[1]);

        if(newHead[0] < 0 || newHead[0] >= BOARD_SIZE
          || newHead[1] < 0 || newHead[1] >= BOARD_SIZE || hitSelf
         )
         {
          setIsGameOver(true);
          clearInterval(interval);
          return prev;
         }

         const newSnake = [newHead, ...prev];

         if(newHead[0] === food[0] && newHead[1] === food[1]){
          setFood(generateFood(newSnake, BOARD_SIZE));
          return newSnake
         }

       return newSnake.slice(0,-1); //add the newhead in the front and remove the last element 
      })
    },200);

    return () => clearInterval(interval);  //prevents any memory leaks when the component mounts or unmounts or the direction changes
  }, [direction, food])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if(isGameOver)
        return;
      switch(e.key){
        case 'ArrowUp': 
          setDirection([-1,0]);
          break;
        case 'ArrowDown':
          setDirection([1,0]);
          break;
        case 'ArrowLeft':
          setDirection([0,-1]);
          break;
        case 'ArrowRight':
          setDirection([0,1]);
          break;
      }
    };
    window.addEventListener('keydown',handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  },[isGameOver]);

  return (
    <div className='game'>
      <h2>Snake game</h2>
      <GameBoard boardSize={BOARD_SIZE} snake={snakePosition} food={food}/>
      {isGameOver && <GameOver/>}
    </div>
  )  
}

export default App
