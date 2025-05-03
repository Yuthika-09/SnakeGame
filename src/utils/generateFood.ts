import { Position } from "../types";

export const generateFood = ( snake : Position[],boardSize : number) : Position => {
    let newFood: Position;
    do{
        newFood = [
            Math.floor(Math.random() * boardSize),
            Math.floor(Math.random() * boardSize),
        ];
    }while(snake.some(([r,c]) => r === newFood[0] && c === newFood[1]));
    return newFood;
}