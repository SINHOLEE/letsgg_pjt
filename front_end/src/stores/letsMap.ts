import { observable, action, computed } from "mobx";

declare global {
  interface Window {
    kakao: any;
  }
}

export default class LetsMapStore {
  // @observable : state 변수들
  // 위치정보로 받아온 사용자 좌표
  @observable userLatLongActivated : boolean = false;
  @observable userLatLong : [number, number] = [0,0];
  // current : 현재 맵에 대한 정보
  @observable currentLatLong : [number, number] = [37.566676, 126.978403];
  @observable currentLevel : number = 10;
  @observable currentBound : {bottomLeftLatLong : [number, number], topRightLatLong : [number, number]}
                          = {bottomLeftLatLong : [0,0], topRightLatLong : [0,0]};
  root: any;

  // root 등록 constructor
  constructor(root: any = null) {
    this.root = root;
  }

  // @action : 함수들 ( 호출용 )
  @action
  setCurrentLatLong = (currentLatLong: [number, number]) => {
    this.currentLatLong = currentLatLong;
  }
  @action
  setCurrentLevel = (currentLevel: number) => {
    this.currentLevel = currentLevel;
  }
  @action
  setCurrentBound = (bottomLeftLatLong : [number, number], topRightLatLong : [number, number]) => {
    this.currentBound = {bottomLeftLatLong, topRightLatLong};
  }
  @action
  setUserLatLong = (latLong : [number,number]) => {
    this.userLatLong = latLong;
  }
  @action
  setUserLatLongActivated = (flag : boolean) => {
    this.userLatLongActivated = flag;
  }

  // @computed : state가 변경됐을때 재실행되는 함수
  //             state가 변경되지 않았을때 호출하면 캐시된 값을 리턴한다.
}
