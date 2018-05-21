import url from 'js/api.js'
import fetch from 'js/fetch.js'


class Cart {
    static add(good) {
        //返回一个promise对象，将来即可在调用的时候由调用者处理结果
        return fetch(url.addCart, {
            id: good.id,
            number: 1
        })
    }
}

export default Cart