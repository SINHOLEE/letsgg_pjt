import React, { ReactElement, useEffect } from "react";
import { inject, observer } from "mobx-react";

import LetsMap from "components/letsmap/LetsMap";
import "pages/mappage/mappage.scss";
import SearchList from 'components/searchlist/SearchList';
import MerchantInfoCard from 'components/merchantinfo/MerchantInfoCard';
import StoreRegisterDialog from 'components/storeregister/StoreRegisterDialog';

interface Props {
  updateMerchantList?: () => {};
}
function MapPage({ updateMerchantList }: Props): ReactElement {
  // updateMerchantList!();
  return (
    <div className="map-page">
      <div className="map-area">
        <LetsMap />
      </div>
      <div className="search-list">
        <SearchList />
      </div>
      <div className="store-info">
        <MerchantInfoCard />
      </div>
      <div className="store-register-modal">
        <StoreRegisterDialog />
      </div>
    </div>
  );
}

export default inject(({ merchant }) => ({
  updateMerchantList: merchant.updateMerchantList,
}))(observer(MapPage));

