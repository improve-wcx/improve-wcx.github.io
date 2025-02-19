# 标准库之itertools

`itertools` 是 `Python` 的标准库之一，它提供了用于生成排列、组合、笛卡尔积等迭代器的函数。

以下是一些使用 `itertools` 进行排列组合操作的例子：

### 排列
```python
from itertools import permutations

items = [1, 2, 3]
for p in permutations(items):
    print(p)

```

### 组合

```python
from itertools import combinations

items = [1, 2, 3]
for c in combinations(items, 2):  # 2 表示要选择的元素数量
    print(c)

```

### 笛卡尔积（Cartesian Product）

```python
from itertools import product

items = [1, 2, 3]
for p in product(items, repeat=2):  # repeat=2 表示重复的次数
    print(p)

```

### 组合带重复（Combinations with Replacement）

```python
from itertools import combinations_with_replacement

items = [1, 2, 3]
for c in combinations_with_replacement(items, 2):
    print(c)

```
这些函数返回的是迭代器，可以用来生成所有可能的排列或组合，而不需要预先计算和存储所有的结果，
这样可以节省内存并提高效率。如果你需要将这些迭代器转换为列表，可以使用 `list()` 函数。