'use strict';

const xRay = require('x-ray');
const x = xRay();

export {
    buildXRay
};

function buildXRay(section, url) {
    let scrapper = buildScrapper(section.scrapper);

    return x(url || section.url, section.startTag, [scrapper]);
}

function buildScrapper(object) {
    let result = {};
    Object.keys(object).forEach(key => {
        let value = object[key];
        if (Array.isArray(value)) {
            const startTag = value[0].startTag;
            delete value[0].startTag;
            let items = buildScrapper(value[0]);
            result[key] = x(startTag, [items]);
        }
        else {
            result[key] = value;
        }
    });
    return result;
}