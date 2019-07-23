## Toppro前台
url(www.toppro.io/)

## 启动

```
yarn install 按照以来
yarn dev 监听less,并转换成css
yarn build 打包less并生产ServiceWorker
```

## ServiceWorker
如果是用service worker的网页要写入   
脚本要放在根目录下
```
<script src="/js/service-worker-registration.js"></script>
```