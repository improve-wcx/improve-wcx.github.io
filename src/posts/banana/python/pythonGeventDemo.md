---
icon: pen-to-square
date: 2022-01-05
category:
  - python
tag:
  - 黄
---

# python gevent 使用实例

```python
from gevent import spawn,joinall,monkey;monkey.patch_all()

import time
def task(pid):
    """
    Some non-deterministic task
    """
    time.sleep(2)
    print('Task %s done' % pid)


def synchronous():
    for i in range(3):
        task(i)

def asynchronous():
    g_l=[spawn(task,i) for i in range(3)]
    joinall(g_l)

if __name__ == '__main__':
    print('Synchronous:')
    synchronous()

    print('Asynchronous:')
    asynchronous()
```

