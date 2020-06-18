import React, { useState, useEffect, createRef } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@material-ui/core/Checkbox';
import { inject, observer } from "mobx-react";
import BlackButton from 'components/button/BlackButton';
import Category from 'components/category/Category';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as api from 'libs/apis/merchant';
import { RegisterMerchantType } from 'libs/apis/merchant';

import 'components/storeregister/storeregisterdialog.scss';


const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

interface JusoType {
    detBdNmList: string,
    engAddr: string,
    rn: string,
    emdNm: string,
    zipNo: string,
    roadAddrPart2: string,
    emdNo: string,
    sggNm: string,
    jibunAddr: string,
    siNm: string,
    roadAddrPart1: string,
    bdNm: string,
    admCd: string,
    udrtYn: string,
    lnbrMnnm: string,
    roadAddr: string,
    lnbrSlno: string,
    buldMnnm: string,
    bdKdcd: string,
    liNm: string,
    rnMgtSn: string,
    mtYn: string,
    bdMgtSn: string,
    buldSlno: string
}
const numberCheckRegex = /^\d+$|^$/;
const { kakao } = window;

interface Props {
    dialogOpen?: boolean;
    setDialogOpen?: (flag: boolean) => {};
}

function StoreRegisterDialog({ dialogOpen, setDialogOpen }: Props) {
    const [jusoList, setJusoList] = useState<JusoType[]>([]);
    const [keyWord, setKeyWord] = useState<string>('');
    const [isLoading, SetIsLoading] = useState<boolean>(false);
    const [merchantName, setMerchantName] = useState<string>('');
    const [selectedJuso, setSelectedJuso] = useState<[string, string]>(['', '']);
    const [cityName, setCityName] = useState<string>('');
    const [phone, setPhone] = useState<[string, string, string]>(['', '', '']);
    const [category, setCategory] = useState<string>('');
    const [zipCode, setZipCode] = useState<string>('');
    const [latLong, setLatLong] = useState<[string, string]>(['', '']);
    const [isJusoClicked, setIsJusoClicked] = useState<boolean>(false);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const jusoInputRef = React.createRef<HTMLInputElement>();

    const clearInputs = () => {
        setMerchantName('');
        setSelectedJuso(['', '']);
        setCityName('');
        setPhone(['', '', '']);
        setCategory('');
        setCurrentPage(1);
        setJusoList([]);
        setKeyWord('');
        setIsJusoClicked(false);
        SetIsLoading(false);
    }

    const handleClickOpen = () => {
        setDialogOpen!(true);
    };
    const handleClose = () => {
        setDialogOpen!(false);
        clearInputs();
    };
    const searchJuso = async (page: number) => {
        SetIsLoading(true);
        try {
            const responseData = await api.searchJuso(keyWord, page);
            if (responseData.juso == null) {
                throw Error;
            }
            setJusoList(responseData.juso);
            const totalCount = responseData.common.totalCount;
            let totalPage = Math.floor(totalCount / 10);
            if (totalCount % 10 > 0) {
                totalPage += 1;
            }
            setTotalPage(totalPage);
        } catch (error) {
            alert('주소를 상세히 입력해 주시기 바랍니다.');
        }
        SetIsLoading(false);
    }
    const handleBtnClick = (event: any) => {
        searchJuso(1);
    }

    const handleNameChange = (event: any) => {
        setMerchantName(event.target.value);
    }

    const handleKeywordChange = (event: any) => {
        setKeyWord(event.target.value);
    }

    const handleJusoClick = (event: any) => {
        setIsJusoClicked(true);
    }

    useEffect(() => {
        if (isJusoClicked && jusoInputRef.current) {
            jusoInputRef.current.focus();
        }
    }, [isJusoClicked])
    const handlePhoneChange = (event: any, idx: number) => {
        const number = event.target.value;
        if (numberCheckRegex.test(number)) {
            let newPhone: [string, string, string] = [phone[0], phone[1], phone[2]];
            newPhone[idx] = number;
            setPhone(newPhone);
        } else {
            alert('숫자만 입력해주세요');
        }
    }
    const handleJusoItemClick = (juso: JusoType) => {
        setSelectedJuso([juso.roadAddr, selectedJuso[1]]);
        setZipCode(juso.zipNo);
        setCityName(juso.sggNm);
        setIsJusoClicked(false);
        kakao.maps.load(() => {
            var geocoder = new kakao.maps.services.Geocoder();
            var callback = function (result: any, status: any) {
                if (status === kakao.maps.services.Status.OK) {
                    const lat = result[0].y;
                    const long = result[0].x;
                    setLatLong([lat, long]);
                }
            };
            geocoder.addressSearch(juso.roadAddr, callback);
        });
    }
    const JusoListView = (jusoList: JusoType[]) => {
        return jusoList.map((juso: JusoType) => (
            <div className="juso-item" key={juso.roadAddr} onClick={() => { handleJusoItemClick(juso) }}>
                {juso.roadAddr}
            </div>
        ))
    }
    const categoryCallback = (category: string) => {
        setCategory(category);
    }
    const handleKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            searchJuso(1);
        }
    }

    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
    }

    useEffect(() => {
        if (isJusoClicked) {
            searchJuso(currentPage);
        }
    }, [currentPage])
    const handleSubmit = async () => {
        const merchant: RegisterMerchantType = {
            cmpnm: merchantName,
            address: selectedJuso[0] + ' ' + selectedJuso[1],
            category: category,
            citynm: cityName,
            zipcd: zipCode,
            latitude: latLong[0],
            longitude: latLong[1],
            tel: phone[0] + "-" + phone[1] + "-" + phone[2]
        }
        try {
            const response = await api.registerMerchant(merchant);
            if (response.status === 201) {
                alert('신청이 접수되었습니다.');
                clearInputs();
                handleClose();
            }
        } catch (error) {
            alert('신청 도중 에러가 발생했습니다. 다시 시도해주세요.');
        }
    }
    return (
        <div>
            <Dialog fullScreen onClose={handleClose} aria-labelledby="customized-dialog-title" open={dialogOpen!}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    가맹점 정보 등록 신청
                </DialogTitle>
                <DialogContent dividers>
                    <div className="merchant-register-wrap">
                        상호명
                        <input onChange={handleNameChange} /><br />
                        카테고리 : {category}
                        <Category categoryClickCallback={categoryCallback} />
                        <br />
                        전화번호
                        <input className="input-phone" value={phone[0]} onChange={(event: any) => { handlePhoneChange(event, 0) }} />
                        -<input className="input-phone" value={phone[1]} onChange={(event: any) => { handlePhoneChange(event, 1) }} />
                        -<input className="input-phone" value={phone[2]} onChange={(event: any) => { handlePhoneChange(event, 2) }} /><br />
                        주소
                        <input className="input-juso" value={selectedJuso[0]} readOnly onClick={handleJusoClick} placeholder="클릭 후 도로명 주소를 검색해주세요." /><br />
                        <div className={`juso-search ${isJusoClicked ? '' : 'hidden'}`}>
                            도로명 주소 검색
                            <input onChange={handleKeywordChange} onKeyDown={handleKeyDown} ref={jusoInputRef} />
                            <button className="search-button" onClick={handleBtnClick}>
                                <SearchIcon />
                            </button>
                            {isLoading ?
                                <div>검색중...
                                <CircularProgress size={20} />
                                </div> :
                                <div className="juso-search-list">
                                    {JusoListView(jusoList)}
                                    <Pagination count={totalPage} page={currentPage} onChange={handlePageChange} hidePrevButton hideNextButton />
                                </div>}
                        </div>
                        <div className='juso-detail'>
                            상세주소
                        <input />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <BlackButton autoFocus onClick={handleSubmit} color="primary">
                        신청하기
                    </BlackButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default inject(({ window }) => ({
    dialogOpen: window.dialogOpen,
    setDialogOpen: window.setDialogOpen,
}))(observer(StoreRegisterDialog));
