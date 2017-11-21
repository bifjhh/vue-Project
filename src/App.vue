<!-- 整个项目的根组件 -->
<template>
        <!-- 页面结构 -->
    <div>
        <!-- 使用mint-ui的header组件完成头部 -->
        <mt-header fixed title="vue项目"></mt-header>
	<!-- 设置路由站位符 -->
        <router-view></router-view>

	<!-- 使用mui 完成底部选项卡 --> 
	<nav class="mui-bar mui-bar-tab">
		<router-link class="mui-tab-item mui-active" to="/home">
			<span class="mui-icon mui-icon-home"></span>
			<span class="mui-tab-label">首页</span>
		</router-link>
		<router-link class="mui-tab-item" to="/vip">
			<span class="mui-icon mui-icon-email"></span>
			<span class="mui-tab-label">会员</span>
		</router-link>
		<router-link class="mui-tab-item" to="/goods">
			<span class="mui-icon mui-icon-contact"><span class="mui-badge">0</span></span>
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
// 本质上是一个vue组件
export default {
  //es6导出对象的写法
  // data: function() {
  data() {
    //es6写法 等价于data: function() {}
    return {
 
    };
  }
};
</script>
<style scoped>
/* scope的含义 代表此处的css文件只能够在当前vue文件中使用有效 */
</style>

