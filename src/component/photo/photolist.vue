<template>
    <div class="temp">
        <mt-header fixed title="图片分享">
            <router-link to="/home" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <!-- 图片分类 -->
        <div class="classify">
            <ul v-bind="{style : 'width:' + ulWidth + 'px'}">
                <li v-for="v in classify" :key="v.id" @click="getImgList(v.id)">{{v.title}}</li>
            </ul>
        </div>
        <div class="imgList">
            <ul>
                <li v-for="v in imgList" :key="v.id">
                    <router-link v-bind="{to:'/photo/photoinfo/'+v.id}">
                        <img v-lazy="v.img_url">
                        <div class="desc">
                            <h5 v-text="v.title"></h5>
                            <p v-text="v.zhaiyao"></p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import common from '../../kits/common.js';
export default {
    data(){
        return{
            classify:[],//分类数据
            imgList:[],//图片列表数据
            ulWidth : 320,
        }
    },
    created(){
        this.getClassify();
        this.getImgList();
    },
    methods:{
        getClassify(){
            var url= common.apidomain+"/api/getimgcategory";
            this.$http.get(url).then(function(res){
                if (res.body.status != 0) {
                //   判断数据是否正常，否的话则阻断之后的函数运行
                    Toast({
                        message: "获取内容出错",
                        position: "bottom",
                        duration: 2000
                    });
                    return;
                }
                
                this.classify=[{
                    title: "全部",
                    id: 0
                }].concat(res.body.message);//给分类数组赋值
                var w = 69;//每一个分类的宽度
                var count = this.classify.length;//计算出分类列表的总个数
                this.ulWidth = w * count;//使用纵膈书乘以每一个列表的宽度，赋值给ul的style，实现动态给ul设置宽度
            });
        },
        getImgList(id){
            id=id||0;
            var url= common.apidomain+"/api/getimages/"+id;
            this.$http.get(url).then(function(res){
                if (res.body.status != 0) {
                    //   判断数据是否正常，否的话则阻断之后的函数运行
                    Toast({
                        message: "获取内容出错",
                        position: "bottom",
                        duration: 2000
                    });
                    return;
                }else if (res.body.message[0]==undefined) {
                //   判断数据是否正常，否的话则阻断之后的函数运行
                    Toast({
                        message: "未能获取到内容",
                        position: "bottom",
                        duration: 2000
                    });
                    return;
                };
            this.imgList=res.body.message;//给图片列表数组赋值
            });
        }
    }
};
</script>
<style lang="less" scoped>
.classify{
    height: 50px;
    overflow-x: auto;
    ul{
        margin: 0px;
        padding-left: 0px;
        li{
            margin-top: 10px;
            list-style: none;
            display: inline-block;
            color:#0094ff;
            font-size: 14px;
            padding-left: 6px;
        }
        li:first-of-type{
            padding: 0 6px;
        }
        li + li{
            border-left: 1px solid #ccc;
            padding-right: 6px;
        }
    }
}
.imgList{
    ul {
        padding-left: 0px;
        margin-top:10px;
        li{
            list-style:none;
            position: relative ;
            img{
                width:100%;
                height: 300px;
            }
            .desc{
                width: 100%;
                background-color: rgba(0,0,0,0.2);
                position:relative;
                bottom: 2px;
                left: 0px;
                padding: 10px;
                margin-top: -3px;
                margin-bottom: 4px;

                h5{
                    color:#fff;
                }
                p{
                    text-indent: 2em;
                    color:#fff;
                }
            }
        }
    }
}

image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
}
</style>


