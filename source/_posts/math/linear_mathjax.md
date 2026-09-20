---
title: 线性代数
date: 2026-09-15 11:05:57
mathjax: true
-------------

## 矩阵快速幂
有结合律的东西就能够快速幂，所以矩阵也可以快速幂。

##### 模板
比较优美的写法是重载运算符，给一个针对方阵的实现。
```cpp
struct mat{
    int n,p,a[N][N];
    mat(int nn,int m):n(nn),p(m){memset(a,0,sizeof a);}
    void init(){
        for(int i=1;i<=n;i++)
            a[i][i]=1;
        return ;
    }
    int * operator[](int x){return a[x];}
    const int * operator[](int x)const{return a[x];}
    mat operator*(const mat &B)const{
        mat res(n,p);
        for(int k=1;k<=n;k++)
            for(int i=1;i<=n;i++)
                for(int j=1;j<=n;j++)
                    (res[i][j]+=a[i][k]*B[k][j]%p)%=p;
        return res;
    }
    mat operator+(const mat &B)const{
        mat res(n,p);
        for(int i=1;i<=n;i++)
            for(int j=1;j<=n;j++)
                res[i][j]=(a[i][j]+B[i][j])%p;
        return res;
    }
    void print(){
        for(int i=1;i<=n;i++,cout<<"\n")
            for(int j=1;j<=n;j++)
                cout<<a[i][j]<<" ";
        return ;
    }
};
mat qpow(mat A,int k){
    mat ans=A;k--;
    while(k){
        if(k&1)ans=ans*A;
        A=A*A,k>>=1;
    }
    return ans;
}
```

#### 例题
##### [P10502 Matrix Power Series](https://www.luogu.com.cn/problem/P10502)
$\small{Date:\text{2026/07/11}}$

直接分治，套矩阵快速幂即可，复杂度 $O(n \log^2 n)$，快速幂可以预处理，优化到 $O(n \log n)$。

```cpp
#include<bits/stdc++.h>
using namespace std;
const int N=35;
struct mat{
...
};
int n,m,k;
mat qpow(mat A,int k){
    mat ans=A;k--;
    while(k){
        if(k&1)ans=ans*A;
        A=A*A,k>>=1;
    }
    return ans;
}
mat a(0,0);
mat get(int k){
    if(k==1)return a;
    mat b=get(k/2);
    b=b+qpow(a,k/2)*b;
    if(k%2)b=b+qpow(a,k);
    return b;
}
int main(){
    ios::sync_with_stdio(0);cin.tie(0);
    cin>>n>>k>>m;
    a.n=n,a.p=m;
    for(int i=1;i<=n;i++)
        for(int j=1;j<=n;j++)
            cin>>a[i][j];
    get(k).print();
    return 0;
}
```

##### [P3702 [SDOI2017] 序列计数](https://www.luogu.com.cn/problem/P3702)
$\small{Date:\text{2026/07/11}}$

容斥原理，用总的减去没有质数的。

设 $dp_{i,j}$ 表示已经选了 $i$ 个数，和 $\bmod p$ 为 $j$ 的方案数。

$$dp_{i,j}=\sum_{k=0}^p dp_{i-1,k}\times num_{((j-k)\bmod p+p)\bmod p}$$

其中 $num_i=\sum_{j=1}^m [j \bmod p=i]$

对于没有质数的 $dp$ 同理，$num$ 只有非质数要计数。

把 $num$ 预处理出来，矩阵快速幂即可。

##### [P3216 [HNOI2011] 数学作业](https://www.luogu.com.cn/problem/P3216)
$\small{Date:\text{2026/07/11}}$

递推式子显而易见：
$$f_{i+1}=f_i\times 10^{\lg (i+1)+1}+i+1$$

运用矩阵快速幂优化，发现 $10^{\lg (i+1)+1}$ 会发生变化，于是拆成 18 个矩阵即可，需要注意的是矩阵乘法没有交换律，所以 18 个矩阵的顺序不能搞混。

## 高斯消元

#### 例题

##### [P4457 [BJOI2018] 治疗之雨](https://www.luogu.com.cn/problem/P4457)
$\small{Date:\text{2026/07/12}}$

怎么我刚做完就降紫了qwq

**简要题意**：你有一个初始值为 $p$ 的变量，上限为 $n$，定义一轮操作为： 
>1.若 $p$ 没有达到上限，$\frac{1}{m+1}$ 的概率将变量加一。  
>2.进行 $k$ 次，每次有 $\frac{1}{m+1}$ 的概率将变量减一。

求变量变为 $0$ 的期望轮数。

期望方程不难写出，但注意到 $n$ 有 1500，直接高消显然会死，观察一下这个矩阵，会发现它大概长这样

1 1 0 0 0 0 ……

1 1 1 0 0 0 ……

1 1 1 1 0 0 ……

1 1 1 1 1 0 ……

会发现它的主对角线之上只有一个变量的系数不为1，因此我们可以两行两行的向下消，最后削成这个样子

