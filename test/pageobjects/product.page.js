import { expect } from 'chai';
import Page from './page';
class ProductPage extends Page{
    get aProduct(){
        return $('//*[@id="search"]/div[1]/div[1]/div/span[1]/div[1]/div[3]');
    }
    get productTitle(){
        return $('//*[@id="productTitle"]');
    }
    get productPrice(){
        return $("(//span[contains(@class, 'a-price-whole')])[1]");
    }
    // select a product
    async clickAProduct(){            
        await this.aProduct.click();
    }
    async switchTab(){
        const handles = await super.getHandles();
        const newTabHandle = handles[handles.length - 1];
        await super.switchTab(newTabHandle);
        let currentUrl;
        await browser.waitUntil(async () => {
            currentUrl = await browser.getUrl();
            return currentUrl.includes('https://www.amazon.in/');
        }, {
            timeout: 5000, 
            timeoutMsg: 'Expected URL to include "https://www.amazon.in/"'
        });
        console.log('New tab URL:', currentUrl);
    }
    async verifyProductTitlePrice(){
        const titleText = await this.productTitle.getText();
        const priceText = await this.productPrice.getText();
        expect(titleText).to.equal('Boldfit Jacket For Men Quilted Jacket For Men Winter Wear Monsoon Winter Wear for men Men Hooded Winter Jackets For Men Padded Bomber Jacket For Men Full Sleeve Mens Jacket Winter Jacket For Men');
        expect(priceText).to.equal('1,799');
        console.log("reached here!")
    }
}
export default new ProductPage();