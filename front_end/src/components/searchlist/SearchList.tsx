import React, { ReactElement, useState } from 'react'
import Category from 'components/category/Category';
import Search from 'components/search/Search';
import { inject, observer } from "mobx-react";
import StoreCardList from 'components/storecard/StoreCardList';
import Header from 'components/header/Header';
import Drawer from 'components/drawer/Drawer';
import Pagination from '@material-ui/lab/Pagination';
import { MerchantType } from 'stores/merchant';
import 'components/searchlist/searchlist.scss';
import SwipeableViews from 'react-swipeable-views';


interface Props {
    currentPage?: number;
    totalPage?: number;
    setCurrentPage?: (page: number) => {};
    changePage?: (page: number) => {};
    merchantList?: MerchantType[];
    isCategoryAndListVisible?: boolean;
    setIsCategoryAndListVisible?: (value: boolean) => {};
    isListVisible?: boolean;
    setIsListVisible?: (value: boolean) => {};
    searchMerchantByCategory?: (category: string, currentLatLong: [number, number], topRightLatLong: [number, number], bottomLeftLatLong: [number, number], page: number, pageSize: number) => void;
    currentLatLong?: [number, number];
    currentBound?: { bottomLeftLatLong: [number, number], topRightLatLong: [number, number] };

}

function SearchList({ currentPage, totalPage, setCurrentPage, changePage,
    isCategoryAndListVisible, setIsCategoryAndListVisible, isListVisible,
    setIsListVisible, merchantList, searchMerchantByCategory, currentLatLong, currentBound }: Props): ReactElement {
    const handleShowCategoryButton = () => {
        setIsCategoryAndListVisible!(!isListVisible);
    }
    // 검색 결과 리스트 화면 보여주는지 판단하는 로직
    // let isListVisible = false;
    if (isCategoryAndListVisible) {
        isListVisible = true;
    }

    const categoryClickCallback = (category : string) => {
        searchMerchantByCategory!(category, currentLatLong!, currentBound!.topRightLatLong, currentBound!.bottomLeftLatLong, 1, 20);
    }
    return (
        <div className="search-list-wrap">

            <div className="search-list-drawer">
                <Drawer />
            </div>
            <div className="search-list-header-wrap">
                <div className="header">
                    <Header />
                </div>
                <div className="search-list-search">
                    <Search />
                </div>
            </div>
            <div className={`search-list-show-category-button`} onClick={handleShowCategoryButton}>
                {isListVisible ? '▲' : '▼'}
            </div>
            <div className={`search-list-category ${isListVisible ? '' : 'hidden'}`}>
                <Category categoryClickCallback={categoryClickCallback}/>
            </div>
            <div className={`search-list-store-card-list ${isListVisible ? '' : 'hidden'}`}>
                <StoreCardList />
            </div>
            
            

        </div>
    )
}

export default inject(({ merchant, window, letsMap }) => ({
    currentPage: merchant.currentPage,
    totalPage: merchant.totalPage,
    setCurrentPage: merchant.setCurrentPage,
    changePage: merchant.changePage,
    merchantList: merchant.merchantList,
    isCategoryAndListVisible: window.isCategoryAndListVisible,
    setIsCategoryAndListVisible: window.setIsCategoryAndListVisible,
    isListVisible: window.isListVisible,
    setIsListVisible: window.setIsListVisible,
    searchMerchantByCategory: merchant.searchMerchantByCategory,
    currentLatLong: letsMap.currentLatLong,
    currentBound: letsMap.currentBound,
}))(observer(SearchList));
