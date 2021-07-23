'use strict';

const {MongoClient} = require('mongodb');
const mongoConnectionString = 'mongodb://localhost:27017';
const mongoConnectionDb = 'demo';
const mongoConnectionCollection = 'boxoffice-combined';
const client = new MongoClient(mongoConnectionString);
let db;
let collection;
let mapper = require('jsonpathmap');

const _myTargetStructure = {
    count: '#[*]',
    list: [
        {
            rank: '$[*].rank',
            rankInten: '$[*].rankInten',
            movieCd: '$[*].movieCd',
            movieNm: '$[*].movieNm',
            movieNmEn: '$[*].movieNmEn',
            openDt: '$[*].openDt'
        }
    ]
};

const _myTargetStructureWithDetail = {
    count: '#[*]',
    list: [
        {
            rank: '$[*].rank',
            rankInten: '$[*].rankInten',
            movieCd: '$[*].movieCd',
            movieNm: '$[*].movieNm',
            movieNmEn: '$[*].movieNmEn',
            openDt: '$[*].openDt',
            nations: '$[*].nations',
            genres: '$[*].genres',
            actors: '$[*].actors',
            directors: '$[*].directors',
            staffs: '$[*].staffs',
            showTypes: '$[*].showTypes',
            audits: '$[*].audits'
        }
    ]
};

const projectionNoDetail = {
    _id: 0,
    rnum: 1,
    rank: 1,
    rankInten: 1,
    rankOldAndNew: 1,
    movieCd: 1,
    movieNm: 1,
    movieNmEn: 1,
    movieNmOrg: 1,
    openDt: 1
};
const projectionDetail = {
    _id: 0
}

const query = {};
const sort = {rank: 1};

///////////////////////////////////////////////////////////////////////////////////////////////////
exports.init = function ()
{
    return new Promise(async function (resolve, reject)
    {
        await client.connect();
        db = client.db(mongoConnectionDb);
        collection = db.collection(mongoConnectionCollection);
        resolve(collection);
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 주간 박스오피스 영화 목록
 * 주간 박스 오피스 영화 목록을 추출한다. 호출 설정에 따라 상세 내역의 포함 여부가 결정된다.
 *
 * isDetailRequired String 상세 데이타를 포함하는지 여부 (y:포함, n:미포함) - 기본값 = n  (optional)
 * returns boxoffice
 **/
exports.getBoxoffice = function (isDetailRequired)
{
    return new Promise(async function (resolve, reject)
    {
        let projection = ((isDetailRequired === 'y') ? projectionDetail : projectionNoDetail);
        let resultObject = await getItem(query, sort, projection); // MongoDB Query
        let response = mapItem(isDetailRequired, resultObject); // Map response
        resolve(response);
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////
async function getItem(query, sort, projection)
{
    return await collection.find(query).sort(sort).project(projection).toArray();
}

///////////////////////////////////////////////////////////////////////////////////////////////////
function mapItem(isDetailRequired, sourceData)
{
    let resultObj;

    if(isDetailRequired === 'y')
    {
        resultObj = mapper.engine.jsonpathmap(_myTargetStructureWithDetail, sourceData);
    }
    else
    {
        resultObj = mapper.engine.jsonpathmap(_myTargetStructure, sourceData);
    }
    return resultObj;
}