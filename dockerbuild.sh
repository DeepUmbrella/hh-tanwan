#！/bin/bash

git pull origin main

VERSION=$(jq -r '.version' package.json)
echo "当前版本号: $VERSION"

echo "开始构建镜像..."
docker build -t hh-tanwan:$VERSION .
echo "构建镜像完成."

echo "停止旧容器..."
docker stop hh-tanwan
echo "旧容器已停止."

echo "删除旧容器..."
docker rm hh-tanwan
echo "旧容器已删除."

echo "运行新容器..."
#并加入到hh-app-net网络
docker run -d --name hh-tanwan -p 5000:80  hh-app-mian:$VERSION
echo "新容器已运行."

echo "部署完成!"