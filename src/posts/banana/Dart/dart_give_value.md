# Dart 赋值运算符

[![img](./FILES/dart_give_value.md/7ada550c.webp)](https://juejin.cn/user/184373684214733)

[cekiasoo![lv-3](./FILES/dart_give_value.md/3a6db764.webp)](https://juejin.cn/user/184373684214733)

2018年09月22日 16:09 ·  阅读 440

### 一、什么是赋值运算符

赋值运算符就是把右边的值赋给左边，比如之前见过的 "=", 还有一些是运算和赋值同时进行的符号，Dart 中赋值运算符有

| 运算符 | 解释               |
| ------ | ------------------ |
| =      | 赋值               |
| +=     | 加法运算并赋值     |
| -=     | 减法运算并赋值     |
| *=     | 乘法运算并赋值     |
| /=     | 除法运算并赋值     |
| %=     | 求余运算并赋值     |
| ~/=    | 取整运算并赋值     |
| <<=    | 左移运算并赋值     |
| >>=    | 右移运算并赋值     |
| &=     | 按位与运算并赋值   |
| =      | 按位或运算并赋值   |
| ^=     | 按位异或运算并赋值 |



### 二、赋值运算符的用法

#### （一） 赋值

赋值就是把右边的值赋给左边，在 Dart 中用 "=" 表示，这不是等号，等号是 "==",

```ini
  var num = 5;
  print('a = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/64e2b637.png)



#### （二） 加法运算并赋值

加法运算并赋值就是先用左边的值和右边的值做加法运算然后把结果赋给左边，在 Dart 中用 "+=" 表示，

```ini
  var num = 8;
  num += 2;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/6feca7dd.png)

把 "+=" 运算拆分开来相当于



```ini
  var num = 8;
  num = num + 2;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/27eb455c.png)



#### （三） 减法运算并赋值

减法运算并赋值就是先用左边的值减去右边的值然后把结果赋给左边，在 Dart 中用 "-=" 表示，

```ini
  var num = 8;
  num -= 2;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/db5de668.png)



把 "-=" 运算拆分开来相当于

```ini
  var num = 8;
  num = num - 2;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/49ce408a.png)



#### （三） 乘法运算并赋值

乘法运算并赋值就是先用左边的值和右边的值做乘法运算然后把结果赋给左边，在 Dart 中用 "*=" 表示，

```ini
  var num = 8;
  num *= 2;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/9b8aacfd.png)



把 "*=" 运算拆分开来相当于

```ini
  var num = 8;
  num = num * 2;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/55b2c0c7.png)



#### （四） 除法运算并赋值

除法运算并赋值就是先用左边的值除以右边的值然后把结果赋给左边，在 Dart 中用 "/=" 表示，

```ini
  var num = 8;
  num /= 2.2;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/cf02df13.png)



把 "/=" 运算拆分开来相当于

```ini
  var num = 8;
  num = num / 2.2;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/acd6aa85.png)



#### （五） 求余运算并赋值

求余运算并赋值就是先用左边的值对右边的值进行求余运算然后把结果赋给左边，在 Dart 中用 "%=" 表示，

```ini
  var num = 8;
  num %= 3;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/e9dd377c.png)



把 "%=" 运算拆分开来相当于

```ini
  var num = 8;
  num = num % 3;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/1031720a.png)



#### （六） 取整运算并赋值

取整运算并赋值就是先用左边的值除以右边的值取整数然后把结果赋给左边，在 Dart 中用 "~/=" 表示，

```ini
  var num = 8;
  num ~/= 2.2;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/e1c15640.png)



把 "~/=" 运算拆分开来相当于

```ini
  var num = 8;
  num = num ~/ 2.2;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/8846a592.png)



#### （七） 左移运算并赋值

左移运算并赋值就是先用左边的值的二进制位向左移动右边值个位，得到的结果赋给左边，在 Dart 中用 "<<=" 表示，

```ini
  var num = 8;
  num <<= 2;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/aae16884.png)



把 "<<=" 运算拆分开来相当于

```ini
  var num = 8;
  num = num << 2;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/a43b7700.png)



#### （八） 右移运算并赋值

右移运算并赋值就是先用左边的值的二进制位向右移动右边值个位，得到的结果赋给左边，在 Dart 中用 ">>=" 表示，

```ini
  var num = 8;
  num >>= 2;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/37a44da1.png)



把 ">>=" 运算拆分开来相当于

```ini
  var num = 8;
  num = num >> 2;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/ff95e765.png)



#### （九） 按位与运算并赋值

按位与运算并赋值就是先用左边的值的二进制对右边的值的二进制进行按位与运算然后把结果赋给左边，在 Dart 中用 "&=" 表示，

```ini
  var num = 5;
  num &= 22;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/7fa33549.png)



把 "&=" 运算拆分开来相当于

```ini
  var num = 5;
  num = num & 22;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/67cac184.png)



#### （十） 按位或运算并赋值

按位或运算并赋值就是先用左边的值的二进制对右边的值的二进制进行按位或运算然后把结果赋给左边，在 Dart 中用 "|=" 表示，

```ini
  var num = 5;
  num |= 22;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/a168c31d.png)



把 "|=" 运算拆分开来相当于

```ini
  var num = 5;
  num = num | 22;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/0dd83809.png)



#### （十一） 按位异或运算并赋值

按位异或运算并赋值就是先用左边的值的二进制对右边的值的二进制进行按位异或运算然后把结果赋给左边，在 Dart 中用 "^=" 表示，

```ini
  var num = 8;
  num ^= 2;
  print('num = $num');
复制代码
```



![截图](./FILES/dart_give_value.md/fc09c178.png)



把 "^=" 运算拆分开来相当于

```ini
  var num = 8;
  num = num ^ 2;
  print('num = $num');
复制代码
```