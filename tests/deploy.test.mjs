import test from 'node:test';import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';import {resolve,dirname,join} from 'node:path';import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
test('HTML resources and ES module imports resolve beneath GitHub Pages project base',async()=>{
 const base=new URL('https://example.invalid/Dont-Make-Me-Work/');let checked=0;
 async function check(relative,ref){if(/^(https?:|data:|#)/.test(ref))return;assert.ok(!ref.startsWith('/'),`${relative}: root-absolute resource ${ref}`);let url=new URL(ref,new URL(relative,base));assert.ok(url.pathname.startsWith(base.pathname),`${relative}: resource leaves project path`);let file=join(root,decodeURIComponent(url.pathname.slice(base.pathname.length)));await readFile(file);checked++}
 let html=await readFile(join(root,'index.html'),'utf8');for(let [,ref]of html.matchAll(/(?:src|href)="([^"]+)"/g))await check('index.html',ref);
 async function walk(dir){for(let entry of await readdir(join(root,dir),{withFileTypes:true})){let path=dir+'/'+entry.name;if(entry.isDirectory())await walk(path);else if(path.endsWith('.js')){let source=await readFile(join(root,path),'utf8');for(let [,ref]of source.matchAll(/(?:from\s*|import\s*)['"]([^'"]+)['"]/g))await check(path,ref);for(let [,ref]of source.matchAll(/(?:src|href)="(\.\/src\/assets\/[^"$]+)"/g))await check('index.html',ref)}}}
 await walk('src');assert.ok(checked>25);let brand=await readFile(join(root,'src/components/Brand.js'),'utf8');assert.ok(brand.includes('./src/assets/lab-logo.svg'));let ignore=await readFile(join(root,'.gitignore'),'utf8');assert.ok(ignore.includes('node_modules/'));assert.ok(ignore.includes('dist/'));
});
