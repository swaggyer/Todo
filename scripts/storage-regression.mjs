import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

// Exercise the actual storage/startup functions without requiring a browser DOM.
const source = await readFile(new URL('../packages/ui/app.js', import.meta.url), 'utf8');
const storageStart = source.indexOf('let state =');
const storageEnd = source.indexOf('function toast(');
const startupStart = source.indexOf('async function initializeApp(){');
const startupEnd = source.lastIndexOf('\ninitializeApp();');
assert(storageStart >= 0 && storageEnd > storageStart && startupStart > storageEnd && startupEnd > startupStart);
const production = source.slice(storageStart, storageEnd) + '\n' + source.slice(startupStart, startupEnd);
const plain = value => value === undefined ? undefined : JSON.parse(JSON.stringify(value));
const saved = {version:1,tasks:[{id:'real-task',title:'Keep my record'}],notes:[{id:'real-note',text:'Keep my note'}]};

function harness(backend, options = {}) {
  const nodes = Object.fromEntries(['storageStatus','storageInfo','exportData','importData','importInput'].map(id => [id, {textContent:'',disabled:false,setAttribute(){},indicator:{style:{}}}]));
  const metrics = {seeds:0,renders:0,toasts:[],writes:0};
  const db = {
    transaction() {
      const tx = {error:null,aborted:false,failed:false,pending:undefined,hasWrite:false};
      tx.abort = () => {tx.aborted=true;queueMicrotask(()=>tx.onabort?.());};
      tx.objectStore = () => ({
        get() {
          const request = {};
          queueMicrotask(() => {
            if (options.readError) {tx.failed=true;tx.error=new Error('read failure');tx.onerror?.();tx.onabort?.();return;}
            request.result = structuredClone(backend.value);
            request.onsuccess?.();
            queueMicrotask(() => {
              if (tx.aborted || tx.failed) return;
              if (tx.hasWrite) {backend.value=structuredClone(tx.pending);metrics.writes++;}
              tx.oncomplete?.();
            });
          });
          return request;
        },
        put(value) {
          if (options.writeError) {tx.failed=true;tx.error=new Error('write failure');queueMicrotask(()=>{tx.onerror?.();tx.onabort?.();});return;}
          tx.pending=structuredClone(value);tx.hasWrite=true;
        }
      });
      return tx;
    }
  };
  const context = vm.createContext({
    structuredClone,JSON,Error,Promise,
    $: (selector, element) => selector==='i' ? element.indicator : nodes[selector.slice(1)],
    indexedDB:{open(){const request={};queueMicrotask(()=>{if(options.openError){request.error=new Error('open failure');request.onerror?.();}else{request.result=db;request.onsuccess?.();}});return request;}},
    seed(){metrics.seeds++;return {version:1,tasks:[{id:'demo-task'}],notes:[]};},
    render(){metrics.renders++;if(options.renderError)throw new Error('render failure');},
    goTo(){if(options.navigationError)throw new Error('navigation failure');},
    restoreCameraPhoto:async()=>{if(options.cameraError)throw new Error('camera failure');},
    toast:message=>metrics.toasts.push(message),location:{hash:'#today'}
  });
  vm.runInContext(production+'\nglobalThis.api={initializeApp,persist,state:()=>state,ready:()=>storageReady,conflict:()=>storageConflict};', context);
  return {api:context.api,nodes,metrics};
}

{
  const backend={value:structuredClone(saved)},h=harness(backend);
  await h.api.initializeApp();
  assert.deepEqual(plain(h.api.state()),saved);
  assert.equal(h.metrics.seeds,0);assert.equal(h.metrics.writes,0);
  assert(h.api.ready());assert.equal(h.nodes.exportData.disabled,false);
  // Reopening the same database does not insert demo data or reset existing data.
  const reopened=harness(backend);await reopened.api.initializeApp();
  assert.deepEqual(plain(reopened.api.state()),saved);assert.equal(reopened.metrics.seeds,0);
}
{
  const backend={value:undefined},h=harness(backend);
  await h.api.initializeApp();
  assert.equal(h.metrics.seeds,1);assert.equal(h.metrics.writes,1);
  assert.equal(backend.value.tasks[0].id,'demo-task');assert(h.api.ready());
}
{
  const backend={value:{version:1,tasks:[],notes:[]}},h=harness(backend);
  await h.api.initializeApp();assert.equal(h.metrics.seeds,0);assert.equal(h.api.state().tasks.length,0);
}
for (const option of ['openError','readError','renderError','navigationError']) {
  const backend={value:structuredClone(saved)},h=harness(backend,{[option]:true});
  await h.api.initializeApp();
  assert.equal(h.metrics.seeds,0,option);assert.equal(h.metrics.writes,0,option);
  assert.equal(h.api.ready(),false,option);assert(h.nodes.exportData.disabled,option);assert(h.nodes.importData.disabled,option);
  await assert.rejects(h.api.persist(),/storage-not-ready/);
  assert.deepEqual(backend.value,saved,option);
  if(option==='renderError'||option==='navigationError')assert.deepEqual(plain(h.api.state()),saved,option);
  else assert.equal(h.api.state().tasks.length,0,option);
}
{
  const backend={value:undefined},h=harness(backend,{writeError:true});
  await h.api.initializeApp();
  assert.equal(h.api.ready(),false);assert.equal(h.api.state().tasks.length,0);
  assert.equal(backend.value,undefined);assert(h.nodes.exportData.disabled);
}
{
  const backend={value:null},h=harness(backend);
  await h.api.initializeApp();assert.equal(h.metrics.seeds,0);assert.equal(backend.value,null);assert.equal(h.api.ready(),false);
}
{
  const backend={value:structuredClone(saved)},h=harness(backend,{cameraError:true});
  await h.api.initializeApp();assert(h.api.ready());assert.deepEqual(plain(h.api.state()),saved);assert.equal(h.metrics.seeds,0);
  h.api.state().tasks.push({id:'after-camera-error'});await h.api.persist();
  assert.equal(backend.value.tasks[0].id,'real-task');assert.equal(backend.value.tasks.length,2);
}
{
  const backend={value:structuredClone(saved)},first=harness(backend),stale=harness(backend);
  await first.api.initializeApp();await stale.api.initializeApp();
  first.api.state().tasks.push({id:'new-in-first-tab'});await first.api.persist();
  const committed=structuredClone(backend.value);
  stale.api.state().tasks.push({id:'stale-tab-edit'});
  await assert.rejects(stale.api.persist(),/storage-conflict/);
  assert(stale.api.conflict());assert.deepEqual(backend.value,committed);assert.equal(stale.metrics.writes,0);
  await assert.rejects(stale.api.persist(),/storage-not-ready/);
}
{
  const backend={value:structuredClone(saved)},h=harness(backend);await h.api.initializeApp();
  h.api.state().tasks.push({id:'first-edit'});const first=h.api.persist();
  h.api.state().tasks.push({id:'second-edit'});const second=h.api.persist();
  await Promise.all([first,second]);assert.deepEqual(backend.value.tasks.map(t=>t.id),['real-task','first-edit','second-edit']);
}
console.log('Passed storage startup, reopen, write failure and stale-tab regression checks.');
