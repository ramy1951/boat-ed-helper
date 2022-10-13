const puppeteer = require('puppeteer');

const username = ""; //TODO: Enter username for boat-ed.com
const password = ""; //TODO: Enter password for boat-ed.com


(async () => {
    if (!username || !password) {
        console.log("ERROR: username and/or password have not bee provided!")
        return
    }

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto('https://www.boat-ed.com/course');

    await page.waitForSelector('#account-username');
    await page.type('#account-username', username);

    await page.waitForSelector('#account-password');
    await page.type('#account-password', password);

    await page.waitForSelector('[class="btn btn-default btn btn-lg btn-success pull-right"]');
    await page.click('[class="btn btn-default btn btn-lg btn-success pull-right"]');
    await page.waitForNavigation();
    //btn btn-lg btn-success btn-space
    await page.waitForSelector('[class="btn btn-lg btn-success btn-space"]');
    await page.click('[class="btn btn-lg btn-success btn-space"]');

    while (true) {
        console.log("waiting on button");
        await page.waitForSelector('a[class="btn btn-lg btn-success"]', {
            timeout: 0
        });
        console.log("button loaded");
        await page.click('a[class="btn btn-lg btn-success"]');
        console.log("button clicked");
    }

    await setTimeout(() => {}, 1000);
    browser.close();
})()
