var express = require('express');
const { count } = require('../../models/fusionApiTest/testRun');
var router = express.Router();

var { getProductionsByYearCountry, getCountries } = require('../../services/compare/productionService')

router.get('/', async function(req, res, next) {
    var countries = await getCountries()
    res.render("compare/productions", {countries: countries});
});

router.post('/', async function(req, res, next) {
    var year = req.body["year"];
    var month = req.body["month"];
    var country = req.body["country"];

    if (year && month && country) {
        var countries = await getCountries()
        var { fusionProductions, obProductions, fusCount, opCount } = await getProductionsByYearCountry(year, month, country)
        res.render("compare/productions", {
            year: year,
            month: month,
            country: country,
            countries: countries,
            fusProductions: fusionProductions,
            obProductions: obProductions,
            fusCount: fusCount,
            opCount: opCount
        });
    } else {
        res.send("Invalid")
    }
    
});

module.exports = router