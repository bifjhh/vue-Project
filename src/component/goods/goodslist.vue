<template>
  <div class="temp">
        <mt-header fixed title="商品列表"></mt-header>
    <div class="mui-content" style="background-color:#fff">
		    <ul class="mui-table-view mui-grid-view">
		        <li v-for="v in list" :key="v.id"  class="mui-table-view-cell mui-media mui-col-xs-6">
		            <router-link v-bind="{to:'/goods/goodsinfo/' + v.id}">
		                <img class="mui-media-object" :src="v.img_url">
		                <div class="mui-media-body" v-text="v.title"></div>
                        <div class="desc">
                            <p>
                                <span>￥{{v.sell_price}}</span>
                                <s>￥{{v.market_price}}</s>
                            </p>
                            <p>
                                <h6 class="left">热卖中</h6>
                                <h6 class="right">剩余件{{v.stock_quantity}}</h6>
                            </p>
                        </div>
                    </router-link>
                </li>
		    </ul>    
		</div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import common from "../../kits/common.js";
export default {
    data(){
        return{
            list:[],
            page:1,
        }
    },
    created(){
        this.getList();
    },
    methods:{
        getList(page){
            page=page||1;
            var url = common.apidomain+"/api/getgoods?pageindex="+page;
            this.$http.get(url).then(function (res) {
                if (res.body.status != 0) {
                //   判断数据是否正常，否的话则阻断之后的函数运行
                    Toast({
                        message: "获取内容出错",
                        position: "bottom",
                        duration: 2000
                    });
                    return;
                }
                this.list=res.body.message;
            });
        }
    }
};
</script>
<style lang="less" scoped>
.mui-content {
  > .mui-table-view:first-child {
    margin-top: 0px;
    padding:15px 5px;
    // padding-top: 10px;
  }
  li {
    border: 1px solid rgba(0, 0, 0, 0.3);
    // box-shadow: 0 0 4px #000;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    > a {
      padding-left: 0;
    }
    .mui-media-body {
      color: #0094ff;
    }
    .desc {
      height: 60px;
      background-color: rgba(0, 0, 0, 0.1);
      margin-top: 10px;
      padding: 5px;
      text-align: left;
      span {
        color: red;
        margin-right: 15px;
      }
      a {
        padding-left: 0px;
        margin-left: 0px;
      }
      .right {
        position: absolute;
        right: 10px;
        bottom: 15px;
      }
      .left {
        position: absolute;
        left: 10px;
        bottom: 15px;
      }
    }
  }
/*   li:nth-of-type(1n){
      border-left:none;
  } */
}
.mui-table-view.mui-grid-view .mui-table-view-cell{
        margin-right: 0px;
}
.mui-table-view:before,.mui-table-view:after{
    height: 0;
}
</style>


