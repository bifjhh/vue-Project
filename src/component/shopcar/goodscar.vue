<template lang="html">
    <div class="temp">
        <mt-header fixed title="购物车"></mt-header>
        <div class="row" v-for="(v,i) in datalist" :keys="v.id">
			<mt-switch class="switch" v-model="value[i]"></mt-switch>
			<img class="img" :src="v.thumb_path" alt="商品图片" >
			<div class="inforight">
				<h4 v-text="v.title"></h4>
				<div class="bottom">
					<ul>
						<li>￥{{v.sell_price}}</li>
						<li class="one"><carinputNum :initCount="v.cou" :goodsid="v.id" @cardataobj="getiInputNumber"></carinputNum></li>
						<li><a href="javascript:void(0)" @click="delrow(v.id,i)">删除</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="total">
			<div class="desc">
				<ul>
					<li>总计（不含运费）</li>
					<li>已勾选商品{{totalcount}}件,总价:￥{{totalAmount}}元</li>
				</ul>
			</div>
			<div class="button">
				<mt-button  type="danger" size="small">去结算</mt-button>
			</div>
		</div>
		{{value}}
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import common from "../../kits/common.js";
import carinputNum from "../subcom/carinputNumber.vue";
import { getgoodsObject, updateData, remoteItem } from "../../kits/localSt.js";
export default {
  components: {
    carinputNum
  },
  // 实时计算
  computed: {
    // 总的记录
    totalcount() {
      var trueArr = this.value.filter(function(item) {
        return item;
      });
      var amount = 0;
      // 循环 
      this.value.forEach((v, i) => {
        if (v) {
          var count = this.datalist[i].cou;
          var price = this.datalist[i].sell_price;
          var vamount = count * price;
          amount += vamount;
        }
      });
      this.totalAmount = amount;
      return trueArr.length;
    }
  },
  data() {
    return {
      value: [],
      datalist: [],
      totalAmount: 0
    };
  },
  created() {
    this.getdatalist();
  },
  methods: {
    // 删除功能
    delrow(goodsid, index) {
      this.value.splice(index, 1);
      this.datalist.splice(index, 1);
      remoteItem(goodsid);
    },
    // 页面开始时获取本地购物车数据渲染到页面上
    getdatalist() {
      // 使用obj接收本地存储的数据（对象形态{id:数量}）
      var obj = getgoodsObject();
      var idurl = "";//设置idurl用来接收商品的id值
      for (var k in obj) {
        // 使用 for in 循环 将本地数据中的id值取出，并以 ， 分隔
        idurl += k + ",";
      }
      idurl = idurl.substring(0, idurl.length - 1) || 0;
      // 去掉最后一个 ， 如果没有 则为 0
      var url = common.apidomain + "/api/goods/getshopcarlist/" + idurl;
      this.$http.get(url).then(function(res) {
        if (res.body.status != 0) {
          Toast(res.body.message);
          return;
        }
        //	将locaStorage中的所有的商品对应的count的值赋值给message中每个对象的cou
        res.body.message.forEach(item => {
          item.cou = obj[item.id];
          // console.log("我被赋值了"+item.cou)
          //为了解决一个bug，所以必须在此处初始化value数组全部为false
          this.value.push(false);
        });
        // console.log("111 === " + this.two);
        this.datalist = res.body.message;
      });
    },
    getiInputNumber(resObj) {
      updateData(resObj);
      for (var i = 0; i < this.datalist.length; i++) {
        if (this.datalist[i].id == resObj.goodsid) {
          if (resObj.type == "add") {
            this.datalist[i].cou = this.datalist[i].cou + 1;
          } else {
            this.datalist[i].cou = this.datalist[i].cou - 1;
          }
          break;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  height: 102px;
  display: flex;
  padding-top: 10px;
}

.switch {
  flex: 0 0 52px;
}

.img {
  margin-left: 5px;
  height: 75px;
  width: 75px;
  flex: 0 0 85px;
}

.inforight {
  margin-left: 5px;
  flex: 1;
}
.inforight ul {
  padding-left: 0px;
}
.inforight li {
  list-style: none;
  display: inline-block;
}

.inforight h4 {
  color: #0094ff;
  font-size: 14px;
}
.bottom {
  position: relative;
}

.bottom li:first-child {
  color: red;
  margin-right: 10px;
}

.bottom li:last-child {
  float: right;
  margin-right: 170px;
}
.total {
  height: 100px;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 5px;
}

.total ul {
  padding-left: 0px;
}
.total li {
  list-style: none;
  font-size: 14px;
}

.button {
  flex: 0 0 60px;
  margin: 30px 0 0 0;
}

.desc {
  flex: 1;
}
</style>
