<template>
  <div id="shopbox">
    <p>{{msg}}</p>
    <div id="header">
      <ul>
        <li id="shopMSG">商品信息</li>
        <li class="cartMsg" v-for="i in lists" :key="i.id">
          {{i.name}}
        </li>
      </ul>
    </div>
    <div id="shopContent">
      <ul>
        <li class="shopLi" v-for="i in shopList" :key="i.productId">
          <div id="shopLiName">
            {{i.productName}}
          </div>
          <div class="shopLiMsg">{{i.productPrice}}</div>
          <div class="shopLiMsg">
            <Button type="text" size="small" icon="ios-remove" style="width:20%;" @click="i.productQuentity -= 1" v-show="shopCount1"></Button>
            {{i.productQuentity}}
            <Button type="text" size="small" icon="md-add" style="width:20%;" @click="i.productQuentity += 1"></Button>
          </div>
          <div class="shopLiMsg">{{i.productPrice * i.productQuentity}}</div>
          <div class="shopLiMsg">
            <Button type="text" size="large" icon="ios-trash"></Button>
          </div>
        </li>
      </ul>
    </div>
    <div id="shopDiv" :model="shopSum">总金额：{{shopSum}}</div>
  </div>
</template>

<style scoped>
  @import url('../assets/css/style.css');
</style>

<script>
export default {
  data () {
    return {
      msg: '购物车',
      lists: [
        {id: 1, name: '商品金额'},
        {id: 2, name: '商品数量'},
        {id: 3, name: '总金额'},
        {id: 4, name: '状态编辑'}
      ],
      shopList: [],
      shopSum: 0,
      productQuentity: 1,
      shopCount: true
    }
  },
  mounted: function () {
    this.cartView()
  },
  methods: {
    cartView () {
      this.$http.get("../static/shopdata/cartData.json").then(r => {
        this.shopList = r.body.result.list;
      },e => {
        console.log('获取数据失败，请刷新页面')
      })
    },
    shopCount1 () {
      if (this.shopList.productQuentity == 0) {
        alert(2)
        this.shopCount = false
      }
    }
  }
}
</script>
