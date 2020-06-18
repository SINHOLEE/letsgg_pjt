import React, { ReactElement, useRef, useState, useEffect, useLayoutEffect } from "react";
import { inject, observer } from "mobx-react";
import "components/letsmap/letsmap.scss";
import selectedMarkerImage from 'assets/images/selectedMarker.png';
import normalMarkerImage from 'assets/images/normalMarker.png';
import userPointImage from 'assets/images/point.png';
import { MerchantType } from 'stores/merchant';
import { useWindowSize } from 'stores/window';
// 창 크기 재조정될때마다 호출됨
// function useWindowSize() {
//   const [size, setSize] = useState([0, 0]);
//   useLayoutEffect(() => {
//     function updateSize() {
//       setSize([window.innerWidth, window.innerHeight]);
//     }
//     window.addEventListener('resize', updateSize);
//     updateSize();
//     return () => window.removeEventListener('resize', updateSize);
//   }, []);
//   return size;
// }

interface Props {
  stores?: any;
  updateStores?: () => {};
  currentLatLong?: [number, number];
  setCurrentLatLong?: ([]: [number, number]) => {};
  currentLevel?: number;
  setCurrentLevel?: (currentlevel: number) => {};
  setClickedMerchant?: (merchant: MerchantType) => {};
  clickedMerchant?: MerchantType;
  isMobile?: () => {};
  setCurrentBound?: (bottomLeftLatLong: [number, number], topRightLatLong: [number, number]) => {};
  currentBound?: any;
  setWindowSize?: (width: number, height: number) => {};
  userLatLong?: [number, number];
  setUserLatLong?: (latLong: [number, number]) => {};
  userLatLongActivated?: boolean;
  setUserLatLongActivated?: (flag: boolean) => {};
}

const { kakao } = window;

