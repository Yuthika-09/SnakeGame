import { useEffect, useState } from 'react';
import './App.css'

const BOARD_SIZE = 10;
document.documentElement.style.setProperty('--board-size', BOARD_SIZE.toString());  //BOARD_SIZE.toString(): Converts the value of the JavaScript variable BOARD_SIZE into a string, because CSS variables must be strings.

type Position = [number,number]; //row and the column

function App() {
  const [snakePosition, setSnakePosition] = useState<Position[]>([[0,0]]);
  const [direction, setDirection] = useState<Position>([0,1]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(()=> {
    const interval = setInterval(() => { //runs every 200 milliseconds
      setSnakePosition(prev => {
        const newHead: Position = [
          prev[0][0] + direction[0], //new row
          prev[0][1] + direction[1], // new column
        ];
        if(newHead[0] < 0 || newHead[0] > BOARD_SIZE
          || newHead[1] < 0 || newHead[0] > BOARD_SIZE
         )
         {
          setIsGameOver(true);
          clearInterval(interval);
          return prev;
         }
        return [newHead, ...prev.slice(0,-1)]; //add the newhead in the front and remove the last element 
      })
    },200);

    return () => clearInterval(interval);  //prevents any memory leaks when the component mounts or unmounts or the direction changes
  }, [direction])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
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
  },[isGameOver])
  const cells = [];

  for(let row = 0; row< BOARD_SIZE; row++){
    for(let col = 0; col < BOARD_SIZE; col++){
      const isSnake = snakePosition.some(([r,c]) => r === row && c === col);
      cells.push(<div key={`${row} - ${col}`} className={`cell ${isSnake ? 'snake' : ''}`}/>)
    }
  }
  return (
    <div className='game'>
      <h2>Snake game</h2>
      <div className='board'>
        {cells}
      </div>
    </div>
  )  
}

export default App
