export type KanbanType = "todo" | "pending" | "done";

export type KanbanData = {
  id: string;
  name: string;
  type: KanbanType;
};

export const data: KanbanData[] = [
  { 
    id: "1",
    name: "hello",
    type: "todo"
  },
  {
    id: "2",
    name: "hello",
    type: "todo"
  },
  {
    id: "3",
    name: "pending",
    type: "pending"
  },
  {
    id: "4",
    name: "pending",
    type: "pending"
  },
  {
    id: "5",
    name: "done",
    type: "done"
  },
  {
    id: "6",
    name: "done",
    type: "done"
  }, {
    id: "7",
    name: "done",
    type: "done"
  },
  {
    id: "8",
    name: "todo",
    type: "todo"
  }
]