let host = 'http://rapapi.org/mockjsdata/34221' //开发环境模拟接口

let url = {
    hotList: '/index/hotList',
    banner: '/index/banner'
}
for (key in url) {
    url[key] = host + url[key]
}

module.exports = url;