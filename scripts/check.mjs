import { JSDOM } from 'jsdom'
import { createServer } from 'vite'
import { readFile, stat, writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import ffmpeg from 'ffmpeg-static'
const dom=new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>',{url:'http://localhost/',pretendToBeVisual:true})
for(const name of ['window','document','HTMLElement','HTMLDialogElement','HTMLMediaElement','Event','MouseEvent','KeyboardEvent','Image'])Object.defineProperty(globalThis,name,{value:dom.window[name],configurable:true})
globalThis.requestAnimationFrame=dom.window.requestAnimationFrame.bind(dom.window)
globalThis.cancelAnimationFrame=dom.window.cancelAnimationFrame.bind(dom.window)
globalThis.IS_REACT_ACT_ENVIRONMENT=true
globalThis.ResizeObserver=class { observe(){} disconnect(){} }
window.scrollTo=()=>{}
dom.window.HTMLImageElement.prototype.decode=function(){return globalThis.decodeImage ? globalThis.decodeImage(this.src) : Promise.resolve()}
let reduced=false
const mediaLists=[]
window.matchMedia=query=>{
 const listeners=new Set()
 const media={media:query,get matches(){return query.includes('prefers-reduced')?reduced:query.includes('min-width')},addEventListener(_,cb){listeners.add(cb)},removeEventListener(_,cb){listeners.delete(cb)},listeners}
 mediaLists.push(media);return media
}
globalThis.setReducedMotion=value=>{reduced=value;for(const media of mediaLists)for(const callback of media.listeners)callback({matches:media.matches})}
HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','')}
HTMLDialogElement.prototype.close=function(){this.removeAttribute('open')}
const paused=new WeakMap()
Object.defineProperty(HTMLMediaElement.prototype,'paused',{get(){return paused.get(this)??true}})
HTMLMediaElement.prototype.play=function(){paused.set(this,false);this.dispatchEvent(new Event('play'));return Promise.resolve()}
HTMLMediaElement.prototype.pause=function(){paused.set(this,true);this.dispatchEvent(new Event('pause'))}
const server=await createServer({server:{middlewareMode:true},appType:'custom'})
try{
 const suite=await server.ssrLoadModule('/tests/interactions.jsx')
 const results=await suite.run()
 const assetManifest=JSON.parse(await readFile('reference/figma-assets.json','utf8'))
 for(const asset of assetManifest){const file=await stat('public/images/'+asset.file);if(!file.size)throw new Error('Empty asset '+asset.file)}
 results.push('All '+assetManifest.length+' original Figma asset files are non-empty.')
 const decode=spawnSync(ffmpeg,['-v','error','-i','public/videos/medipeel-hero.mp4','-f','null','-'],{encoding:'utf8'})
 if(decode.status!==0)throw new Error(decode.stderr)
 const hashes=spawnSync(ffmpeg,['-v','error','-i','public/videos/medipeel-hero.mp4','-f','framemd5','-'],{encoding:'utf8'}).stdout.split('\n').filter(line=>line && !line.startsWith('#'))
 const first=hashes[0].split(',').at(-1).trim(),last=hashes.at(-1).split(',').at(-1).trim()
 if(hashes.length!==264 || first!==last)throw new Error('Video frame count/loop mismatch')
 results.push('Video decoded all 264 frames; first and last decoded frame hashes match (11 s at 24 fps).')
 const report={checkedAt:new Date().toISOString(),checks:results,limitations:['This suite uses jsdom. Separate actual Chromium results and screenshots are in reference/browser/.']}
 await writeFile('reference/verification.json',JSON.stringify(report,null,2))
 console.log(results.map(result=>'PASS '+result).join('\n'))
}finally{await server.close();dom.window.close()}
