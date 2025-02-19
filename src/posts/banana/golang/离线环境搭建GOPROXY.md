## 离线环境搭建GOPROXY

#### 下载go项目的依赖包
导出项目需要的go.mod文件，放到联通外网环境的机器上。
外网机器配置GOMODCACHE

```SHELL
go env -w GOMODCACHE="C:\your\path\pkg\mod"
```

在go.mod所在的文件夹下，执行

```shell
go mod download
```



这样go.mod里的依赖包将会下载到$GOMODCACHE下，打包$GOMODCACHE/cache/download文件夹，生成download.zip包。使用文件摆渡传到云桌面。

#### 搭建内网环境文件服务
将download.zip文件导入服务器中，放到/export/package/go_download下。
登录服务器（例1.1.1.1），启动文件服务器

```shell
cd /export/package/go_download
python3 -m http.server 8003
```



需要下载go依赖包的项目设置GOPROXY=http://1.1.1.1:8010

```shell
go env -w GOPROXY=http://1.1.1.1:8010
```

开始下载go依赖包

```shell
go mod tidy
```




