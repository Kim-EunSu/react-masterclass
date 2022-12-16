import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

// toDos의 type은 IToDo
interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IAreaProops {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

// isDraggingOver라는 prop을 받을거라고 말해줌
const Area = styled.div<IAreaProops>`
  /* 드래그 해서 올라오면 분홍색,  */
  /* 드래그 해서 떠날 때면 빨간색 */
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.draggingFromThisWith
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IForm {
  toDo: string;
}

//Bodard가 toDos prop을 가지며 droppableId가 필요
function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    // setTodos 한수는 value를 설정하는데에도 쓰일 수 있지만 이전 value에 기반해서 현재 value를 업데이트해 줄 수 도 있음

    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>

      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId} `}
        />
      </Form>

      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            // string이든 뭐든 존재하기만 하면 True
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
