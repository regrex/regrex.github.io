title: 贴吧JS-SDK
date: 2015-09-17 20:16:22
---
## 概述
贴吧JS-SDK是贴吧面向网页开发者提供的基于贴吧内的网页开发工具包。

通过使用贴吧JS-SDK，网页开发者可借助贴吧高效地使用贴吧内置的分享、扫码、发贴、跳转到吧和贴子、选图、位置等能力。

此文档面向网页开发者介绍贴吧JS-SDK如何使用及相关注意事项。

<!-- more -->
## JS-SDK使用步骤

### 1. 引入JS文件
在需要调用js接口的页面引入所需[JS文件](https://svn.baidu.com/app/search/forum/trunk/fe/mobile/sdk/static/js/TbJsBridge.js)
### 2. 通过config接口注入权限验证配置
```javascript { .theme-peacock }
Tb.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
```

### 3. 通过ready接口处理成功验证
```javascript { .theme-peacock }
Tb.ready(function(){

    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

});
```

### 4. 通过error接口处理失败验证
```javascript { .theme-peacock }
Tb.error(function(res){

    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

});
```

## 接口调用说明
所有接口通过Tb对象来调用，参数是一个对象，除了每个接口本身需要传的参数之外，还有以下通用参数：

 1. success：接口调用成功时执行的回调函数。 
 2. fail：接口调用失败时执行的回调函数。
 3. complete：接口调用完成时执行的回调函数，无论成功或失败都会执行。
 4. cancel：用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。 
 5. trigger：监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。

`备注`：不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回。

以上几个函数都带有一个参数，类型为对象，其中除了每个接口本身返回的数据之外，还有一个通用属性errMsg，其值格式如下：

调用成功时："xxx:ok" ，其中xxx为调用的接口名
用户取消时："xxx:cancel"，其中xxx为调用的接口名
调用失败时：其值为具体错误信息

## 基础接口

### Tb.checkJsApi

- 功能描述：检测接口可用性
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.checkJsApi({
    jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function(res) {
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    }
});
```

### Tb.registerApi

- 功能描述：注册新接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.registerApi(
    apiName, // 接口名
    bridgeName, // bridge名称，默认Tb
    namspace // 命名空间，各业务方向建议使用自己的命名空间
);
// Tb.registerApi('closeWebView', 'Tb.bridge', 'platform');
```

## 登录接口

### Tb.login

- 功能描述：调起登录页或登录浮层
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.login(
loginType // {int}, 登录方式，0：普通帐号登录、1：手机账号登录；默认：0
);
```

## 分享接口

> 注意事项：图片尺寸限制，腾讯的接口和微信保持一致，以减少开发成本

### Tb.showShareItem

- 功能描述：展开分享浮层
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.showShareItem({
    success: function() {
        // 分享浮层成功展开后的回调函数，可以在此处增加一类逻辑处理，如统计
    }
});
```

### Tb.onShareTiebaUser

- 功能描述：获取分享到“贴吧好友”按钮点击状态及自定义分享内容接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.onShareTiebaUser({
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    type: '', // 分享类型, music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
});
```

### Tb.onShareTiebaGroup

- 功能描述：获取分享到“贴吧群组”按钮点击状态及自定义分享内容接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.onShareTiebaGroup({
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    type: '', // 分享类型, music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
});
```

### Tb.onMenuShareTimeline

- 功能描述：获取分享到“微信朋友圈”按钮点击状态及自定义分享内容接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：~~desc: '', // 分享描述~~微信朋友圈不能设置分享描述
```javascript { .theme-peacock }
Tb.onMenuShareTimeline({
    title: '', // 分享标题  
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    type: '', // 分享类型, music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
});
```

### Tb.onMenuShareAppMessage

- 功能描述：获取分享到“微信”按钮点击状态及自定义分享内容接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.onMenuShareAppMessage({
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    type: '', // 分享类型, music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
});
```

### Tb.onMenuShareQZone

- 功能描述：获取分享到“QQ空间”按钮点击状态及自定义分享内容接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.onMenuShareQZone({
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    type: '', // 分享类型, music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
});
```

### Tb.onMenuShareWeibo

- 功能描述：获取分享到“腾讯微博”按钮点击状态及自定义分享内容接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.onMenuShareWeibo({
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    type: '', // 分享类型, music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
});
```

### Tb.onShareWeibo

- 功能描述：获取分享到“新浪微博”按钮点击状态及自定义分享内容接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.onShareWeibo({
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    type: '', // 分享类型, music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
});
```

### Tb.onShareRenRen

- 功能描述：获取分享到“人人网”按钮点击状态及自定义分享内容接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.onShareRenRen({
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    type: '', // 分享类型, music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
});
```

## 发贴接口

### Tb.onOpenPoster

- 功能描述：调起发贴浮层并设置发贴内容接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.showPoster({
    type: 0, // {int}, 发贴框类型，0：主题贴、1：回复贴、2：楼中楼回复，默认：0
    title: '', // {string}, 当type为0时，调起发贴框时回填的贴子标题
    content: '', // {string}, ，调起发贴框时回填的发贴内容
    success: function (res) { 
        // res里存放发贴成功后的返回数据
        // 用户发贴成功后执行的回调函数
    },
    cancel: function () { 
        // 用户取消发贴时执行的回调函数
    },
    fail: function (res) { 
        // res里存放发贴失败时的返回数据
        // 用户发贴失败后执行的回调函数
    }
});
```

## 跳转接口

### Tb.jumpToForum

- 功能描述：跳转到某吧
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.jumpToForum({
    forumName: '', // {string}, 跳转的目标吧名
    success: function () {
        // 成功跳转到某吧后执行的回调函数
    }
});
```

### Tb.jumpToThread

- 功能描述：跳转到某贴子
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.jumpToThread({
    threadId: 0, // {int}, 跳转的目标贴子ID
    success: function () { 
        // 成功跳转到某贴子后执行的回调函数
    }
});
```

## 设备接口

### Tb.getDeviceInfo

- 功能描述：获取设备信息
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.getDeviceInfo({
    success: function (res) { 
        // 返回数据
        res = {
            browser: { // 浏览器
                family: 'Chrome Mobile',
                major: '18',
                minor: '0',
                patch: '1025'
            },
            device: { // 设备型号
                family: 'Nexus 4'
            },
            os: { // 操作系统
                family: 'Android',
                major: '4',
                minor: '2',
                patch: '1',
                patchMinor: ''
            }
        };
    }
});
```

### Tb.getNetworkType

- 功能描述：获取网络状态
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.getNetworkType({
    success: function (netType) { 
        // 返回数据
        netType = 0; // {int}, 网络类型，1：2g、2:3g、3：4g、4：wifi 
    }
});
```

### Tb.getLocation

- 功能描述：获取地理位置
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.getLocation({
    type: 'wgs84', // {string}, 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    success: function (res) {
        var latitude = res.latitude; // {float}, 纬度，浮点数，范围为90 ~ -90
        var longitude = res.longitude; // {float}, 经度，浮点数，范围为180 ~ -180。
        var speed = res.speed; // {float}, 速度，以米/每秒计
        var accuracy = res.accuracy; // {float}, 位置精度
    }
});
```

## 扫码接口

### Tb.scanQRCode

- 功能描述：扫描二维码并返回结果
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.scanQRCode({
    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
    success: function (res) {
        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
    }
});
```

