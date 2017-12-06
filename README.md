# vue商场项目
## 在webpack 项目结构中配置
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
#### 添加商品展示组件
- 创建组件，并在main.js中配置路由规则
- 构造静态页面结构
- 根据商品列表点击时传入的id，进行ajax请求
- 返回数据后，将获得的数据渲染到页面当中
#### 添加商品图文详情组件
- 点击图文详情时传入id
- 创建组件，并在main.js中配置路由规则
- 根据返回数据，渲染到页面结构上
#### 添加商品评论组件
- 创建组件，并在main.js中配置路由规则
- 在组件内引入comment组件，并绑定id
- 完成渲染
#### 购买区域组件添加
- 将购买数量提取为一个组件
- 构造静态结构
- 创建方法，实现默认数量为 1 ，点击 + - 实现数量的变更
    + 创建方法 点击 - 实现数字向下-1
    + 创建方法 点击 + 实现数字向下+1
- 使用$emit绑定自定义事件，向父组件传递变更后的数量
    + this.$emit('dataobj',this.count);
        + $emit方法，第一个参数为自定义事件名，第二个为调用事件传入的参数
- 在每一次进行加减运算时，都进行一个传值
- 将构造好的组件导入到父组件内
- 在父组件内构造子组件自定义事件调用时执行的方法，获取子组件传递的值

## 点击加入购物车
- 实现点击时的物品数同步到购物车选项卡上
- 因为组件之间并不是父子组件关系
- 使用非父子组件的通信方法
### 非父子组件的通信
- 有时候，非父子关系的两个组件之间也需要通信。在简单的场景下，可以使用一个空的 Vue 实例作为事件总线：
#### 基本语法
```javascript
var bus = new Vue()
// 触发组件 A 中的事件
bus.$emit('id-selected', 1)

// 在组件 B 创建的钩子中监听事件
bus.$on('id-selected', function (id) {
  // ...
})
```
#### 思路 
- 创建一个vm.js文件
    + 用于导出 var bus = new Vue()
    + 便于复用
- 在需要触发事件（传出去值）的组件内创造
```javascript
bus.$emit('countstr',this.inputNumberCount);
//可以直接创建，也可以通过事件方法的调用来进行创建
//创建自定义事件名，并传入需要的值作为参数传递
```
- 在用来接收值组件内创建监听
```javascript
bus.$on('countstr', function(count) {
    //传入，需要监听的自定义事件名，以及回调函数
    // 回调函数内写用来处理接收到传递过来的值后进行的运算
  var badegobj = document.querySelector("#badge");
  badegobj.innerText = parseInt(badegobj.innerText) + count;
})
```
### 使用localStorage存储购物车数据
##### 创建处理localStoraged的js文件
- 设置一个常量（const）key来作为localStoraged存取数据中的 键
- 设置一个obj对象 对象内用于存储商品的编号以及数量
```javascript
    var valueObj = {//导出一个obj对象 对象内用于存储商品的编号以及数量
        "goodsid": 0,//商品编号id
        "count": 0,//商品数量
    };
```
- 设置向localStorage存储数据的方法
```javascript
    //setItem 设置localStorage存储数据
    function setItem(value) {//value 为调用方法是传入的数据       
        var jsonString = localStorage.getItem(key);//设置变量接收本地已经存储的数据
        jsonString = jsonString||'[]';//如果没有已存储的数据，则赋值为空数组
        var arr = JSON.parse(jsonString);//设置arr，用来接收转换为对象的返回数据
        arr.push(value);//将用户点击加入购物车的内容，追加到arr数组内部
        localStorage.setItem(key,JSON.stringify(arr));//将追加好的内容，转换成json字符串格式存储到localStorage
    }
```
#### 添加购物车小球飞入动画
- 点击添加到购物车时，数量处飞出一个小球，从隐藏状态飞出到购物车，然后隐藏后回归原始位置
- 利用钩子动画完成动画小效果
- 圆球初始值 设置v-if 隐藏
```javascript
<div v-if="isshow" class="ball">{{inputNumberCount}}</div>
```
- 当用户点击时，显示，并触发钩子动画
- 动画效果到达购物车时圆球消失

#### 渲染购物车列表页面
- 构造购物车组件,书写静态结构
- 使用API接口,获取购物车数据
- 首先获取本地存储的商品的ID值
    + 在localsg.js内书写获取本地数据方法
    + 将获得的数据转换为可供读取对象形式{ID:数量}
- 将本地数据对象通过for in 循环，去除所有的商品id（键名），并以 ， 分隔
    + 需要去除最后一个 ， 
- 将获得的商品id拼接到get请求的url上，完成请求，获取数据，完成列表的加载

#### 设置购物车数量加减方法
- 在原有的inputNumber 组件上进行改动
- 在localsg.js内书写添加减少的方法
- 当点击 - 时，通过父子传值 调用方法 -1   
- 当点击 + 时，通过父子传值 调用方法 +1   

#### 设置删除功能
- 在localsg.js内书写添加删除的方法
- 在car页面书写删除函数
    + 点击时传入商品ID,及索引值
    + remove方法通过id删除本地数据内的id相同的数据
    + 利用索引，删除购物车列表项以及value项
#### 设置购物车徽章同步数量
- 使用钩子函数beforeCreate
- 获取转换后的本地数据
- 遍历数据内的数量
- 将数量通过传值的方式 vm.$emit("count", num); 发送到页面
- 完成徽章内数量的同步

#### 添加计算价格功能
- 使用computed 计算属性，实时计算变动的内容
- 使用函数来返回值
    + 使用.filter()记录value的选中的状态,并return回来    
    + 初始化一个记录金额的变量
    + 使用forEach遍历value是否被选中
    + 记录选中的商品的数量，以及金额 
    + 计算总金额，并返回赋值给外面用来显示的变量
    + 然后返回被选中的length值，用来显示被选中的件数
```javascript
  computed: {// 计算属性，实时计算
    totalcount() {// 实时计算totalcount()函数的变动，并重新赋值计算
      var trueArr = this.value.filter(function(item) {
        return item;// 返回选项框的的选中状态
      });
      var amount = 0;//初始化金额的值
      this.value.forEach((v, i) => {  // 循环value记录的值
        if (v) {//判断当前索引是否被选中，选中则能够进入
          var count = this.datalist[i].cou;//记录当前选中商品的数量
          var price = this.datalist[i].sell_price;//记录当前选中商品的单个价格
          var vamount = count * price;//计算当前商品的总价格
          amount += vamount;//赋值给外面用来记录金额的变量
        }
      });
      this.totalAmount = amount;//赋值
      return trueArr.length;//返回被选中的件数
    }
  }
```
#### 设置页面返回上一层
- 构造返回按钮处于页面左上角
- 添加方法，使用router.go 作为 后退/前进导航
- 因为首页不能够再进行返回上一级路由，所以要进行一个判断识别
- 使用watch检测路由的变化
    + 使用.path方法检测当前路径是否为'/home'
    + 是则使返回标签不渲染
    + 否则渲染返回上级标签



## 将共同的轮播图提取为一个子组件
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



## 域名提取
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