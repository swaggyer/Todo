# 参考资料

本工程的目录排布参考用户提供的 MoneyDance；day todo 的界面与功能延续原有设计。

- [MoneyDance 仓库说明](https://github.com/cshouuu/money-dance/blob/main/README.md)：应用、共享包、文档和工作流的组织。
- [MoneyDance 移动端说明](https://github.com/cshouuu/money-dance/blob/main/docs/MOBILE.md)：Web 界面复用、Capacitor 原生容器和本地数据边界。
- [Capacitor 环境要求](https://capacitorjs.com/docs/getting-started/environment-setup)：Node.js、Android Studio、macOS、Xcode 与 SPM。
- [Capacitor Android](https://capacitorjs.com/docs/android)：Android 工程与设备支持。
- [Capacitor iOS](https://capacitorjs.com/docs/ios)：iOS 原生工程与 Xcode 运行。
- [Capacitor Swift Package Manager](https://capacitorjs.com/docs/ios/spm)：iOS 的 SPM 依赖管理。
- [Capacitor 开发流程](https://capacitorjs.com/docs/basics/workflow)：构建网页后同步到原生项目。

GitHub Actions 版本在 2026-10-27 根据各项目官方发布记录核对，工作流使用固定提交 SHA，并在旁边标注版本：

| Action | 已核对版本 |
| --- | --- |
| [actions/checkout](https://github.com/actions/checkout/releases/tag/v7.0.1) | 7.0.1 |
| [actions/setup-node](https://github.com/actions/setup-node/releases/tag/v7.1.0) | 7.1.0 |
| [actions/upload-artifact](https://github.com/actions/upload-artifact/releases/tag/v7.0.2) | 7.0.2 |
| [actions/setup-java](https://github.com/actions/setup-java/releases/tag/v6.1.0) | 6.1.0 |
| [pnpm/action-setup](https://github.com/pnpm/action-setup/releases/tag/v6.1.0) | 6.1.0 |
| [android-actions/setup-android](https://github.com/android-actions/setup-android/releases/tag/v4.0.4) | 4.0.4 |

参考项目中的财务功能、桌宠、云服务与分发账号不属于 day todo 工程；无需复制对应凭据或配置。
