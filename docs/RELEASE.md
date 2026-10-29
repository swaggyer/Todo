# GitHub �빹������

## ��ȡ��ά��Դ��

���������� [`swaggyer/Todo`](https://github.com/swaggyer/Todo) Ϊ�ֿ��ַ��Դ���ϴ����ճ������ɿ�¡�ֿ⡢�޸Ĺ���Դ�벢�ύ������״�ԭ�������͹�����������ڶ�Ӧ����ȷ�ϡ�

```sh
git clone https://github.com/swaggyer/Todo.git
cd Todo
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

�����Դ�� ZIP ������һ���ղֿ⣺

1. ���Լ��� GitHub �˺��´���һ���ղֿ⣬���� `little-days`������Ҫѡ�񹫿���˽�С�
2. ��ѹԴ�� ZIP��
3. ����ѹ����Ŀ��Ŀ¼�е��ļ����ļ����ϴ���ͨ�� Git �������²ֿ⣻�ļ��϶�ʱ�ɷ����ϴ���
4. ȷ�� `README.md`��`package.json`��`pnpm-workspace.yaml`��`pnpm-lock.yaml`��`.github/workflows` �� `apps/mobile` �����ϴ���ע��ϵͳ���������Ե㿪ͷ���ļ���
5. �ύ��Ĭ�Ϸ�֧���� GitHub ��ʾ�������״�������Ҫ���ã����� Actions �����á�

��Ҫֻ�ϴ�һ��δ��ѹ��Դ�� ZIP������ GitHub �޷�ʶ����������ĿĿ¼��`node_modules`������ Gradle/Xcode ���桢����֤��ͱ������ݲ�Ӧ�ϴ���

## ����������ҳ��Դ���

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm package
```

��������� `artifacts`��

- `little-days-source-1.0.0.zip`����������Դ���� Android / iOS ���̡�
- `little-days-web-1.0.0.zip`���ɲ���ľ�̬��ҳ��
- `SHA256SUMS.txt`������ ZIP �� SHA-256 У��ֵ��

��ҳ������������� `apps/web/dist`��Դ������ڼ��������������������桢���á�ԭ���������ĵ���������ͬ����ǩ�����ֻ���װ����

## CI

`.github/workflows/ci.yml` �� `main` ��֧���º� Pull Request ʱִ�У�

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

CI ֻ��ȡ�ֿⲢ��鹹�������Ჿ����վ������ Release ���ϴ����̵ꡣ

## �ֶ�������װ���Բ���

��ǰ Android ���԰�������밲װ�����[�ֻ���װ˵��](INSTALL.md)��`Android download` ��������ʹ�òֿ��ȡȨ�ޣ��������� Android APK�����ֶ�������Ҳ���������������ļ�����ʱ���������ﱣ�� 14 �죬������ Release��

�� GitHub �ֿ�� **Actions �� Build packages �� Run workflow**��������ֻͨ���ֶ��������У������������������

| Actions artifact | ���� | ��; |
| --- | --- | --- |
| `little-days-web` | ��ҳ ZIP �� SHA-256 У���ļ� | ��ѹ���𵽾�̬�й� |
| `little-days-android-debug` | ���� APK �� SHA-256 У���ļ� | Android ��װ���� |
| `little-days-ios-simulator` | iOS ģ���� `.app` ZIP | �� Mac �� iOS ģ������֤ |

�ȴ�������ɹ����ڱ��ι�����ҳ��� **Artifacts** �����ء����ﱣ�� 14 �죻��Ҫ���ڱ���ʱ�������ع鵵��

Android ���� APK ʹ�ù��������ĵ���ǩ������ͬ���������ĵ���ǩ�����ܲ�ͬ���������ڳ�ŵ���ڸ�����������ʽ����ǰ�����Լ��Ĺ̶� keystore����������Կ��

iOS ����ʹ�� macOS runner �� Swift Package Manager���رմ���ǩ����ֻ����ģ����Ӧ�á����������ɿ��԰�װ��ʵ�� iPhone ����ǩ�� IPA��Ҳ�����ϴ� TestFlight / App Store��

## ��ʽ�ַ�

- **Web**���� `apps/web/dist` ���������ݲ����Լ��� HTTPS վ�㡣
- **Android**���� Android Studio ��ʹ�ó���ǩ����Կ������ʽ APK / AAB����ѡ���Լ��ķַ�������
- **iPhone**���� Xcode �������Լ��Ŀ����Ŷӡ�ǩ����汾����ͨ�� Archive ����ѡ�ַ�����������

�̶� application ID / Bundle ID ��ǩ�����ݺ�Ӧ�����ȶ�����������ǰ��ȷ������Ǩ�ƺ͸���·���������˺���Կ������Ŀ�����߱��ܣ�������Դ�� ZIP �� Git �ֿ⡣
