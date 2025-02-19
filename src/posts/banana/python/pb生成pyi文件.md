# pb生成pyi文件

## 具体使用参考源码
```py
import sys
import re
import os
import jinja2

type2type ={
    "string": "str",
    "int32" : "int",
    "float": "float",
    "double": "float",
    "int64": "int",
    "uint32": "int",
    "uint64": "int",
    "sint32": "int",
    "sint64": "int",
    "fixed32": "int",
    "fixed64": "int",
    "sfixed32": "int",
    "sfixed64": "int",
    "bool": "bool",
    "bytes": "bytes"
}

base_type_set = set(type2type.values())
already_class = set()


imp_str = """#!/usr/bin/python3
# -*- coding:utf-8 -*-
import typing
from google.protobuf.message import Message
"""

message_tmplate='''
class {{name}}(Message):{% for col in cols %}
    {{col.name}} {{col.typing}}{% endfor %}

'''


class Field:
    def __init__(self, n="", t="") -> None:
        self.name :str = n
        self.typing :str = t
    
    @classmethod
    def parse_from_str(cls, field_str):
        fields = re.findall(r"^\s*(\S+)\s+(\S+)\s*=\s*\d+\s*;", 
                            field_str, flags=re.MULTILINE)
        for f in fields:
            t = type2type.get(f[0], f[0])
            return cls(f[1], f": {t}")
        
        fields = re.findall(r"^\s*optional\s+(\S+)\s+(\S+)\s*=\s*\d+\s*;", 
                            field_str, flags=re.MULTILINE)
        for f in fields:
            t = type2type.get(f[0], f[0])
            return cls(f[1], f": {t}")
        
        fields = re.findall(r"^\s*repeated\s+(\S+)\s+(\S+)\s*=\s*\d+\s*;", 
                            field_str, flags=re.MULTILINE)
        for f in fields:
            t = type2type.get(f[0], f[0])
            return cls(f[1], f": typing.List [{t}]")
        fields = re.findall(r"^\s*map<\s*(\S+)\s*,\s*(\S+)\s*>\s*(\S+)\s*=\s*\d+\s*;",
                             field_str, flags=re.MULTILINE)
        for f in fields:
            k = type2type.get(f[0], f[0])
            v = type2type.get(f[1], f[1])
            return cls(f[2], f": typing.Dict[{k}, {v}]")

class Message:
    def __init__(self, n="", f=list()) -> None:
        self.name : str = n
        self.fiels : list[Field] = f
    
    @classmethod
    def parse_from_str(cls, msg_str):
        name = re.findall(r"\s*message\s+(\S+)\s+{.*?}", msg_str, flags=re.DOTALL)
        if  name:
            name = name[0]
        fields = list()
        results = re.findall(r"^\s*\S+.*?\s*=\s*\d+\s*;", msg_str, flags=re.MULTILINE)
        for result in results:
            fields.append(Field.parse_from_str(result))
        return cls(name, fields)
    
    def code_render(self):
        template = jinja2.Template(message_tmplate)
        return template.render(name=self.name, cols=self.fiels)


class Proto:
    def __init__(self, n: str = "", m: list = list()) -> None:
        self.imp :str = imp_str
        self.name :str = n
        self.messages :list[Message] = m

    @classmethod
    def parse_from_file(cls, name, *args, **kwargs):
        proto_file = f"{name}.proto"
        if not os.path.exists(proto_file):
            raise Exception(f"{proto_file} not exist")
        messages = list() 
        with open(proto_file, mode="r", encoding="utf-8") as fd:
            proto_str = fd.read()
            msgs = re.findall(r"\s*(message\s+(\S+)\s+{.*?})", proto_str, flags=re.DOTALL)
            for msg in msgs:
                already_class.add(msg[1])
            for msg in msgs:
                messages.append(Message.parse_from_str(msg[0]))
        return cls(name, messages)
    
    def render_to_file(self):
        texts = [self.imp,]
        for msg in self.messages:
            texts.append(msg.code_render())
        
        with open(f"{self.name}_pb2.pyi", mode="w", encoding="utf-8") as fd:
            fd.write("\n".join(texts))
        os.system(f"protoc --python_out=. {self.name}.proto")
        

if __name__ == "__main__":
    proto = Proto.parse_from_file(*sys.argv[1:])
    proto.render_to_file()
```