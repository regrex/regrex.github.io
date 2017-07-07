---
layout: _post
title: 技术杂－svg乱炖
date: 2017-07-06 16:31:37
tags: svg
---

![just for fun](http://imgh.us/basic.svg)
[点我查看原图](http://imgh.us/basic.svg)

<!-- more -->

## svg知识点小结
此文用于记录鄙人对svg的粗浅理解，跟svg相关的任何知识将持续在此更新

###  通用属性
- class
- style

### 显性元素
|元素名 | 描述 | 主要属性 | reference | 
|---|---|---|---|
| rect | 矩形 | x\y\width\height... | https://www.w3.org/TR/SVG/shapes.html#RectElement | 
| circle | 圆形 | cx\cy\r... | https://www.w3.org/TR/SVG/shapes.html#CircleElement | 
| ellipse | 椭圆 | cx\cy\rx\ry... | https://www.w3.org/TR/SVG/shapes.html#EllipseElement |
| line | 线 | x1\y1\x2\y2... | https://www.w3.org/TR/SVG/shapes.html#LineElement |
| polyline | 线集－开放 | points... | https://www.w3.org/TR/SVG/shapes.html#PolylineElement |
| polygon | 线集－封闭 | points... | https://www.w3.org/TR/SVG/shapes.html#PolygonElement |
| text | 文本 | x\y\dx\dy\textLength... | https://www.w3.org/TR/SVG/text.html#TextElement |
| tspan | inline文本 | x\y\dx\dy\textLength... | https://www.w3.org/TR/SVG/text.html#TSpanElement |
| image | 图片 | x\y\width\height\xlink:href... | https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/SVG_Image_Tag | 

### 非显性元素
| 类别 | 元素名 | 描述 | 主要属性 | reference | 
|---|---|---|---|---|
| 容器 | svg | svg根元素 | x\y\width\height\xmlns\xmlns:link... | https://www.w3.org/TR/SVG/struct.html#SVGElement |
| 容器 | g | 分组 | 通用属性 | https://www.w3.org/TR/SVG/struct.html#GElement |
| 容器 | defs | 定义 | 通用属性 | https://www.w3.org/TR/SVG/struct.html#DefsElement |
| 容器 | symbol | 定义 | preserveAspectRatio\viewBox... | https://www.w3.org/TR/SVG/struct.html#SymbolElement |
| 工具 | path | 路径 | d\pathLength... | https://www.w3.org/TR/SVG/paths.html#PathElement |
| 工具 | marker | 标记 | d\pathLength... | https://www.w3.org/TR/SVG/paths.html#PathElement |
| 工具 | use | 标记 | d\pathLength... |  |
| 动画 | animate | 动画 | ... | https://www.w3.org/TR/SVG/animate.html#AnimateElement |
| 动画 | animateMotion | 轨迹 | path\begin\dur\end\rotate... | https://www.w3.org/TR/SVG/animate.html#AnimateMotionElement |
| 动画 | animateTransform | 变换 | attributeName\type\begin\dur\additive... | https://www.w3.org/TR/SVG/animate.html#AnimateTransformElement |
| 动画 | set | 设置某段时间里属性值to另外一个值 | to\begin... | https://www.w3.org/TR/SVG/animate.html#SetElement |
| 装饰 | (具项)gradients | 渐变 | ... | https://www.w3.org/TR/SVG/pservers.html#Gradients |
| 装饰 | pattern | 填充图案 | ... | https://www.w3.org/TR/SVG/pservers.html#Patterns |
| 装饰 | clipPath | 裁剪路径 | ... | https://www.w3.org/TR/SVG/masking.html#ClippingPaths |
| 装饰 | mask | 遮罩 | ... | https://www.w3.org/TR/SVG/masking.html#Masking |
| 装饰 | filter | 滤镜 | ... | https://www.w3.org/TR/SVG/filters.html#FilterElement |
### 路径指令
除基本操作不区分大小写，其他大写表示绝对位移，小写表示相对位移

- 基本操作
	- M：移动，(x,y)+
	- Z：闭合
- 直线
	- L\l：lineto，(x,y)+
	- H\h：horizontal lineto (x)+
	- V\v：vertical lineto (y)+
- 弧线
	- A\a：a segment of an ellipse  (rx,ry x-axis-rotation large-arc-flag, sweep-flag x,y)+ 其中x-axis-rotation是弧线的转角度数，large-arc-flag, sweep-flag决定了从相交椭圆中选择哪条圆弧。见下图
![path arcs示意图](https://www.w3.org/TR/SVG/images/paths/arcs02.svg)
- 二次贝塞尔曲线
	- Q\q：quadratic (x1,y1 x,y)+
	- T\t：smooth quadratic，(x,y)+ 加了对称点的Q，需跟在Q后面，否则降级成直线
![path quadratic](https://www.w3.org/TR/SVG/images/paths/quad01.svg)
- 三次贝塞尔曲线
	- C\c：cubic (x1,y1 x2,y2 x,y)+
	- S\s：smooth cubic，(x2,y2 x,y)+ 加了对称点的C，需跟在C后面，否则降级成Q
![path cubic](https://www.w3.org/TR/SVG/images/paths/cubic02.svg)

### CSS主要属性清单
最常用的fill和stroke，完整列表参见[svg styling](https://www.w3.org/TR/SVG/styling.html)

#### fill
- fill
- fill-opacity
- fill-rule nonzero|evenodd 判断是填充的算法规则：在任意点延伸的一条穿过图形的线与图形路径的相交点的正交反交（正交标记1，反交标记-1）数量来判断，正交：顺时针相交，反交：逆时针相交
	- nonzero 表示正反交数量为非0的时候填充，0的时候不填充。如图 ![nonzero](https://www.w3.org/TR/SVG/images/painting/fillrule-nonzero.svg)
	- evenodd 表示正反交数量为奇数的时候填充，偶数的时候不填充。如图 ![evenodd](https://www.w3.org/TR/SVG/images/painting/fillrule-evenodd.svg)

#### stroke
- stroke
- stroke-width
- stroke-opactity
- stroke-linecap butt|round|square 如图 ![lincap](https://www.w3.org/TR/SVG/images/painting/linecap.svg)
- stroke-linejion miter|round|bevel bevel的算法略诡异，待了解path实现细节 如图 ![linejoin](https://www.w3.org/TR/SVG/images/painting/linejoin.svg)
- stroke-dasharray <dasharray> 定义描边虚线阵列，包含虚线粗细及间隔的设置，参数多样
- stroke-dashoffset 虚线起始偏移量，移动在dasharray上的视觉起点

[利用足够大的dasharray和dashoffset来实现svg路径描边动画](http://www.zhangxinxu.com/wordpress/2014/04/animateion-line-drawing-svg-path-%E5%8A%A8%E7%94%BB-%E8%B7%AF%E5%BE%84/)


### 兼容性
|元素名 | 描述 | 主要属性 | reference | 兼容性描述 |
|---|---|---|---|---|
| tref | 引用文本 | xlink:href... | https://www.w3.org/TR/SVG/text.html#TRefElement | chrome不支持, 考虑到文本复用的应用场景几乎没有，窃以为chrome的不支持可以理解 |

### 总结
svg相关的知识点比较琐碎，涉及到的图层叠加、混合、填充等实现细节和算法规则还有待进一步了解。