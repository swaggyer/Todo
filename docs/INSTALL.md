# 手机安装与下载

更新日期：2026-10-29。

## Android 测试版

[下载 Android 安装包 ZIP](https://github.com/swaggyer/Todo/actions/runs/40853667706/artifacts/12887393939) · [查看成功构建记录](https://github.com/swaggyer/Todo/actions/runs/40853667706)

1. 在手机浏览器登录 GitHub，打开下载链接。也可在构建记录页面的 **Artifacts** 中点击 `little-days-android-preview`。
2. 下载并解压 ZIP，找到 `little-days-android-preview.apk`。
3. 点击 APK，按系统提示允许当前浏览器或文件管理器安装此应用，然后完成安装。系统菜单名称随手机品牌而异。

要求 Android 7.0 及以上。ZIP 还包含 `SHA256SUMS.txt` 校验文件；本次下载于 **2026-11-12** 到期。过期后可打开 [Android download 工作流](https://github.com/swaggyer/Todo/actions/workflows/android-download.yml)，选择 **Run workflow** 重新构建，并在新记录中下载产物。

这是调试签名的测试版，已通过原生编译，尚未完成真机验证，未上架应用商店。每次构建的调试签名可能不同，不能保证后续版本覆盖升级。**更换版本或卸载前，先在应用内导出备份**；卸载可能清除本机记录。

## iPhone / iPad

当前没有可供真机安装的已签名 IPA 或 TestFlight 邀请。可以先将网页版添加到桌面：

1. 用 **Safari** 打开[小日 · Little Days](https://little-days-todo-m7q2.shouuu336.chatgpt.site/#today)。站点若要求登录，请使用有访问权限的 ChatGPT 账号。
2. 点“分享 → 添加到主屏幕”；如有“作为网页 App 打开”选项，保持开启。
3. 点“添加”，从桌面的小日图标打开。

此方式使用网页版。仓库中的 iOS 模拟器 `.app` 不能安装到实体 iPhone；原生分发还需在 Mac 上完成 Apple 签名和相应分发配置。

## 记录与备份

网页、Android 和 iPhone 各自保存在本机，没有跨设备自动同步。换设备、切换浏览器、改用 App 或卸载前，先导出 JSON 备份，再在目标设备导入。见[数据备份与迁移](DATA.md)。

参考：[GitHub 产物下载说明](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/download-workflow-artifacts)、[Android 下载应用说明](https://support.google.com/android/answer/9457058?hl=zh-Hans)、[Apple 添加网页 App 说明](https://support.apple.com/guide/iphone/open-as-web-app-iphea86e5236/27/ios/27)。
