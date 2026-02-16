import { Column, Task } from "@/types";
import {
  Box,
  VStack,
  HStack,
  Card,
  Heading,
  Button,
  useToast,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useCreateColumn, useCreateTask, useDeleteColumn, useDeleteTask, useGetColumns } from "../../services/kanbanService";
import { SmallCloseIcon } from "@chakra-ui/icons";


export const Kanban = () => {
  const [dataset, setDataset] = useState<Column[]>([]);
  const [columnName, setColumnName] = useState<string>("")
  const {column, error, loading, execute} = useCreateColumn();
  const {column: getColumn, error: getColumError, loading: getColumnLoading, execute: getColumnExecute} = useGetColumns();
  const {error: deleteColumError, loading: deleteColumnLoading, execute: deleteColumnExecute} = useDeleteColumn();
  const [taskName, setTaskName] = useState<string>("")
  const {
    task: createTask,
    error: addTaskError,
    loading: addTaskLoading,
    execute: addTaskExecute,
  } = useCreateTask();
    const {
      error: deleteTaskError,
      loading: deleteTaskLoading,
      execute: deleteTaskExecute,
    } = useDeleteTask();



  const toast = useToast();

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

  useEffect( () => {
    const loadColumns = async () => {
      const columns = await getColumnExecute();
      setDataset(columns)
    }

    loadColumns();
  }, [])

  const addColumn = async () => {
    try {
     const newCol =  await execute({
        name: columnName,
        position: 3
      })
      setDataset((prev) => [...prev, newCol]);
      toast({
        title: 'Success',
        description: 'Column created successfully!',
        status: 'success',
      });
    } catch(err) {
      toast({
        title: "Error",
        description: error || "Failed to create column",
        status: "error",
      });
    }
  }

  const addTask = async (column_id: string, newTask: string) => {
    try {
      const task = await addTaskExecute({
        name: newTask,
        position: 3,
        column_id: Number(column_id),
      });
      setDataset((prev) =>
        prev.map((col) =>
          col.id === column_id
            ? { ...col, tasks: [...(col.tasks ?? []), task] }
            : col,
        ),
      );
    } catch {
      console.error(error)
    }
  }

    const deleteTask = async (taskId: string) => {
      try {
        await deleteTaskExecute(taskId);
        setDataset((prev) =>
          prev.map((col) => {
            const hasTask = col.tasks?.some((t) => t.id === taskId);

            if (!hasTask) return col;

            return {
              ...col,
              tasks: col.tasks!.filter((t) => (t.id !== taskId)),
            };
          }),
        );
      } catch (err) {
        toast({
          title: "Error",
          description: error || "Failed to delete column",
          status: "error",
        });
      }
    };

  const deleteColumn = async (columnId: string) => {
    try {
      await deleteColumnExecute(columnId);
      setDataset((prev) => prev.filter((c) => c.id !== columnId));
    } catch (err) {
      toast({
        title: "Error",
        description: error || "Failed to delete column",
        status: "error",
      });
    }
  }

  console.log(dataset, "data");

  return (
    <Box margin={"20px"} paddingLeft={"200px"} paddingRight={"200px"}>
      <HStack justifyContent={"space-between"}>
        <Heading>Kanban</Heading>
        <Box>
          <input onChange={(e) => setColumnName(e.target.value)} />
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
            <HStack>
              <Box
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "todo")}
              >
                {data.name}
              </Box>
              <IconButton
                aria-label="delete-column"
                onClick={() => deleteColumn(data.id)}
                icon={<SmallCloseIcon />}
              ></IconButton>
            </HStack>
            <input onChange={(e) => setTaskName(e.target.value)} />
            <Button onClick={() => addTask(data.id, taskName)}>Add Task</Button>

            {data?.tasks?.map((task) => (
              <Card
                draggable={true}
                onDragStart={(e) => handleDragStart(e, task.id)}
              >
                <HStack>
                  <Text>{task.name}</Text>
                  <IconButton
                    aria-label="delete-column"
                    onClick={() => deleteTask(task.id)}
                    icon={<SmallCloseIcon />}
                  ></IconButton>
                </HStack>
              </Card>
            ))}
          </VStack>
        ))}
      </HStack>
    </Box>
  );
}