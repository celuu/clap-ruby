import { Column, Task } from "@/types";
import { Box, VStack, HStack, Card, Heading, Button } from "@chakra-ui/react";
import { useState } from "react";
import { data } from "./utils";


export const Kanban = () => {
  const exampleData: Column[] = data;
  const [dataset, setDataset] = useState<Column[]>(exampleData)

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, category: string) => {
    e.preventDefault();
      const cardId = e.dataTransfer.getData("text/plain");
      if (!cardId) return;
        setDataset((prev) =>
          prev.map((card) =>
            card.id === cardId ? { ...card, type: category } : card,
          ),
        );
  };

  const addColumn = () => {
    const copy = [...dataset];
    const toAdd = {
      id: String(dataset.length + 1),
      name: "example",
      position: dataset.length + 1,
      tasks: []
    }
    copy.push(toAdd)
    setDataset(copy)
  }

  const addTask = (column_id: string, newTask: string) => {
    let createdTask = {
      id: "10",
      name: newTask,
      position: 3,
      column_id: column_id
    }
    setDataset((prev) =>
      prev.map((col) =>
        col.id === column_id
          ? { ...col, tasks: [...(col.tasks ?? []), createdTask] }
          : col,
      ),
    );
  }

  console.log(dataset, "data");

  return (
    <Box margin={"20px"} paddingLeft={"200px"} paddingRight={"200px"}>
      <HStack justifyContent={"space-between"}>
        <Heading>Kanban</Heading>
        <Box>
          <Button
            onClick={() => {
              addColumn();
            }}
          >
            Add Column
          </Button>
        </Box>
      </HStack>

      <HStack width={"100%"} justifyContent={"space-between"}>
        {dataset.map((data: Column) => (
          <VStack>
            <Box
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "todo")}
            >
              {data.name}
            </Box>
            <Button onClick={() => addTask(data.id, "hello")}>Add Task</Button>

            {data?.tasks?.map((task) => (
              <Card
                draggable={true}
                onDragStart={(e) => handleDragStart(e, task.id)}
              >
                {task.name}
              </Card>
            ))}
          </VStack>
        ))}
        {/* <Box
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "todo")}
          >
            To-do
          </Box>
          {todos.map((item) => (
            <Card
              draggable={true}
              onDragStart={(e) => handleDragStart(e, item.id)}
            >
              {item.name}
            </Card>
          ))} */}
      </HStack>
    </Box>
  );
}