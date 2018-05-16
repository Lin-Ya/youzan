import './index.css'
import 'css/common.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

let app = new Vue({
    el: '#app',
    data: {
        lists: null
    },
    created() {
        axios.post(url.hotList, {
            pageNum: 1,
            pageSize: 6
        }).then((res) => {
            console.log(res)
            this.lists = res.data.lists
        }, (err) => {
            console.log(err)
        })
    }
})