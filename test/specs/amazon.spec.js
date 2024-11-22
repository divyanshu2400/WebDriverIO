import AmazonHomePage from '../pageobjects/amazon.home.page.js'
import productPage from '../pageobjects/product.page.js';
import { addEpic, addFeature, addStory } from "@wdio/allure-reporter";

describe("Verify Search Results", () => {
    it("open Amazon home page ", async () => {
        addFeature("Verify Home page of Amazon");

        await AmazonHomePage.open();
        await AmazonHomePage.waitUntil();
        const title = await browser.getTitle();
        console.log('Page Title:', title);
        // Search for a product 'Mens jackets'
        AmazonHomePage.searchForProduct();
    });

    it("verify search results",async ()=>{
        addFeature("Verify search results for product");
        // verify results
        AmazonHomePage.verifySearchResults();
    });

    it("verify apply filter", async()=>{
        addFeature("Verify filter applied feature");
        // Apply a filter "Top Brands"
        AmazonHomePage.applyFilter();
    });

    it("verify product page",async()=>{
        addFeature("Verify product details page of Amazon");

        await productPage.clickAProduct();
        await productPage.switchTab();
        await productPage.verifyProductTitlePrice();
    });
});
