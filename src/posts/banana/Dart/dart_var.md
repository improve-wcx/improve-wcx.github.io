# Dart 变量

[![img](./FILES/dart_var.md/7ada550c.webp)](https://juejin.cn/user/184373684214733)

[cekiasoo![lv-3](./FILES/dart_var.md/3a6db764.webp)](https://juejin.cn/user/184373684214733)

2018年09月22日 15:54 ·  阅读 174

### 一、什么是变量

变量就是在运行期间随时会被改变的数据，比如说有个存储单元这一秒存的数是 1，下一秒可能会被改成 2；

### 二、如何定义变量

变量是这样定义的：

数据类型 变量名;

如 int age; int 是数据类型（整形），age 是变量名，

```ini
/**
 * 变量
 */
void main() {
  // int 型变量
  int age;
  age = 1;
  print(age);

  // 被改变了
  age = 2;
  print(age);
}

```

运行结果是

![截图](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/17/165e7d441e83cf99~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)



变量的数据类型也可以用 var，即 variable,

var 变量名;

上面的 int age; 可以改为 var age;

```ini
/**
 * 变量
 */
void main() {
  // int 型变量
  var age;
  age = 1;
  print(age);

  // 被改变了
  age = 2;
  print(age);
}

```

变量可以给个初始值，

```ini
var age;
age = 1;

```

可以改为

```ini
var age = 1;
```