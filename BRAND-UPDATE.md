# 研究所品牌统一 · 2026-10-28

来源：第一款本地项目 `what-kind-of-useless-are-you/outputs/useless-lab/`。

- `src/assets/lab-logo.svg` 原样复制自第一款 `public/favicon.svg`；已与 `src/brand-mark.ts` 和 `src/BrandLogo.tsx` 的路径、颜色、viewBox、描边核对。
- `src/assets/favicon.ico` 原样复制自第一款 `public/favicon.ico`，供不支持 SVG Favicon 的浏览器使用。
- 复制后两份资源分别以 SHA-256 与来源校验，均逐字节一致；页面标志和 SVG Favicon 使用同一个文件。
- 新增 `src/components/Brand.js` 将本地 SVG 与中英文字标分离。字号、字距沿用第一款 `src/brand.css`；无 CDN、字体请求或截图描摹。
- 窄屏优先保留完整中文、英文和音效按钮，NO.002 独占第二行。Logo 固定宽高、不参与 flex 收缩。横屏不再隐藏品牌导航。
- 第一款项目只读，未作修改。游戏引擎、角色、场景、障碍、音效、计分和输入逻辑无改动。

验证：

- 两个资源与第一款的 SHA-256 一致。
- 原有 7 项引擎测试通过。
- `node --check src/components/Brand.js`、`node --check src/main.js` 通过。
- `node tools.mjs build` 通过，生产输出包含 SVG、ICO、品牌组件和样式。
- 桌面内置浏览器，1042px视口：SVG 已加载；图形40×40；完整中英文字标；导航无横向溢出；音效按钮不重叠；Favicon引用同一个SVG文件。
- 手机320–430px的CSS已适配，但当前浏览器自动化没有视口切换能力，未进行对应宽度的实际渲染验收；iPhone Safari、微信、Android Chrome真机未测试。
- 本项目无TypeScript文件或tsconfig，TypeScript检查不适用，未宣称通过tsc。

版本提交保存在当前独立项目的本地Git仓库；未推送远程。
