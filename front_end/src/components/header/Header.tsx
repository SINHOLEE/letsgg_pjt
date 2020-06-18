import React, { ReactElement, Fragment, useState } from "react";
import "components/header/header.scss";
interface Props { }

export default function Header({ }: Props): ReactElement {
  const [subTitleVisibleHidden, setSubTitleVisibleHidden] = useState<string>('hidden');
  const handleTitleMouseOver = () => {
    setSubTitleVisibleHidden('visible');
  }
  const handleTitleMouseOut = () => {
    setSubTitleVisibleHidden('hidden');
  }
  return (
    <Fragment>
      <div className="header-wrap">
        <div className={`header-title`} onMouseOver={handleTitleMouseOver} onMouseOut={handleTitleMouseOut}>
          LETS 경기
          <div className={`header-sub-title ${subTitleVisibleHidden}`}>Local Exchange Trading System</div>
        </div>
      </div>
    </Fragment>
  );
}
