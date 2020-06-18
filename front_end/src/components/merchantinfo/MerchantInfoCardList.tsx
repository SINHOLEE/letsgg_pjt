import React, { ReactElement, useState, useEffect } from 'react'
import { inject, observer } from "mobx-react";
import { MerchantType } from 'stores/merchant';
import Avatar from '@material-ui/core/Avatar';
import PhoneDisabledIcon from '@material-ui/icons/PhoneDisabled';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import SwipeableViews from 'react-swipeable-views';
import MerchantInfoCard from 'components/merchantinfo/MerchantInfoCard'
import 'components/merchantinfo/merchantinfocard.scss';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ClipboardJS from 'clipboard';
interface Props {
  clickedMerchant?: MerchantType;
  setCurrentLatLong?: (latLong: [number, number]) => {};
  stores?: MerchantType[];
  setClickedMerchant?: (merchant: MerchantType) => {};
}

function MerchantInfoCardList({ clickedMerchant, setCurrentLatLong, stores, setClickedMerchant }: Props): ReactElement {
  const [clipboard, setClipboard] = useState<ClipboardJS>();
  const [isAddressClicked, setIsAddressClicked] = useState(false);
  const [index, setIndex] = useState(0);


  useEffect(() => {
    stores?.map((store, idx) => {
      if (clickedMerchant!.id === store.id) {
        setIndex(idx);
      }
    })
  }, [clickedMerchant])

  useEffect(() => {
    const clip = new ClipboardJS('.address');
    setClipboard(clip);
    return () => {
      if (!!clipboard) {
        clipboard!.destroy();
      }
    }
  }, [])
  
  const handleAddressClick = () => {
    setIsAddressClicked(true);
    setTimeout(() => {
      setIsAddressClicked(false);
    }, 1500);
  }
  const handleChangeIndex = (index: number) => {
    stores?.map((store, idx) => {
      if (idx === index) {
        const lat = parseFloat(store!.latitude);
        const long = parseFloat(store!.longitude);
        setClickedMerchant!(store);
        // console.log(lat,long);
        setCurrentLatLong!([lat, long]);
      }
    })
  };

  const storesSwipeableList = (): any => {
    const cards = stores!.map((store, idx) => {
      const mapSearchUrl = `https://map.kakao.com/?q=${store!.refineRoadnmAddr}`;

      const telnoButton = (telno: string): any => {
        if (!!store) {
          const noneDashedTelno = store!.telno.replace(/-/g, "");
          var regExp = /^\d{2,3}-\d{3,4}-\d{4}$/;
          if (!regExp.test(telno)) {
            return <PhoneDisabledIcon style={{ fontSize: "16px" }}></PhoneDisabledIcon>
          }
          return <a href={`tel:${noneDashedTelno}`}><PhoneEnabledIcon style={{ fontSize: "16px" }}></PhoneEnabledIcon></a>
        }
        return '';
      }
      const handleNameClick = () => {
        const lat = parseFloat(store!.latitude);
        const long = parseFloat(store!.longitude);
        setClickedMerchant!(store);
        // console.log(lat,long);
        setCurrentLatLong!([lat, long]);
      }


      return (
        <div className="store-info-card-wrap" key={idx}>
          <div className="background" />
          <div className="content">
            <Avatar aria-label="recipe" className='avatar' >
              <div className={`avatar-background image${store.sigunId}`} />
            </Avatar>
            <div className={`name ${store!.currentDistance !== '' ? 'name-distance' : ''}`} onClick={handleNameClick}>
              {store.cmpnmNm}
            </div>
            <div className="distance">
              {store.currentDistance}
            </div>
            <div className="category">
              {store.categoryType}
            </div>
            <span className="phone">
              {store.telno} {telnoButton(store!.telno)}
            </span>
            <a className="kakao-map-icon" href={mapSearchUrl} target="_blank" />
            <div className={`address-copy-success ${isAddressClicked ? '' : 'hidden'}`}>주소가 복사되었습니다.</div>
            <div className="address" data-clipboard-text={clickedMerchant!.refineRoadnmAddr} onClick={handleAddressClick}>
              {clickedMerchant!.refineRoadnmAddr} <span className="address-click-info"><FileCopyIcon style={{ fontSize: "14px" }} /></span>
            </div>
          </div>
        </div>
      )
    })
    return (
      <SwipeableViews onChangeIndex={handleChangeIndex} index={index}>
        {cards}
      </SwipeableViews>
    )
  }
  return (
    <div className="swipe-view-wrap">
      {typeof clickedMerchant!.id === 'undefined' ? <div /> :
        }
    </div >
  )
}

export default inject(({ merchant, letsMap }) => ({
  clickedMerchant: merchant.clickedMerchant,
  setCurrentLatLong: letsMap.setCurrentLatLong,
  stores: merchant.merchantList,
  setClickedMerchant: merchant.setClickedMerchant
}))(observer(MerchantInfoCardList));