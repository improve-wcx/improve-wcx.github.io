## ubuntu环境下用C语言来拓展`python3`示例

1. 安装`python3-devel`

   `sudo apt -y install python38-devel`

2. 配置C语言`includepath`环境变量

   在 `bashrc` 或 bash_profile中添加环境变量，并使之生效

3. 编写C代码，新建文件 `spammoudle.c`

```c
   #define PY_SSIZE_T_CLEAN
   #include <Python.h>
   #include <stdlib.h>
   
       
   static PyObject *
   spam_system(PyObject *self, PyObject *args)
   {
       const char *command;
       int sts;
   
       if (!PyArg_ParseTuple(args, "s", &command))
           return NULL;
       sts = system(command);
       return PyLong_FromLong(sts);
   }
   
   static PyObject *SpamError;
   
   static PyMethodDef SpamMethods[] = {
       {"system",  spam_system, METH_VARARGS,
        "Execute a shell command."},
       {NULL, NULL, 0, NULL}        /* Sentinel */
   };
   
   static struct PyModuleDef spammodule = {
       PyModuleDef_HEAD_INIT,
       "spam",   /* name of module */
       "test module C", /* module documentation, may be NULL */
       -1,       /* size of per-interpreter state of the module,
                    or -1 if the module keeps state in global variables. */
       SpamMethods
   };
   
   
   PyMODINIT_FUNC
   PyInit_spam(void)
   {
       PyObject *m;
   
       m = PyModule_Create(&spammodule);
       if (m == NULL)
           return NULL;
   
       SpamError = PyErr_NewException("spam.error", NULL, NULL);
       Py_XINCREF(SpamError);
       if (PyModule_AddObject(m, "error", SpamError) < 0) {
           Py_XDECREF(SpamError);
           Py_CLEAR(SpamError);
           Py_DECREF(m);
           return NULL;
       }
   
       return m;
   }
   
   int
   main(int argc, char *argv[])
   {
       wchar_t *program = Py_DecodeLocale(argv[0], NULL);
       if (program == NULL) {
           fprintf(stderr, "Fatal error: cannot decode argv[0]\n");
           exit(1);
       }
   
       /* Add a built-in module, before Py_Initialize */
       if (PyImport_AppendInittab("spam", PyInit_spam) == -1) {
           fprintf(stderr, "Error: could not extend in-built modules table\n");
           exit(1);
       }
   
       /* Pass argv[0] to the Python interpreter */
       Py_SetProgramName(program);
   
       /* Initialize the Python interpreter.  Required.
          If this step fails, it will be a fatal error. */
       Py_Initialize();
   
       /* Optionally import the module; alternatively,
          import can be deferred until the embedded script
          imports it. */
       PyObject *pmodule = PyImport_ImportModule("spam");
       if (!pmodule) {
           PyErr_Print();
           fprintf(stderr, "Error: could not import module 'spam'\n");
       }
   
       PyMem_RawFree(program);
       return 0;
   }
   
```

4. 在模块目录下编写`setup.py`

```python
   from distutils.core import setup, Extension
   
   spam = Extension('spam',
                       sources = ['spammodule.c'])
   
   setup (name = 'spam',
          version = '1.0',
          description = 'This is a demo package',
          ext_modules = [spam])
```

5. 安装编写的模块

```shell
   python setup.py install
```

6. 测试使用编写的模块

```tex
   (venv) wangchenxi@lenovo:/var/history$ python
   Python 3.8.10 (default, Nov 26 2021, 20:14:08) 
   [GCC 9.3.0] on linux
   Type "help", "copyright", "credits" or "license" for more information.
   >>> import spam
   >>> spam.system('ls -l ')
   总用量 68
   -rw------- 1 wangchenxi wangchenxi   151 12月  6 18:40 wangchenxi-1000-2021-12-06.log
   -rw------- 1 wangchenxi wangchenxi   341 12月  7 19:02 wangchenxi-1000-2021-12-07.log
   -rw------- 1 wangchenxi wangchenxi   117 12月 11 02:38 wangchenxi-1000-2021-12-11.log
   -rw------- 1 wangchenxi wangchenxi   404 12月 13 23:18 wangchenxi-1000-2021-12-13.log
   -rw------- 1 wangchenxi wangchenxi   971 12月 16 23:35 wangchenxi-1000-2021-12-16.log
   -rw------- 1 wangchenxi wangchenxi    94 12月 17 00:22 wangchenxi-1000-2021-12-17.log
   -rw------- 1 wangchenxi wangchenxi  1449 12月 18 23:56 wangchenxi-1000-2021-12-18.log
   -rw------- 1 wangchenxi wangchenxi   651 12月 19 15:05 wangchenxi-1000-2021-12-19.log
   -rw------- 1 wangchenxi wangchenxi   801 12月 20 00:52 wangchenxi-1000-2021-12-20.log
   -rw------- 1 wangchenxi wangchenxi    98 1月   2 02:09 wangchenxi-1000-2022-01-02.log
   -rw------- 1 wangchenxi wangchenxi  5949 1月  15 16:04 wangchenxi-1000-2022-01-08.log
   -rw------- 1 wangchenxi wangchenxi 14882 1月  16 21:39 wangchenxi-1000-2022-01-16.log
   -rw------- 1 wangchenxi wangchenxi  1274 1月  17 22:19 wangchenxi-1000-2022-01-17.log
   0
   >>> 
```

7. 结语

   写这篇文档的目的，是为了把流程走通，具体的细节部分，留待后续仔细探究发现。