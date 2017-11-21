<template lang="html">
    <div class="temp">
        <h3>提交评论</h3>
        <hr>
        <textarea v-model="text" placeholder="请输入您要评论的内容..."></textarea>
        <mt-button @click="publish()" type="primary" size="large">发表评论</mt-button>
        <div class="bd">
            <div class="title">
                <span>评论列表</span><span class="f-r">{{list.length}}条评论</span>
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
            <div class="page"><a @click="nextPage()" href="javascript:;">加载更多</a></div>
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
    // 加载更多内容版
    getList(page) {
      page = page || 1;
      var url =
        common.apidomain + "/api/getcomments/" + this.id + "?pageindex=" + page;
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
        if (res.body.message.length <= 0) {
          //   判断数据是否正常，否的话则阻断之后的函数运行
          Toast({
            message: "没有更多内容了",
            position: "bottom",
            duration: 2000
          });
          return;
        }
        //   数据正常则 让list数据和获取到的内容合并为一个数组
        this.list = this.list.concat(data.message);
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
          //   在用户发表评论之后将当前评论内容手动添加到列表顶部
          this.list = [
            {
              'user_name': "匿名用户",
              'add_time': new Date(),
              'content': this.text
            }
          ].concat(this.list);
          //   发表成功后清空文本框内容
          this.text = "";
        });
    },

    nextPage() {
      this.pageindex = this.pageindex + 1;
      this.getList(this.pageindex);
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
.title {
  margin-top: 10px;
  color: #000;
  font-weight: 600;
  font-size: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.f-r {
  float: right;
  font-weight: 400;
  font-size: 15px;
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
.page > a {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 40px;
}
.bd {
  padding-bottom: 5px;
}
</style>
