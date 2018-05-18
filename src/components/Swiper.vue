<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for="list in lists" :key="list">
                <a class="js-no-follow" :href="list.clickUrl">
                    <img class="goods-main-photo fadeIn" :src="list.image">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
import Swiper from "swiper";
import 'swiper/dist/css/swiper.css'
export default {
    name: 'swiper',
    props: {
        lists: {
            type: Array,
            required: true
        }
    },
    mounted(){
        this.initSwiper()        
    },
    methods: {
        initSwiper(){
            let mySwiper = new Swiper('.swiper-container',{
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                },
            }) 
        }
    }
};
</script>

<style>
.swiper-slide img{
    height: 100%;
    width: 100%;
}
</style>
