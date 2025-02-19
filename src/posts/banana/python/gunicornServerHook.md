## gunicorn server hook 说明

## Server Hooks



### `on_starting`

**Default:**

```python
def on_starting(server):
    pass
```

Called just before the master process is initialized.

The callable needs to accept a single instance variable for the Arbiter.



### `on_reload`

**Default:**

```python
def on_reload(server):
    pass
```

Called to recycle workers during a reload via SIGHUP.

The callable needs to accept a single instance variable for the Arbiter.



### `when_ready`

**Default:**

```python
def when_ready(server):
    pass
```

Called just after the server is started.

The callable needs to accept a single instance variable for the Arbiter.



### `pre_fork`

**Default:**

```python
def pre_fork(server, worker):
    pass
```

Called just before a worker is forked.

The callable needs to accept two instance variables for the Arbiter and new Worker.



### `post_fork`

**Default:**

```python
def post_fork(server, worker):
    pass
```

Called just after a worker has been forked.

The callable needs to accept two instance variables for the Arbiter and new Worker.



### `post_worker_init`

**Default:**

```python
def post_worker_init(worker):
    pass
```

Called just after a worker has initialized the application.

The callable needs to accept one instance variable for the initialized Worker.



### `worker_int`

**Default:**

```python
def worker_int(worker):
    pass
```

Called just after a worker exited on SIGINT or SIGQUIT.

The callable needs to accept one instance variable for the initialized Worker.



### `worker_abort`

**Default:**

```python
def worker_abort(worker):
    pass
```

Called when a worker received the SIGABRT signal.

This call generally happens on timeout.

The callable needs to accept one instance variable for the initialized Worker.



### `pre_exec`

**Default:**

```python
def pre_exec(server):
    pass
```

Called just before a new master process is forked.

The callable needs to accept a single instance variable for the Arbiter.



### `pre_request`

**Default:**

```python
def pre_request(worker, req):
    worker.log.debug("%s %s" % (req.method, req.path))
```

Called just before a worker processes the request.

The callable needs to accept two instance variables for the Worker and the Request.



### `post_request`

**Default:**

```python
def post_request(worker, req, environ, resp):
    pass
```

Called after a worker processes the request.

The callable needs to accept two instance variables for the Worker and the Request.



### `child_exit`

**Default:**

```python
def child_exit(server, worker):
    pass
```

Called just after a worker has been exited, in the master process.

The callable needs to accept two instance variables for the Arbiter and the just-exited Worker.

*New in version 19.7.*



### `worker_exit`

**Default:**

```python
def worker_exit(server, worker):
    pass
```

Called just after a worker has been exited, in the worker process.

The callable needs to accept two instance variables for the Arbiter and the just-exited Worker.



### `nworkers_changed`

**Default:**

```python
def nworkers_changed(server, new_value, old_value):
    pass
```

Called just after *num_workers* has been changed.

The callable needs to accept an instance variable of the Arbiter and two integers of number of workers after and before change.

If the number of workers is set for the first time, *old_value* would be `None`.



### `on_exit`

**Default:**

```python
def on_exit(server):
    pass
```

Called just before exiting Gunicorn.

The callable needs to accept a single instance variable for the Arbiter.