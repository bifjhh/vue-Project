<template lang="html">
    <div class="temp">
        <h3>提交评论</h3>
        <hr>
        <textarea v-model="text" placeholder="请输入您要评论的内容..."></textarea>
        <mt-button @click="publish()" type="primary" size="large">发表评论</mt-button>
        <div class="bd">
            <div class="title">
                <span>评论列表</span><span>{{list.length}}</span>条评论
            </div>
            <div class="content"   v-for="(v, i) in list">
                <div class="head">
                    <span>第{{i + 1}}楼</span>
                    <span>用户:{{v.user_name}}</span>
                    <span>发表时间:{{v.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                </div>    
                    <ul class="mui-table-view">
                        <li v-text="v.content" class="mui-table-view-cell"></li>
                    </ul>
             </div>
            <div class="page"><a @click="upPage()" href="javascript:;">上一页</a><a @click="nextPage()" href="javascript:;">下一页</a></div>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import common from "../../kits/common.js";
export default {
  data() {
    return {
      list: [],
      pageindex: 1,
      text: ""
    };
  },
  created() {
    this.getList();
  },
  props: ["id"],
  methods: {
    //   加载评论内容
    getList() {
      var url =
        common.apidomain +
        "/api/getcomments/" +
        this.id +
        "?pageindex=" +
        this.pageindex;
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
        this.list = data.message;
      });
    },
    // 发表评论方法
    publish() {
      // 判断用户是否输入数据
      if (!this.text) {
        Toast({
          message: "请输入内容",
          position: "bottom",
          duration: 2000
        });
        //   没有输入则直接阻断之后的ajax请求
        return;
      }
      var url = common.apidomain + "/api/postcomment/" + this.id;
      this.$http
        .post(url, { content: this.text }, { emulateJSON: true })
        .then(function(res) {
          // 在用户发表评论之后进行一个相应
          Toast({
            message: res.body.message,
            position: "bottom",
            duration: 2000
          });
          //   在用户发表评论之后重新加载当前评论列表
          this.getList();
        });
    },
    upPage() {
      if (this.pageindex <= 1) {
        Toast({
          message: "已经是第一页了",
          position: "bottom",
          duration: 2000
        });
        return;
      }
      this.pageindex = this.pageindex - 1;
      this.getList();
    },
    nextPage() {
      this.pageindex = this.pageindex + 1;
      this.getList();
    }
  }
};
</script>

<style lang="css" scoped>
hr {
  color: rgba(0, 0, 0, 0.3);
}
textarea {
  width: 100%;
  outline: none;
  resize: none;
}
.mui-table-view:before,
.mui-table-view:after {
  position: inherit;
}
.title{
    margin-top: 10px
}
.content {
  border-bottom: 1px solid #ccc;
  margin-top: 10px;
}

.page {
  width: 100%;
  height: 39px;
  border: 1px solid #ccc;
  background-color: rgba(22, 22, 22, 0.2);
  border-radius: 10px;
}
.page a {
  display: inline-block;
  width: 30%;
  height: 100%;
  text-align: center;
  line-height: 40px;
  margin-left: 10%;
}
.bd {
  padding-bottom: 5px;
}
</style>
