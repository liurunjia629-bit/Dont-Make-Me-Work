import {potato} from '../characters/potato.js';
import {title} from '../data/content.js';
import {endingFor,storyFor} from '../data/endings.js';
function wrap(c,text,x,y,width,lineHeight,maxLines=4){let lines=[],line='';for(let char of text){if(c.measureText(line+char).width>width){lines.push(line);line=''}line+=char}if(line)lines.push(line);lines.slice(0,maxLines).forEach((s,i)=>c.fillText(s+(i===maxLines-1&&lines.length>maxLines?'…':''),x,y+i*lineHeight));return y+Math.min(lines.length,maxLines)*lineHeight}
export async function report(g,comment){
 await document.fonts.ready;let canvas=document.createElement('canvas');canvas.width=900;canvas.height=1350;let c=canvas.getContext('2d'),ending=g.resultEnding||endingFor(g);
 c.fillStyle='#f5f1e5';c.fillRect(0,0,900,1350);c.strokeStyle='#252520';c.lineWidth=4;c.strokeRect(40,40,820,1270);c.fillStyle='#252520';c.font='22px sans-serif';c.fillText('不正常人类研究所 / 逃亡档案 NO.002',80,100);c.font='bold 62px sans-serif';c.fillText('别让我上班！',80,190);c.font='24px monospace';c.fillText("DON’T MAKE ME WORK! / V2.0",85,235);
 potato(c,450,385,g.lastFail?'fail':'celebrate',0,2.4);c.fillStyle='#ec4934';c.font='bold 84px sans-serif';c.fillText(`${Math.floor(g.distance)} m`,80,570);c.fillStyle='#252520';c.font='26px sans-serif';c.fillText(`生存 ${g.time.toFixed(1)} 秒 / 躲避 ${g.dodged} 次`,80,628);c.font='bold 30px sans-serif';c.fillText(title(g.distance),80,685);
 c.fillStyle='#ec4934';c.font='bold 38px sans-serif';c.fillText(ending.name,80,770);c.fillStyle='#252520';c.font='25px sans-serif';wrap(c,ending.text,80,818,720,37,2);
 c.font='22px sans-serif';wrap(c,g.resultStory||storyFor(g),80,930,720,34,3);c.font='22px sans-serif';wrap(c,'博士批注：'+comment,80,1070,720,33,2);
 c.font='18px sans-serif';let url=location.protocol.startsWith('http')&&!['localhost','127.0.0.1'].includes(location.hostname)?location.origin+location.pathname:'独立小游戏 · 公开地址待发布';wrap(c,url,80,1200,720,26,3);return new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
}
export async function downloadReport(g,comment,share=false){let blob=await report(g,comment);if(!blob)throw Error('图片生成失败');let file=new File([blob],'打工人逃亡档案.png',{type:'image/png'});if(share&&navigator.canShare?.({files:[file]})){await navigator.share({files:[file],title:'我的逃亡档案'});return}let url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=file.name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000)}
