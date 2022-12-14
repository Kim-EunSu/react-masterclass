import React from "react";
import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

// 타입스크립트는 hourSelector가 무엇인지 모르기때문에 타입을 설정해주어야함!
//  => type을 number로 지정
export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  set: ({ set }, newValue) => {
    // newValue를 number타입으로 지정해주기위해
    const minutes = Number(newValue) * 60;
    // set은 두개의 인자를 가짐
    // 첫번째는 수정하고 싶은 recoil atom을 가져오고 두 번째 인자로 새로운 값을 가져오면됨
    set(minuteState, minutes);
  },
});
