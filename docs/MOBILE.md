# Android 与 iPhone 原生工程

## 工程身份

| 项目 | 值 |
| --- | --- |
| 应用名称 | day todo |
| Android application ID / iOS Bundle ID | `com.swaggyer.littledays` |
| 原生容器 | Capacitor 8 |
| 共享界面源码 | `packages/ui` |
| 手机端网页资源 | `apps/mobile/www` |
| Android 工程 | `apps/mobile/android` |
| iOS 工程 | `apps/mobile/ios/App/App.xcodeproj` |

两套原生工程已经放入源码包，便于直接交给 Android 或 iOS 开发者继续维护。网页样式与交互来自同一份共享源码。

## 通用准备

安装 Node.js 24 与 pnpm 11.25.0，在项目根目录执行：

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm mobile:sync
```

`mobile:sync` 先构建手机界面，再同步至已有原生工程。仅处理一个平台时可运行 `pnpm mobile:sync:android` 或 `pnpm mobile:sync:ios`。

## Android

开发环境使用 Android Studio、Android SDK 和 Java 21。Capacitor 8 官方支持 Android 7 / API 24 起的设备；构建所需的 compile SDK 与 build tools 以工程 Gradle 配置为准。[官方 Android 文档](https://capacitorjs.com/docs/android)

打开工程：

```sh
pnpm mobile:android
```

也可在 Android Studio 中直接打开 `apps/mobile/android`。等待 Gradle 同步完成，连接已开启 USB 调试的设备或选择模拟器，再运行应用。

在项目根目录构建调试 APK：

macOS / Linux：

```sh
pnpm mobile:sync:android
cd apps/mobile/android
chmod +x gradlew
./gradlew assembleDebug
```

Windows PowerShell：

```powershell
pnpm mobile:sync:android
Set-Location apps/mobile/android
.\gradlew.bat assembleDebug
```

默认产物位于 `apps/mobile/android/app/build/outputs/apk/debug/app-debug.apk`。它适合开发测试；正式分发时应使用自己的长期签名密钥。更换签名密钥会影响已有安装的覆盖升级。

## iPhone / iPad

iOS 原生编译需要 **macOS、Xcode 26+ 和 Xcode Command Line Tools**；本项目使用 Swift Package Manager。[官方环境要求](https://capacitorjs.com/docs/getting-started/environment-setup)

Capacitor 8 支持 iOS 15 及更新系统；本工程最低部署版本设为 iOS 15.4，以匹配界面所用的浏览器能力。[官方 iOS 文档](https://capacitorjs.com/docs/ios)

在 Mac 的项目根目录运行：

```sh
pnpm install --frozen-lockfile
pnpm mobile:sync:ios
pnpm mobile:ios
```

也可用 Xcode 打开 `apps/mobile/ios/App/App.xcodeproj`。选择 `App` scheme 与 iPhone 模拟器，等待 Swift Package 解析后运行。

无签名的模拟器构建命令：

```sh
xcodebuild \
  -project apps/mobile/ios/App/App.xcodeproj \
  -scheme App \
  -sdk iphonesimulator \
  -configuration Debug \
  -derivedDataPath build/ios \
  CODE_SIGNING_ALLOWED=NO \
  build
```

该命令产生模拟器应用，不能作为安装包直接安装在 iPhone 上。真机调试需要在 Xcode 的 Signing & Capabilities 中选择自己的开发团队；TestFlight / App Store 分发还需完成 Apple 开发者账号、签名和商店配置。当前源码包不包含个人证书、描述文件或签名凭据。

## 照片、文件与系统权限

随记在手机端通过系统相机与照片选择器获取图片。权限被拒绝或用户取消选择时，应允许继续编辑文字。iOS 的相机、照片用途说明放在 `Info.plist`；Android 权限与系统组件配置放在 Manifest 和原生工程中。

备份通过系统文件/分享入口导出，导入后继续使用同一份 JSON 数据格式。发布前应在真机验证拍照、选图、导出、导入与权限拒绝场景。

## 本次交付的验证边界

源码包包含 Android 和 iOS 工程及其构建工作流。Windows 环境可以生成和检查工程，但不能运行 Xcode；iOS 编译需在 Mac 或 GitHub 的 macOS 构建环境中确认。CI 的 iOS 模拟器产物也不能代替真机测试。

## 更新流程

1. 修改 `packages/ui` 的共享界面或手机端适配。
2. 执行检查与对应平台同步。
3. 更新原生版本号，在模拟器与真机检查。
4. 使用相同 Bundle ID / application ID 和长期签名身份构建正式版本。

手机应用内置网页资源。更新线上网页不会自动更新已经安装的原生应用；原生版本需要重新构建并安装/分发。
