# day todo 交付验证记录

更新日期：2026-10-30。

## 2026-10-30 公开访问与网页记录保护

- 原站点已改为公开访问，未携带登录信息的请求返回 HTTP 200 与 day todo 页面，没有跳转登录。网址及数据库身份保持不变，已有本机记录无需迁移。
- 网页不再在读取、显示或相机草稿恢复异常时用示例替换已有记录。只有成功读取且数据库确实为空时才初始化示例；异常时阻止写入并显示真实状态。
- 保存事务会核对最后读取的快照，防止旧标签页覆盖其他页面的新记录。遇到冲突要求刷新，不自动合并或恢复已删除的事项。
- `pnpm check` 已包含读取重开、首次初始化、读写失败、显示失败、照片草稿恢复失败和旧标签页冲突的回归检查；这些检查通过模拟 IndexedDB 执行生产函数，未作为真实浏览器交互测试。
- 本次修复针对公开网页版；已发布的 Android 1.0.1 安装包未重新生成。记录仍保存在各自设备，没有新增云存储或跨设备同步。

## 1.0.1 名称与图标更新

目标版本：1.0.1。应用显示名称更新为 `day todo`，图标采用深钴蓝底色与白色 `to / do` 字母组合。应用标识 `com.swaggyer.littledays`、数据库 `little-days-v1` 和备份数据格式保持不变。

- 本地 Web/PWA 构建、Android/iOS 资源同步及数据兼容性检查通过；原有存储标识保持不变。
- GitHub CI 与 [Android 1.0.1 构建](https://github.com/swaggyer/Todo/actions/runs/40898680931) 成功，构建源码提交为 `7938a47e9583abaed2c0e1402fd2e97a307108f0`。
- 已检查字母图标在 32–96 px 下的可读性、圆形裁切、Android 图标安全区及 iOS 图标不透明格式。
- Sites 网页版已成功发布 day todo 品牌更新，源码提交为 `86ac2712a88bb02f8e06b1c64f43ab59feb6d0a3`；沿用原有站点及访问范围。
- APK 内已核验 `day todo` 显示名称、1.0.1 版本、原应用标识及新的 SVG 字母组合图标；资源完整性检查通过。
- [1.0.1 公开附件](https://github.com/swaggyer/Todo/releases/tag/android-preview-1.0.1) 已发布，未登录下载返回 HTTP 200，文件名及 APK 类型正确。文件为 8,353,212 字节，SHA-256 为 `099ba56b4fcf20b3a2428f7ae32996af8484b88292750e1ace553145baf937dd`，与构建产物一致。
- 已按授权移除临时发布流程。尚未执行真机测试；以下 1.0.0 的运行记录和哈希不作为新版验证结果。

## 1.0.0 历史验证记录（2026-10-29）

- 源码与 README 已上传至 `swaggyer/Todo`，GitHub CI 检查与构建成功。
- [Android download](https://github.com/swaggyer/Todo/actions/runs/40853667706) 已完成原生 Gradle 编译，成功生成调试签名 APK、SHA-256 校验文件与可下载产物。构建源码提交为 `bf5819561e8bf001caef9de81a7c99f49370139b`。
- 保留的构建工作流仅有仓库读取权限，不会发布 Release 或上传应用商店。
- 经用户授权，将同一 APK 公开发布为 [`android-preview-1.0.0`](https://github.com/swaggyer/Todo/releases/tag/android-preview-1.0.0) 的附件。已验证未登录下载返回 HTTP 200、APK 文件类型与附件文件名正确；下载文件为 8,319,569 字节，SHA-256 为 `4784fef8e324c083039fcb59baaac85756681b56978b8f238925b5d11cd91d06`，与原产物一致。
- 临时发布流程仅为本次发布使用，完成后从默认分支移除；README 与手机安装说明采用直接 APK 下载入口，不再要求登录或解压。
- Android 真机及原生权限交互尚未验证；iOS 编译、签名和真机安装尚未执行。详见[手机安装说明](INSTALL.md)。

## 2026-10-27 源码交付历史记录

后续进展以上述对应版本的记录为准。

已实际完成：

- 使用锁定依赖生成 Web/PWA 与手机端资源，构建成功。
- 通过 JavaScript 语法、资源引用、manifest 图标尺寸、原生配置和本地数据库身份检查。
- Capacitor Android 与 iOS 平台已生成并成功同步，识别到 App、Camera、Filesystem、Haptics、Share 五个官方插件。
- Xcode 工程通过项目文件解析；Info.plist、隐私清单和 Android XML 可解析。
- 浏览器实际打开打包后的网页，完成与撤销待办、进度更新、切换随记均正常，未发现控制台错误。
- 共享的两份设计样式文件与已确认网站逐字节一致。
- ZIP 完整性、关键工程文件存在性及压缩包排除项检查通过。

尚未执行：

- Android Gradle 编译、模拟器与真机测试。本地未安装 Android SDK / Java 编译环境。
- iOS 编译、模拟器与真机测试。当前工作环境为 Windows，不具备 Xcode。
- 原生拍照、系统分享、触觉反馈及权限拒绝场景的真机验证。
- GitHub Actions 运行。工作流需由你上传仓库后手动触发。
- 签名、IPA/APK 正式分发、TestFlight 或应用商店发布。

因此，本次手机端交付是完整工程源码，不包含已签名的可安装 App。`Build packages` 工作流将分别生成网页 ZIP、Android 调试 APK 和未签名的 iOS 模拟器应用，仍需在目标环境执行后确认结果。
