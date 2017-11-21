// 1.0 定义add函数
function add(x, y) {
    return x + y
}

// 2.0 导出add方法
// module.exports = add;//es5写法

export default {
    // add：add
    add //在es6当中 属性名称和属性值变量同名的时候可以只写一个，相当于es5中的 add：add
}
