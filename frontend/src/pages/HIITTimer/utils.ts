
export type WorkoutType = "workout" | "rest"

export type Intervals = {
  id: string
  name: string
  time: number
  index: number
  type: WorkoutType;
} 


export const intervalDefaultData: Intervals[] = [{
  id: "1",
  name: "interval 1",
  time: 3,
  index: 1,
  type: "workout"
}]

