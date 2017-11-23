import Vue from 'vue'; //类似于script导入vue核心包
import App from "./APP.vue"; //导入App.vue的vue对象
// 利用Vue对象进行解析渲染
import VueRouter from 'vue-router'; //导入vue路由的依赖包
Vue.use(VueRouter); //在vue中使用路由
// 导入vue组件
import home from './component/home.vue';//首页组件
import vip from './component/shopcar/vip.vue';//会员组件
import search from './component/shopcar/search.vue';//搜索组件
import goods from './component/shopcar/goods.vue';//购物车组件
import newslist from './component/news/newslist.vue';//新闻列表组件
import newsdetails from './component/news/newsdetails.vue';//新闻详情页组件
import photolist from './component/photo/photolist.vue';//图片分享组件
import photoinfo from './component/photo/photoinfo.vue';//图片详情组件


// 定义路由规则
var router = new VueRouter({
    // 改变路由激活时的class
    linkActiveClass: 'mui-active',
    routes: [
        {path: '/',redirect: '/home'},//自动跳转到首页路由
        {path: '/home',component: home,},//首页路由
        {path: '/vip',component: vip,},//会员路由
        {path: '/search',component: search,},//搜索路由
        {path: '/goods',component: goods,},//购物车路由
        {path: '/news/newslist',component: newslist,},//新闻列表路由
        {path: '/news/newsdetails/:id',component: newsdetails,},//新闻详情页组件
        {path: '/photo/photolist', component: photolist,},//图片分享路由
        {path: '/photo/photoinfo/:id', component: photoinfo,},//图片详情路由
    ]
});

import VueResource from 'vue-resource';// 引入vue-resource 并使用
Vue.use(VueResource);
import mintui from 'mint-ui';// 引入mint-ui 组件包
Vue.use(mintui);
import 'mint-ui/lib/style.min.css';//  导入mint-ui 样式
import '../static/mui/css/mui.css';// 引入mui
import '../static/css/site.less'// 引入全局 css
import moment from 'moment';// 引入 momentjs
Vue.filter('datefmt', function (input, fmtstring) {
    return moment(input).format(fmtstring);
});//自定义全局过滤器（过滤时间）

// 实例化vue对象并接管id=app 的div 元素上
new Vue({
    el: '#app',
    // render:function(create){create(App);}  //es5语法
    render: c => c(App), //es6的函数写法 =>：goes to 
    router: router, //可以使用ES6简写， 只写一个 router
});