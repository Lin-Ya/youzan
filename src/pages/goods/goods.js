import "./goods_common.css"
import "./goods_custom.css"
import "./goods.css"
import "./goods_theme.css"
import "./goods_mars.css"
import "./goods_sku.css"

import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import url from 'js/api'
import mixin from 'js/mixin.js'

new Vue({
    el: '#app',
    data: {
        details: null
    },
    created(){

    },
    methods: {

    },
    mixins: [mixin]
})