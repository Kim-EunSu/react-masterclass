import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

// IToDoState는 여러개의 board와 그 안의 toDo array들
interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To do": [],
    Doing: [],
    Done: [],
  },
});
