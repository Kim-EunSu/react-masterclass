import { atom, selector } from "recoil";

// 기본적으로 enum은 프로그래머를 도와주기 위해 일련의 숫자를 문자로 표현
export enum Categories {
  "TO_DO" = "TO_DO",
  "DONE" = "DONE",
  "DOING" = "DOING",
}

// 타입스크립트에게 toDo가 어떻게 생긴건지 알려줌
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

// 사용자가 현재 선택한 카테고리를 저장
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

// atom의 타입이 ToDo의 배열임을 알려줌
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    // 카테코리에 따라 하나의 배열만 반환
    return toDos.filter((toDo) => toDo.category === category);
  },
});
