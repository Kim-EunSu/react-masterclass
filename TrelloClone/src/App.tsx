import { eventNames } from "process";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { minuteState, hourSelector } from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);

  //useRecoilState는 결과로 array를 주는데 array의 첫번째 item은 atom의 값이고, 두번째 argument는 atom을 수정하는 함수
  // useRecoilState를 selector로 쓰고 있다면 결과값으로 array를 받게 됨
  // => array의 첫번째 요소는 get property로부터 return한 값
  // => 두번째 요소는 set property를 부르는 함수
  // 즉, useRecoilState를 atom으로 쓸 수도 있고 selector로 쓸 수도 있음
  // -> atom이나 selector로 useRecoilState를 쓸 때 결과  array의 첫번째 item은 atom의 값이거나 selector의 get함수의 값
  // -> array의 두번째 요소는 atom을 수정하는 함수이거나 selector의 set property를 실행시키는 함수
  const [hours, setHours] = useRecoilState(hourSelector);

  const onMinuteChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };

  const onHouresChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };

  return (
    <>
      <input
        value={minutes}
        onChange={onMinuteChange}
        type="number"
        placeholder="Minutes"
      />
      <input
        value={hours}
        onChange={onHouresChange}
        type="number"
        placeholder="Houres"
      />
    </>
  );
}
export default App;
