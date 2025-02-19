## 我看到的一个比较好的单例实现

### 前言

单例模式很常见，实现有很多地方值得优化，具体的优化历程，此处不多做赘述。
谨在此记录一个本人认为完善的，单例实现。具体实现思路使用Python实现。
其他语言也可以借鉴思路。

### python代码举例

```python
import time
import threading
class Singleton(object):
    _instance_lock = threading.Lock()

    def __init__(self):
        time.sleep(1)
       
    @classmethod
    def instance(cls, *args, **kwargs):
        if not hasattr(Singleton, "_instance"):
            with Singleton._instance_lock:
                if not hasattr(Singleton, "_instance"):
                    Singleton._instance = Singleton(*args, **kwargs)
        return Singleton._instance
  

```

