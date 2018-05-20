import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import Foot from 'components/Foot.vue'
import mixin from 'js/mixin.js'

new Vue({
    el: '.container',
    data: {
        cartList: null,
        total: 0,
        editingShop: null,
        editingIndex: -1,
        removeTips: false,
        removeDate: null
    },
    methods: {
        getCartList() {
            axios.post(url.cartList).then(res => {
                let list = res.data.cartList
                list.forEach(shop => {
                    shop.checked = true
                    shop.removeChecked = false
                    shop.editing = false
                    shop.statusMsg = '编辑'
                    shop.goodsList.forEach(good => {
                        good.checked = true
                        good.removeChecked = false
                    })
                })
                this.cartList = list
            })
        },
        goodcheck(shop, shopIndex, good) {
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            if (this.editingShop && shopIndex !== this.editingIndex) {
                return false
            }
            good[attr] = !good[attr]
            shop[attr] = shop.goodsList.every(good => {
                return good[attr]
            })
        },
        shopcheck(shop, shopIndex) {
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            if (this.editingShop && shopIndex !== this.editingIndex) {
                return false
            }
            shop[attr] = !shop[attr]
            shop.goodsList.forEach(good => {
                good[attr] = shop[attr]
            })
        },
        selectAll() {
            let attr = this.editingShop ? 'allRemoveChecked' : 'allChecked'
            this[attr] = !this[attr]
        },
        editing(shop, shopIndex) {
            shop.editing = !shop.editing
            this.editingShop = shop.editing ? shop : null
            this.editingIndex = shop.editing ? shopIndex : -1
            shop.statusMsg = shop.editing ? '完成' : '编辑'
            this.cartList.forEach((item, i) => {
                if (i !== shopIndex) {
                    item.editing = false
                    item.statusMsg = shop.editing ? '' : '编辑'
                }
            })
        },
        showDelete(shop, shopIndex, good, goodIndex) {
            this.removeTips = true
            this.removeDate = { shop, shopIndex, good, goodIndex}
        },
        deleteGoods(){
            let {shop,shopIndex,good,goodIndex} = this.removeDate
            axios.post(url.delete,{
                id: good.id
            }).then(res=>{
                shop.goodsList.splice(goodIndex,1)
                if(!shop.goodsList.length){
                    this.deleteShop(shopIndex)
                }
                this.removeTips = false
            })
        },
        deleteShop(shopIndex){
            this.cartList.splice(shopIndex,1)
            //把其他商铺的状态切换回来
            this.editingShop = null
            this.editingIndex = -1
            this.cartList.forEach(shop=>{
                shop.statusMsg = '编辑'
                shop.editing = false
            })
        },
        add(good) {
            axios.post(url.cartAdd, {
                id: good.id,
                number: 1
            }).then(res => {
                good.number++
            })
        },
        reduce(good) {
            if(good.number ===1){return}
            axios.post(url.cartReduce, {
                id: good.id,
                nuber: -1
            }).then(res=>{
                good.number--
            })
        }
    },
    mixins: [mixin],
    computed: {
        allChecked: {
            get() {
                if (this.cartList && this.cartList.length) {
                    return this.cartList.every(shop => {
                        return shop.checked
                    })
                }
                return false
            },
            set(val) {
                this.cartList.forEach(shop => {
                    shop.checked = val;
                    shop.goodsList.forEach(good => {
                        good.checked = val
                    })
                })
            }
        },
        allRemoveChecked: {
            get() {
                if (this.editingShop) {
                    return this.editingShop.removeChecked
                }
                return false
            },
            set(val) {
                this.editingShop.removeChecked = val
                this.editingShop.goodsList.forEach(good => {
                    good.removeChecked = val
                })
            }
        },
        selectLists() {
            if (this.cartList && this.cartList.length) {
                let arr = []
                let total = 0
                this.cartList.forEach(shop => {
                    shop.goodsList.forEach(good => {
                        if (good.checked) {
                            arr.push(good)
                            total += good.price * good.number
                        }
                    })
                })
                this.total = total
                return arr
            }
            this.total = 0
            return []
        },
        removeLists() {
            if (this.editingShop) {
                let arr = []
                this.editingShop.goodsList.forEach(good => {
                    if (good.removeChecked) {
                        arr.push(good)
                    }
                })
                return arr
            }
            return []
        }
    },
    created() {
        this.getCartList()
    }

})