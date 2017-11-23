<template lang="html">
    <div class="temp">
        <!-- 轮播图 -->
        <mt-swipe :auto="3000">
            <!-- <mt-swipe-item>1</mt-swipe-item> -->
            <mt-swipe-item v-for='v in list' :key="v.id">
                <!-- 因为直接使用差值表达式无法解析,所以使用v-bind进行绑定 -->
                <a :href="v.url"> <!-- 绑定a标签跳转链接 -->
                    <img :src="v.img"><!-- 绑定图片属性 -->
                </a>
            </mt-swipe-item>
           
        </mt-swipe>
        <!-- 九宫格 -->
        <div class="mui-content">
          <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/news/newslist">
              <span class="mui-icon mui-icon-home"></span>
              <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/photo/photolist">
              <span class="mui-icon mui-icon-email"><!-- <span class="mui-badge">5</span> --></span>
              <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/news/newslist">
              <span class="mui-icon mui-icon-chatbubble"></span>
              <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/news/newslist">
              <span class="mui-icon mui-icon-location"></span>
              <div class="mui-media-body">留言反馈</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/news/newslist">
              <span class="mui-icon mui-icon-search"></span>
              <div class="mui-media-body">视频专区</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
              <router-link to="/news/newslist">
              <span class="mui-icon mui-icon-phone"></span>
              <div class="mui-media-body">联系我们</div>
              </router-link>
            </li>
          </ul> 
		    </div>
    </div>
</template>

<script>
// 引入mint-ui的消息提示框
import { Toast } from "mint-ui";
import common from "../kits/common.js";

export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getImg();
  },
  methods: {
    getImg() {
      var url = common.apidomain+"/api/getlunbo";
      this.$http.get(url).then(function(res) {
        var data = res.body;
        if (data.status != 0) {
          //   判断数据是否正常，否的话则阻断之后的函数运行
          Toast("提示信息");
          return;
        }
        //   数据正常则 给list 赋值
        this.list = data.message;
      });
    }
  }
};
</script>
<style lang="css" scoped>
.mint-swipe {
  height: 300px;
  width: 100%;
}
.mint-swipe-item,
.mint-swipe-item a,
.mint-swipe-item a img {
  display: block;
  width: 100%;
  height: 100%; 
}
/* 修改九宫格的背景色 */
.mui-table-view.mui-grid-view {
  background-color: #fff;
  padding: 0;
}
/* 清除内部分隔边框 */
.mui-table-view.mui-grid-view > li {
  border: none;
}
/* 修改图标样式 共同部分*/
.mui-table-view.mui-grid-view > li span::before {
  content: "";
  display: inline-block;
  width: 50px;
  height: 50px;
}
/* 修改图片路径 */
.mui-table-view.mui-grid-view > li:nth-of-type(1) span::before {
  background: url(../../static/imgs/1.png);
  background-size: 100% 100%;
}
.mui-table-view.mui-grid-view > li:nth-of-type(2) span::before {
  background: url(../../static/imgs/2.png);
  background-size: 100% 100%;
}
.mui-table-view.mui-grid-view > li:nth-of-type(3) span::before {
  background: url(../../static/imgs/3.png);
  background-size: 100% 100%;
}
.mui-table-view.mui-grid-view > li:nth-of-type(4) span::before {
  background: url(../../static/imgs/4.png);
  background-size: 100% 100%;
}
.mui-table-view.mui-grid-view > li:nth-of-type(5) span::before {
  background: url(../../static/imgs/5.png);
  background-size: 100% 100%;
}
.mui-table-view.mui-grid-view > li:nth-of-type(6) span::before {
  background: url(../../static/imgs/6.png);
  background-size: 100% 100%;
}
</style>
