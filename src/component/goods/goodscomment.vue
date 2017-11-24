<template>
  <div class="temp">
      <mt-header fixed title="发表评论">
            <router-link v-bind="{to:'/goods/goodsinfo/'+id}" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
      <comment :id="id"></comment>
  </div>
</template>
<script>
import comment from "../subcom/comment.vue";
export default {
  components: {
    comment
  },
  data() {
    return {
      id: 0
    };
  },
  created() {
    this.id = this.$route.params.id;
  }
};
</script>
<style lang="less" scoped>

</style>


