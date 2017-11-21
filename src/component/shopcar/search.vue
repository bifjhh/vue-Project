<template lang="html">
    <div class="temp">
        <mt-header fixed title="搜索">
            <router-link to="/home" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.mint-header {
  background-color: #ccc;
  color: #3d3d3d;
}
</style>
