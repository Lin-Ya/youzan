import './index.css'
import 'css/common.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import Foot from 'components/Foot.vue'

//引入mint-ui使用无限滚动
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

let app = new Vue({
    el: '#app',
    data: {
        lists: null,
        pageNum: 1,
        pageSize: 6,
        loading: false,
        listsEnd: false
    },
    comments: {
        Foot
    },
    created() {
        this.getLists()
    },
    methods: {
        getLists() {
            if (this.loading) {
                return
            } else if (this.listsEnd) {
                return
            }
            this.loading = true
            axios.post(url.hotList, {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then((res) => {
                if (this.lists) {
                    let currentLists = res.data.lists
                    this.lists = this.lists.concat(currentLists)
                    //如果返回的条目小于预设的每页条数，说明已经到了数据库的底部了
                    if (currentLists.length < this.pageSize) {
                        this.listsEnd = true
                    }
                } else {
                    //初次加载的时候，会来到这里
                    this.lists = res.data.lists
                }
                this.loading = false
                this.pageNum++
            }, (err) => {
                console.log(err)
            })

        }
    }

})