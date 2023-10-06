# OIPDL-Frontend
深度学习分类模型可解释平台-前端

# 分支管理
请大家新建分支后，在自己的分支上进行开发功能，功能完成之后再提交pull request进行合并。

**不要直接提交到main分支**

如果分支要进行`pull`操作，但是本地有更改，要记得先把本地更改进行`commit`，不然本地代码会被覆盖

## 开发参照

每个页面在`pages`文件夹下，单独建立一个页面文件夹，用于存储页面相关文件（内起文件夹`assets`存放图片，`components`存放只在当前页面使用的组件）。为了避免文件夹冗余，如果有几个相关页面，也可以在外面套一个文件夹，如：用户的注册和登录界面可以放一块。

[//]: # (最好每个页面单独写一个README在其目录下用于介绍)
## 新建页面的步骤
1. 在`pages`中新建文件夹，参照`example`文件夹
2. 在[router/index.js](./src/router/index.js)中定义该页面的路由
3. 运行项目之后，在地址拦输入入对应地址，即可访问调试，如`example`为`http://localhost:8080/#/example`

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