interface MarkerInfo {
  marker: any;
}
interface MarkerInfos {
  [key: string]: MarkerInfo;
}
const LetsMap = ({ stores, currentLatLong, setCurrentLatLong,
  setCurrentLevel, clickedMerchant, setClickedMerchant,
  isMobile, setCurrentBound, setWindowSize, currentBound,
  userLatLong, setUserLatLong,
  userLatLongActivated, setUserLatLongActivated }: Props): ReactElement => {
  const [kakaoMap, setKakaoMap] = useState<any>(null);
  const [mapLevel, setMapLevel] = useState<number>(7);
  const [markers, setMarkers] = useState<any[]>([]);
  const [myLocationButtonFlag, setMyLocationButtonFlag] = useState<boolean>(false);
  const [userLocationMarker, setUserLocationMarker] = useState<any>(null);
  const [userLocationInterval, setUserLocationInterval] = useState<any>(null);
  const [markerInfos, setMarkerInfos] = useState<MarkerInfos>({});
  // 창 크기 조절
  const [width, height] = useWindowSize();
  setWindowSize!(width, height);

  const setUserLocation = (map: any, marker: any) => {
    navigator.geolocation.getCurrentPosition((position) => {
      let latLong: [number, number] = [position.coords.latitude, position.coords.longitude];
      setUserLatLong!([latLong[0], latLong[1]]);
      // console.log("현재위치", latLong);
      marker.setPosition(new kakao.maps.LatLng(latLong[0], latLong[1]));
      marker.setMap(map);
    }, (error) => {
      alert('위치 정보 접근을 허용해주세요');
      setUserLatLongActivated!(false);
      setMyLocationButtonFlag(false);
      throw error;
    });
  }
  useEffect(() => {
    if (myLocationButtonFlag) {
      setMyLocationButtonFlag(false);
      changeMapLevel(3);
      setTimeout(() => {
        setCurrentLatLong!(userLatLong!);
      }, 400)
    }
  }, [userLatLong]);
  useEffect(() => {
    if (userLatLongActivated) {
      activateUserLocation(kakaoMap, userLocationMarker);
    } else {
      deActivateUserLocation(userLocationMarker);
    }
  }, [userLatLongActivated]);
  // userLocation
  const activateUserLocation = (map: any, marker: any) => {
    if (map !== null && marker !== null) {
      // 사용자의 현재 위치 받아와서 센터에 저장하기
      let userLocationInterval = null;
      try {
        setUserLocation(map, marker);
        // 3초 간격으로 현재위치 받아옴
        userLocationInterval = setInterval(function () {
          setUserLocation(map, marker);
        }, 3000);
        setUserLocationInterval(userLocationInterval);
      } catch (error) {
        if (userLocationInterval !== null) {
          clearInterval(userLocationInterval);
        }
      }
    }
  }
  const deActivateUserLocation = (userLocationMarker: any) => {
    if (userLocationMarker !== null) {
      userLocationMarker.setMap(null);
      clearInterval(userLocationInterval);
    }
  }

  const setCenter = (map: any, latLong: [number, number]) => {
    let newCenterLatLong = latLong;
    if (!isMobile!()) {
      // 지도의 중심 좌표를 얻어옵니다.
      const mapLatLong = map.getCenter();
      // 중심좌표를 픽셀로 변환
      let mapProjection = map.getProjection();
      let centerToPixel = mapProjection.pointFromCoords(mapLatLong);
      // 데스크탑이면 x좌표를 185px 만큼 더함
      let point = new kakao.maps.Point(centerToPixel.x + 185, centerToPixel.y);
      const centerLatLong = mapProjection.coordsFromPoint(point);
      newCenterLatLong = [centerLatLong.getLat(), centerLatLong.getLng()];
    }
    setCurrentLatLong!(newCenterLatLong);
  }

  // componentDidMount
  useEffect(() => {
    kakao.maps.load(() => {
      const el = document.getElementById("lets-map");
      const map = new kakao.maps.Map(el, {
        center: new window.kakao.maps.LatLng(37.275136, 127.009488), // 지도의 중심좌표. 경기도청
        level: mapLevel, // 지도의 레벨(확대, 축소 정도)
        scrollwheel: true, // 마우스 휠 확대/축소 가능
      });

      // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      // kakao.maps.event.addListener(map, 'center_changed', function () {
      //   // 지도의  레벨을 얻어옵니다
      //   const level = map.getLevel();
      //   // 지도의 중심좌표를 얻어옵니다 
      //   setCurrentLevel!(level);
      //   // 지도의 경계 좌표를 얻어옵니다.
      //   // const latlng = map.getCenter();
      //   // setCurrentLatLong!([latlng.Ha, latlng.Ga]);
      // });

      // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(map, 'zoom_changed', function () {
        // 지도의 현재 레벨을 얻어옵니다
        const level = map.getLevel();
        setMapLevel(level);
      });

      kakao.maps.event.addListener(map, 'dragend', function () {
        // 지도의 센터좌표 등록
        const centerLatLong = map.getCenter();
        const latLong: [number, number] = [centerLatLong.Ha, centerLatLong.Ga];
        setCenter(map, latLong);
      });

      // 지도 클릭했을때 위도 경도 알려주기
      kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
        // 클릭한 위도, 경도 정보를 가져옵니다 
        var latlng = mouseEvent.latLng;

        var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';
        message += '지도 레벨은' + map.getLevel() + ' 입니다';
        // console.log(message);
      });
      let imageSize2 = new kakao.maps.Size(20, 20); // 마커이미지의 크기입니다
      let imageOption2 = { offset: new kakao.maps.Point(10, 10) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      let userPoint = new kakao.maps.MarkerImage(userPointImage, imageSize2, imageOption2);
      // 유저의 현재 위치를 표시하는 마커
      let marker = new kakao.maps.Marker({
        // map: volMap, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(37.275136, 127.009488), // 마커의 위치
        title: "내위치",
        image: userPoint,
      });
      setUserLocationMarker(marker);
      setKakaoMap(map);
      setCenter(map, [37.275136, 127.009488]);
    });

  }, []); // 빈 리스트 [] 를 넣으면 처음에 한 번만 실행됨.

  // 현재 좌표 업데이트 됐을때 중앙으로
  const moveToCenter = () => {
    if (!!kakaoMap) {
      let mapProjection = kakaoMap.getProjection();
      // 중앙 좌표에 해당하는 x,y 좌표 찾음
      let centerToPixel = mapProjection.pointFromCoords(new kakao.maps.LatLng(currentLatLong![0], currentLatLong![1]));
      let point;
      if (!isMobile!()) {
        // console.log("데스크탑");
        // 데스크탑일경우 x 좌표를 185px 만큼 옮김
        point = new kakao.maps.Point(centerToPixel.x - 185, centerToPixel.y);
      } else {
        // console.log("모바일");
        point = new kakao.maps.Point(centerToPixel.x, centerToPixel.y);
      }
      // 옮긴 좌표를 다시 지도의 중앙으로 적용
      kakaoMap.panTo(mapProjection.coordsFromPoint(point)); // 위치 좌표에 해당하는 지도 좌표
    }
  }
  useEffect(() => {
    moveToCenter();
    // if (!!kakaoMap) {
    //   kakaoMap.setCenter(new kakao.maps.LatLng(currentLatLong![0], currentLatLong![1]));
    // }
    // console.log('현재위치', currentLatLong);
    if (!!kakaoMap) {
      setBound(kakaoMap);
    }
  }, [currentLatLong]);

  // componentDidUpdate 
  // 가게 리스트 정보 업데이트
  useEffect(() => {
    // 기존 마커 지우기
    markers.forEach(marker => {
      marker.setMap(null);
    })
    // 새로운 infowindow map 생성
    const tempMarkerInfos = {} as MarkerInfos;
    // 새로운 마커 등록하기
    let tempMarkers = [] as any;
    kakao.maps.load(() => {
      var imageSize = new kakao.maps.Size(29, 42); // 마커이미지의 크기입니다
      var imageOption = { offset: new kakao.maps.Point(14, 42) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var normalImage = new kakao.maps.MarkerImage(normalMarkerImage, imageSize, imageOption);

      stores.forEach((store: any) => {
        let marker = new kakao.maps.Marker({
          // map: volMap, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(store.latitude, store.longitude), // 마커의 위치
          title: store.cmpnmNm,
          image: normalImage,
        });
        tempMarkers.push(marker);
        tempMarkerInfos[store.id] = { marker: marker };
        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', () => {
          setClickedMerchant!(store);
          setCurrentLatLong!([store.latitude, store.longitude]);
        });
      })
    })
    setMarkers(tempMarkers);
    setMarkerInfos(tempMarkerInfos);
  }, [kakaoMap, stores]); // kakaoMap이 완성되거나, stores가 업데이트 될 때 호출

  // clickedMerchant 바꼈을때
  useEffect(() => {
    kakao.maps.load(() => {
      var imageSize = new kakao.maps.Size(29, 42); // 마커이미지의 크기입니다
      var imageOption = { offset: new kakao.maps.Point(14, 42) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var normalImage = new kakao.maps.MarkerImage(normalMarkerImage, imageSize, imageOption);
      var selectedImage = new kakao.maps.MarkerImage(selectedMarkerImage, imageSize, imageOption);

      // 클릭한 마커의 강조하기
      for (let [key, value] of Object.entries(markerInfos)) {
        if (parseInt(key) === clickedMerchant!.id) {
          value.marker.setImage(selectedImage);
          value.marker.setZIndex(3);
        } else {
          value.marker.setImage(normalImage);
          value.marker.setZIndex(0);
        }
      }
    })
  }, [clickedMerchant]);

  // 가게 정보 리스트 업데이트 되면 마커도 맵에 반영
  useEffect(() => {
    // 마커 변경됐으면 다시 지도에 찍어주기
    markers.forEach(marker => {
      marker.setMap(kakaoMap);
    });

  }, [markers]);

  const setBound = (map: any) => {
    // 지도의 경계 좌표를 얻어옵니다.
    const boundLatLong = map.getBounds();
    const southWest = boundLatLong.getSouthWest();
    const northEast = boundLatLong.getNorthEast();
    let bottomLeftLatLong: [number, number] = [southWest.Ha, southWest.Ga]; // Ha : lat, Ga : long
    const topRightLatLong: [number, number] = [northEast.Ha, northEast.Ga];

    // 데스크탑일 경우 좌측 하단 좌표 370px 만큼 오른쪽으로 이동
    let newBottomLeftLatLong = new kakao.maps.LatLng(bottomLeftLatLong[0], bottomLeftLatLong[1]);
    let mapProjection = map.getProjection();
    // 중앙 좌표에 해당하는 x,y 좌표 찾음
    let centerToPixel = mapProjection.pointFromCoords(newBottomLeftLatLong);
    if (!isMobile!()) {
      // console.log("데스크탑");
      // 데스크탑일경우 x 좌표를 185px 만큼 옮김
      let point = new kakao.maps.Point(centerToPixel.x + 370, centerToPixel.y);
      newBottomLeftLatLong = mapProjection.coordsFromPoint(point);
      bottomLeftLatLong = [newBottomLeftLatLong.getLat(), newBottomLeftLatLong.getLng()];
    }
    // console.log('바운드', bottomLeftLatLong, topRightLatLong)
    setCurrentBound!(bottomLeftLatLong, topRightLatLong);
  }
  const changeMapLevel = (level: number) => {
    setMapLevel(level);
    kakaoMap.setLevel(level, { animate: true });
  }
  const handleMyLocationClick = () => {
    setUserLatLongActivated!(!userLatLongActivated);
    setMyLocationButtonFlag(true);
  }
  const handlePlusClick = () => {
    const newMapLevel = mapLevel - 1;
    changeMapLevel(newMapLevel);
  }
  const handleMinusClick = () => {
    const newMapLevel = mapLevel + 1;
    changeMapLevel(newMapLevel);
  }
  return (
    <div id="lets-map-wrap">
      <div id="lets-map" />
      <div className={`my-location-icon ${userLatLongActivated! ? 'activated' : ''}`} onClick={handleMyLocationClick} />
      <div className="plus-icon" onClick={handlePlusClick} />
      <div className="minus-icon" onClick={handleMinusClick} />
    </div>
  );
};

export default inject(({ letsMap, merchant, window }) => ({
  stores: merchant.merchantList,
  updateStores: merchant.updateMerchantList,
  currentLatLong: letsMap.currentLatLong,
  setCurrentLatLong: letsMap.setCurrentLatLong,
  currentLevel: letsMap.currentLevel,
  setCurrentLevel: letsMap.setCurrentLevel,
  setListScrollPosition: merchant.setListScrollPosition,
  setClickedMerchant: merchant.setClickedMerchant,
  clickedMerchant: merchant.clickedMerchant,
  isMobile: window.isMobile,
  setCurrentBound: letsMap.setCurrentBound,
  currentBound: letsMap.currentBound,
  setWindowSize: window.setWindowSize,
  userLatLong: letsMap.userLatLong,
  setUserLatLong: letsMap.setUserLatLong,
  userLatLongActivated: letsMap.userLatLongActivated,
  setUserLatLongActivated: letsMap.setUserLatLongActivated,
}))(observer(LetsMap));
