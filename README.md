# 别让我上班！ / DON'T MAKE ME WORK!

本分支为 **V3.0第一阶段原型**，尚未合并或上线。试玩方式、已完成内容及未验收项目见 [V3-PROTOTYPE.md](./V3-PROTOTYPE.md)。下方公开地址仍为稳定V2。

**不正常人类研究所 · 第二号游戏实验 / THE LOONY BIN LAB.**

一只打工土豆的荒诞职场逃亡：原创六类障碍、双选随机事件、趣味能力、原创背景音乐、六种结局与七项成就。无需登录，历史成绩与图鉴保存在当前浏览器，支持PNG成绩单。

独立项目，不包含或修改第一款游戏 The-Loony-Bin-Lab 的代码。

## 公开访问

**GitHub Pages公开访问：[立即逃跑 ↗](https://liurunjia629-bit.github.io/Dont-Make-Me-Work/)**

[GitHub独立公开仓库](https://github.com/liurunjia629-bit/Dont-Make-Me-Work) · [首次成功部署记录](https://github.com/liurunjia629-bit/Dont-Make-Me-Work/actions/runs/40673730308)。公开首页及全部26个生产URL已通过HTTP检查，内容与本地构建一致。线上浏览器交互和控制台尚未验收。

## 操作

| 操作 | 电脑 | 手机 / 鼠标 |
| --- | --- | --- |
| 跳跃 / 二段跳 | Space / ↑；空中再按一次 | 右下跳跃按钮；空中再按一次 |
| 滑铲 | ↓ / S | 左下滑铲按钮 |
| 使用能力 | E | 顶部能力按钮 |
| 暂停 / 继续 | P / Esc | 暂停按钮 |

首次开局提供可跳过的安全练习。事件出现时物理和计时冻结，选择后有恢复保护。音乐与音效独立开关，首次交互后才启动音频。

手机窄视口和按钮操作已做基本检查；iPhone Safari、微信内置浏览器、Android Chrome真机、旋转和系统分享仍待验证，不能视为完整移动端验收。

## 本地运行与构建

Node.js 22+，npm。当前版本为原生JavaScript ES Modules + Canvas/SVG + Web Audio，**未使用React、TypeScript或Vite**，没有对应配置文件；无需框架运行时依赖。

```sh
npm install
npm run dev
```

打开终端输出的 http://127.0.0.1:5173/ 。不要直接双击index.html，模块需要HTTP服务。

```sh
npm test
npm run build
```

生产文件输出到 `dist/`。测试涵盖核心物理、障碍、事件、能力、结局、成就、音频生命周期、输入去重和GitHub Pages子路径引用。

没有npm时也可直接执行 `node tools.mjs serve`、`node --test tests/*.test.mjs`、`node tools.mjs build`；项目没有第三方依赖。

## GitHub Pages部署

目标是**独立公开仓库 `Dont-Make-Me-Work`**，默认分支main。不要向第一款仓库推送。

1. 先确认是否已有对应仓库；没有则在自己的GitHub账号创建公开仓库 `Dont-Make-Me-Work`。此本地项目已含README与.gitignore，因此网页建仓时不要再生成初始文件。
2. 在本项目目录，将新仓库页面显示的HTTPS地址设为远程；本地已经初始化main并包含提交，无需再次git init。

```sh
git remote add origin <新仓库页面显示的HTTPS地址>
git push -u origin main
```

若已有origin，先使用 `git remote -v` 确认它是本游戏仓库，不要盲目覆盖。

3. 仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。
4. 若首次push发生在Pages启用之前，打开 Actions → Test and deploy game → Run workflow，选择main。
5. 确认工作流成功并读取其部署URL，再用公开浏览器验证首页、资源和控制台。

`.github/workflows/deploy.yml` 使用官方Pages Actions：检出、Node.js22、`npm ci`、`npm test`、`npm run build`、上传dist、部署Pages；具有`contents:read`、`pages:write`、`id-token:write`权限。

所有本地资源、模块和Favicon使用相对URL，适用于 `/Dont-Make-Me-Work/` 子路径，不依赖根路径。没有Vite，因此不添加无效的`vite.config.ts`或`base`配置。Logo为本地SVG；角色、背景、障碍和音频由代码绘制/合成，无外部CDN。`dist/`及`node_modules/`被忽略，只上传Actions构建产物。

## 版本与验收记录

- [V2玩法与修改清单](./V2-CHANGELOG.md)
- [品牌统一记录](./BRAND-UPDATE.md)
- [本次部署检查与阻碍](./DEPLOYMENT.md)
