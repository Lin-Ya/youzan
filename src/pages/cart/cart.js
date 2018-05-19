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
                    shop.goodsList.forEach(good=>{
                        good.checked = false
                    })
                })
                this.cartList = list
            })
        },
        check(obj){
            obj.checked = !obj.checked
        }
    },
    mixins: [mixin],
    computed: {

    },
    created() {
        this.getCartList()
    }

})