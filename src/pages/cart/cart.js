import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import Foot from 'components/Foot.vue'
import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'
import Cart from 'js/CartService.js'

new Vue({
    el: '.container',
    data: {
        cartList: null,
        total: 0,
        editingShop: null,
        editingIndex: -1,
        removeTips: false,
        removeData: null,
        removeMsg: ''
    },
    methods: {
        getCartList() {
            Cart.getCartList().then(res => {
                let list = res.data.cartList
                list.forEach(shop => {
                    shop.checked = true
                    shop.removeChecked = false
                    shop.editing = false
                    shop.statusMsg = '编辑'
                    shop.goodsList.forEach(good => {
                        good.checked = true
                        good.removeChecked = false
                    })
                })
                this.cartList = list
            })
        },
        goodcheck(shop, shopIndex, good) {
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            if (this.editingShop && shopIndex !== this.editingIndex) {
                return false
            }
            good[attr] = !good[attr]
            shop[attr] = shop.goodsList.every(good => {
                return good[attr]
            })
        },
        shopcheck(shop, shopIndex) {
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            if (this.editingShop && shopIndex !== this.editingIndex) {
                return false
            }
            shop[attr] = !shop[attr]
            shop.goodsList.forEach(good => {
                good[attr] = shop[attr]
            })
        },
        selectAll() {
            let attr = this.editingShop ? 'allRemoveChecked' : 'allChecked'
            this[attr] = !this[attr]
        },
        editing(shop, shopIndex) {
            shop.editing = !shop.editing
            this.editingShop = shop.editing ? shop : null
            this.editingIndex = shop.editing ? shopIndex : -1
            shop.statusMsg = shop.editing ? '完成' : '编辑'
            this.cartList.forEach((item, i) => {
                if (i !== shopIndex) {
                    item.editing = false
                    item.statusMsg = shop.editing ? '' : '编辑'
                }
            })
        },
        singleDelete(shop, shopIndex, good, goodIndex) {
            this.removeTips = true
            this.removeData = { shop, shopIndex, good, goodIndex }
            this.removeMsg = '确定要删除该商品吗？'
        },
        multiDelete() {
            this.removeTips = true
            this.removeMsg = `确定将所选 ${this.removeLists.length} 个商品删除？`
        },
        deleteGoods() {
            if (this.removeMsg === '确定要删除该商品吗？') {
                let { shop, shopIndex, good, goodIndex } = this.removeData
                Cart.deleteGoods(good.id, null).then(res => {
                    shop.goodsList.splice(goodIndex, 1)
                    if (!shop.goodsList.length) {
                        this.deleteShop()
                    }
                    this.removeTips = false
                })
            } else {
                Cart.deleteGoods(null, this.removeLists).then(res => {
                    if (this.editingShop.goodsList.length === this.removeLists.length) {
                        this.deleteShop()
                    } else {
                        let _goodsList = []
                        this.editingShop.goodsList.forEach(good => {
                            if (!good.removeChecked) {
                                _goodsList.push(good)
                            }
                        })
                        this.cartList[this.editingIndex].goodsList = _goodsList
                    }
                    this.removeTips = false
                })
            }
        },
        deleteShop() {
            this.cartList.splice(this.editingIndex, 1)
            //把其他商铺的状态切换回来
            this.editingShop = null
            this.editingIndex = -1
            this.cartList.forEach(shop => {
                shop.statusMsg = '编辑'
                shop.editing = false
            })
        },
        add(good) {
            Cart.add(good).then(res => {
                good.number++
            })
        },
        reduce(good) {
            if (good.number === 1) { return }
            Cart.reduce(good).then(res => {
                good.number--
            })
        },
        start(e, good) {
            good.touchStart = e.changedTouches[0].clientX
        },
        end(e, shopIndex, good, goodIndex) {
            let target = this.$refs[`goods-${shopIndex}-${goodIndex}`]
            let touchEnd = e.changedTouches[0].clientX, left = ''
            if (good.touchStart - touchEnd > 50) {
                left = '-80px'
            } else if (good.touchStart - touchEnd < -50) {
                left = '0px'
            }
            Velocity(target, {
                left
            }) //模板字符串       
        }
    },
    mixins: [mixin],
    computed: {
        allChecked: {
            get() {
                if (this.cartList && this.cartList.length) {
                    return this.cartList.every(shop => {
                        return shop.checked
                    })
                }
                return false
            },
            set(val) {
                this.cartList.forEach(shop => {
                    shop.checked = val;
                    shop.goodsList.forEach(good => {
                        good.checked = val
                    })
                })
            }
        },
        allRemoveChecked: {
            get() {
                if (this.editingShop) {
                    return this.editingShop.removeChecked
                }
                return false
            },
            set(val) {
                this.editingShop.removeChecked = val
                this.editingShop.goodsList.forEach(good => {
                    good.removeChecked = val
                })
            }
        },
        selectLists() {
            if (this.cartList && this.cartList.length) {
                let arr = []
                let total = 0
                this.cartList.forEach(shop => {
                    shop.goodsList.forEach(good => {
                        if (good.checked) {
                            arr.push(good)
                            total += good.price * good.number
                        }
                    })
                })
                this.total = total
                return arr
            }
            this.total = 0
            return []
        },
        removeLists() {
            if (this.editingShop) {
                let arr = []
                this.editingShop.goodsList.forEach(good => {
                    if (good.removeChecked) {
                        arr.push(good)
                    }
                })
                return arr
            } else if (this.cartList) {
                this.cartList.forEach(shop => {
                    shop.removeChecked = false
                    shop.goodsList.forEach(good => {
                        good.removeChecked = false
                    })
                })
            }
            return []
        }
    },
    created() {
        this.getCartList()
    }

})