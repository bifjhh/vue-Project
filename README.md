# webpack 项目结构中继承vue-router
- 安装vue-router
    + cnpm install vue-router --save
- 在App.vue 中 配置 
    + router-link 路由导航链接
    + router-view 渲染时的占位符 
- 在 src 目录中新建 component --> account 文件夹
    + 在其中保存创建的组件文件
- 在入口文件中配置  vue router：
    + 导入
    + 绑定
    + 配置VueRouter
    + 导入组件

- 在 new Vue 实例中， 绑定vue-router
```javascript
new Vue({
    el:'#app',
    router:router//可以使用ES6简写， 只写一个 router
}) 
```
## Vue移动组件mint-ui使用
### 安装mint-ui
- 利用：cnpm install mint-ui --save 命令将mint-ui安装到项目中
- 在入口文件中全局导入mint-ui和它的css后即可在任何组件的中使用mint-ui组件了 
## MUI
- MUI是最接近原生APP体验的高性能前端框架，MUI不依赖任何第三方JS库，压缩后的JS和CSS文件仅有100+K和60+K
- 主要使用它的css布局，对于js特效没有用到
### 使用mui 组件
- 下载使用静态资源包
    + hellomui源码下载（完全可以直接拷贝里面的代码来实现自己的功能）：https://github.com/dcloudio/mui
- 在入口文件中引入mui.css文件
- 要实现某个功能只需要按照MUI在线DEMO，找到案例源码页面将效果迁移到项目中

- 查询版本 npm||yarn info 模块名称
    + npm info webpack
- 如果npm无法使用 可以安装 yarn
    + cnpm install yarn -g    
- 使用yarn查询版本
    + yarn info webpack

## 页面结构
- 使用mint-ui的header组件完成头部    
- 页面主体使用路由占位符
- 使用mui 完成底部选项卡
### 底部选项卡激活
- 将默认选项卡的a标签更改为router-link
- 将href更改为to
- 使用linkActiveClass:改变激活时的class
- 设置全局样式，组件减去head 和 底部 的 高度 防止组件内容被遮挡
### mint-ui-Swipe完成轮播图
- 复制Swipe轮播图基础用法的结构到home组件内
    + 具体属性参考文档https://mint-ui.github.io/docs/#/zh-cn2/swipe
- 设置Swipe的基础样式（因为Swipe轮播图没有基本样式）
- 使用模拟图片数据
- 使用v-for生成模板
```html
<mt-swipe :auto="3000">
            <!-- <mt-swipe-item>1</mt-swipe-item> -->
            <mt-swipe-item v-for='v in list'>
                <!-- 因为直接使用差值表达式无法解析,所以使用v-bind进行绑定 -->
                <a :href="v.url"> <!-- 绑定a标签跳转链接 -->
                    <img :src="v.img"><!-- 绑定图片属性 -->
                </a>
            </mt-swipe-item>
           
        </mt-swipe>
```
### 使用vue-resource发送ajax
- 安装vue-resource: cnpm install vue-resource --save
- 在入口文件中引入vue-resource 并使用
- 使用git请求数据
- 判断数据内容并赋值
### 渲染导航区域
- 使用MUI-九宫格样式
- 修改默认样式属性
- 调整子板块大小
- 覆盖更改图片
- 添加路由

### 添加新闻列表板块
- 设置新闻板块路由组件
- 完成样式模板
- 设置git请求数据
- 完成渲染
#### 格式化日期
- 使用 Moment.js 实现日期格式化功能
    + 下载依赖包 cnpm install moment --save
