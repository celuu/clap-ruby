import { Box, Button, Heading } from "@chakra-ui/react"
import { Intervals } from "./utils"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export type TimerProps = {
  intervals: Intervals[]
}

export const Timer = () => {
  const {state} = useLocation()
  const intervals = state.intervals;
  const [activeInterval, setActiveInterval] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(intervals[0].time)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!isPlaying) return;

  //       setSecondsRemaining(prev => {
  //         if (prev > 0) return prev - 1;

  //         setActiveInterval(i => {
  //           const next = i + 1;
  //           if (next >= intervals.length) {
  //             setIsPlaying(false); 
  //             return i;                 
  //           }
  //           setSecondsRemaining(intervals[next].time);
  //           return next;
  //         });

  //         return 0;
  //       });
  //   }, 1000); 

  //   return () => clearInterval(interval);
  // }, [isPlaying, intervals])



  const play = () => {
    setIsPlaying(true)

  }

  const pause = () => {
    setIsPlaying(false);
  }

  return (
    <Box padding={'10'}>
      <Heading>Timer</Heading>
      <Heading>Seconds Remaining: {secondsRemaining}</Heading>
      <p>Current Interval Name: {intervals[activeInterval].name}</p>
      <Button onClick={() =>{
        isPlaying ? pause() : play()
      }}>
        {isPlaying ? "Pause": "Play"}
      </Button>
      {intervals.map((interval:Intervals) => (
        <div>{interval.name} + {interval.time}</div>
      ))}
    </Box>
  );

}