import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

//1) find to do based on id(target이 index2에 있는지 알고싶음)

function ToDo({ text, category, id }: IToDo) {
  //atom을 수정하는 방식
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    // setToDos를 사용하면 값을 즉시 변경가능하거나 현재값(혹은 oldToDos)을 argument로 주는 fuction을 만들 수 있음
    setToDos((oldToDos) => {
      // 1. target의 경로에 대해 알아야함
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      // 2. 새로운 to do를 만들어서 원래의 to do를 업데이트해야함
      // => 새 category로 새로운 to do를 만들어야함
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
