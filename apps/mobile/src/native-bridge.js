import { Capacitor } from '@capacitor/core';
import { Camera } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { App } from '@capacitor/app';

const native = Capacitor.isNativePlatform();
async function photoBlob(result) {
  if (!result?.webPath) return null;
  const response = await fetch(result.webPath);
  if (!response.ok) throw new Error('无法读取照片');
  const blob = await response.blob();
  return new File([blob], 'photo.jpg', { type: blob.type || 'image/jpeg' });
}
const bridge = {
  isNative: native,
  async capturePhoto() {
    try {
      return await photoBlob(await Camera.takePhoto({ quality: 85, targetWidth: 1500, targetHeight: 1500 }));
    } catch (error) {
      if (/cancel/i.test(`${error.code || ''} ${error.message || ''}`)) return null;
      throw error;
    }
  },
  async exportBackup(data, date) {
    const file = await Filesystem.writeFile({
      path: `day-todo-backup-${date}.json`,
      data: JSON.stringify({ ...data, exportedAt: new Date().toISOString() }, null, 2),
      directory: Directory.Cache,
      encoding: Encoding.UTF8
    });
    await Share.share({ title: 'day todo 备份', url: file.uri, dialogTitle: '保存或分享备份' });
  },
  async completed() { try { await Haptics.impact({ style: ImpactStyle.Light }); } catch {} },
  restoredPhoto: null
};
window.LittleDaysNative = bridge;
if (native) {
  document.documentElement.classList.add('native-app');
  App.addListener('appRestoredResult', async result => {
    if (result.pluginId === 'Camera' && result.methodName === 'takePhoto' && result.success) {
      try {
        bridge.restoredPhoto = await photoBlob(result.data);
        window.dispatchEvent(new Event('little-days:restored-photo'));
      } catch { /* The draft remains available for another capture. */ }
    }
  });
  App.addListener('backButton', ({ canGoBack }) => {
    const dialog = document.querySelector('dialog[open]');
    if (dialog) dialog.close();
    else if (location.hash !== '#today') document.querySelector('[data-page="today"]')?.click();
    else if (canGoBack) history.back();
    else App.minimizeApp();
  });
}
