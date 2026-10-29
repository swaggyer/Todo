import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { zipSync, strToU8 } from 'fflate';
import './build.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'artifacts'); await mkdir(output,{recursive:true});
const ignore=new Set(['.git','node_modules','.pnpm-store','artifacts','build','.gradle','.idea','xcuserdata','DerivedData','Pods']);
const privateNames=new Set(['local.properties','.DS_Store','Thumbs.db']);
async function collect(dir,prefix='',source=false){const files={};for(const e of await readdir(dir,{withFileTypes:true})){if(ignore.has(e.name)||privateNames.has(e.name)||/\.(jks|keystore|p12|mobileprovision)$/.test(e.name)||e.name.startsWith('.env'))continue;const rel=prefix+e.name;if(e.isDirectory())Object.assign(files,await collect(path.join(dir,e.name),rel+'/',source));else files[rel]=new Uint8Array(await readFile(path.join(dir,e.name)));}return files;}
const packages=[['little-days-web-1.0.0.zip',await collect(path.join(root,'apps/web/dist'))],['little-days-source-1.0.0.zip',await collect(root,'little-days/',true)]];
packages[0][1]['READ-ME.txt']=strToU8('小日网页版：将全部文件部署到任意 HTTPS 静态网站。手机可添加到主屏幕。请勿直接双击 index.html；本地预览请运行完整源码中的 pnpm dev。\n数据保存在当前浏览器，迁移请使用导出/导入备份。\n');
const sums=[];for(const[name,files]of packages){const bytes=zipSync(files,{level:6});await writeFile(path.join(output,name),bytes);sums.push(createHash('sha256').update(bytes).digest('hex')+'  '+name);console.log(name+' ('+Object.keys(files).length+' files)');}await writeFile(path.join(output,'SHA256SUMS.txt'),sums.join('\n')+'\n');
