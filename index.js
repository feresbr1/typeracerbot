const puppeteer = require('puppeteer');
const robot = require('robotjs');

const typeWithDelay = async (text, delayBetweenChars = 10) => {
    for (const char of text) {
        robot.typeString(char);
        await sleep(delayBetweenChars);
    }
};

const tapWords = async (words, delayBetweenWords = 10, delayBetweenChars = 10) => {
    for (const word of words) {
        await typeWithDelay(word + ' ', delayBetweenChars);
        await sleep(delayBetweenWords);
    }
};
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto('https://play.typeracer.com/');
        await page.setViewport({ height: 1600, width: 900 })
        await sleep(6000);
        await page.waitForSelector('#gwt-uid-1 > a');
        await page.click('#gwt-uid-1 > a')
        await page.waitForSelector('#gwt-uid-20 > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1)');

        const words = await page.evaluate(() => {
            const element = document.querySelector('#gwt-uid-20 > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1)');
            return element.textContent.split(' ');
        });

        await sleep(15000);
        await tapWords(words);
    } catch (error) {
        console.error('Error:', error);
    }
})();