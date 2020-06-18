import React, { ReactElement, useEffect, useRef, useState, Fragment } from "react";
import StoreCard from "./StoreCard";
import { inject, observer } from "mobx-react";
import 'components/storecard/storecardlist.scss';
import MerchantStore from "stores/merchant";
import Pagination from '@material-ui/lab/Pagination';
import ReactGA from 'react-ga';
import { MerchantType } from 'stores/merchant';
import BlackButton from 'components/button/BlackButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface Props {
  merchants?: MerchantType[];
  setMerchants?: (merchantList: MerchantType[]) => {};
  setRefs?: (merchants: MerchantType[]) => {};
  refs?: { [key: string]: any };
  clickedMerchant?: MerchantType;
  setClickedMerchant?: (merchant: MerchantType) => {};
  setCurrentLatLong?: (currentLatLong: [number, number]) => {};
  currentPage?: number;
  totalPage?: number;
  setCurrentPage?: (page: number) => {};
  changePage?: (page: number) => {};
  isMobile?: () => {};
  userLatLong?: [number, number];
  userLatLongActivated?: boolean;
  isNoMerchants?: boolean;
  isLoading?: boolean;
}

function StoreCardList({ merchants, refs, setRefs, clickedMerchant, setClickedMerchant, setCurrentLatLong, setMerchants,
  currentPage, totalPage, changePage, userLatLong, userLatLongActivated, isNoMerchants, isLoading }: Props): ReactElement {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortByAscDesc, setSortByAscDesc] = useState<string>('asc');
  const [merchantList, setMerchantList] = useState([] as any);
  const [isListClicked, setIsListClicked] = useState<boolean>(false);
  const [isPageChanged, setIsPageChanged] = useState<boolean>(false);
  const [topRefId, setTopRefId] = useState<number>(0);
  const handleMerchantClick = (merchant: any) => {
    setIsListClicked(true);
    setClickedMerchant!(merchant);
    // setCurrentLatLong!([merchant.latitude, merchant.longitude]);
  };


  useEffect(() => {
    // 기존에 클릭한 가게 속성 제거
    for (let [key, ref] of Object.entries(refs!)) {
      ref.current?.classList.remove('clicked');
    }

    // 클릭한 가게로 이동. 클릭한 가게 속성 추가
    if (clickedMerchant!.id > 0) {
      setTimeout(() => {
        // console.log("ref[id]")
        // console.log(refs![clickedMerchant!.id].current)
        refs![clickedMerchant!.id].current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 400);
      setIsListClicked(false);
      refs![clickedMerchant!.id].current?.classList.add('clicked');
      // console.log(refs![clickedMerchant!.id].current);
    }
  }, [clickedMerchant]);

  const calculateMetricDistanceBetweenLatLong = (latLong1: [number, number], latLong2: [number, number]): number => {
    const lat1 = latLong1[0];
    const lat2 = latLong2[0];
    const lon1 = latLong1[1];
    const lon2 = latLong2[1];

    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return Math.round(d);
  }

  const addDistanceToMerchant = (merchantList: MerchantType[], userLatLong: [number, number]) => {
    merchantList.forEach((merchant: MerchantType) => {
      const lat = parseFloat(merchant.latitude);
      const long = parseFloat(merchant.longitude);
      let distance = calculateMetricDistanceBetweenLatLong([lat, long], userLatLong);
      let currentDistance = '';
      if (distance >= 1000) {
        distance = Math.floor(distance / 10) / 100;
        currentDistance = `${distance} km`;
      } else {
        currentDistance = `${distance} m`;
      }
      merchant.currentDistance = currentDistance;
    })
  }
  const removeDistanceToMerchant = (merchantList: MerchantType[]) => {
    merchantList.forEach((merchant: MerchantType) => {
      merchant.currentDistance = '';
    })
  }
  useEffect(() => {
    // 클릭했을때 리스트 위치 옮기기 위한 refs(레퍼런스)
    if (merchants!.length > 0) {
      setTopRefId(merchants![0].id);
    }
    setRefs!(merchants!);
    if (userLatLongActivated) {
      addDistanceToMerchant(merchants!, userLatLong!);
    }
    if (isPageChanged) {
      sort();
      setIsPageChanged(false);
    }
  }, [merchants]);
  useEffect(() => {
    if (typeof refs![topRefId] !== 'undefined') {
      setTimeout(() => {
        refs![topRefId].current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 300)
    }
  }, [refs]);
  useEffect(() => {
    if (userLatLongActivated) {
      addDistanceToMerchant(merchants!, userLatLong!);
    } else {
      setSortBy('name');
      removeDistanceToMerchant(merchants!);
    }
  }, [userLatLong, userLatLongActivated]);

  useEffect(() => {
    // 가게 리스트
    //   <div className={`menu item${idx + 1}`} key={idx} onClick={(event: any) => {
    //     handleIconClick(event);
    //     ReactGA.ga('send', 'event', 'event_category', category, 'event_label');
    // }}>
    //     <div className="item-title">{category}</div>
    // </div>
    const handleRefClick = (event: any, merchant: MerchantType) => {
      handleMerchantClick(merchant);
      ReactGA.ga('send', 'event', 'list_click', merchant.regionMnyNm, 'event_label');
    }

    const merchantlist = merchants!.map((merchant: MerchantType) => {
      const expanded = clickedMerchant!.id === merchant.id;
      return <div ref={refs![merchant.id]} key={merchant.id} onClick={(event: any) => {
        handleRefClick(event, merchant);
      }}>
        <StoreCard store={merchant} expanded={expanded} />
      </div>
    });
    setMerchantList(merchantlist);
  }, [refs, clickedMerchant]);
  const handlePageChange = (event: any, value: any) => {
    setIsPageChanged(true);
    changePage!(value);
  }
  const handleSortClick = () => {
    sort();
  }
  const sort = () => {
    refs![topRefId].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    let sortedList: MerchantType[] = [];
    sortedList = merchants!.sort((a: MerchantType, b: MerchantType) => {
      let elementA: string | number = 0;
      let elementB: string | number = 0;
      if (sortBy === 'name') {
        elementA = a.cmpnmNm;
        elementB = b.cmpnmNm;
      } else if (sortBy == 'distance') {
        elementA = parseFloat(a.currentDistance!);
        elementB = parseFloat(b.currentDistance!);
      }
      let result = 0;
      if (elementA < elementB) {
        result = -1;
      } else if (elementA > elementB) {
        result = 1;
      }
      if (sortByAscDesc === 'desc') {
        result *= -1;
      }
      return result;
    });
    setMerchants!(sortedList);
  }
  const handleSortBySelectionChange = (event: any) => {
    if (!userLatLongActivated!) {
      alert('현재 위치를 켜주세요');
      setSortBy('name');
    } else {
      setSortBy(event.target.value);
    }
  }
  const handleSortByDistanceSelectionChange = (event: any) => {
    setSortByAscDesc(event.target.value);
  };
  return (
    <Fragment>
      <div className="sort-wrap">
        <BlackButton onClick={handleSortClick} style={{ float: "right", marginRight: "5px" }}>정렬</BlackButton>
        <FormControl className={`${classes.formControl} sort-by-asc-desc`}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortByAscDesc}
            onChange={handleSortByDistanceSelectionChange}
          >
            <MenuItem value={'asc'}>오름차순</MenuItem>
            <MenuItem value={'desc'}>내림차순</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={`${classes.formControl} sort-by`}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortBy}
            onChange={handleSortBySelectionChange}
          >
            <MenuItem value={'name'}>이름순</MenuItem>
            <MenuItem value={'distance'}>거리순</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="pagination-top">
        <Pagination count={totalPage} page={currentPage} onChange={handlePageChange} hidePrevButton hideNextButton />
      </div>
      <div className="merchant-list">
        {isLoading ?
          <div className="merchant-list-loader">
            검색중...<CircularProgress size={20} />
          </div>
          :
          merchantList.length > 0 ?
            <div>{merchantList}</div>
            :
            <div className="no-results">{isNoMerchants ? '검색 결과 없음' : ''}</div>}
      </div>
      <div className="pagination">
        <Pagination count={totalPage} page={currentPage} onChange={handlePageChange} hidePrevButton hideNextButton />
      </div>
    </Fragment>
  );
}

export default inject(({ merchant, letsMap, window }) => ({
  merchants: merchant.merchantList,
  setMerchants: merchant.setMerchantList,
  setRefs: merchant.setRefs,
  refs: merchant.refs,
  clickedMerchant: merchant.clickedMerchant,
  setClickedMerchant: merchant.setClickedMerchant,
  setCurrentLatLong: letsMap.setCurrentLatLong,
  currentPage: merchant.currentPage,
  totalPage: merchant.totalPage,
  setCurrentPage: merchant.setCurrentPage,
  changePage: merchant.changePage,
  isMobile: window.isMobile,
  userLatLong: letsMap.userLatLong,
  userLatLongActivated: letsMap.userLatLongActivated,
  isNoMerchants: merchant.isNoMerchants,
  isLoading: merchant.isLoading,
}))(observer(StoreCardList));
