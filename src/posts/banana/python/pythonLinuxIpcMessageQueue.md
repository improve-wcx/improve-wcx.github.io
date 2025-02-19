## python Linux ipc通信之消息队列实例

#### 消费端

```python
import posix_ipc
import selectors

# This program uses `posix_ipc` together with the `selectors`library from the
# Python standard library. `selectors` provides "high-level I/O multiplexing" akin to having an event library.

# The message queue is created as usual
mq = posix_ipc.MessageQueue("/python_ipc_test", flags=posix_ipc.O_CREAT,
                            max_messages=1024, max_message_size=1024 * 1024)
mq.block = False

# Function is defined to handle events on the queue
counter = 0


def accept(message_queue, mask):
    global counter
    (msg, prio) = message_queue.receive()
    counter += 1
    print(f" \r{len(msg)}, Priority:{prio},{counter}", end="")

    # print("Message: ", msg)
    # print("Priority: ", prio)

# The selector can now be created...

sel = selectors.DefaultSelector()

# ... and the message queue is registered. Other event sources could also be
# registered simultaneously, but for now we stick to the queue

sel.register(mq, selectors.EVENT_READ, accept)

# `.select()` will block until an event is triggered
while True:
    try:
        events = sel.select()
        for key, mask in events:
            # `.data` contains the third argument from `.register` above -- we use it for the callback.
            callback = key.data
            callback(key.fileobj, mask)
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        break
    finally:
        ""

# With the message successfully received, we can unlink and close.

mq.unlink()
mq.close()

```



#### 生产端

```python
import time
import traceback
import posix_ipc

# This program opens the message queue and sends a message

mq = posix_ipc.MessageQueue("/python_ipc_test")
mq.block = True

counter = 0

s_time = time.time()
for i in range(500000):
    try:
        mq.send("1" * 1024*5)
        counter += 1
        print(f'\r send counter:{counter}', end="")
    except Exception as e:
        print(traceback.format_exc())
    finally:
        ""
print("")
print(f"use time: {time.time() - s_time}")

```

