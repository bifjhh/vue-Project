<template>
  <div class="temp">
        <mt-header fixed title="详细信息">
            <router-link to="/photo/photolist" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="title">
            <h4>{{info.title}}</h4>
            <p>{{info.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}<span>{{info.click}}</span>次浏览</p>
            <hr>
        </div>
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li v-for="(v, i) in imgs" :key="v.id" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <img class="preview-img"  :src="v.src" height="100">
                </li>
            </ul>
            <p v-html="info.content"></p>
        </div>
        
  </div>
</template>
<script>
// 描述信息/api/getimageInfo/43
// 缩略图数组 /api/getthumimages/43
import { Toast } from "mint-ui";
import common from '../../kits/common.js';
export default {
    data(){
        return{
            id:0,
            info:{},
            imgs:[],
        }
    },
    created(){
        var id=this.$route.params.id;
        this.getImg(id);
        this.getInfo(id);
    },
    methods:{
        getImg(id){
            var imgUrl = common.apidomain+"/api/getthumimages/"+id;
            // var infoUrl = common.apidomain+"/api/getimageInfo/"+id;
            this.$http.get(imgUrl).then(function(res){
                if (res.body.status != 0) {
                //   判断数据是否正常，否的话则阻断之后的函数运行
                    Toast({
                        message: "获取内容出错",
                        position: "bottom",
                        duration: 2000
                    });
                    return;
                }
                this.imgs=res.body.message;
            });
        },
        getInfo(id){
            var infoUrl = common.apidomain+"/api/getimageInfo/"+id;
            this.$http.get(infoUrl).then(function(res){
                if (res.body.status != 0) {
                //   判断数据是否正常，否的话则阻断之后的函数运行
                    Toast({
                        message: "获取内容出错",
                        position: "bottom",
                        duration: 2000
                    });
                    return;
                }
                this.info=res.body.message[0];
            });    
        }
    }
}
</script>
<style lang="less" scoped>
.temp{
    padding-left: 10px;
    padding-right: 10px;
}
.title{
    h4{}
}
</style>

