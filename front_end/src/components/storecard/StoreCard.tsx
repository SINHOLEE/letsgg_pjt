import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, yellow, amber } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import 'components/storecard/storecard.scss';
import { inject, observer } from "mobx-react";
import categoryImage from 'assets/images/category_small.png';
import PhoneDisabledIcon from '@material-ui/icons/PhoneDisabled';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import ReactGA from 'react-ga';
import { MerchantType } from 'stores/merchant';
import BlackButton from 'components/button/BlackButton';
import ClipboardJS from 'clipboard';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
    width: 60,
    height: 60
  },
}));

// bd에서는 cate_small과같이 스네이크 케이스, 
// 프로젝트상에서는 카멜케이스(스프링)
interface Category {
  id: string,
  cateBig: string,
  cateSmall: string,
}

interface Sigun {
  id: string,
  doNm: string,
  sigunNm: string,
}

interface Props {
  store: MerchantType,
  isCategoryAndListVisible?: boolean;
  setIsCategoryAndListVisible?: (value: boolean) => {};
  expanded: boolean;
  clickedMerchant?: MerchantType;
  setCurrentLatLong?: (latLong: [number, number]) => {};
  refs?: { [key: string]: any };
  merchants?: MerchantType[];


}



function StoreCard({ merchants, refs, store, isCategoryAndListVisible, setIsCategoryAndListVisible, expanded, clickedMerchant, setCurrentLatLong }: Props) {
  const [clipboard, setClipboard] = useState<ClipboardJS>();
  useEffect(() => {
    const clip = new ClipboardJS('#address');
    setClipboard(clip);
    return () => {
      if(!!clipboard){
        clipboard!.destroy();
      }
    }
  }, [])
  const [isAddressMouseOver, setIsAddressMouseOver] = useState(false);
  const [isAddressClicked, setIsAddressClicked ] = useState(false);

  const classes = useStyles();
  // a링크 걸기위한 변수
  const mapSearchUrl = `https://map.kakao.com/?q=${store.refineRoadnmAddr}`;
  const noneDashedTelno = store.telno.replace(/-/g, "");
  const telHref = `tel:${noneDashedTelno}`
  const handleShowMapClick = () => {
    setTimeout(() => {
      const lat = parseFloat(clickedMerchant!.latitude);
      const long = parseFloat(clickedMerchant!.longitude);
      setCurrentLatLong!([lat, long]);
      setIsCategoryAndListVisible!(!isCategoryAndListVisible);      
    }, 500);

  };
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  // console.log(categoryImage);
  const myImage = new Image();
  myImage.src = categoryImage;

  const cateList: string[] = ["편의점", "주유소", "학원", "병원", "기타의료기관", "레저업소", "보건위생", "음식점"];
  const telnoButton = (telno: string): any => {
    var regExp = /^\d{2,3}-\d{3,4}-\d{4}$/;
    if (!regExp.test(telno)) {
      return <PhoneDisabledIcon></PhoneDisabledIcon>
    }
    return <a href={`tel:${noneDashedTelno}`}><PhoneEnabledIcon></PhoneEnabledIcon></a>
  }

  const handleAddressMouseOver = () => {
    setIsAddressMouseOver(true);
  }
  const handleAddressMouseOut = () => {
    setIsAddressMouseOver(false);
  }

  const handleAddressClick = () =>{
    setIsAddressClicked(true);
    setTimeout(()=>{
      setIsAddressClicked(false);
    },1500);
  }

  return (
    <Card className={`${classes.root} merchant-card-wrap`}>
      <CardHeader
        className="card-header"
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} >
            {/* {store.regionMnyNm} */}
            <div className={`avatar image${store.sigunId}`}> </div>
          </Avatar>
        }
        title={store.cmpnmNm}
        // 카테고리
        subheader={store.categoryType}
      />
      <div className="distance">
        {store.currentDistance}
      </div>

      {/* 더보기 버튼 눌렀을때 */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>

          <Typography paragraph onMouseOver={handleAddressMouseOver} onMouseOut={handleAddressMouseOut} onClick={handleAddressClick}> 
            <span className={`address-copy-success ${isAddressClicked? '' : 'hidden'}`}>주소가 복사되었습니다.</span>
            <span id="address" data-clipboard-text={store.refineRoadnmAddr} >주소: {store.refineRoadnmAddr}</span>
            <span className={`address-click-info ${isAddressMouseOver ? '' : 'hidden'}`}>주소 클릭시 복사</span>
          </Typography>
          <Typography paragraph>
            번호: {store.telno} {telnoButton(store.telno)}
          </Typography>
          <ButtonGroup disableElevation variant="contained" >
            <Button href={mapSearchUrl} target="_blank" rel="noopener noreferrer" onClick={(event: any) => ReactGA.ga('send', 'event', 'link_to_kakao_map')}>카카오 지도로 상세보기</Button>
            <BlackButton onClick={(event: any) => { handleShowMapClick(); ReactGA.ga('send', 'event', 'list_to_lets_map') }}>현재 지도로 위치 보기</BlackButton>
          </ButtonGroup>

        </CardContent>
      </Collapse>
    </Card>
  );


} export default inject(({ window, merchant, letsMap }) => ({
  isCategoryAndListVisible: window.isCategoryAndListVisible,
  setIsCategoryAndListVisible: window.setIsCategoryAndListVisible,
  clickedMerchant: merchant.clickedMerchant,
  setCurrentLatLong: letsMap.setCurrentLatLong,
  refs: merchant.refs,
  merchants: merchant.merchantList,


}))(observer(StoreCard));
