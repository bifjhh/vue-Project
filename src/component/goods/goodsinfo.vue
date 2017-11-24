<template>
  <div class="temp">
        <mt-header fixed title="详情信息">
            <router-link to="/goods/goodslist" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- 轮播图 -->
        <swipe :imgs="imgs"></swipe>  
        <div class="price">
            <h4>{{info.title}}</h4>
            <hr>
            <ul>
                <li>市场价：<s>￥{{info.market_price}}</s>销售价：<span>￥{{info.sell_price}}</span></li>
                <li>购买数量：
                    <div class="number">
                        <span @click="minus()">-</span>
                        <span v-text="price"></span>
                        <span @click="add()">+</span>
                    </div>
                </li>
                <li>
                    <mt-button type="danger">立即购买</mt-button>
                    <mt-button type="primary">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <div class="Param">
            <h4>商品详情</h4>
            <hr>
            <ul>
                <li>商品货号：{{info.goods_no}}</li>
                <li>库存情况：{{info.stock_quantity}}</li>
                <li>上架时间：{{info.add_time |datefmt('YYYY-MM-DD HH:mm:ss')}}</li>
            </ul>
        </div>
        <div class="other">
            <mt-button type="primary" size="large">图文详情</mt-button>
            <mt-button type="danger" size="large">商品评论</mt-button>
        </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import common from "../../kits/common.js";
import swipe from "../subcom/swipe.vue";
export default {
  components: {
    swipe
  },
  data() {
    return {
      id: 0,
      info: {},
      price: 1,
      imgs: []
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getInfo();
    this.getImgs();
  },
  methods: {
    //  获取轮播图数据
    getImgs() {
      var url = common.apidomain + "/api/getthumimages/" + this.id;
      this.$http.get(url).then(function(res) {
        if (res.body.status != 0) {
          //   判断数据是否正常，否的话则阻断之后的函数运行
          Toast({
            message: "获取内容出错",
            position: "bottom",
            duration: 2000
          });
          return;
        }
        this.imgs = res.body.message;
      });
    },
    //   获取数据
    getInfo() {
      var url = common.apidomain + "/api/goods/getinfo/" + this.id;
      this.$http.get(url).then(function(res) {
        if (res.body.status != 0) {
          //   判断数据是否正常，否的话则阻断之后的函数运行
          Toast({
            message: "获取内容出错",
            position: "bottom",
            duration: 2000
          });
          return;
        }
        this.info = res.body.message[0];
      });
    },
    // 数量-1
    minus() {
      if (this.price <= 1) {
        Toast({
          message: "再减就没有了",
          position: "bottom",
          duration: 2000
        });
        return;
      }
      this.price -= 1;
    },
    // 数量+1
    add() {
      this.price += 1;
    }
  }
};
</script>
<style lang="less" scoped>
/* .mint-swipe,
.mint-swipe-items-wrap {
  width: 100%;
  height: 300px;
  .mint-swipe-item {
    width: 100%;
    height: 100%;
    background-color: #ccc;
  }
}
 */
.price {
  s {
    margin-right: 20px;
  }
  li:nth-of-type(2) {
    position: relative;
  }
  .number {
    position: absolute;
    left: 100px;
    top: 6px;
    span {
      display: inline-block;
      text-align: center;
      width: 40px;
      line-height: 25px;
      border: 1px solid #000;
    }
  }
}
.mint-button--primary {
  margin-bottom: 20px;
}
.price,
.Param,
.other {
  padding: 5px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  ul {
    padding-left: 0;
    li {
      list-style: none;
      padding: 8px;
    }
  }
}
</style>

