<template>
    <div class="container " style="min-height: 597px;">
        <div class="section section-first">
            <div class="block form js-form">
            <input class="js-id" name="id" type="hidden" value="">
            <div class="block-item" style="border-top:0;">
                <label>收货人</label>
                <input type="text" placeholder="请输入姓名" name="user_name" v-model.trim="name" maxlength="20">
            </div>
            <div class="block-item">
                <label>联系电话</label>
                <input type="tel" placeholder="联系电话" name="tel" v-model.trim="tel" maxlength="11">
            </div>
            <div class="block-item">
                <label>选择地区</label>
                <div class="select-group">
                <select class="js-province-selector" v-model="provinceValue">
                    <option value="-1">选择省份</option>
                    <option :value="p.value" v-for="p in addressData.list">{{p.label}}</option>
                </select>
                <select class="js-city-selector" v-model="cityValue">
                    <option value="-1">选择城市</option>
                    <option :value="c.value" v-for="c in cityList">{{c.label}}</option>
                </select>
                <select class="js-county-selector" v-model="districtValue">
                    <option value="-1">选择地区</option>
                    <option :value="d.value" v-for="d in districtList">{{d.label}}</option>                    
                </select>
                </div>
            </div>
            <div class="block-item">
                <label>详细地址</label>
                <input type="text" placeholder="街道门牌信息" name="address_detail" v-model.trim="address" maxlength="100">
            </div>
            </div>
        </div>
        <div class="block section js-save block-control-btn" @click="add()">
            <div class="block-item c-blue center">保存</div>
        </div>
        <div class="block section js-delete block-control-btn" v-show="type === 'edit'" @click="remove()">
            <div class="block-item c-red center">删除</div>
        </div>
        <div class="block stick-bottom-row center js-save-default" v-show="type === 'edit'" @click="setDefault()">
            <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
        </div>
    </div>
</template>

<style scoped>
@import "./address_base.css";
@import "./address.css";
</style>

<script>
import Address from "js/addressService.js";
export default {
  data() {
    return {
      name: "",
      tel: "",
      provinceValue: -1,
      cityValue: -1,
      districtValue: -1,
      address: "",
      id: "",
      type: this.$route.query.type,
      instance: this.$route.query.instance,
      addressData: require("js/address.json"),
      cityList: null,
      districtList: null
    };
  },
  watch: {
    provinceValue(val) {
      if (this.provinceValue === -1) {
        return;
      }
      let list = this.addressData.list;
      let index = list.findIndex(item => {
        return item.value == val;
      });
      this.cityList = list[index].children;
      this.cityValue = -1;
      this.districtValue = -1;
      if (this.type === "edit") {
        this.cityValue = parseInt(this.instance.cityValue);
      }
    },
    cityValue(val) {
      if (this.cityValue == -1) {
        return;
      }
      let list = this.cityList;
      let index = list.findIndex(item => {
        return item.value == val;
      });
      this.districtList = list[index].children;
      this.districtValue = -1;
      if (this.type === "edit") {
        this.districtValue = parseInt(this.instance.districtValue);
      }
    }
  },
  methods: {
    add() {
      let {
        name,
        tel,
        provinceValue,
        cityValue,
        districtValue,
        address
      } = this;
      let data = {
        name,
        tel,
        provinceValue,
        cityValue,
        districtValue,
        address
      };
      if (this.check(data)) {
        if (this.type === "add") {
          Address.add(data).then(res => {
            this.$router.push({ name: "all" });
          });
        }
        if (this.type === "edit") {
          data.id = this.id;
          Address.update(data).then(res => {
            this.$router.push({ name: "all" });
          });
        }
      } else {
        alert("提交内容不能为空，请重新检查");
      }
    },
    remove() {
      if (window.confirm("确认删除？")) {
        Address.remove(this.id).then(res => {
          this.$router.push({ name: "all" });
        });
      }
    },
    setDefault() {
      let {
        name,
        tel,
        provinceValue,
        cityValue,
        districtValue,
        address,
        id
      } = this;
      let data = {
        id,
        name,
        tel,
        provinceValue,
        cityValue,
        districtValue,
        address
      };
      if (this.check(data)) {
        Address.setDefault(data).then(res => {
          this.$router.push({ name: "all" });
        });
      }
    },
    check(obj) {
      let onoff = true;
      for (key in obj) {
        if (obj[key].length < 1) {
          onoff = false;
        }
      }
      return onoff;
    }
  },
  created() {
    if (this.type === "edit") {
      let ad = this.instance;
      this.name = ad.name;
      this.id = ad.id;
      this.tel = ad.tel;
      this.address = ad.address;
      this.provinceValue = parseInt(ad.provinceValue);
    }
  }
};
</script>

