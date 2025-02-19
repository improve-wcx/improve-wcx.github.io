## mysql的一些操作

### 加速导入
```text
# 关闭日志,0是关闭，1是开启
set sql_log_bin=OFF;
select @@sql_log_bin;

# 关闭autocommit自动提交模式 0是关闭  1 是开启（默认）
set autocommit=0;
select @@autocommit;

commit;和rollback;

# 还有因为autocommit是session级别的，我们重新登录，或者重新打开navicat中的查询页面，都需要单独设置。
就是说 在查询页面中执行插入语句 或者 在命令行导入时的场景，要记得手动设置提交。
```

```text
3.1 通过以下语句查看下当前packet的大小限制，下图显示笔者mysql默认支持64Mb大小的packet传输。
show variables like '%max_allowed_packet%';
或者
select @@max_allowed_packet;

3.2 MySQL 8.0单个packet可以允许的最大值是1GB，最小为1K。这里的最大 意味着您即使设置了2Gb，实际上也只能传输1Gb内的packet。 
# 数据换算：1073741824 = 1024 * 1024 * 1024 = 1Gb
set global max_allowed_packet = 1073741824;

3.3 然后查询下配置是否已生效, 切记 不要去重启mysql服务，重新打开navicat查询界面语句 查询下即可。
因为目前未将配置写入my.ini文件，重启mysql将导致配置失效，回退到原64Mb大小。
select @@max_allowed_packet;
```

### 常见操作

登录成功后执行如下命令

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!';
```

或者

```sql
set password for'root'@'localhost'=password('MyNewPass4!');
```

关于密码设置

如果只是修改为一个简单的密码，会报以下错误：

```sql
mysql>  ALTER USERUSER() IDENTIFIED BY '12345678';
```

```sql
ERROR 1819 (HY000): Your password does not satisfy thecurrent policy requirements
```

这个其实与validate_password_policy的值有关。

validate_password_policy有以下取值：

```plain
Policy  TestsPerformed
0 or LOW    Length
1 or MEDIUM     Length;numeric, lowercase/uppercase, and special characters
2 or STRONG       Length;numeric, lowercase/uppercase, and special characters; dictionary file
```

默认是1，即MEDIUM，所以刚开始设置的密码必须符合长度，且必须含有数字，小写或大写字母，特殊字符。

有时候，只是为了自己测试，不想密码设置得那么复杂，譬如说，我只想设置root的密码为123456。

必须修改两个全局参数：

首先，修改validate_password_policy参数的值

```sql
set global validate_password_policy=0;

Query OK, 0 rows affected (0.00 sec)
```

这样，判断密码的标准就基于密码的长度了。这个由validate_password_length参数来决定。

### 导入导出

**1.    导出数据和表结构：**

mysqldump -u用户名 -p密码数据库名 > 数据库名.sql

```plain
#/usr/local/mysql/bin/  

mysqldump -uroot -p abc > abc.sql
```

敲回车后会提示输入密码

**2.    只导出表结构**

mysqldump -u用户名 -p密码 -d 数据库名 > 数据库名.sql

```sql
#/usr/local/mysql/bin/
mysqldump -uroot -p -d abc > abc.sql
```

注：/usr/local/mysql/bin/ ---> mysql的data目录

**3.    导入数据库**

1、首先建空数据库

```sql
create database abc;
```

2、导入数据库

方法一：

（1）选择数据库

```sql
use abc;
```

（2）设置数据库编码

```sql
set names utf8;
```

（3）导入数据（注意sql文件的路径）

```sql
source /home/abc/abc.sql;
```

方法二：

```sql
mysql -u用户名 -p密码数据库名 < 数据库名.sql

mysql -uabc_f -p abc < abc.sql
```

### 常用设置

**1、 设置表格字符集**

举例如下：

```sql
CREATE TABLE `Customers` (

  `cust_id` char(10) NOT NULL,

  `cust_name` char(50) NOT NULL,

  `cust_address` char(50) DEFAULT NULL,

  `cust_city` char(50) DEFAULT NULL,

  `cust_state` char(5) DEFAULT NULL,

  `cust_zip` char(10) DEFAULT NULL,

  `cust_country` char(50) DEFAULT NULL,

  `cust_contact` char(50) DEFAULT NULL,

  `cust_email` char(255) DEFAULT NULL,

  PRIMARY KEY (`cust_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

