import { Box, Button, HStack, Text } from "@chakra-ui/react";
import {  useEffect, useState } from "react";
import { words } from "./words";
const ROWS = 5;
const COLS = 5;

const buildGraph = (): string[][] => {
  let result: string[][] = [];
  for (let i = 0; i < ROWS; i++) {
    result.push([]);
    for (let j = 0; j < COLS; j++) {
      result[i].push("");
    }
  }
  return result;
};

export const Wordle = () => {
  const [board, setBoard] = useState<string[][]>(buildGraph())
  const [activeRow, setActiveRow] = useState<number>(0)
  const [activeCol, setActiveCol] = useState<number>(0)
  const [hasWon, setHasWon] = useState(false)
  const selectedWord = words[0];
  
  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if(e.key === "Backspace") {
        if(activeCol === 0) return;
        setBoard((prev) => {
          const copy = prev.map((row) => [...row]);
          copy[activeRow][activeCol - 1] = "";
      
          return copy;
        });
        setActiveCol((prev) => prev - 1);
      }

      const isLetter = /^[a-zA-Z]$/.test(e.key);
      if(activeCol >= COLS) return;
      if(!isLetter) return;

      setBoard((prev) => {
        const copy = prev.map((row) => [...row]);
        copy[activeRow][activeCol] = e.key;
        return copy;
      });
      setActiveCol((prev) => prev + 1)
    };

    window.addEventListener("keydown", keyDown);
    return () => {
      window.removeEventListener("keydown", keyDown);
    }

  }, [activeRow, activeCol])

  const onSubmit = () => {
    if(activeRow === ROWS) return;
    if(checkWinner()) {
      setHasWon(true)
    }
    setActiveRow((row) => row + 1)
    setActiveCol(0)
  }

  const checkWinner = () => {
    const fullWord = board[activeRow]
    for(let i = 0; i < ROWS; i++) {
      if(fullWord[i] !== selectedWord[i] ) {
        return false
      }
    }
    return true;
  }

  const checkBackgroundColor = (letter: string, index: number) => {
    if(letter === selectedWord[index] ) {
      return "green.500"
    }
    if(selectedWord.includes(letter)) {
      return "yellow.500"
    }
    return "gray.500"
  }


  return (
    <Box width={'100%'}>
      <Text>Selected word: {selectedWord}</Text>
      {hasWon && 
      <Text>you have won!</Text>}
      {board.map((rows, r) => (
        <HStack
          borderColor={"black"}
          borderRadius={"md"}
        >
          {rows.map((cols, c) => (
            <Box
              border={"1px"}
              borderColor={"black"}
              borderRadius={"md"}
              width={"100px"}
              height={"100px"}
              backgroundColor={activeRow > r ? checkBackgroundColor(board[r][c], c) : "transparent"}
            >
              {board[r][c]}
            </Box>
          ))}
        </HStack>
      ))}

      <Button onClick={() => onSubmit()}>Submit</Button>
    </Box>
  );

}