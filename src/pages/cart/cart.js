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
        editingIndex: -1
    },
    methods: {
        getCartList() {
            axios.post(url.cartList).then(res => {
                let list = res.data.cartList
                list.forEach(shop => {
                    shop.checked = true
                    shop.editing = false
                    shop.statusMsg = '编辑'
                    shop.removeChecked =false
                    shop.goodsList.forEach(good => {
                        good.checked = true
                        good.removeChecked = false                        
                    })
                })
                this.cartList = list
            })
        },
        goodcheck(shop, good) {
            good.checked = !good.checked
            shop.checked = shop.goodsList.every(good => {
                return good.checked
            })
        },
        shopcheck(shop) {
            shop.checked = !shop.checked
            shop.goodsList.forEach(good => {
                good.checked = shop.checked
            })
        },
        selectAll() {
            this.allChecked = !this.allChecked
        },
        editing(shop, shopIndex) {
            shop.editing = !shop.editing
            this.editingShop = shop.editing?shop:null
            this.editingIndex = shop.editing?shopIndex:-1
            shop.statusMsg = shop.editing ? '完成' : '编辑'
            this.cartList.forEach((item, i) => {
                if(i !== shopIndex){
                    item.editing = false
                    item.statusMsg = shop.editing ? '' :'编辑'
                }
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
            return []
        },
        removeList(){

        }
    },
    created() {
        this.getCartList()
    }

})