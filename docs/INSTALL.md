# 手机安装与下载

更新日期：2026-10-29。

## Android 测试版

[下载 Android 安装包 ZIP](https://github.com/swaggyer/Todo/actions/runs/40853667706/artifacts/12887393939) · [查看成功构建记录](https://github.com/swaggyer/Todo/actions/runs/40853667706)

1. 在手机浏览器登录 GitHub，打开下载链接。也可在构建记录页面的 **Artifacts** 中点击 `little-days-android-preview`。
2. 下载并解压 ZIP，找到 `little-days-android-preview.apk`。
3. 点击 APK，按系统提示允许当前浏览器或文件管理器安装此应用，然后完成安装。系统菜单名称随手机品牌而异。

要求 Android 7.0 及以上。ZIP 还包含 `SHA256SUMS.txt` 校验文件；本次下载于 **2026-11-12** 到期。过期后可打开 [Android download 工作流](https://github.com/swaggyer/Todo/actions/workflows/android-download.yml)，选择 **Run workflow** 重新构建，并在新记录中下载产物。

这是调试签名的测试版，已通过原生编译，尚未完成真机验证，未上架应用商店。每次构建的调试签名可能不同，不能保证后续版本覆盖升级。**更换版本或卸载前，先在应用内导出备份**；卸载可能清除本机记录。

## 记录与备份

网页与 Android 各自保存在本机，没有跨设备自动同步。换设备、切换浏览器、改用 App 或卸载前，先导出 JSON 备份，再在目标设备导入。见[数据备份与迁移](DATA.md)。


