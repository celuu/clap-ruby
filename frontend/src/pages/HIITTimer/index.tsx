import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import { intervalDefaultData, Intervals, WorkoutType } from "./utils"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const HIITTimer = () => {
  const [data, setData] = useState<Intervals[]>(intervalDefaultData)
  const navigate = useNavigate();

  const addInterval = () => {
    const copy = [...data];
    const newItem:Intervals = {
      id: (data.length + 1).toString(),
      index: data.length + 1,
      name: "new interval",
      time: 3,
      type: "workout"
    }
    copy.push(newItem)

    setData([...copy])

  }

  const deleteInterval = (targetId: number) => {
    const copy = [...data]
    setData(copy.filter((item) => item.index !== targetId ))
  }

  const updateTypeInterval = (index: number, category: string) => {
    setData((prev) => 
      prev.map((item, i) => 
        item.index === index ? {...item, type: category as WorkoutType} : item
      ),
    )
  }
  const addTime = (index: number) => {
    setData((prev) =>
      prev.map((item, i) =>
        item.index === index ? { ...item, time: Number(item.time) + 1 } : item,
      ),
    );
  } 

    const removeTime = (index: number) => {
      
      setData((prev) =>
        prev.map((item, i) =>
          item.index === index
            ? { ...item, time: item.time - 1 < 0 ? 0 : item.time - 1 }
            : item,
        ),
      );
    }; 

  return (
    <Box padding={"100px"}>
      <HStack justifyContent={"space-between"}>
        <Heading>Intervals</Heading>
        <Box>
          <Button
            onClick={() =>
              navigate("/play-timer", {
                state: { intervals: data },
              })
            }
          >
            Start Timer
          </Button>
          <Button onClick={() => addInterval()} marginLeft={"10px"}>
            Add Interval
          </Button>
        </Box>
      </HStack>
      <table style={{ margin: "50px", width: "100%", padding: "100px" }}>
        <tr>
          <th>index</th>
          <th>Name</th>
          <th>Type</th>
          <th>Time</th>
        </tr>

        {data.map((item: Intervals) => (
          <tr key={item.id}>
            <td>{item.index}</td>
            <td>
              <input
                value={item.name}
                onChange={(e) =>
                  setData((prev) =>
                    prev.map((interval) =>
                      interval.index === item.index
                        ? { ...interval, name: e.target.value }
                        : interval,
                    ),
                  )
                }
              />
            </td>
            <td>
              <select
                value={item.type}
                onChange={(e) => updateTypeInterval(item.index, e.target.value)}
              >
                <option value={"workout"}>Workout</option>
                <option value={"rest"}>Rest</option>
              </select>
            </td>
            <td>
              <button onClick={() => removeTime(item.index)}>-</button>
              {item.time}
              <button onClick={() => addTime(item.index)}>+</button>
            </td>
            <Button onClick={() => deleteInterval(item.index)}>
              Delete interval
            </Button>
          </tr>
        ))}
      </table>
    </Box>
  );

}