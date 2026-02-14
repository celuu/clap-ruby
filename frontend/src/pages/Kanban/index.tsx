import { Box, VStack, HStack, Card, Heading } from "@chakra-ui/react";
import { data, KanbanData, KanbanType } from "./utils";
import { useState } from "react";


export const Kanban = () => {
  const exampleData: KanbanData[] = data;
  const [dataset, setDataset] = useState<KanbanData[]>(exampleData)
  const todos = dataset.filter((data) => data.type === "todo")
  const pending = dataset.filter((data) => data.type === "pending");
  const done = dataset.filter((data) => data.type === "done");

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, category: KanbanType) => {
    e.preventDefault();
      const cardId = e.dataTransfer.getData("text/plain");
      if (!cardId) return;
        setDataset((prev) =>
          prev.map((card) =>
            card.id === cardId ? { ...card, type: category } : card,
          ),
        );

  };

  return (
    <Box margin={"20px"} paddingLeft={"200px"} paddingRight={"200px"}>
      <Heading>Kanban</Heading>

      <HStack width={"100%"} justifyContent={"space-between"}>
        <VStack>
          <Box
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
          ))}
        </VStack>

        <VStack>
          <Box
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "pending")}
          >
            Pending
          </Box>
          {pending.map((item) => (
            <Card
              draggable={true}
              onDragStart={(e) => handleDragStart(e, item.id)}
            >
              {item.name}
            </Card>
          ))}
        </VStack>

        <VStack>
          <Box
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "done")}
          >
            Done
          </Box>
          {done.map((item) => (
            <Card
              draggable={true}
              onDragStart={(e) => handleDragStart(e, item.id)}
            >
              {item.name}
            </Card>
          ))}
        </VStack>
      </HStack>
    </Box>
  );
}