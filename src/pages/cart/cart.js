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
        cartList: null
    },
    methods: {
        getCartList() {
            axios.post(url.cartList).then(res => {
                this.cartList = res.data.cartList
            })
        }
    },
    mixins: [mixin],
    computed: {

    },
    created() {
        this.getCartList()
    }

})