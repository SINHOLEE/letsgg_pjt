import React, { ReactElement } from 'react'
import 'components/category/category.scss';
import { inject, observer } from "mobx-react";
import ReactGA from 'react-ga';
interface Props {
    categoryClickCallback: Function;
    }

function Category({ categoryClickCallback }: Props): ReactElement {
    const cateList: string[] = ["음식점", "편의점", "주유소", "학원", "병원", "레저업소", "보건위생", "기타"];
    const handleIconClick = (event: any) => {
        const category = cateList[event.target.id];
        if (category !== "") {
            categoryClickCallback(category);
        }
    }

    return (
        <div id="category">
            {cateList.map((category, idx) => {
                return (
                    <div className={`menu item${idx}`} key={idx} id={idx.toString()} onClick={(event: any) => {
                        handleIconClick(event);
                        ReactGA.ga('send', 'event', 'event_category', category, 'event_label');
                    }}>
                        <div className="item-title">{category}</div>
                    </div>
                )
            })}
        </div>
    )
}


export default inject(({}) => ({
}))(observer(Category));
