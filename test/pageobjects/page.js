import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(`https://www.amazon.in/${path}`)
    }
    waitUntil(url){
        browser.waitUntil(async () => {
            const url = await browser.getUrl();
            return url.includes(url);
        }, {
            timeout: 5000,
            timeoutMsg: 'Did not land on Amazon homepage'
        });
    }
    async getHandles(){
        return await browser.getWindowHandles();
    }
    async switchTab(newTabHandle){
        await browser.switchToWindow(newTabHandle);
    }
}
