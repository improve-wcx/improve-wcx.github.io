# git常用命令

- git中文乱码
```text
git config --global core.quotepath false
```
- reset常用
```text
git reset [--soft | --mixed | --hard] [<commit>]

--soft：会保留更改内容，暂存区和 HEAD 指向的当前分支的引用都不会改变。
--mixed：是默认选项，会保留更改内容，但是暂存区的内容会被清空到工作目录。
--hard：不保留任何更改，包括工作目录和暂存区的内容都会回滚到指定的 <commit> 状态。
```

- tag
1. `git tag <name>`就可以打一个新标签:
2. 可以用命令`git tag`查看所有标签:
3. 默认标签是打在最新提交的commit上的。把标签打在特定版本上， `git  tag v0.9 471fd27`。
4. 命令`git tag`查看标签：注意，标签不是按时间顺序列出，而是按字母排序的。
5. 可以用`git show <tagname>`查看标签信息：

6. 上面我们打的tag是轻量级的也就是一般的tag没有注释，下面看看有注释的标签
- 创建带有说明的标签，用-a指定标签名，-m指定说明文字：
`git tag -a v0.1 -m "version 0.1 released push url" d5a65e9`

7. 把本地仓库分支tag推送到远程服务器
默认情况下，git push并不会把tag标签传送到远端服务器上，只有通过显式命令才能分享标签到远端仓库。
`git push origin [tagname]`

8. push所有tag，命令格式为：
```text
git push [origin] --tags
git push --tags
或
git push origin --tags
```
当远程有多个服务的时候远程服务名称是必须的，而如果远程只有一个远程服务则远程服务名称可以省略。

9. 通过标签恢复代码
- 查看标签的详情，找出打标签的那次提交的commit id
- 版本回退（将主干分支回退到某个版本）
git reset --hard d5a65e
注意把d5a65e换成你的commid id。回退完毕,其实就是把head指针指向了制定版本位置

- 从当前tag拉分支

当我们一次迭代上线前会对master分支打一个tag,这个tag作为回滚备份，然后将新需求分支合并到master在用master代码上线，如果最新master出现问题则我们可以从最新tag拉取分支。
(1) 切换到具体tag
`git checkout tag_name `
(2) 从tag拉取新分支
`git branch <new-branch-name> <tag-name>`
（3）从tag拉取新分支
`git checkout -b branch_name tag_name`
切换到具体tag后使用2、3两种方式都能从当前tag拉取新分支，然后基于该分支进行bugfix,修复后可以再次合并到master;

10. 查看当前分支提交的log日志
`git  log`
可以看到只有第一次的提交记录了，因为这个时候版本回退了git log是查不到第三次提交记录的，怎么办呢，怎么才能回去呢？ 
我们用下面这个命令：
`git reflog`
git reflog 相比git log能查询更多的日志信息，两个的具体区别之后再详细学习，反正使用git reflog 能查询到所有的日志commit id即使是删除的。

11. git log和git reflog 的区别
git reflog 可以查看所有分支的所有操作记录（包括commit和reset的操作），包括已经被删除的commit记录，git log则不能察看已经删除了的commit记录




