const Sequelize = require('sequelize');
const _ = require('lodash')
const { all } = require('../../app');

var { operabase, fusion, bi } = require('../../helpers/config');

function formatCastDates(data) {
    return data.map(item => {
        return {
            AllCasts: item.AllCasts ? _.compact(item.AllCasts.split('~').map(i => {
                if (i.indexOf('Singer') == -1) {
                    return i
                }
            })): [],
            AllDates: item.AllDates ? _.compact(item.AllDates.split('~').map(i => {
                return i
            })): [],
            AllCrew: item.AllCrew ? _.compact(item.AllCrew.split('~').map(i => {
                if (i.indexOf('Singer') == -1 && i.indexOf('()') == -1) {
                    return i
                }
            })) : [],
            AllPerfTypes: item.AllPerfTypes ? _.compact(item.AllPerfTypes.split('~').map(i => {
                return i
            })) : [],
            ProductionId: item.ProductionId,
            PeformanceStartDate: item.PeformanceStartDate,
            WorkName: item.WorkName,
            CompanyName: item.CompanyName,
            Country: item.Country
        }
    })
}

async function getProductionsByYearCountry(year, month, countryId) {
    var fusionDb = new Sequelize(fusion.db, fusion.user, fusion.passwd, {
        dialect: 'mysql',
        host: fusion.host,
        logging: null,
    });
    var operabaseDb = new Sequelize(operabase.db, operabase.user, operabase.passwd, {
        dialect: 'mysql',
        host: operabase.host,
        logging: null,
    });

    var country = await fusionDb.query(`select country_code from countries where id = ${countryId}`, {type: Sequelize.QueryTypes.SELECT})

    var fusionDbQuery = `select p.id as ProductionId, w.name as WorkName, c.name as CompanyName,
        c1.name as Country,
        min(pD.value) as PeformanceStartDate,
        year(min(pD.value)) as SeasonYear,
        group_concat(distinct concat(p1.name, '(', p2.name, ')') order by p1.name separator '~') as AllCrew,
        group_concat(distinct concat(pD.value, '(', v.name, ')') order by pD.value separator '~') as AllDates,
        group_concat(distinct concat(p1.name, '(', wR.name, ')') order by p1.name separator '~') as AllCasts,
        group_concat(distinct concat(pT.name) separator ',') as AllPerfTypes
    from productions p
        left join countries c1 on p.country_id = c1.id
        left join productionDates pD on p.id = pD.production_id
        left join productionCasts pC on p.id = pC.production_id
        left join profiles p1 on pC.profile_id = p1.id
        left join workRoles wR on pC.work_role_id = wR.id
        left join professions p2 on pC.profession_id = p2.id
        left join companies c on p.company_id = c.id
        left join works w on p.work_id = w.id
        left join venues v on pD.venue_id = v.id
        left join productionPerformanceTypes pPT on p.id = pPT.production_id and pD.id = pPT.production_date_id
        left join performanceTypes pT on pPT.performance_type_id = pT.id
    where year(pD.value) = ${year} and c1.id = ${countryId} and month(pD.value) = ${month}
    group by p.id order by min(pD.value)`

    var opDbQuery = `select
        P_id as ProductionId,
        convert(cast(convert(P_work using  latin1) as binary) using utf8) as WorkName,
        substring_index(convert(cast(convert(P_dotE using  latin1) as binary) using utf8), '.', -1) as CompanyName,
        P_country as Country, P_originaldate as PerformanceStartDate,
        year(P_originaldate) as SeasonYear,
        group_concat(distinct concat(convert(cast(convert(C_full_name using  latin1) as binary) using utf8), '(', convert(cast(convert(R_name using  latin1) as binary) using utf8), ')') order by C_full_name separator '~') as AllCasts,
        group_concat(distinct concat(convert(cast(convert(C_full_name using  latin1) as binary) using utf8), '(', convert(cast(convert(J_full_name using  latin1) as binary) using utf8), ')') order by C_full_name separator '~') as AllCrew,
        P_prodtype as ProdTypes,
        group_concat(distinct concat(PD_suff) separator '~') as AllPerfTypes,
        group_concat(distinct concat(PD_date, '(', substring_index(convert(cast(convert(PD_dotL using  latin1) as binary) using utf8), '.', -1),')') order by PD_date separator '~') as AllDates
    from productions
    left join cast on P_id = C_id_prod
    left join roles2 on R_id = C_id_role
    left join jobs on C_id_job = J_id
    left join prod_per_day on PD_id_prod = P_id
    where year(P_originaldate) = ${year} and P_country = '${country[0].country_code.toLowerCase()}' and month(P_originaldate) = ${month}
    group by P_id order by P_originaldate`

    var fusResult = formatCastDates(await fusionDb.query(fusionDbQuery, {type: Sequelize.QueryTypes.SELECT}))
    var opResult = formatCastDates(await operabaseDb.query(opDbQuery, {type: Sequelize.QueryTypes.SELECT}))

    return {
        fusionProductions: fusResult,
        obProductions: opResult,
        fusCount: fusResult.length,
        opCount: opResult.length
    }
}

async function getCountries() {
    var fusionDb = new Sequelize(fusion.db, fusion.user, fusion.passwd, {
        dialect: 'mysql',
        host: fusion.host,
        logging: null,
    });

    var result = await fusionDb.query('select id, name from countries', {type: Sequelize.QueryTypes.SELECT});
    return result
}

module.exports = {
    getCountries,
    getProductionsByYearCountry
}
