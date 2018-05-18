let host = 'http://rapapi.org/mockjsdata/34221' //开发环境模拟接口

let url = {
    hotList: '/index/hotList',
    banner: '/index/banner',
    topList: '/category/topList',
    subList: '/category/subList',
    rank: '/category/rank',
    search: '/search/list',
    details: '/goods/details',
    dealLists: '/goods/deal',
    addCart: '/cart/add'
}
for (key in url) {
    url[key] = host + url[key]
}

module.exports = url;