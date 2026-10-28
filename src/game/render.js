import {potato} from '../characters/potato.js';
import {drawObstacle} from './draw-obstacle.js';
import {abilities} from '../data/abilities.js';
export function render(c,g){let w=g.width;c.clearRect(0,0,w,400);c.fillStyle='#f5f1e5';c.fillRect(0,0,w,400);c.lineWidth=2;c.strokeStyle='#d9d4c5';let offset=g.distance*5%140;for(let i=-1;i<w/140+1;i++){let x=i*140-offset;c.strokeRect(x,110,85,205);c.beginPath();c.moveTo(x+42,110);c.lineTo(x+42,315);c.moveTo(x,160);c.lineTo(x+85,160);c.stroke()}c.fillStyle='#c1bdaf';c.font='12px monospace';c.fillText(g.time>60?'BUSY BEING FREE.':'OFFICE → NO THANKS.',w*.44,100);c.strokeStyle='#272722';c.beginPath();c.moveTo(0,340);c.lineTo(w,338);c.stroke();for(let i=0;i<w/70+1;i++){let x=i*70-g.distance*14%70;c.beginPath();c.moveTo(x,355);c.lineTo(x+22,355);c.stroke()}
 for(let o of g.items)drawObstacle(c,o,g.time);
 c.save();let a=g.ability;if(a?.id==='ghost')c.globalAlpha=.38;
 if(g.shield||a?.id==='fish'){c.strokeStyle='#91ae47';c.lineWidth=3;c.setLineDash(a?[9,4]:[]);c.beginPath();c.ellipse(g.playerX,300+g.y,44,53,0,0,7);c.stroke();c.setLineDash([])}
 if(a?.id==='coffee'){c.strokeStyle=abilities.coffee.color;c.lineWidth=4;c.beginPath();c.arc(g.playerX,300+g.y,47,-Math.PI/2,Math.PI*1.5);c.stroke();c.font='18px sans-serif';c.fillStyle='#74512b';c.fillText('1',g.playerX+30,270+g.y)}
 potato(c,g.playerX,300+g.y,g.over?g.lastFail?'fail':'celebrate':g.slide?'slide':g.jumps===2?'double':g.jumps?'jump':g.flashTime>1.5&&g.milestone?'celebrate':'run',g.time);c.restore();
 if(a?.id==='unread'){c.strokeStyle='#ec4934';c.lineWidth=2;c.beginPath();c.arc(g.playerX,300,65+Math.sin(g.time*5)*8,0,7);c.stroke()}
 c.fillStyle='#252520';c.textAlign='center';c.font='bold 13px sans-serif';if(g.flashTime>0){let text=g.flash;if(c.measureText(text).width>w-30){let split=Math.ceil(text.length/2);c.fillText(text.slice(0,split),w/2,31);c.fillText(text.slice(split),w/2,49)}else c.fillText(text,w/2,35)}
 if(g.warning){c.fillStyle='#ec4934';c.font='bold 12px sans-serif';c.fillText(g.warning,w/2,76)}c.textAlign='left';
}
