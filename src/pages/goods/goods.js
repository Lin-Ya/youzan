import "./goods_common.css"
import "./goods_custom.css"
import "./goods.css"
import "./goods_theme.css"
import "./goods_mars.css"
import "./goods_sku.css"
import "./goods_transition.css"

import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import url from 'js/api'
import mixin from 'js/mixin.js'
import Swiper from 'components/Swiper.vue'

let id = qs.parse(location.search.substr(1));
let taber = ['商品详情', '本店成交']
new Vue({
    el: '#app',
    data: {
        details: null,
        dealLists: null,
        id,
        taber,
        tabIndex: 0,
        bannerLists: null,
        skuType: 0,
        showSku: false,
        skuNum: 0,
        buyNum: 1
    },
    components: {
        Swiper
    },
    created() {
        this.getDetails(id)
    },
    methods: {
        getDetails(id) {
            axios.post(url.details, { id }).then(res => {
                this.details = res.data.data
                this.bannerLists = []
                this.details.imgs.forEach(item => {
                    let a = {}
                    a.clickUrl = ''
                    a.image = item
                    this.bannerLists.push(a)
                })
            })
        },
        changeIndex(index) {
            this.tabIndex = index
            if (index) {
                this.getDealLists(id)
            }
        },
        getDealLists(id) {
            axios.post(url.dealLists, { id }).then(res => {
                this.dealLists = res.data.data
            })
        },
        chooseSku(num) {
            this.showSku = true
            this.skuNum = num
        },
        setBuyNum(num){
            if(num<0&&this.buyNum===1){return}
            this.buyNum = Number.parseInt(this.buyNum) + num
        }
    },
    watch: {
        showSku(val) {
            document.body.style.overflow = val ? 'hidden' : 'auto'
            document.body.style.height = val ? '100%' : 'auto'
            document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
            document.querySelector('html').style.height = val ? '100%' : 'auto'
        }
    },
    mixins: [mixin]
})