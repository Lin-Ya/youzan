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
        editing: false
    },
    methods: {
        getCartList() {
            axios.post(url.cartList).then(res => {
                let list = res.data.cartList
                list.forEach(shop=>{
                    shop.checked = true
                    shop.goodsList.forEach(good=>{
                        good.checked = true
                    })
                })
                this.cartList = list
            })
        },
        goodcheck(shop,good){
            good.checked = !good.checked
            shop.checked = shop.goodsList.every(good=>{
                return good.checked
            })
        },
        shopcheck(shop){
            shop.checked = !shop.checked
            shop.goodsList.forEach(good=>{
                good.checked = !good.checked                
            })
        },
        selectAll(){
            this.allChecked = !this.allChecked
        }
    },
    mixins: [mixin],
    computed: {
        allChecked: {
            get() {
                if(this.cartList&&this.cartList.length){
                    return this.cartList.every(shop=>{
                        return shop.checked
                    })
                }
                return false
            },
            set(val) {
                this.cartList.forEach(shop=>{
                    shop.checked = val;
                    shop.goodsList.forEach(good=>{
                        good.checked = val
                    })
                })
            }
        }
    },
    created() {
        this.getCartList()
    }

})