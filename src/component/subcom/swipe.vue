<template>
  <div class="temp">
      <mt-swipe :auto="3000">
            <!-- <mt-swipe-item>1</mt-swipe-item> -->
            <mt-swipe-item v-for='v in imgs' :key="v.id">
                <!-- 因为直接使用差值表达式无法解析,所以使用v-bind进行绑定 -->
                <a :href="v.url||v.img"> <!-- 绑定a标签跳转链接 -->
                    <img v-if="v.img" :src="v.img"><!-- 绑定图片属性 -->
                    <img v-else :src="v.src">
                </a>
            </mt-swipe-item>
        </mt-swipe>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["imgs"]
};
</script>

<style lang="less" scoped>
.mint-swipe {
  height: 300px;
  width: 100%;
}
.mint-swipe-item a{
    overflow: hidden;
}
.mint-swipe-item,
.mint-swipe-item a,
.mint-swipe-item a img {
  display: block;
//   width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>
