import React, { useState } from "react";

import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const {
    //모든 기능은 여기서 나옴!
    // **1. register부터 요청, 그 다음에 handleSubmit**
    register,
    handleSubmit,
    setValue,
  } = useForm<IForm>();

  // 3. onSubmit함수를 만듬
  // 3.1 중요한건 input의 이름이 그대로 data에 들어감
  // 5. data의  타입 지정
  const onSubmit = (data: IForm) => {
    console.log("add to do", data.toDo);
    setValue("toDo", "");
  };

  return (
    <div>
      {/* 4. handleSubmit함수를 사용할 때는 첫번째 매개변수로 데이터가 유효할 때 호출되는 다른 함수를 받음  */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {
            // 2.객체 리터럴을 열고 ...register, 그리고 인자로 input의 이름을 넣음
            // 6. toDo 검사: 객체 리터럴을 만들고 required:true라고 지정하거나 에러에 메세지표시
            ...register("toDo", {
              required: "Please write a To Do",
            })
          }
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
