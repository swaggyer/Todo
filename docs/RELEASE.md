# GitHub 与构建产物

## 获取与维护源码

以下命令以 [`swaggyer/Todo`](https://github.com/swaggyer/Todo) 为仓库地址。源码上传后，日常开发可克隆仓库、修改共享源码并提交变更；首次原生构建和工作流结果需在对应环境确认。

```sh
git clone https://github.com/swaggyer/Todo.git
cd Todo
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

如需把源码 ZIP 导入另一个空仓库：

1. 在自己的 GitHub 账号下创建一个空仓库，例如 `little-days`；按需要选择公开或私有。
2. 解压源码 ZIP。
3. 将解压后项目根目录中的文件与文件夹上传或通过 Git 推送至新仓库；文件较多时可分批上传。
4. 确认 `README.md`、`package.json`、`pnpm-workspace.yaml`、`pnpm-lock.yaml`、`.github/workflows` 和 `apps/mobile` 均已上传；注意系统可能隐藏以点开头的文件。
5. 提交到默认分支。若 GitHub 提示工作流首次运行需要启用，请在 Actions 中启用。

不要只上传一个未解压的源码 ZIP，否则 GitHub 无法识别工作流与项目目录。`node_modules`、本地 Gradle/Xcode 缓存、个人证书和备份数据不应上传。

## 本地生成网页与源码包

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm package
```

输出保存在 `artifacts`：

- `little-days-source-1.0.0.zip`：完整开发源码与 Android / iOS 工程。
- `little-days-web-1.0.0.zip`：可部署的静态网页。
- `SHA256SUMS.txt`：上述 ZIP 的 SHA-256 校验值。

网页版独立产物来自 `apps/web/dist`。源码包用于继续开发，包含共享界面、配置、原生工程与文档；它不等同于已签名的手机安装包。

## CI

`.github/workflows/ci.yml` 在 `main` 分支更新和 Pull Request 时执行：

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

CI 只读取仓库并检查构建，不会部署网站、创建 Release 或上传到商店。

## 手动构建安装测试产物

打开 GitHub 仓库的 **Actions → Build packages → Run workflow**。工作流只通过手动触发运行，包含三项独立构建：

| Actions artifact | 内容 | 用途 |
| --- | --- | --- |
| `little-days-web` | 网页 ZIP 与 SHA-256 校验文件 | 解压后部署到静态托管 |
| `little-days-android-debug` | 调试 APK 与 SHA-256 校验文件 | Android 安装测试 |
| `little-days-ios-simulator` | iOS 模拟器 `.app` ZIP | 在 Mac 的 iOS 模拟器验证 |

等待各项构建成功后，在本次工作流页面的 **Artifacts** 中下载。产物保留 14 天；需要长期保存时自行下载归档。

Android 调试 APK 使用构建环境的调试签名。不同构建环境的调试签名可能不同，不能用于承诺长期覆盖升级。正式发布前配置自己的固定 keystore，并备份密钥。

iOS 构建使用 macOS runner 和 Swift Package Manager，关闭代码签名，只生成模拟器应用。它不会生成可以安装到实体 iPhone 的已签名 IPA，也不会上传 TestFlight / App Store。

## 正式分发

- **Web**：将 `apps/web/dist` 的完整内容部署到自己的 HTTPS 站点。
- **Android**：在 Android Studio 中使用长期签名密钥生成正式 APK / AAB，再选择自己的分发渠道。
- **iPhone**：在 Xcode 中配置自己的开发团队、签名与版本，再通过 Archive 和所选分发渠道交付。

固定 application ID / Bundle ID 与签名身份后，应保持稳定；更换身份前先确认数据迁移和更新路径。所有账号密钥均由项目所有者保管，不放入源码 ZIP 或 Git 仓库。
