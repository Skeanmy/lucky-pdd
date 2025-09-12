# Lucky PDD - 拼多多收藏商品管理

这是一个基于 Next.js 15 构建的拼多多收藏商品管理应用，用于解析和展示拼多多收藏的商品数据。

## 功能特性

- 🏪 **店铺分组展示**: 按店铺自动分组显示收藏商品
- 📊 **商品信息表格**: 展示商品ID、SKU ID、价格、收藏时间等信息
- 🖼️ **商品图片预览**: 显示商品缩略图和详细信息
- 🏷️ **标签展示**: 显示商品的各种标签（正品险、包邮等）
- 🔗 **快速跳转**: 一键跳转到拼多多商品页面
- 📱 **响应式设计**: 支持桌面和移动端访问

## 技术栈

- **框架**: Next.js 15.5.3
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **构建工具**: Turbopack
- **代码检查**: ESLint

## 项目结构

```
lucky-pdd/
├── src/
│   └── app/
│       ├── components/
│       │   └── Navigation.tsx    # 导航组件
│       ├── pdd/
│       │   └── page.tsx         # PDD商品页面
│       ├── layout.tsx           # 根布局
│       ├── page.tsx             # 首页
│       └── globals.css          # 全局样式
├── public/
│   └── likes.json              # 拼多多收藏数据
└── package.json
```

## 数据格式

应用解析 `public/likes.json` 文件中的拼多多收藏数据，主要包含：

- `goodsSet`: 商品集合，以商品ID为键
- 每个商品包含：商品名称、价格、图片、店铺信息、SKU列表等
- 按店铺ID自动分组展示

## 快速开始

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```

3. **访问应用**
   - 首页: http://localhost:3000
   - PDD页面: http://localhost:3000/pdd

## 可用命令

- `npm run dev` - 启动开发服务器（使用Turbopack）
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行代码检查

## 页面功能

### 首页 (/)
- 应用介绍和导航
- 快速跳转到PDD收藏页面

### PDD收藏页面 (/pdd)
- 解析并展示likes.json中的商品数据
- 按店铺分组显示商品
- 每个店铺显示：
  - 店铺名称和Logo
  - 商品数量统计
  - 商品信息表格，包含：
    - 商品图片和名称
    - SKU ID列表
    - 商品ID
    - 价格信息
    - 收藏时间
    - 操作按钮（跳转到商品页面）

## 自定义数据

要使用您自己的拼多多收藏数据：

1. 将您的收藏数据保存为JSON格式
2. 确保数据结构与示例数据一致
3. 将文件重命名为 `likes.json` 并放置在 `public/` 目录下
4. 刷新页面即可看到您的数据

## 开发说明

- 使用 Next.js App Router 架构
- 支持服务端渲染和客户端交互
- 使用 Tailwind CSS 进行样式设计
- 完全响应式设计，支持各种屏幕尺寸
- TypeScript 提供类型安全

## 许可证

MIT License