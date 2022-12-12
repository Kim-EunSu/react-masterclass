import React, { useState } from "react";

import { useForm } from "react-hook-form";

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };

  console.log(formState.errors);

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input {...register("Email", { required: true })} placeholder="Email" />
        <input
          {...register("firstName", { required: true })}
          placeholder="FirstName"
        />
        <input
          {...register("lastName", { required: true })}
          placeholder="LastName"
        />
        <input
          {...register("userName", { required: true, minLength: 10 })}
          placeholder="UserName"
        />
        <input
          {...register("password", {
            required: true,
            minLength: {
              value: 5,
              message: "Your password is too short",
            },
          })}
          placeholder="Password"
        />
        <input
          {...register("password1", {
            required: "Password is required",
            minLength: 5,
          })}
          placeholder="password1"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