## 图像接口
### Tb.chooseImage

- 功能描述：选择图片 
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    }
});
```

### Tb.previewImage

- 功能描述：预览图片
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.previewImage({
    current: '', // 当前显示图片的http链接
    urls: [] // 需要预览的图片http链接列表
});
```

### Tb.uploadImage

- 功能描述：上传图片
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.uploadImage({
    localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
        var serverId = res.serverId; // 返回图片的服务器端ID
    }
});
```

### Tb.downloadImage

- 功能描述：下载图片
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.downloadImage({
    serverId: '', // 需要下载的图片的服务器端ID，由uploadImage接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
        var localId = res.localId; // 返回图片下载后的本地ID
    }
});
```

## 调试接口

### Tb.console

- 功能描述：打印调试信息
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.console('debug info');
```

## 界面操作接口

### Tb.closeWindow

- 功能描述：关闭当前网页窗口接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.closeWindow();
```

### Tb.hideOptionMenu

- 功能描述： 隐藏右上角菜单接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.hideOptionMenu();
```

### Tb.showOptionMenu

- 功能描述：显示右上角菜单接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.showOptionMenu();
```

### Tb.hideMenuItems

- 功能描述：批量隐藏功能按钮接口（可用作全屏效果）
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.hideMenuItems();
```

### Tb.showMenuItems

- 功能描述：批量显示功能按钮接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.showMenuItems();
```

### Tb.hideAllNonBaseMenuItem

- 功能描述：隐藏所有非基础按钮接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.hideAllNonBaseMenuItem();
```

### Tb.showAllNonBaseMenuItem

- 功能描述：显示所有非基础按钮接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.showAllNonBaseMenuItem();
```

## 会员接口

### Tb.becomeVIP

- 功能描述：开通贴吧会员接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.becomeVIP();
```

### Tb.buyTBeans

- 功能描述：开启T豆购买流程的接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.buyTBeans();
```

### Tb.payWithDianQuan

- 功能描述：用点券支付接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.payWithDianQuan({
    payType: 0, // {int}, 支付类型
    propsId: 0, // {int}, 虚拟物品id
    quanNum: '', // {string}, 券号
    isLeft: false, // {boolean}, 是否剩余
    propsMon: 0, // {int}, 购买的虚拟物品时间，月为单位
    success: function () {
        // 调起点券支付收银台成功后执行的回调函数
    } 
});
```

### Tb.payWithNative

- 功能描述：调起本地支付接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
```javascript { .theme-peacock }
Tb.payWithNative({
    payType: 0, // {int}, 支付页展示的类型，0和1：普通会员模式，2：高级会员模式
    fromType: '', // {string}, 统计码
    success: function () {
        // 调起本地支付页面成功后执行的回调函数
    } 
});
```

## 音频接口

### Tb.startRecord

- 功能描述：开始录音接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无

### Tb.stopRecord

- 功能描述：停止录音接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无

### Tb.onVoiceRecordEnd

- 功能描述：监听录音自动停止接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无

### Tb.playVoice

- 功能描述：播放语音接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无

### Tb.pauseVoice

- 功能描述：暂停播放接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无

### Tb.stopVoice

- 功能描述：停止播放接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无

### Tb.onVoicePlayEnd

- 功能描述：监听语音播放完毕接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无

### Tb.uploadVoice

- 功能描述：上传语音接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无

### Tb.downloadVoice

- 功能描述：下载语音接口
- 支持版本：IOS v6.8.9+，Android v6.8.8+
- 备注：无
