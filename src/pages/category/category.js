import 'css/common.css'
import './category.css'

import url from 'js/api.js'
import Vue from 'vue'
import Foot from 'components/Foot.vue'
import axios from 'axios'

new Vue({
    el: '#app',
    data: {
        topList: null,
        subList: null,
        brandList: null,
        categoryList: null,
        rank: null,
        currentIndex: 0
    },
    components: {
        Foot
    },
    created() {
        this.getTopList()
        this.getSubList(-1)
    },
    methods: {
        getTopList() {
            axios.get(url.topList).then((res) => {

                this.topList = res.data.lists
            })
        },
        switchTab(id,index) {
            this.currentIndex = index
            this.getSubList(id)
        },
        getSubList(id) {
            if(id === -1){
                axios.post(url.rank).then((res)=>{
                    this.rank = res.data.data
                })
            }else {
                axios.post(url.subList, {
                    id
                }).then((res) => {
                    let subList = res.data.data
                    this.brandList = subList.brandList
                    this.categoryList = subList.categoryList
                    this.subList = subList
                })
            }
        },
    }
})