- 由于多个页面都需要这个功能，所以自定义全局过滤器
- 在入口文件中 引入包
- 定义全局过滤器，设置传入参数
```javascript
// 引入 momentjs
import moment from 'moment';
// 定义全局过滤器，设置传入参数
Vue.filter('datefmt',function(input,fmtstring){
    return moment(input).format(fmtstring); 
})
```
- 使用过滤器
        {{v.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}


#### 添加新闻详情组件
- 设置新闻列表 

    ```html
    <router-link v-bind="{to:'/news/newsdetails/' + v.id}"> 
    ```   
    + 设置点击时跳转到指定路由   
- 创建新的图文详情组件     
    + 并在入口文件中配置路由规则及相应组件
- 利用路由参数的传值，配置路由详情组件
```javascript
    this.id = this.$route.params.id;
```
- 在点击时获取路由参数的值（传入点击时的id）
- 根据传入的id进行ajax请求
- 使用created方法调用请求
- 将返回的数据接收并渲染到页面 

### 添加评论列表组件
- 创建组件，并在main.js中配置路由规则
- 评论列表是在图文详情组件内的，所以设置为子组件
- 在新闻列表组件内引入子组件，并在页面内添加组件内容
- 构造子组件静态结构
    + 发表评论区域
    + 已有评论区域
    + 点击加载更多（翻页）效果
#### 获取已有评论
- 在加载页面时通过get请求获取已有评论
- 将获取到的数据渲染到结构当中
#### 实现评论数据提交
- 判断用户是否输入内容
- 设置提交按钮，通过post请求发送数据
- 在用户提交之后清空文本框内容，重新执行获取数据，完成实时刷新效果
#### 点击翻页效果
- 设置用户点击时当前请求的页数+1或者-1
    + 判断上一页为第一页时停止运行函数,并提示用户
    + 判断下一页获取的数组的length值<=0时，停止运行，并提示用户
- 然后再次请求获取数据并渲染
#### 点击加载更多效果
- 类似于上下翻页
- 在获取数据时使用 .concat() 方法，将获取到的数据和原有数组合并，实现加载更多
```javascript
this.list = this.list.concat(data.message);

```
- 修改评论成功的刷新
    + 当用户发表评论后，不再重新获取数据
    + 将用户输入的内容转换成相同的格式，使用 .concat() 方法合并到数组的前面
```javascript
//   在用户发表评论之后将当前评论内容手动添加到列表顶部
    this.list = [
    {
        'user_name': "匿名用户",
        'add_time': new Date(),
        'content': this.text
    }
    ].concat(this.list);
```
## 添加图文分享组件
- 创建组件，并在main.js中配置路由规则
- 在component下创建photo文件夹
- 创建photolist.vue组件
- 在main.js中配置组件引入和路由规则
- 分析页面结构
#### 构造分类导航
- 构造静态分类导航
- 设置css样式实现导航栏左右滑动
- 使用ajax请求获取分类数据
- 根据数据内容动态设置导航栏的宽度
#### 构造图片列表
- 创建组件，并在main.js中配置路由规则
- 构造图片列表结构
- 设置css样式实现文字浮现在图片上
- 根据分类导航点击时传入的id，进行ajax请求相应列表
    + 判断是否传入id，若没有传入则默认请求全部列表
- 将返回的数据渲染到页面

### 添加图片详情信息组件
- 创建组件，并在main.js中配置路由规则
- 构造静态结构
- 获取点击时当前图片id
- 根据获取的id进行不同的ajax请求
- 使用MUI九宫格样式渲染缩略图
### 添加Vue preview 插件
- 下载安装
    + cnpm i vue-preview -S
    + 插件目前仅支持vue2.0以上版本
    + img标签上的class不能去掉
- 如果你是使用vue-cli生成的项目，可能需要你修改webpack.base.conf.js文件中的loaders，添加一个loader。 
    + 原因：插件编写中使用了es6的语法，需要进行代码编译
```javascript
{
    test: /vue-preview.src.*?js$/,
    loader: 'babel'//webpack2.0||3.0不需要引用
}
```
- 在main.js中配置
```javascript
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
```
- 代码实例（转自文档）
```html
<template>
  <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)">
</template>

<script>
export default {
    data () {
      return {
        list: [{
          src: 'https://placekitten.com/600/400',
          w: 600,
          h: 400//初始的大小
        }, {
          src: 'https://placekitten.com/1200/900',
          w: 1200,
          h: 900//点击预览的大小
        }]
      }
    }
  }
</script>
```
- 因为插件需要w h 属性，如果没有，则自己手动添加这两个属性
- 然后将设置好的属性，赋值渲染，完成缩略图预览

### 添加商品列表组件
- 创建组件，并在main.js中配置路由规则
- 使用MUI图文表格布局商品列表
- 修改原有样式
- 使用ajax请求商品列表数据
- 将获得的数据渲染到页面上，完成商品列表展示
#### 添加商品详情组件
- 创建组件，并在main.js中配置路由规则
- 构造静态页面结构
- 根据商品列表点击时传入的id，进行ajax请求
- 返回数据后，将获得的数据渲染到页面当中
### 将共同的轮播图提取为一个子组件
- 创建组件，并在main.js中配置路由规则
- 引入mint-ui 的 mt-swipe 轮播图样式
- 因为需要适用所有的页面，所以swipe组件需要进行不同的请求
- 利用父组件将图片信息传值到子组件当中
    + 父组件使用ajax请求获取轮播图数据
    + swipe接收父组件传递的images数据，进行图片渲染，
- 完成适应不同API的图片渲染


## 箭头函数
- 箭头函数有以下几个方面的特点：
    + this, super, arguments和arguments的值由最近一个包含它的非箭头函数定义。(No this, superm arguments and new.target bindings);
    + 箭头函数内部没有 [[construct]]方法， 因此不能当作构造器，使用new操作符；
    + 不存在原型(No prototype);
    + 不能改变this, 在整个箭头函数生命周期this值保持不变;
    + 不存在arguments对象，不过包含它的函数存在，箭头函数依靠命名参数和rest parameters；
    + 不能拥有重复的命名参数，ES5只有严格模式下才不允许
- 箭头函数语法
```javascript
// 简单的看法，知道怎么回事就行
    let sum = (n1, n2) => n1 + n2;
    // 相当于
    let sum = function(n1, n2) {
        return n1 + n2;
    };

    let getTempItem = id => ({ id: id, name: "Temp" });
    // 相当于
    let getTempItem = function(id) {
        return {
            id: id,
            name: "Temp"
        };
    };
```

### 域名提取
- 在开发项目阶段，域名可能会分为测试域名，线上域名等多个域名，需要经常切换，所以讲域名进行提取       
- 在src目录下新建kits目录，创建common.js文件
```javascript
// 职责：负责管理当前系统中的所有公共的配置
export default{
    apidomain: 'http://vue.studyit.io' // 所有数据api的域名地址
}
```   
- 在使用API接口的组件中导入common.js文件
        import common from '../kits/common.js';
- 使用导入的域名
```javascript
var url= common.apidomain+'api/getlunbo'
```   