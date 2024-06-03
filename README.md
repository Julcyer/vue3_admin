# 后台管理模板

项目在线地址：http://julcy.top/

## 介绍

vue-admin 是一个基于 Vue3+Vite 搭建的商城运营平台模板，实现在运营场景中，人员角色分配和权限管理。提供商品管理功能，对商品的品牌、属性、SPU 以及 SKU 进行管理。使用 Element-plus 组件库搭建页面，实现黑夜模式的切换和主题颜色的更改。

## 软件架构

Vite + Vue3 + Ts + Element-plus + Pinia + Sass

## 安装教程

#### 安装 pnpm

```
npm i -g pnpm
```

#### 项目初始化命令

```
pnpm create vite
```

#### 项目所有依赖

```
pnpm install

pnpm install element-plus @element-plus/icons-vue

pnpm install vite-plugin-svg-icons -D

pnpm install -D vite-plugin-mock mockjs

pnpm install axios

pnpm install vue-router

pnpm i pinia

pnpm i nprogress

pnpm i lodash

```

#### 启动本地测试项目

```
pnpm run dev
```

#### 打包

```
pnpm run build
```
