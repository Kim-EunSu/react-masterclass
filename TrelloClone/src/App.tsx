import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  // atom의 값과 수정 => useRecoilState
  const [toDos, setToDos] = useRecoilState(toDoState);

  // onDragEnd는 어떤 일이 일어났는지에 대한 정보로 많은 argument를 줌
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    console.log(info);
    if (!destination) return;
    //same board 에서의 움직임만 해당됨
    if (destination?.droppableId === source.droppableId) {
      console.log(info);
      setToDos((allBoards) => {
        //boardCopy는 source의 droppabledID로부터 array를 복사하는 과정
        const boardCopy = [...allBoards[source.droppableId]];
        // to Do 받아오기
        const taskObj = boardCopy[source.index];

        boardCopy.splice(source.index, 1);
        // board를 받아서 to do object를 다시 넣어줌
        boardCopy.splice(destination?.index, 0, taskObj);
        console.log(boardCopy); //움직이고 난 전체배열
        return {
          ...allBoards,
          // 변형된 복사본이 들어감
          [source.droppableId]: boardCopy,
        };
      });
    }
    // 서로 다른 board에서의 움직임
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        // soureceBoard는 움직임이 시작된 board
        const sourceBoard = [...allBoards[source.droppableId]];

        // to Do 받아오기
        const taskObj = sourceBoard[source.index];

        // destionationBoard는 움직임이 끝난 board
        const destinationBoard = [...allBoards[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
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
