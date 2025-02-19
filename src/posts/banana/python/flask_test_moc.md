### 使用flask实现一个测试桩

### 项目路径

```text
testNode/
├── main.py
├── test_node.conf.json
├── tn_commands.py
└── tn_conf.py

```

### 配置文件 test_node.conf.json

```json
{
  "host": "127.0.0.1",
  "port": "13499",
  "routers": [
    {
      "service": "service_name",
      "route": {
        "args": [
          "/test"
        ],
        "kwargs": {
          "methods": [
            "GET",
            "POST"
          ],
          "endpoint": "endpoint"
        }
      },
      "response": {
        "headers": {},
        "body": {
          "date_from": "eval",
          "args": ["'hello test.'"],
          "kwargs": {}
        }
      }
    }
  ]
}
```

### tn_conf.py

```python
import json

test_node_obj = None


def get_conf_obj():
    global test_node_obj
    if test_node_obj:
        return test_node_obj
    with open('./test_node.conf.json', 'r') as fd:
        test_node_obj = json.load(fd)
    test_node_obj = type("tn", (object,), test_node_obj)
    return test_node_obj

```



### main.py

```python
from flask import Flask
from tn_conf import get_conf_obj

app = Flask(__name__)
conf_obj = get_conf_obj()

file_content = '''#! /user/bin/python
# -*- coding:utf-8 -*-
from flask import Blueprint, request
import tn_commands
user_bp = Blueprint("蓝图标识", __name__, url_prefix='/')
\n'''

for route in conf_obj.routers:
    args = route["route"]["args"]
    kwargs = route["route"]["kwargs"]
    func = route["response"]["body"]["date_from"]
    func_args = route["response"]["body"]["args"]
    func_kwargs = route["response"]["body"]["kwargs"]
    file_content = f'''{file_content}
@user_bp.route(*{args}, **{kwargs})
def {route["service"]}():
    return {func}(*{func_args}, **{func_kwargs})
\n\n'''

with open("all_route.py", "w", encoding="utf-8") as fd:
    fd.write(file_content)

from all_route import user_bp
app.register_blueprint(user_bp)

if __name__ == '__main__':
    app.run(conf_obj.host, conf_obj.port)

```



### tn_commands.py

```python
from flask import request


def from_file(file, encoding='utf-8'):
    with open(file, mode='r', encoding=encoding) as fd:
        return fd.read()

```

