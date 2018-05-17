import 'css/common.css'
import './search.css'
import url from 'js/api.js'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import mixin from 'js/mixin.js'

let { id, keyword } = qs.parse(location.search.substr(1))
new Vue({
    el: '.container',
    data: {
        searchList : null,
        id,
        keyword
    },
    created(){
        this.getList()
    },
    methods: {
        getList(){
            axios.post(url.search,{id,keyword}).then( res =>{
                this.searchList = res.data.lists
                console.log(this.searchList)
            })
        }
    },
    mixins: [mixin]
})