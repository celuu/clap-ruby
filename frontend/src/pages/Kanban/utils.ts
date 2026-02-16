import { Column } from "@/types";


export type KanbanColumn = {
  id: string;
  name: string;
};

export const data: Column[] = [
  { 
    id: "1",
    name: "todo",
    position: 1,
    tasks: [{
      id: "1",
      name: "todoing",
      position: 1,
      column_id: "1"
    }]
  },
  {
    id: "2",
    name: "pending",
    position: 2
    ,
    tasks: [{
      id: "1",
      name: "topending",
      position: 1,
      column_id: "2"
    }]
  },
  {
    id: "3",
    name: "done",
    position: 3,
    tasks: [
      {
        id: "1",
        name: "todone",
        position: 1,
        column_id: "3"
      }
    ]
  },
 
]