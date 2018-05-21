
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import Router from 'vue-router'
//1. 注册使用router 组件
Vue.use(Router)

let routes = [{
    path: '/',
    components: require('./components/member.vue')
},{
    path: '/adress',
    components: require('./components/address.vue')
}]

let router = new Router({
    routes
})
new Vue({
    el: '#app',
    router
    
})