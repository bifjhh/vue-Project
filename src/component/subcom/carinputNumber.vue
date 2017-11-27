<template>
    <div class="temp">
        <div class="number">
            <div @click="minus()">-</div>
            <div v-text="initCount"></div>
            <div @click="add()">+</div>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import { bus } from "../../kits/vm.js";
export default {
  props: ["initCount", "goodsid"],
  data() {
    return {
      count: 1,
      resObj: { goodsid: 0, type: "add" }
    };
  },
  created() {
    this.count = this.initCount;
  },
  methods: {
    // 数量-1
    minus() {
      if (this.count <= 1) {
        Toast({
          message: "再减就没有了",
          position: "bottom",
          duration: 2000
        });
        return;
      }
      this.count -= 1;
      console.log(this.count,"--")
      bus.$emit("countstr", -1);
      this.sendmessage("minus");
    },
    // 数量+1
    add() {
      this.count += 1;
      console.log(this.count,"++")
      bus.$emit("countstr", 1);
      this.sendmessage("add");
    },
    sendmessage(type) {
      this.resObj.type = type;
      this.resObj.goodsid = this.goodsid;
      this.$emit("cardataobj", this.resObj);
    }
  }
};
</script>
<style lang="less" scoped>
.temp {
  margin: 0;
}
.number {
  position: absolute;
  left: 75px;
  top: -6px;
  div {
    display: inline-block;
    text-align: center;
    width: 40px;
    line-height: 25px;
    border: 1px solid #000;
  }
}
</style>


