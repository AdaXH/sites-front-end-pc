# sites-front-end-pc
![截图](https://bucker-for-sae.oss-cn-hangzhou.aliyuncs.com/githubimg/QQ%E6%88%AA%E5%9B%BE20210407215111.jpg)

## 简介
“<a target="_blank" href="https://sites.applinzi.com">站点聚合平台</a>，让更多的人知道您的网站”，小站正在处于初期阶，功能正在一步步完善中
如果您想协助小站，包括但不限于建议、交互、代码、服务器，您都可以直接与我联系
或者发送至我的邮箱：adaxh@qq.com
参与其中，您将会出现在开发人员列表中。
> This site is in the initial stage. At present, the developer is only me, a humble and small front end, and the function is being improved step by step
> If you want to assist this site, including but not limited to suggestions, interaction, code and server, you can contact me directly
> or send it to my email address: adaxh@qq.com
> Participate, and you will appear in the developer list

[![DeepScan grade](https://deepscan.io/api/teams/13594/projects/16596/branches/359188/badge/grade.svg?token=a1fa0980263b30233c0ddf1e9c3ed778290db2ee)](https://deepscan.io/dashboard#view=project&tid=13594&pid=16596&bid=359188)

## 这是什么仓库
这是站点聚合平台的前端代码(pc)，以下是涉及到的npm(技术栈？)：
- Webpack@4.0+
- React@16.8+
- TypeScript@4.2.0+
- Babel@7.0+
- ...

目前已经完成的功能模块：
- [x] 站点提交
- [x] 站点列表
- [x] 站点详情
- [x] 站点编辑
- [x] 用户登陆注册
- [x] 管理员
- [ ] 随机推荐
- [ ] 在线互动
- [ ] 签到
- [ ] 后台管理（目前是非常简陋的）

## 如何启动dev
1. 安装node
2. 使用npm包管理工具，推荐使用<a href="https://www.npmjs.com/package/tyarn" target="_blank">tyarn</a>
3. 安装依赖：  `$npm i` or `$tyarn`
4. 启动webpack server： `npm run dev` or `tyarn dev`


## 想协助但是不喜欢or不会react？
没关系，管理后台还没有开发，现在的管理后台很简陋，如果您愿意，可以协助开发一套管理后台，技术栈由您决定，不用担心接口，接口我都写好了

## 为什么没有后端的仓库？
后端目前基于koa2 + mongod启动的小型架构，后续可能会改动，待后续再开放
