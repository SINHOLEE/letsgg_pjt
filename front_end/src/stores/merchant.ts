import { observable, action, computed } from 'mobx';
import React from 'react';
import * as merchantApi from 'libs/apis/merchant';

export interface MerchantType {
    brnhstrmMnyUsePosblYn: string,
    cardMnyUsePosblYn: string,
    categoryId: number,
    categoryType: string,
    cmpnmNm: string,
    id: number,
    latitude: string,
    longitude: string,
    mobileMnyUsePosblYn: string,
    refineLotnoAddr: string,
    refineRoadnmAddr: string,
    refineZipCd: string,
    regionMnyNm: string,
    sigunId: number,
    telno: string,
    currentDistance: string | null,
}

export default class MerchantStore {
    @observable merchantList = [] as MerchantType[];
    @observable refs = {}; // 가게 리스트 위치 조정을 위한 레퍼런스
    @observable isNoMerchants = false;
    @observable clickedMerchant = {} as MerchantType;
    @observable currentPage = 0;
    @observable totalPage = 0;
    @observable firstPage = false;
    @observable lastPage = false;
    @observable isLoading = false;
    @observable prevUrlFormat: [string, string] = ['', '']; // 앞스트링+페이지번호+뒤스트링 => 페이지네이션을 위한 url
    // @observable isModalOpened = false;

    root: any;

    // *** root 등록 constructor
    constructor(root: any = null) {
        this.root = root;
    }

    handleError = (error: any) => {
        if (error.status === '404') {
            // console.log('404에러');
        }
    }

    settingDataFromResponse = (responseData : any) =>{
        this.merchantList = responseData.content;
            if(this.merchantList.length ===  0){
                this.isNoMerchants = true;
            }else{
                this.isNoMerchants = false;
            }
            this.totalPage = responseData.pageable.totalPages;
            this.firstPage = responseData.pageable.first;
            this.lastPage = responseData.pageable.last;
    }

    @action
    updateMerchantList = async () => {
        try {
            this.merchantList = await merchantApi.getMerchantList();
        } catch (error) {
            alert("서버와 통신 실패");
            this.handleError(error);
            // console.log(error);
        }
    }

    @action
    searchMerchantByCategory = async (category: string, currentLatLong: [number, number], topRightLatLong: [number, number], bottomLeftLatLong: [number, number], page: number, pageSize: number) => {
        this.isLoading = true;
        try {
            this.clickedMerchant = {} as MerchantType;
            const [prevUrlFormat, responseData] = await merchantApi.getMerchantListByCategory(category, currentLatLong, topRightLatLong, bottomLeftLatLong, page - 1, pageSize);
            console.log(responseData.content);
            this.settingDataFromResponse(responseData);
            this.currentPage = page;
            this.prevUrlFormat = prevUrlFormat;
        } catch (error) {
            alert("서버와 통신 실패");
            this.handleError(error);
            // console.log(error);
        }
        this.isLoading = false;
    }

    @action
    changePage = async (page: number) => {
        this.isLoading = true;
        try {
            this.clickedMerchant = {} as MerchantType;
            const responseData = await merchantApi.changePage(this.prevUrlFormat, page - 1);
            this.settingDataFromResponse(responseData);
            this.currentPage = page;
        } catch (error) {
            alert('서버와 통신 실패');
            this.handleError(error);
            // console.log(error);
        }
        this.isLoading = false;
    }

    @action
    searchMerchantBySearchInput = async (searchInput: string, currentLatLong: [number, number], topRightLatLong: [number, number], bottomLeftLatLong: [number, number], page: number, pageSize: number) => {
        this.isLoading = true;
        try {
            this.clickedMerchant = {} as MerchantType;
            // this.merchantList = await merchantApi.getMerchantListBySearch(searchInput);
            const [prevUrlFormat, responseData] = await merchantApi.getMerchantListBySearch(searchInput, currentLatLong, topRightLatLong, bottomLeftLatLong, page - 1, pageSize);
            this.settingDataFromResponse(responseData);
            this.currentPage = page;
            this.prevUrlFormat = prevUrlFormat;
        } catch (error) {
            alert('서버와 통신 실패');
            this.handleError(error);
            // console.log(error);
        }
        this.isLoading = false;
    }

    @action
    setRefs = (merchants: MerchantType[]) => {
        const refs = merchants.reduce((acc: any, merchant: any) => {
            acc[merchant.id] = React.createRef();
            return acc;
        }, {});
        this.refs = refs;
    }
    @action
    setClickedMerchant = (merchant: MerchantType) => {
        // console.log("clickedMerchant", merchant.cmpnmNm);
        // console.log("merchantList");
        // console.log(this.merchantList);
        this.clickedMerchant = merchant;
    }

    @action
    setCurrentPage = (page: number) => {
        this.currentPage = page;
    }

    @action
    setMerchantList = (merchantList : MerchantType[]) => {
        this.clickedMerchant = {} as MerchantType;
        this.merchantList = merchantList;
    }

    @action
    setIsLoading = (flag : boolean) => {
        this.isLoading = flag;
    }

    // @action
    // put = (name: string, price: number) => {
    //     const { number } = this.root.counter;
    //     // 존재하는지 찾고
    //     const exists = this.selectedItems.find((item: any) => item.name === name);
    //     if (!exists) {
    //         // 존재하지 않는다면 새로 집어넣습니다.
    //         this.selectedItems.push({
    //             name,
    //             price,
    //             count: number,
    //         });
    //         return;
    //     }
    //     // 존재 한다면 count 값만 올립니다.
    //     exists.count += number;
    // }

    // @action
    // take = (name: string) => {
    //     const itemToTake = this.selectedItems.find((item: any) => item.name === name);
    //     itemToTake.count--;
    //     if (itemToTake.count === 0) {
    //         // 갯수가 0이면
    //         this.selectedItems.remove(itemToTake); // 배열에서 제거 처리합니다.
    //     }
    // }

    // @computed
    // get total() {
    //     console.log('총합 계산...');
    //     return this.selectedItems.reduce((previous: number, current: any) => {
    //         return previous + current.price * current.count;
    //     }, 0);
    // }
}