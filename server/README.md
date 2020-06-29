## .env
- 你的敏感信息不要提交到github上。应该放到环境变量配置里，然后忽略提交
## 启动mongodb服务
mongodb通过brew安装, 默认安装文件夹是Cellar
1. 启动mongodb服务
```bsh
sudo mongod --config /usr/local/etc/mongod.conf
```
mongod.conf
```bsh
systemLog:
  destination: file
  path: /usr/local/var/log/mongodb/mongo.log # 日志存放的位置
  logAppend: true
storage:
  dbPath: /usr/local/var/mongodb # 表示数据库存放的位置
net:
  bindIp: 127.0.0.1 # 默认host
```

2. 创建接口服务，连接数据库
```
 npm run start
```