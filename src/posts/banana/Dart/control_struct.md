# Dart学习-控制流语句


[你需要一台永动机](https://www.jianshu.com/u/984fc7a6d527)关注IP属地: 福建



你可以使用以下任一项来控制Dart代码的流程:

- if 和 else
- for循环
- while 和 do-while 循环
- break 和continue
- switch 和case
- assert

你也可以使用try-catch和throw来语句

------

## if 和 else

dart支持带有可选else语句的if语句，如下一个示例所示。



```dart
if (isRaining()) {
  you.bringRainCoat();
} else if (isSnowing()) {
  you.wearJacket();
} else {
  car.putTopDown();
}
```

与JavaScript不同，条件必须使用布尔值，而不是其他值。

------

## For循环

你可以使用循环的标准迭代。例如:



```dart
var message = StringBuffer('Dart is fun');
for (var i = 0; i < 5; i++) {
  message.write('!');
}
```

for循环中的闭包捕获索引的值，避免了js中常见的陷阱。例如:



```dart
var callbacks = [];
for (var i = 0; i < 2; i++) {
  callbacks.add(() => print(i));
}
callbacks.forEach((c) => c());
```

如预期的，输出是0，然后是1。相比之下，这个例子在js打印2，然后打印2。

如果要迭代的对象是可迭代的，则可以使用`forEach()`方法。如果不需要知道当前迭代计数器，使用`forEach()`是一个很好的选择:



```dart
candidates.forEach((candidate) => candidate.interview());
```

List和Set等可迭代类也支持迭代的形式:



```dart
var collection = [0, 1, 2];
for (var x in collection) {
  print(x); // 0 1 2
}
```

------

## While 和 do-while

`while`循环会在循环之`前`判断条件是否满足,满足继续循环:



```dart
while (!isDone()) {
  doSomething();
}
```

`do-while`会在循环之`后`判断条件是否满足,满足继续循环：



```dart
do {
  printLine();
} while (!atEndOfPage());
```

Break 和 continue
使用`break`停止循环:



```dart
while (true) {
  if (shutDownRequested()) break;
  processIncomingRequests();
}
```

使用continue跳到下一个循环迭代:



```dart
for (int i = 0; i < candidates.length; i++) {
  var candidate = candidates[i];
  if (candidate.yearsExperience < 5) {
    continue;
  }
  candidate.interview();
}
```

如果使用List或Set之类的迭代类，你可以用不同的方式编写该示例：



```dart
candidates
    .where((c) => c.yearsExperience >= 5)
    .forEach((c) => c.interview());
```

------

## Switch 和 case

Dart中的switch语句使用`==`，比较整数、字符串或编译时常量。比较的对象必须都是同一个类的实例(而不是其任何子类型的实例)，并且该类不能重写`==`。

> 注: Dart中的Switch语句是针对有限的情况，例如interpreters或scanners。

通常，每个非空`case`子句以`break`语句结尾。结束非空`case`子句的其他方法有`continue`、`throw`或`return`语句。

当没有`case`子句匹配时，使用`default`子句执行代码:



```dart
var command = 'OPEN';
switch (command) {
  case 'CLOSED':
    executeClosed();
    break;
  case 'PENDING':
    executePending();
    break;
  case 'APPROVED':
    executeApproved();
    break;
  case 'DENIED':
    executeDenied();
    break;
  case 'OPEN':
    executeOpen();
    break;
  default:
    executeUnknown();
}
```

以下示例省略了`case`子句中的`break`语句，因此发生错误:



```dart
var command = 'OPEN';
switch (command) {
  case 'OPEN':
    executeOpen();
    // 错误: 缺失 break

  case 'CLOSED':
    executeClosed();
    break;
}
```

然而，Dart确实支持空的case子句，并允许使用从一个case到另一个case的贯穿形式：



```dart
var command = 'CLOSED';
switch (command) {
  case 'CLOSED': // Empty case 可以通过
  case 'NOW_CLOSED':
    //  CLOSED 和 NOW_CLOSED 都可以运行
    executeNowClosed();
    break;
}
```

如果你真的想要这种贯穿方式，你可以使用continue语句和标签:



```dart
var command = 'CLOSED';
switch (command) {
  case 'CLOSED':
    executeClosed();
    continue nowClosed;
  // Continues 执行nowClosed 标签 .

  nowClosed://这就是标签
  case 'NOW_CLOSED':
    //  CLOSED 和 NOW_CLOSED 都可以运行
    executeNowClosed();
    break;
}
```

case子句可以有局部变量，这些变量仅在该子句的范围内可见。

------

## Assert

如果布尔条件为false，则使用assert语句中断正常执行。在本教程中，你可以找到assert语句的示例。以下是更多:



```dart
// 确保变量具有非空值。
assert(text != null);

// 确保该值小于100。
assert(number < 100);

// 确保这是一个https网址。
assert(urlString.startsWith('https'));
```

> 注：Assert语句在生产代码中不起作用；它仅仅用于开发。Flutter在debug模式下asserts可用。默认情况下，dartdevc等仅开发工具通常支持asserts。一些工具，如dart和dart 2js，通过命令行标志支持asserts: `--enable-asserts`。

若要将消息附加到assert，请添加字符串作为第二个参数。



```dart
assert(urlString.startsWith('https'),
    'URL ($urlString) should start with "https".');
```

在assert语句后面的括号中，你可以加入任何表示布尔值或者函数的表达式。如果表达式的值或者函数返回值true，则assert语句成功并继续执行代码。如果值为false，则assert语句失败并抛出一个异常。

> PS:本文**整理**自官方文档，若有发现问题请致邮 [caoyanglee92@gmail.com](mailto:caoyanglee92@gmail.com)