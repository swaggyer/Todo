<p align="center">
  <img src="packages/ui/assets/icon.svg" width="76" height="76" alt="С��ͼ��">
</p>

<h1 align="center">С�� �� Little Days</h1>

<p align="center">��¼������ѧϰ�������еĴ������ǡ�</p>

<p align="center">
  <strong>Web / PWA �� Android �� iPhone</strong><br>
  һ�׹������棬���ر��棬�ɵ������ݡ�
</p>

<p align="center">
  <a href="#�ֻ���װ������">�ֻ���װ������</a> ��
  <a href="#�������">�������</a> ��
  <a href="#���ٿ�ʼ">���ٿ�ʼ</a> ��
  <a href="#�ֻ��˹���">�ֻ��˹���</a> ��
  <a href="docs/RELEASE.md">�����뷢��</a> ��
  <a href="docs/DATA.md">���ݱ���</a>
</p>

## �ֻ���װ������

**Android ���԰��ѹ����ɹ���2026-10-29��**��[���� Android ��װ�� ZIP](https://github.com/swaggyer/Todo/actions/runs/40853667706/artifacts/12887393939) �� [������¼](https://github.com/swaggyer/Todo/actions/runs/40853667706)��������Ҫ��¼ GitHub����ѹ��� `little-days-android-preview.apk`�����ֻ���ʾ��װ�������ر����� **2026-11-12**��

**iPhone**���� Safari ��[С����ҳ��](https://little-days-todo-m7q2.shouuu336.chatgpt.site/#today)���㡰���� �� ���ӵ�����Ļ��������������ҳ�棻��ǰû�пɹ������װ�� IPA �� TestFlight ���롣վ����Ҫ���¼����ʹ���з���Ȩ�޵� ChatGPT �˺š�

Android Ϊ����ǩ���Ĳ��԰�����δ��������֤�������汾�����޷����ǰ�װ�������汾��ж��ǰ����Ӧ���ڵ������ݡ���ҳ�� App ���ݸ��Ա����ڱ����������Զ�ͬ������ϸ�����[�ֻ���װ˵��](docs/INSTALL.md)��

## �������

���׻�������ɫ�߱��Ϳ�Ƭ��Ӣ��ʹ�� Times New Roman������ʹ��ϵͳ���塣

**������������ʾ�⣩**�����²�ͼ���ݵ�ǰ���沼�ֻ��ƣ�����˵����Ϣ�ṹ������Ӧ�����н�ͼ��

![Today ����������ʾ�⣺���մ��졢���ν�����������](docs/images/today-desktop.svg)

<p align="center">
  <img src="docs/images/mobile-pages.svg" width="900" alt="�ֻ��ߴ��µ� Today��Lists �� Notes ���ʾ��">
</p>

�ֻ�ʾ��ͼչʾ Today��Lists �� Notes ��ҳ��ṹ��Android �� iPhone ���̸�����ͬ�Ľ���Դ�롣

## ����

| ���� | ������ʲô |
| --- | --- |
| **Today �� ����** | ���ܵ�����Ч���죬�Խ��Ȼ����������ֺͱ仯�ı���չʾ������ |
| **Lists �� �嵥** | �� Work / Learn / Life ���ࣻѡ��һ�ա�һ�ܻ��Զ������ڷ�Χ |
| **Notes �� ���** | �������֡���Ƭ����У�Ϊ���ѡ��Ƭ��ɫ |
| **���ݱ���** | ����������Ƭ�� JSON ���ݣ�����һ��������ֻ��˵��� |

����볷�����Թ������ӷ���������ʱ����֣��Լ����࿨Ƭ��չ�������𣬾��ɹ�������ʵ�֡��ֻ�������������ԭ�����ա����������ͱ��ݷ������䡣

**���ڹ���**��һ�ܡ��͡��Զ��塱��ʾһ���������Ч���ڷ�Χ��������ÿ������� Today�����һ�μ�����������������ÿ���Զ����õ�ѭ������

## �汾��״̬

| ƽ̨ | ��Ŀ���� | ��ǰ��֤��Χ |
| --- | --- | --- |
| **Web / PWA** | ��̬��վ������ͼ�ꡢmanifest �����߻��� | ����ɹ������������Ҫ������� |
| **Android** | Capacitor ԭ�����̡�Gradle Wrapper��ϵͳ�������� | GitHub Actions �ѳɹ�������� APK��������Դ�ִ�� |
| **iPhone / iPad** | Xcode ���̡�Swift Package Manager��Ȩ������˽���� | ���������ɲ�ͬ����ԭ��������������Դ�ִ�� |

�ֿ��ṩ����Դ��͹������̣��Լ����� Android ����ǩ�����԰�����δ�ṩ��ʽǩ���ַ�������ϸ��¼�� [��֤��Χ](docs/VALIDATION.md)��

## ���ٿ�ʼ

׼�� **Node.js 24** �� **pnpm 11.25.0**��

```sh
git clone https://github.com/swaggyer/Todo.git
cd Todo
pnpm install --frozen-lockfile
pnpm build
pnpm dev
```

���ն���ʾ�ĵ�ַ��Ĭ���� `http://127.0.0.1:4174`���޸� `packages/ui` ������ִ�� `pnpm build` ��ˢ��ҳ�档

### ��������

| ���� | ��; |
| --- | --- |
| `pnpm dev` | ����������ҳԤ�� |
| `pnpm check` | ����﷨����Դ��manifest��ԭ�����ú����ݼ����� |
| `pnpm build` | ������ҳ���ֻ��˹�����Դ |
| `pnpm mobile:sync` | ������Դ��ͬ��������ԭ������ |
| `pnpm mobile:android` | ͬ������ Android Studio �򿪹��� |
| `pnpm mobile:ios` | ͬ������ Xcode �򿪹��̣���Ҫ Mac |
| `pnpm package` | ����Դ�� ZIP����ҳ ZIP �� SHA-256 У���ļ� |

��ҳ������� `apps/web/dist`���ɽ�Ŀ¼�е��������ݲ��� HTTPS ��̬�йܷ��񡣲���PWA ��װ�����߻���˵���� [Web �ĵ�](docs/WEB.md)��

## �ֻ��˹���

ԭ������ʹ�� **Capacitor 8**��Ӧ�ñ�ʶΪ `com.swaggyer.littledays`��

**Android**��׼�� Android Studio��Java 21 �� Android SDK��Ȼ��ִ�У�

```sh
pnpm mobile:android
```

**iPhone / iPad**���ڰ�װ Xcode 26+ �� Mac ��ִ�У�

```sh
pnpm mobile:ios
```

ԭ�����̷ֱ�λ�� `apps/mobile/android` �� `apps/mobile/ios/App/App.xcodeproj`������ APK��iOS ģ����Ӧ�������ǩ�����ǲ�ͬ������롢Ȩ����֤��ǩ������� [�ֻ����ĵ�](docs/MOBILE.md)��

## ��Ŀ�ṹ

```text
little-days/
������ apps/
��   ������ web/                    ��ҳ����빹������
��   ������ mobile/
��       ������ android/            Android ԭ������
��       ������ ios/                iOS ԭ������
��       ������ src/                ԭ����������
��       ������ capacitor.config.json
������ packages/
��   ������ ui/                     ���õ� HTML��CSS��JavaScript ����Դ
������ scripts/                    ������Ԥ�����������
������ docs/                       ˵���ĵ������ʾ��ͼ
������ .github/workflows/          CI ���ֶ���������
������ pnpm-workspace.yaml
������ pnpm-lock.yaml
������ package.json
```

���汣��ԭ�� JavaScript ʵ�֣���ҳ�������ֻ��˴� `packages/ui` ����������ά�������ظ����档

## �Զ��������

- **CI**���� `main` ���»� Pull Request ʱ����Դ����͹�����
- **Android download**���ṩ���� Android ���԰棻���ֶ����¹��������ﱣ�� 14 �졣
- **Build packages**���� [Actions](https://github.com/swaggyer/Todo/actions) �ֶ��������ֱ𹹽���ҳ ZIP��Android ���� APK ��δǩ���� iOS ģ����Ӧ�á�
- **���ش��**������ `pnpm package`�����ﱣ�浽 `artifacts`��

�����������Զ�������վ������ Release ���ϴ�Ӧ���̵ꡣAndroid �״α�����ͨ����iOS ԭ�������Դ�ȷ�ϡ���� [�����뷢��](docs/RELEASE.md)��

## ��������˽

���ݱ����ڵ�ǰ��������ֻ�Ӧ���У�Ӧ�ò�Ҫ���˺ţ�Ҳ�����Զ��ϴ���������Ƭ��Web��Android��iPhone ���Ա������ݣ�**û�п��豸�Զ�ͬ��**��

���豸����������������������ݻ�ж��Ӧ��ǰ���ɴӡ����ݱ��ݡ����� JSON������Ŀ���豸���롣��ʽ��ϲ������ [���ݱ�����Ǩ��](docs/DATA.md)��

## �ĵ�

| �ĵ� | ���� |
| --- | --- |
| [Web / PWA](docs/WEB.md) | ���𡢰�װ�����߻��� |
| [Android �� iPhone](docs/MOBILE.md) | ������ԭ�����롢Ȩ�޺�ǩ�� |
| [���ݱ���](docs/DATA.md) | �������������豸Ǩ�� |
| [Դ��ṹ](docs/ARCHITECTURE.md) | ����Դ����ά����ʽ |
| [�����뷢��](docs/RELEASE.md) | GitHub Actions �ͽ������� |
| [��֤��Χ](docs/VALIDATION.md) | ����ɼ�������֤��Ŀ |
| [���������](THIRD_PARTY_NOTICES.md) | ��������Ȩ��Ϣ |
| [�ο�����](docs/REFERENCES.md) | �ٷ��ĵ�����Ŀ��֯�ο� |
