import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  // const [toDos, setToDos] = useRecoilState(toDoState);
  // => setToDos를 사용하지 않으므로
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo
            key={toDo.id}
            text={toDo.text}
            category={toDo.category}
            id={toDo.id}
          />
          //위와 같은 표현 <ToDo {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
