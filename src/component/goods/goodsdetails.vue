<template>
    <div class="temp">
        <mt-header fixed :title="info.title"></mt-header>
        <h4 v-text="info.title"></h4>
        <hr>
        <div class="content">
        <p v-html="info.content"></p>
        </div>
    </div>  
</template>
<script>
import common from "../../kits/common.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: 0,
      info: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getDsdetails();
  },
  methods: {
    getDsdetails() {
      var url = common.apidomain + "/api/getimageInfo/" + this.id;
      this.$http.get(url).then(function(res) {
        if (res.body.status != 0) {
          //   判断数据是否正常，否的话则阻断之后的函数运行
          Toast({
            message: "获取内容出错",
            position: "bottom",
            duration: 2000
          });
          return;
        }
        this.info = res.body.message[0];
      });
    }
  }
};
</script>
<style lang="less" scoped>
.temp {
  padding: 5px;
  h4 {
    color: #0094ff;
  }
}
img.gomeImgLoad {
  width: 100%;
}
</style>


