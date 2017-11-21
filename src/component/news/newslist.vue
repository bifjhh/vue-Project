<template lang="html">
    <div class="temp">
        <mt-header fixed title="图文资讯">
            <router-link to="/home" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
       <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="v in list">
                <router-link v-bind="{to:'/news/newsdetails/' + v.id}">
                    <img class="mui-media-object mui-pull-left" :src="v.img_url">
                    <div class="mui-media-body">
                        {{v.title}}
                        <p class='mui-ellipsis'>{{v.zhaiyao}}</p>
                        <div class="ft">
                            <span>发表时间:{{v.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                            <span>点击数:{{v.click}}</span>
                        </div>
                    </div>
                </router-link>
            </li>
		</ul>
    </div>
</template>

<script>
// http://vue.studyit.io/api/getnewslist
import { Toast } from "mint-ui";
import common from "../../kits/common.js";
export default {
  data() {
    return {
      list: [],
      details: []
    };
  },
  created() {
    this.getImg();
  },
  methods: {
    getImg() {
      var url = common.apidomain+"/api/getnewslist";
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
    },
    getdetails(id) {
      var url = "http://vue.studyit.io/api/getnew/" + id;
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
        this.details = data.message;
        console.log(this.details);
      });
    }
  }
};
</script>

<style lang="css" scoped>
.mui-table-view img {
  height: 80px;
  width: 80px;
}

.mui-table-view .mui-media-object {
  max-width: 80px;
  line-height: 80px;
}
.ft {
  margin-top: 1.5em;
  font-size: 14px;
  color: #0094ff;
}

.ft .click {
  margin-left: 20px;
}
</style>
