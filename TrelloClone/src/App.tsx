import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  // atom의 값과 수정 => useRecoilState
  const [toDos, setToDos] = useRecoilState(toDoState);

  // onDragEnd는 어떤 일이 일어났는지에 대한 정보로 많은 argument를 줌
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;

    // setToDos((oldToDos) => {
    //   const toDosCopy = [...oldToDos];

    //   console.log("Delete item on", source.index); // 원래의 index
    //   console.log(toDosCopy); // 전체 배열
    //   toDosCopy.splice(source.index, 1);
    //   console.log(toDosCopy); // 움직인 toDo뺀 배열
    //   toDosCopy.splice(destination?.index, 0, draggableId);
    //   console.log(toDosCopy); //움직이고 난 전체배열

    //   return toDosCopy;
    //});
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
