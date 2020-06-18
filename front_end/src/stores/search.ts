import { observable, action, computed } from "mobx";

export default class LetsMapStore {
  // @observable : state 변수들
  @observable isSearchFocused = false;
  root: any;

  // root 등록 constructor
  constructor(root: any = null) {
    this.root = root;
  }

  // @action : 함수들 ( 호출용 )
  @action
  setIsSearchFocused = (value : boolean) =>{
    this.isSearchFocused = value;
  }

  // @computed : state가 변경됐을때 재실행되는 함수
  //             state가 변경되지 않았을때 호출하면 캐시된 값을 리턴한다.
}