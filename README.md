### 简介
---
基于NodeJS的博客系统

### 系统优点
---
- 一键部署
- 页面美观

### 部署步骤
---
- 操作系统

```shell
Linux CentOS
```

- 安装 **NodeJS**

```shell
yum install nodejs
```

- 下载MongoDB

```shell
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel62-3.2.1.tgz
```

- 解压MongoDB

```shell
tar -zxvf mongodb-linux-x86_64-2.0.4.tgz
```

- 创建MongoDB数据目录

```shell
mkdir -p mongodbdata
mkdir -p mongodb_db
mkdir -p mongodb_logs
```
**mongodb_db**: 数据目录
**mongodb_logs**: 日志目录

- 进入MongoDB安装目录

```shell
cd mongodb-linux-x86_64-2.0.4/
```

- 后台启动MongoDB服务

```shell
nohup ./mongod --dbpath /root/mongodbdata/ 2>&1
```

- 安装 **Git**

```shell
yum install git
```

- 克隆项目到服务器

```shell
git clone https://github.com/ShrCheng/tblog.git
```

- **cd tblog** 进入目录,后台启动项目

```shell
nohup DEBUG=blog node ./bin/www 2>&1
```
- 浏览器访问UI

```html
http://localhost:3000
```
 
### 开发人员
---
- [ShrCheng](https://github.com/ShrCheng)
