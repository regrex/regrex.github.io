title: Vue.js初体验
date: 2016-06-29 21:27:31
tags: vue
---
## Vue.js简介

数据驱动的组件，为现代化的 Web 界面而生。文档及社区生态都很活跃，有口皆碑。

- [中文官网](http://vuejs.org.cn/)
- [资源列表](https://github.com/vuejs/awesome-vue)

<!-- more -->

## Vue Demo
### 简介
- [源码](https://github.com/regrex/vue-with-vux-echarts)
- 内容
这个小项目主要涵盖了三部分内容，用户画像，服务统计及数据分析；涉及到数据可视化展现，故结合使用了echarts3.0。
- 截图
    - 画像
    ![enter image description here](http://imgsrc.baidu.com/forum/pic/item/0150fc33c895d1430bd607377bf082025baf077d.jpg)
    - 服务
    ![enter image description here](http://imgsrc.baidu.com/forum/pic/item/091a0b738bd4b31c4ac877af8fd6277f9f2ff822.jpg)
    - 分析
    ![enter image description here](http://imgsrc.baidu.com/forum/pic/item/c1f57fafa40f4bfb56a17d400b4f78f0f63618ac.jpg)

### 开发历程
#### initialize
由于之前有AngularJS的开发经验，且vue的官方文档非常易于理解，不用半天时间，基本已熟悉了vue的相关语法及特性。结合构建大型应用的vue-cli脚手架及webpack构建工具，很快就能搭建起基础代码结构。接下来的工作就是根据需求组织代码，划分页面及页面组件。我的代码组织如下：
```python { .theme-legacy }
|-- build // webpack构建相关文件
|-- config // 配置文件
|-- index.html // 主入口文件
|-- package.json
|-- README.md
`-- src
    |-- main.js // 主体js，调用vue及vue相关服务
    |-- app.vue // 应用主入口
    |-- assets // 静态资源目录，如图片，类库css文件等
    |   |-- avatar-man.png
    |-- components // 页面组件
    |   |-- medical-log.vue
    |   |-- medical-service.vue
    |   |-- medical-word.vue
    |   |-- rank-dept-chart.vue
    |   |-- rank-disease-chart.vue
    |   |-- rank-doc-chart.vue
    |   |-- rank-form.vue
    |   |-- rank-hosp-chart.vue
    |   `-- user-card.vue
    |-- router-config.js // vue-router配置
    `-- views // 子页面view
        |-- personal.vue
        |-- rank.vue
        `-- service.vue
```
#### 使用vue-router和vue-resource
使用之前，当然是先安装package依赖，分别执行`npm install vue-router --save`和`npm install vue-resource --save`，然后就可以参考文档在vue项目里愉快的使用啦。
[vue-router](http://router.vuejs.org/zh-cn/index.html)跟其他AngularJS的router类似，提供了SPA应用的页面路由能力，其官方文档也非常友好，使用也非常简单，在main.js里初始化router后设置配置项，然后添加路由规则即可；[vue-resource](https://github.com/vuejs/vue-resource)提供了在vue里使用Promise方式处理网络请求的能力（省去了自己写XMLHttpRequest的麻烦）。如下：
```javascript { .theme-peacock }
// main.js
// import vue and vue component
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import { configRouter } from './router-config.js';

// config router
Vue.use(VueRouter);
const router = new VueRouter({
    hashbang: true
});
configRouter(router);

// use vue-resource for ajax
Vue.use(VueResource);

// init vue app
const App = Vue.extend(require('./app.vue'));
router.start(App, '#app');
```


#### 使用vux
[vux](https://vux.li/)是基于vue和weui设计的组件库，文档也还比较齐全。不过有些组件文档上的介绍也不是特别详尽，遇到问题时，建议直接参看源码。vux的使用也非常简单，`npm install vux --save`后，在app.vue根组件下引用依赖的样式文件，然后就可以直接在vue组件里愉快的调用了。如下所示：
```vue { .theme-legacy }
<!-- app.vue -->
<template>
    <div class="app wrapper">
        <tab>
            <tab-item v-link="{ path: '/personal' }" :selected="tabVal === 'personal'">画像</tab-item>
            <tab-item v-link="{ path: '/service' }" :selected="tabVal === 'service'">服务</tab-item>
            <tab-item v-link="{ path: '/rank' }" :selected="tabVal === 'rank'">分析</tab-item>
        </tab>
        <div class="content-wrapper">
            <router-view></router-view>
        </div>
    </div>
</template>


<script>
    import XHeader from 'vux/src/components/x-header'
    import Tab from 'vux/src/components/tab/tab'
    import TabItem from 'vux/src/components/tab/tab-item'

    export default {
        components: {
            XHeader,
            Tab,
            TabItem
        },
        data() {
            return {}
        }
    }
</script>

<style>
    @import '~vux/dist/vux.css';
    body {
        margin: 0;
        background-color: #fbf9fe;
    }
</style>
```

#### 在vue中使用Echarts 3.0
因为Echart 3.0 本身支持webpack，故执行`npm install echarts --save`后，在代码里引入后即可使用，以rank-dept-chart.vue的条形图为例，如下：
```vue { .theme-peacock }
<template>
    <div id="dept-echart" style="width: 98%; height: 400px;"></div>
</template>

<script>
import Echarts from 'echarts/lib/echarts'
import EchartsPie from 'echarts/lib/chart/pie'
import EchartsToolip from 'echarts/lib/component/tooltip'
import EchartsTitle from 'echarts/lib/component/title'

export default {
    methods: {
        'renderChart': function () {
            if (!this.dept.length === 0) {
                return;
            }

            var typeMap = {
                appoint_count: '预约量',
                follow_count: '关注量',
                psquery_count: '百度搜索量',
                search_count: '搜索量',
                total_count: '总量'
            };
            var curRankType = this.curRankType;
            var data = this.dept;
            var mapList = [];
            for (let i = 0; i < data.length; i++) {
                mapList.push({
                    name: data[i].res_name,
                    value: data[i][curRankType],
                });
            }

            var myDeptChart = Echarts.init(document.getElementById('dept-echart'));
            myDeptChart.setOption({
                title : {
                    text: 'Top10科室排名',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    {
                        name: typeMap[curRankType],
                        type:'pie',
                        radius : [30, 110],
                        center : ['50%', 200],
                        roseType : 'area',
                        data: mapList
                    }
                ]
            });
        }
    },
    events: {
        'rankTypeChange': function (rankType) {
            this.curRankType = rankType;
        },
        'dataRefresh': function (data) {
            this.dept = data.dept;
            this.renderChart();
        }
    },
    data () {
        return {
            curRankType: 'total_count',
            dept: []
        }
    }
}
</script>

<style>
</style>
```
### 问题及总结
vue提供了父子组件对象引用、事件驱动、props参数传递等方式来实现组件见通信；在不是特别复杂的场景，基本上都能满足要求；不过当遇到数据处理及组件关系复杂的情况下，会感觉有点儿不痛快，通常造成这种情况有两种原因，一是组件拆分不合理，导致耦合度太高；二是需要更好的数据处理机制，比如使用vuex（vue基于flux的实现）。

## 我对Vue的感受
vue用来做项目感觉非常畅快，代码写起来很清爽，且性能也非常不错，果然是业界口碑之作。

[附录](https://slides.com/regrex/vue-js/live#/)

末
