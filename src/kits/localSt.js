/*  
*  操作localStorage的方法
*  获取数据：var Str  =localStorage.getItem(key);
*  添加和追加数据： localStorage.setItem(key,value) ,value 是一个字符串
*  移除数据 ： localStorage.removeItem(key);
* */

export const key = 'goods';//设置常量key 为 goodsdata 
export var valueObj = {//导出一个obj对象 对象内用于存储商品的编号以及数量
    "goodsid": 0,//商品编号id
    "count": 0,//商品数量
};
export function setItem(value) {//setItem 设置localStorage存储数据
    var jsonString = localStorage.getItem(key);//设置变量接收本地已经存储的数据
    jsonString = jsonString||'[]';//如果没有已存储的数据，则赋值为空数组
    var arr = JSON.parse(jsonString);//设置arr接收获得的数据，转换为对象
    arr.push(value);//将用户点击加入购物车的内容，追加到arr数组内部
    localStorage.setItem(key,JSON.stringify(arr));//将最佳好的内容，转换成json字符串格式存储到localStorage
}