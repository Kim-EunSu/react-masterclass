import { atom } from "recoil";

// 타입스크립트에게 toDo가 어떻게 생긴건지 알려줌
export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DONE" | "DOING";
}

// atom의 타입이 ToDo의 배열임을 알려줌
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
