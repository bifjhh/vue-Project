<template lang="html">
    <div class="temp">
        <mt-header fixed title="资讯详情">
            <router-link to="/news/newslist" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="title">
            <h4 v-text="info.title"></h4>
            <p>{{info.add_time | datefmt('YYYY-MM-DD')}} <span>{{info.click}}</span>次浏览</p>
        </div>
        <div id="content" v-html="info.content"></div>
        <!-- 评论组件的集成 -->
        <comment :id="id"></comment>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import common from "../../kits/common.js";
// 评论组件
import comment from '../subcom/comment.vue';
export default {
  components:{
    comment
  },
  data() {
    return {
      info: {},
      id: 0
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getdetails();
  },
  methods: {
    getdetails() {
      var url = common.apidomain + "/api/getnew/" + this.id;
      this.$http.get(url).then(function(res) {
        var data = res.body;
        if (data.status != 0) {
          //   判断数据是否正常，否的话则阻断之后的函数运行
          Toast({
            message: "获取内容出错",
            position: "bottom",
            duration: 2000
          });
          return;
        }
        //   数据正常则 给list 赋值
        this.info = data.message[0];
      });
    }
  }
};
</script>

<style lang="css" scoped>
.temp img {
  width: 100%;
}
.temp {
  padding: 0 5px;
}
.title {
  margin-top: 50px;
}

h4 {
  color: #26a2ff;
}
.title > p {
  text-align: right;
  color: rgba(0, 0, 0, 0.5);
  padding-right: 5px;
  margin-top: 1em;
}
.title > p span {
  display: inline-block;
  margin: 0 5px 0 15px;
  color: #f00;
}
</style>
