---
title: 数学基础
date: 2026-09-15 11:01:52
tags: 数学
mathjax: true
-------------

# Part1 高中数学

## 三角函数

$$
\sin(a+b)=\sin a\cos b+\cos a\sin b
$$

$$
\cos(a+b)=\cos a\cos b-\sin a\sin b
$$

$$
\cos(k\theta)+i\sin(k\theta)=(\cos\theta+i\sin\theta)^k
$$

## 向量

### 点积

> 降次

$$
\bm{a}\cdot\bm{b}=|\bm{a}||\bm{b}|\cos\theta
$$

若有两坐标 $(x_1,y_1),(x_2,y_2)$：

$$
(x_1,y_1)\cdot(x_2,y_2)=x_1x_2+y_1y_2
$$

通过上述二式，可以反推 $\cos\theta$。

如果两个向量垂直，其点积为 $0$。

### 叉积

> 升次

$$
|\bm{a}\times\bm{b}|=|\bm{a}||\bm{b}|\sin\theta
$$

$$
\bm{a}\times\bm{b}=x_1y_2-x_2y_1
$$

与面积相关。

如果两个向量平行，其叉积为 $0$。

## 导数

> 关于一个函数的切线的斜率的函数/刻画了变化趋势/一般用于降次

定义：

$$
f'(x)=\lim_{\Delta x\to0}\frac{f(x+\Delta x)-f(x)}{\Delta x}
$$

一些变换，推导不难。

若 $h(x)=f(x)+g(x)$，

$$
h'(x)=f'(x)+g'(x)
$$

若 $h(x)=f(x)g(x)$，

$$
h'(x)=f'(x)g(x)+f(x)g'(x)
$$

若 $h(x)=f(g(x))$，

$$
h'(x)=f'(g(x))\times g'(x)
$$

#### 常见导数

$$
(\sin x)'=\cos x
$$

$$
(\cos x)'=-\sin x
$$

$$
(a^x)'=a^x\ln a
$$

$$
(\log_a x)'=\frac{1}{x\ln a}
$$

$$
(x^a)'=ax^{a-1}
$$
