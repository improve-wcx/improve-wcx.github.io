# k8s编写yml

## yml语法

## 字段类型

- `<String>`
- `<[]String>`
- map
- `<Object>`
- `<[]Object>`

### 类型是如何确定的？

- 命令
    - explain命令
        `kubectl explain pod.spec.containers`
    - help
      `kubectl create --help`
    - dry-run
      不启动，只是验证命令
      `kubectl create deployment web666 --image=nginx --replicas=3 -n test --dry-run=client -o yaml`

## VSCode工具生成和编写
  VSCode安装拓展：
  - `Kubernets Templates`： 帮助你轻松编写、管理k8s YAML文件
  - `YAML`提供高亮和语法检查


- devops
- 工程建设与工具化  Linux Ansible Jenkins Prometheus Git ELK
- 网站架构 Nginx LVS Mysql Tomcat 微服务
- 平台化运维 Python Go 前端开发 K8s平台 CMDB 发布系统
- Docker Kubernets lstio Ceph 网络





## 命令介绍

kubectl scale 命令**用于修改 Deployment、ReplicaSet 或 StatefulSet 中的副本数。

**语法：**

```
kubectl scale --replicas=<NUM> <RESOURCE> <NAME>
```

**参数：**

- **--replicas (必填)：**要设置的副本数。
- **<RESOURCE>：**要缩放的资源类型，可以是 Deployment、ReplicaSet 或 StatefulSet。
- **<NAME>：**要缩放的资源的名称。

**示例：**

将名为 "my-deployment" 的 Deployment 扩展到 5 个副本：

```
kubectl scale --replicas=5 deployment my-deployment
```

将名为 "my-replicaset" 的 ReplicaSet 缩减到 2 个副本：

```
kubectl scale --replicas=2 replicaset my-replicaset
```

将名为 "my-statefulset" 的 StatefulSet 扩展到 4 个副本：

```
kubectl scale --replicas=4 statefulset my-statefulset
```

**注意：**

- 使用 `kubectl scale` 命令时，**当前副本数**不会被立即更改。Kubernetes 将创建一个滚动更新操作，该操作将逐步将副本数更改为指定的值。
- 在缩减副本数时，请确保剩余的副本具有足够的容量来处理工作负载。
- `kubectl scale` 命令还可以用于设置资源请求和限制，但这已弃用，应使用 `kubectl set resources` 命令。



















