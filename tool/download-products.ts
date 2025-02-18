// Data from https://shop.rema1000.dk/drikkevarer/special-ol
// curl --data '{"params":"query=&hitsPerPage=1000&facets=%5B%22labels%22%5D&facetFilters=%5B%22category_id%3A5898330%22%5D"}' \
//     'https://flwdn2189e-dsn.algolia.net/1/indexes/aws-prod-products/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.21.1&x-algolia-application-id=FLWDN2189E&x-algolia-api-key=fa20981a63df668e871a87a8fbd0caed'

import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";

const imgHeight = 96;
const beerTypes = ['lager', 'ale', 'stout', 'ipa', 'weiss'];

function randomChoice(arr: string[]) {
    return arr[Math.floor(arr.length * Math.random())];
}

async function scrapeBeers(numBeers: number = 5) {
    const url = 'https://flwdn2189e-dsn.algolia.net/1/indexes/aws-prod-products/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.21.1&x-algolia-application-id=FLWDN2189E&x-algolia-api-key=fa20981a63df668e871a87a8fbd0caed'
    const data = {
            params: "query=&hitsPerPage=1000&facets=%5B%22labels%22%5D&facetFilters=%5B%22category_id%3A5898340%22%5D"
        };
    const response = await axios.post(url, data);
    // console.log(response.data);
    let beers = response.data['hits'];
    beers = beers.slice(0, numBeers);
    let products: any[] = [];
    beers.map((beer: any) => {
        console.log(beer['name']);
        // pick out short name
        const shortName = (beer['name'] as string).toLowerCase().replace(/[%, ]/g, '_').replace(/å/g, 'a').replace(/ø/g, 'o');
        // download image
        const imgPath = beer['image_url'];
        const imgUrl = `https://cphapp.rema1000.dk/api/v1${imgPath}/${imgHeight}.jpg`
        axios
            .get(imgUrl, {responseType: 'stream'})
            .then(res => {
                res.data.pipe(fs.createWriteStream(`../public/products/${shortName}.jpg`));
            });
        // compose product
        const product = {
            name: shortName,
            display: beer['name'],
            type: randomChoice(beerTypes),
            price: beer['pricing']['price'],
        }
        products.push(product);
    });
    return products;
}



async function scrapeBibles() {
    const url = 'https://www.jw.org/da/bibliotek/bibelen/?contentLanguageFilter=da'
    const response = await axios.get(url);
    // console.log(response.data);
    const html = cheerio.load(response.data);
    const bibleImages = html(".jsRespImg");
    // console.log(bibleImages);
    let products: any[] = [];
    bibleImages.map((idx, bible: any) => {
        // console.log('short', bible);
        // pick out short name
        const imgUrl = html(bible).attr('data-img-size-xs');
        if (imgUrl == undefined) {
            return;
        }
        const shortName = imgUrl.replace(/.*\//, '').replace(/\.jpg/, '');
        // console.log(shortName);
        // download image
        axios
            .get(imgUrl, {responseType: 'stream'})
            .then(res => {
                res.data.pipe(fs.createWriteStream(`../public/products/${shortName}.jpg`));
            });
        // compose product
        const product = {
            name: shortName,
            display: shortName,
            type: 'bible',
            price: 149,
        }
        products.push(product);
    });
    // fill in bible names (found in the HTML)
    const foundBibles: string[] = [];
    const bibleNames = html("div.emailSubject");
    bibleNames.map((idx, bible: any) => {
        // console.log('long', bible);
        // pick out long name
        const nameText = html(bible).text().trim();
        if (nameText.indexOf('Ny Verden') === -1 || nameText.indexOf('<') >= 0) {
            return;
        }
        const longName = nameText.replace(/Ny Verden-Oversættelsen af /, '');
        if (foundBibles.indexOf(longName) === -1) {
            console.log(longName);
            // console.log(products, foundBibles.length);
            products[foundBibles.length]['display'] = longName;
            foundBibles.push(longName);
        }
    });
    return products;
}

function saveProducts(products: any[]) {
    fs.writeFileSync(`../app/data/products.json`, JSON.stringify(products, undefined, 2));
}

async function scrapeAll() {
    console.log('Scraping beers...');
    const beers = await scrapeBeers(50);
    console.log('Scraping bibles...');
    const bibles = await scrapeBibles();
    const products = beers.concat(bibles);
    saveProducts(products);
}

scrapeAll();
