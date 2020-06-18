import LetsMapStore from 'stores/letsMap';
import MerchantStore from 'stores/merchant';
import Window from 'stores/window';
import Search from 'stores/search';

// 시작 : 모바일에서 맵 높이를 화면에 꽉 맞게 조정하기 위한 코드
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
// 끝

class RootStore{
    letsMap : LetsMapStore;
    merchant : MerchantStore;
    window: Window; 
    constructor(){
        this.letsMap = new LetsMapStore(this);
        this.merchant = new MerchantStore(this);
        this.window = new Window(this);
    }
}

export default RootStore;