# gitbook环境准备

```shell
# 安装nodejs, 因为gitbook根据依赖,且gitbook不再维护更新,需要node.js 10.21.0以下
# 下载并安装 https://nodejs.org/download/release/v10.12.0/
# 设置npm源
npm config set registry https://registry.npm.taobao.org
# 切换到官方源
npm config set registry http://www.npmjs.org
# 查看源
npm get registry


# 安装命令行工具
npm install -g gitbook-cli
# 会自动安装gitbook
gitbook -V

# 再次执行,提示这个版本说明安装成功了
# 因为已经停止维护了,最新的版本就是这个了.
gitbook -V
CLI version: 2.3.2
GitBook version: 3.2.3
```

# 创建项目

```shell
# 创建文件夹, 这个就是gitbook的项目目录
mkdir book

# 初始化
cd book
gitbook init

# 打包 默认打包到_book
gitbook build

# 启动服务, 默认_book
gitbook serve

# 访问默认地址
http://localhost:4000/
```

# 目录说明

```tex
# 项目创建,生成SUMMARY.md和README.md
SUMMARY.md    项目
README.md     首页
book.js    其实官方使用的是 book.json,我们使用npm管理,module.exports输出一个json
.bookignore    构建时忽略的文件,防止_book文件太大,多余的不进行打包
```

# 插件安装

```shell
npm install gitbook-plugin-search-pro
npm install gitbook-plugin-chapter-fold
npm install gitbook-plugin-sitemap
npm install gitbook-plugin-theme-lou
npm install gitbook-plugin-back-to-top-button
npm install gitbook-plugin-code
npm install gitbook-plugin-prism
```

# 文件内容

## book.js

```js
module.exports = {
    "title": "我的文档",
    "author": "tianv5",
    "description": "文档",
    "keywords": "学习,笔记,编程,代码,博客,文章,github",
    "introduction": {
        "path": "README.md",
        "title": "前言",
    },
    "variables": {
        "themeColor": "#3884ff",
        "themeLou": {
            // 顶部导航栏配置
            "nav": [
                {
                    "target": "_blank", // 跳转方式: 打开新页面
                    "url": "https://www.baidu.com",  // 跳转页面
                    "name": "百度"  // 导航名称
                }
            ]
        }
    },
    "plugins": [
        "-highlight",
        "-lunr",
        "-search",
        "-sharing",
        "-livereload",
        "search-pro",
        "chapter-fold",
        "sitemap",
        "theme-lou",
        "back-to-top-button",
        "code",
        "prism"
    ],
    "pluginsConfig": {
        "chapter-fold": {},
        "theme-lou": {
            "color": "#5F9EA0", // 主题色
            "favicon": "static/favicon.ico", // favicon图标
            "logo": "static/logo.png", // 顶部左侧图标
            "forbidCopy": false, // 页面是否禁止复制
            "search-placeholder": "全局搜索", // 搜索框默认文本
            "book-summary-title": "导航", // 目录标题
            "book-anchor-title": "本章目录标题", // 本章目录标题
            "hide-elements": [".summary .gitbook-link"],
            "imgStyle": {
                "isCenter": true, // 是否居中(默认为true)
                "isBox": false, // 是否有边框(默认为true)
                "otherStyle": 'max-width: 80%;', // 图片其他自定义CSS样式
            }
        },
        "sitemap": {
            "hostname": "https://tianv5.github.io/docs"
        },
        "prism": {
            "css": [
                "prismjs/themes/prism-okaidia.css"
            ],
            "lang": {
                "flow": "typescript"
            }
        }
    },
    "pdf":
        {
            "toc":
                true,
            "pageNumbers":
                true,
            "fontSize":
                12,
            "paperSize":
                "a4",
            "margin":
                {
                    "right":
                        62,
                    "left":
                        62,
                    "top":
                        36,
                    "bottom":
                        36
                }
        }
}
;
```

## .gitignore

```tex
.idea
_book
node_modules
```

## .bookignore

```tex
package.json
package-lock.json
.bookignore
.gitignore
```

## Summary.md

> 目录和文件不要有空格等特殊符号 不然目录跳转容易有问题

```markdown
# Summary

## 简介
* [前言](README.md)

## 中间件
* [ElasticSearch](blog/elk/elk.md)
    * [index,store,copy_to,enable的概念](blog/elk/mapping01.md) 

## 其他

* [gitbook教程](blog/gitbook教程/gitbook教程.md)
    * [插件的使用](blog/gitbook教程/插件的使用.md)
```