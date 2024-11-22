import Page from "./page";
import { expect } from 'chai';
class AmazonHomePage extends Page{
    get searchBox(){
        return $('//*[@id="twotabsearchtextbox"]');
    }
    get searchBtn(){
        return $('//*[@id="nav-search-submit-button"]');
    }
    get productsResultTitle(){
        return $('//*[@id="search"]/span/div/h1/div/div[1]/div/div');
    }
    get resultsHeadline(){
        return $('h2.a-size-medium-plus.a-spacing-none.a-color-base.a-text-bold');
    }
    get imageContainers(){
        return $$('div.a-section.aok-relative.s-image-tall-aspect');
    }
    get topBrandsFilter(){
        return $("//span[contains(text(),'Top Brands')]");
    }
    get topBrandsCheckbox(){
        return $('//*[@id="p_n_feature_nineteen_browse-bin/11301357031"]/span/a/div/label/input');
    }

    async applyFilter(){
        await this.topBrandsFilter.click();
        const isChecked = await this.topBrandsCheckbox.getAttribute('checked');
        expect(isChecked).to.not.be.null;
    }

    async verifySearchResults(){
        const text = await this.productsResultTitle.getText();
        const tagName = await this.resultsHeadline.getTagName();
        const headlineText = await this.resultsHeadline.getText();
        console.log('Found text:', text);
        console.log(`Found <${tagName}> with text: "${headlineText}"`);

        expect(text.toLowerCase()).to.include('results for');
        expect(text.toLowerCase()).to.include('mens jackets');
        expect(tagName).to.equal('h2');
        expect(headlineText).to.equal('Results');

        //verify image is available 
        const productImages = await headlineElement.imageContainers;
        for (let element of productImages) {
            const imgElement = await element.$('img');
            const src = await imgElement.getAttribute('src');

            expect(imgElement).to.not.be.null;
            expect(src).to.include('.jpg');
        }

    }
    async open(){
        return super.open('');
    }
    async waitUntil(){
        return super.waitUntil('amazon.in');
    }

    async searchForProduct(){
        await this.searchBox.setValue('Mens jackets');
        await this.searchBtn.click();
    }
}
export default new AmazonHomePage();