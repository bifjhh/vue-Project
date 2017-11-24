<template>
    <div class="temp">
        <div class="number">
            <div @click="minus()">-</div>
            <div v-text="count"></div>
            <div @click="add()">+</div>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      count: 1
    };
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
      this.sendmessage();
    },
    // 数量+1
    add() {
      this.count += 1;
      this.sendmessage();
    },
    sendmessage() {
      this.$emit("dataobj", this.count);
    }
  }
};
</script>
<style lang="less" scoped>
.number {
  position: absolute;
  left: 100px;
  top: 6px;
  div {
    display: inline-block;
    text-align: center;
    width: 40px;
    line-height: 25px;
    border: 1px solid #000;
  }
}
</style>


