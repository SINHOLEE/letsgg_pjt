import React, { ReactElement, useState, useRef, useEffect } from "react";
import { InputBase, Button, IconButton } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import SearchIcon from '@material-ui/icons/Search';
import ReactGA from 'react-ga';

import "components/search/search.scss";

interface Props {
  searchMerchantBySearchInput?: (searchInput: string, currentLatLong: [number, number], topRightLatLong: [number, number], bottomLeftLatLong: [number, number], page: number, pageSize: number) => {};
  setIsCategoryAndListVisible?: (value: boolean) => {};
  currentLatLong?: [number, number];
  currentBound?: { bottomLeftLatLong: [number, number], topRightLatLong: [number, number] };

}

function Search({ currentLatLong, currentBound, searchMerchantBySearchInput, setIsCategoryAndListVisible }: Props): ReactElement {
  const [searchInput, setSearchInput] = useState("");
  const ref: any = useRef(null);
  const handleSearchInputChange = (event: any) => {
    setSearchInput(event.target.value);
  }
  const handleBtnClick = (event: any) => {
    // 버튼을 클릭했을 때 검색로직을 실행하라
    event.preventDefault();
    if (searchInput !== "") {
      searchMerchantBySearchInput!(searchInput, currentLatLong!, currentBound!.topRightLatLong, currentBound!.bottomLeftLatLong, 1, 20);
    }

  }
  const handleKeyDown = (event: any) => {
    // 엔터를 쳤을때, 검색 로직을 실행하라
    if (event.keyCode === 13) { // 왜 동등연산자를 안쓰신거죠? 궁금쓰
      // console.log(searchInput)
      searchMerchantBySearchInput!(searchInput, currentLatLong!, currentBound!.topRightLatLong, currentBound!.bottomLeftLatLong, 1, 20);
    }
  }
  // 질문1 -> 이렇게 쓰면 useEffect에서 콜백함수의 기본값(이걸 뭐라고 부르지?)[] 여기에 오류가뜸 왜지?
  // 근데 리펙토링 하기 전에도 이미 이렇게 떳었네
  const focusSearchInput = (): void => {
    ref.current.children[0].addEventListener('focus', () => {
      setIsCategoryAndListVisible!(true);
    })
  }

  // 검색어 입력창 활성화 됐을때 검색 리스트를 보여주기 위하여 flag 설정
  useEffect(() => {
    focusSearchInput();

    // ref.current.children[0].addEventListener('blur', ()=>{
    //   setIsCategoryAndListVisible!(false);
    // })
    return () => {
      // cleanup
    }
  }, [])
  return (
    <div id="search-wrap">
      <div id="search-input">
        {/* ref를 통해서 서치바의 주소를 참조한다. */}
        <InputBase placeholder="검색어를 입력해주세요." fullWidth style={{ fontSize: "20px", height: "40px" }} onChange={handleSearchInputChange} onKeyDown={(event: any) => {
          handleKeyDown(event);
          ReactGA.ga('send', 'event', 'search_keyword', searchInput, 'keyDown');
        }} ref={ref} />
      </div>
      <button className="search-button" onClick={(event: any) => {
        handleBtnClick(event);
        ReactGA.ga('send', 'event', 'search_keyword', searchInput, 'onClick');

      }}>
        <SearchIcon />
      </button>
    </div>
  );
}

export default inject(({ merchant, window, letsMap }) => ({
  searchMerchantBySearchInput: merchant.searchMerchantBySearchInput,
  setIsCategoryAndListVisible: window.setIsCategoryAndListVisible,
  currentLatLong: letsMap.currentLatLong,
  currentBound: letsMap.currentBound,
}))(observer(Search));
