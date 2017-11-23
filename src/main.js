import Vue from 'vue'; //类似于script导入vue核心包
import App from "./APP.vue"; //导入App.vue的vue对象
// 利用Vue对象进行解析渲染
import VueRouter from 'vue-router'; //导入vue路由的依赖包
Vue.use(VueRouter); //在vue中使用路由
// 导入vue组件
import home from './component/home.vue';
import vip from './component/shopcar/vip.vue';
import search from './component/shopcar/search.vue';
import goods from './component/shopcar/goods.vue';
import newslist from './component/news/newslist.vue';
import newsdetails from './component/news/newsdetails.vue';
// 定义路由规则
var router = new VueRouter({
    // 改变路由激活时的class
    linkActiveClass: 'mui-active',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: home,
        },
        {
            path: '/vip',
            component: vip,
        },
        {
            path: '/search',
            component: search,
        },
        {
            path: '/goods',
            component: goods,
        },
        {
            path: '/news/newslist',
            component: newslist,
        },
        {
            path: '/news/newsdetails/:id',
            component: newsdetails,
        },
    ]
})

// 引入vue-resource 并使用
import VueResource from 'vue-resource';
Vue.use(VueResource);

// 引入mint-ui 组件包
import mintui from 'mint-ui';
//  导入mint-ui 样式
import 'mint-ui/lib/style.min.css';
Vue.use(mintui);

// 引入mui
import '../static/mui/css/mui.css';
// 引入全局 css
import '../static/css/site.less'
// 引入 momentjs
import moment from 'moment';
Vue.filter('datefmt', function (input, fmtstring) {
    return moment(input).format(fmtstring);
})

// 实例化vue对象并接管id=app 的div 元素上
new Vue({
    el: '#app',
    // render:function(create){create(App);}  //es5语法
    render: c => c(App), //es6的函数写法 =>：goes to 
    router: router, //可以使用ES6简写， 只写一个 router
});