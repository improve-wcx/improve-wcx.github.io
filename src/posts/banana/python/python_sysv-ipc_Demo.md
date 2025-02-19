## python  sysv-ipc 进程间通信的使用

#### 配置系统参数

打开系统配置添加如下配置

`sudo vim /etc/sysctl.conf `

```tex
kernel.msgmax=1048576
kernel.msgmnb=1048576
```



#### 系统参数生效

执行如下命令使修改生效

`sudo sysctl -p `

#### 系统参数生效确认

执行如下命令查看是否生效

`ipcs -l `

显示如下，则生效：

```tex
---------- 消息限制 -----------
系统最大队列数量 = 32000
最大消息尺寸 (字节) = 1048576
默认的队列最大尺寸 (字节) = 1048576

---------- 同享内存限制 ------------
最大段数 = 4096
最大段大小 (千字节) = 18014398509465599
最大总共享内存 (千字节) = 18014398509481980
最小段大小 (字节) = 1

--------- 信号量限制 -----------
最大数组数量 = 32000
每个数组的最大信号量数目 = 32000
系统最大信号量数 = 1024000000
每次信号量调用最大操作数 = 500
信号量最大值=32767
```



#### 消费端代码

```python
import sysv_ipc


mq_id = sysv_ipc.ftok("/tmp", 1)

try:
    mq = sysv_ipc.MessageQueue(mq_id)
except sysv_ipc.ExistentialError:
    print('''Message queue with key "{}" doesn't exist.'''.format(mq_id))
else:
    mq.remove()
    print('Message queue with key "{}" removed'.format(mq_id))


mq = sysv_ipc.MessageQueue(mq_id, sysv_ipc.IPC_CREX, max_message_size=1024*1024)

# Function is defined to handle events on the queue
counter = 0

while True:
    try:
        s, _ = mq.receive()
        counter += 1
        print(f" \r{len(s)}, Priority:{_},{counter}", end="")
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        break
    finally:
        ""


# With the message successfully received, we can unlink and close.

mq.remove()
```



#### 生产者

```python
import time
import traceback
import sysv_ipc


mq_id = sysv_ipc.ftok("/tmp", 1)

mq = sysv_ipc.MessageQueue(mq_id, max_message_size=1024*1024)
# mq.block = True

counter = 0
tmp_str = "1" * 1024*1000
s_time = time.time()
for i in range(500000):
    try:
        mq.send(tmp_str)
        counter += 1
        print(f'\r send counter:{counter}', end="")
    except Exception as e:
        print(traceback.format_exc())
    finally:
        ""
print("")
print(f"use time: {time.time() - s_time}")

```

