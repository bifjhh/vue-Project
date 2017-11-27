<!-- 整个项目的根组件 -->
<template>
        <!-- 页面结构 -->
    <div>
        <div v-if="isshow" id="back"><a @click="backto()" href="javascript:void(0)">返回</a></div>
        <!-- 使用mint-ui的header组件完成头部 -->
        <mt-header fixed title="vue项目"></mt-header>
	      <!-- 设置路由站位符 -->
        <router-view></router-view>

	<!-- 使用mui 完成底部选项卡 --> 
	<nav class="mui-bar mui-bar-tab">
		<router-link class="mui-tab-item" to="/home">
			<span class="mui-icon mui-icon-home"></span>
			<span class="mui-tab-label">首页</span>
		</router-link>
		<router-link class="mui-tab-item" to="/vip">
			<span class="mui-icon mui-icon-email"></span>
			<span class="mui-tab-label">会员</span>
		</router-link>
		<router-link class="mui-tab-item" to="/goodscar">
			<span class="mui-icon mui-icon-contact"><span id="badge" class="mui-badge">0</span></span>
			<span class="mui-tab-label">购物车</span>
		</router-link>
		<router-link class="mui-tab-item" to="/search">
			<span class="mui-icon mui-icon-gear"></span>
			<span class="mui-tab-label">搜索</span>
		</router-link>
	</nav>
    </div>
    <!-- 由于是vue2.0 所以这个里面一定要放一个根元素，可以放vue的指令 v- -->
</template>

<script>
import { bus } from "./kits/vm.js";
import { getgoodsObject } from "./kits/localSt.js";
// 本质上是一个vue组件

bus.$on("countstr", function(count) {
  var badegobj = document.querySelector("#badge");
  badegobj.innerText = parseInt(badegobj.innerText) + count;
});
export default {
  //es6导出对象的写法
  // data: function() {
  data() {
    return {
      isshow: false
    };
  },
  beforeCreate() {
    setTimeout(function() {
      var haha = getgoodsObject();
      var num = 0;
      for (var key in haha) {
        num += haha[key];
      }
      bus.$emit("countstr", num);
    }, 500);
  },
  methods: {
    backto() {
      this.$router.go(-1);
    }
  },
  watch:{
	  "$route":function (newroute,oldroute) {
		  if(newroute.path.toLowerCase()=="/home"){
			  this.isshow=false;
		  }else{
			  this.isshow=true;
		  }
	  }
  }
};
</script>
<style lang="less" scoped>
#back {
  position: absolute;
  z-index: 999;
  top: 0px;
  padding: 5px 10px 5px;
  a {
    line-height: 30px;
    font-size: 16px;
    color: #fff;
  }
}
</style>


