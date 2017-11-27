<template>
  <div class="temp">
      <mt-header fixed title="发表评论"></mt-header>
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


