/*  
 *  操作localStorage的方法
 *  获取数据：var Str  =localStorage.getItem(key);
 *  添加和追加数据： localStorage.setItem(key,value) ,value 是一个字符串
 *  移除数据 ： localStorage.removeItem(key);
 * */

export const key = 'goods'; //设置常量key 为 goodsdata 
// 导出一个obj对象 对象内用于存储商品的编号以及数量
export var valueObj = {
	"goodsid": 0, //商品编号id
	"count": 0, //商品数量
};
// setItem 设置localStorage存储数据
export function setItem(value) {
	var jsonString = localStorage.getItem(key); //设置变量接收本地已经存储的数据
	jsonString = jsonString || '[]'; //如果没有已存储的数据，则赋值为空数组
	var arr = JSON.parse(jsonString); //设置arr接收获得的数据，转换为对象
	arr.push(value); //将用户点击加入购物车的内容，追加到arr数组内部
	localStorage.setItem(key, JSON.stringify(arr)); //将最佳好的内容，转换成json字符串格式存储到localStorage
}
// 获取本地存储的数据，并返回为对象格式
export function getItem() {
	var jsonString = localStorage.getItem(key); //设置变量接收本地已经存储的数据
	jsonString = jsonString || '[]'; //如果没有已存储的数据，则赋值为空数组
	return JSON.parse(jsonString); //返回一个转换为对象的数据
}

// 移除删除数据
export function remoteItem(goodsid) {
	var arr = getItem();
	// 循环查找arr中的goodsid，将和传入的参数goodsid一致的数据全部移除
	for (var i = arr.length - 1; i >= 0; i--) {
		// 使用倒序的方法保证删除时不受到length的影响
		if (arr[i].goodsid == goodsid) {
			arr.splice(i, 1);
		}
	}
	// 将最新的arr保存回localStorage中
	localStorage.setItem(key, JSON.stringify(arr));
}

// 获取本地购物车数据，转换为{id1:数量,id2:数量}形式，并返回
export function getgoodsObject() {
	var arr = getItem();
	// 将arr数组中的goodid相同的多个对象合并成同一个对象
	var resObj = {};//创建一个空对象，用来存储
	for (var i = 0; i < arr.length; i++) {
		var item = arr[i];
		// item 为本地存储数据内的每一个对象
		if (!resObj[item.goodsid]) {//判断新建的对象内是否有这个商品
			// 如果没有当前商品的数据，则添加一个数据
			resObj[item.goodsid] = item.count;
		} else {
			// 已经有当前商品的数据了，则将cont追加
			var count = resObj[item.goodsid];
			resObj[item.goodsid] = count + item.count;
		}
	}
	return resObj;//返回更新后的数据
}
// 添加或减少本地存储的数据
export function updateData(obj) {
	var arr = getItem(); // [{"goodsid":90,"count":1}，  {goodsid:89,count:1}]
	var count = 1;
	if (obj.type == 'add') {
		//分辨传递的type 为add 则 +
		arr.push({//将传递的数据push到本地数据内
			goodsid: obj.goodsid,
			count: 1
		});
	} else {
		//否则 则为减少 -
		for (var i = 0; i < arr.length; i++) {
			//如果这个对象中的count值等于1，则删除这个对象，否则将这个对象的count减1以后保存回去
			// [{"goodsid":90,"count":1}]
			if (arr[i].goodsid == obj.goodsid) {
				if (arr[i].count > 1) {
					arr[i].count = arr[i].count - 1;
					break;
				} else {
					//删除此对象
					arr.splice(i, 1);
					break;
				}
			}
		}
	}
	//    将最新的arr保存回localStorage中
	localStorage.setItem(key, JSON.stringify(arr));

}