1 1 0 0 0 0 ……

0 1 1 0 0 0 ……

0 0 1 1 0 0 ……

0 0 0 1 1 0 ……

0 0 0 0 1 1 ……

然后从最后一行往上消回去即可。

### 矩阵求逆
矩阵 $A$ 的逆 $A^{-1}$ 为满足 $A \cdot A^{-1}=I$，其中 $I$ 为单位矩阵

考虑直接对 $A$ 做高斯消元，并且把过程中对 $A$ 的所有操作，同步到单位矩阵 $I$ 上，最终当 $A$ 变为单位矩阵时，$I$ 会变为 $A$ 的逆矩阵。

特别的，如果矩阵 $A$ 无法被消元成单位矩阵，那么矩阵 $A$ 没有逆矩阵。

### 行列式
对于任意的一个 $n\times n$ 的矩阵 $A$，$\det(A)$ 可视作从矩阵到数的映射。

令 $S_n$ 表示由 $n$ 个数组成的排列所构成的集合。
$$\det(A)=\sum_{p \in S_n} \text{sign}(p)\prod_{i=1}^n a_{i,p_i}$$

其中 $\text{sign}(p)$ 表示 $(-1)^k$ , $k$ 为排列 $p$ 中的逆序对数量。

#### 计算矩阵的行列式
直接暴力算显然不太可做。

我们考虑矩阵的基本变换会对行列式带来什么影响。

- 交换任意两行，行列式变为相反数
- 对某一行整体加上 $k$ 倍另一行的值，行列式不变

那么我们直接对矩阵进行高斯消元，但是没有必要将主元化为 $1$，统计交换任意两行的次数。

最终结果是一个上三角矩阵，显然一个上三角矩阵的行列式 $\det(A')=\prod_{i=1}^n a_{i,i}$。

那么我们就在 $O(n^3)$ 的时间复杂度下求出了，一个矩阵的行列式。

## 行列式相关定理
### Cauchy-Binet 定理
$ det(AB)=\sum_{S}{det(A_S)det(B_S)}$，通俗来讲，对于 $n\times m$ 的矩阵 $A$ 和一个 $m\times n$ 的矩阵 $B$，相乘会得到一个 $n\times n$ 的矩阵，考虑从 $A$ 中选出 $n$ 列组成一个 $n\times n$ 的矩阵 $A'$，从 $B$ 中选出 $n$ 行组成一个 $n\times n$ 的矩阵 $B'$，则 $det(AB)$ 就会等于所有这样的 $A',B'$ 的 det 的乘积之和。具体证明就是拆拆爆，左右两边全部拆拆拆，搞成一样的就完了。

证明中会用到一个很 nb 的trick(至少我认为): 对于形如下图的连边，我们把中间的那组点去掉，使左右两部分点直接相连，连边所产生的 **边** 之间的 **交点** 的 **奇偶性** 不变。(浅蓝色边为原有边，深蓝色边为新增边)
![img](https://img2024.cnblogs.com/blog/3357233/202607/3357233-20260714200536025-1683309967.png)

### 生成树计数
定义关联矩阵 $G=(g_{ij})_{n\times m}$ ，满足 $g_{u_i,i}=1,G_{v_i,i}=-1$ ，注意到每一列恰有一个 1 和一个 -1，显然这个矩阵并不满秩。考虑删去其中的任意一行得到矩阵 $A\in \R^{(n-1)\times m}$ ，对于大小为 $n-1$ 的边集 $S$ 所对的矩阵为 $A_S$，则有：

$$
det^2(A_S)=
\begin{cases}
1,& \text{s为生成树}\\
0,& \text{else}
\end{cases}
$$

因此有：$\sum_S{det^2(A_S)}=\text{生成树个数}$ 。定义 $A_T$ 为矩阵 $A$ 的转置矩阵（旋转九十度后的矩阵），显然有 $det(A)=det(A_T)$ ，则 $det^2(A_S)=det(A_S)det(A_S^T)$ ，由 $Cauchy-Binet$ 可得：

$$
\sum_S{det(A_S)det(A_S^T)}=det(AA^T)
$$

所以 $det(AA^T)=\text{生成树个数}$ 。  注意到 $(AA^T)_{ii}=d_i$ 。在此基础上，拉普拉斯矩阵 $L(G)=D(G)-A(G)$ ,其中 $D(G)$ 为有向图 $G$ 的每个点的出度的对角矩阵，$A(G)$ 则表示邻接矩阵，如果有权就当成有 $val$ 条重边。（当然，边权也可以是函数或多项式）  
然后我们有 $L'=AA^T$ ，其中 $L'$ 为将 $L$ 删去任意一行一列后的矩阵。

#### 例题
##### [P4336 [SHOI2016] 黑暗前的幻想乡](https://www.luogu.com.cn/problem/P4336)
$\small{Date:\text{2026/07/13}}$

容斥，钦定用那几个公司的边，跑一遍生成树计数做完了。$O(2^nn^3)$
