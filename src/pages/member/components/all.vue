<template>
  <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block" v-if="addressList">
      <a class="block-item js-address-item address-item"
        @click="toEdit(list)" 
        :class="{'address-item-default': list.isDefault}"
        v-for="list in addressList" 
        :key="list.id">
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <a class="address-edit">修改</a>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" :to="{name: 'form',query: {type: 'add'}}" target="_self">
            新增地址
        </router-link>
    </div>
  </div>
</template>

<style scoped>
    @import './address_base.css';
    @import './address.css';
</style>

<script>
import Address from 'js/addressService.js'
export default {
    data(){
        return {
            addressList: null
        }
    },
    methods: {
        toEdit(list){
            //此为编程样导航
            //query是你要传递的参数，其中type用于判断点击来源，instance表示传递的一个实例
            this.$router.push({name:'form',query: {
                type: 'edit',
                instance: list
            }})
        },
        getList(){
            Address.list().then(res=>{
                this.addressList = res.data.list
            })
        }
    },
    created(){
        this.getList()
    }
}
</script>
