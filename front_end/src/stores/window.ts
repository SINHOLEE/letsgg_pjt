import { observable, action, computed } from "mobx";
import { useState, useLayoutEffect } from "react";

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default class LetsMapStore {
  // @observable : state 변수들
  @observable width = 0;
  @observable height = 0;
  @observable isCategoryAndListVisible = false;
  @observable isListVisible = false;
  @observable dialogOpen = false;

  mobileMaxWidth = 1023;
  root: any;

  // root 등록 constructor
  constructor(root: any = null) {
    this.root = root;
  }

  // @action : 함수들 ( 호출용 )
  @action
  setWindowSize = (width: number, height: number) => {
    this.width = width;
    this.height = height;
  }

  @action
  isMobile = (): boolean => {
    return this.width < this.mobileMaxWidth;
  }

  @action
  setIsCategoryAndListVisible = (value: boolean) => {
    this.isCategoryAndListVisible = value;
  }

  @action
  setIsListVisible = (value: boolean) => {
    this.isListVisible = value;
  }

  @action
  setDialogOpen = (flag: boolean) => {
    this.dialogOpen = flag;
  }
  // @computed : state가 변경됐을때 재실행되는 함수
  //             state가 변경되지 않았을때 호출하면 캐시된 값을 리턴한다.
}
