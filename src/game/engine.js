import {obstacles} from '../data/obstacles.js';
import {eventDeck} from '../data/events.js';
import {abilities} from '../data/abilities.js';
export const GRAVITY=1650,JUMP=610;
export const speedAt=t=>Math.min(380,180+t*1.45);
export const gapAt=t=>speedAt(t)*2.35+100;
export const intersects=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
export function obstacleBoxes(o){
 if(o.kind==='chart')return [0,1,2].map(i=>({x:o.x+i*22+3,y:338-[56,102,152][i],w:17,h:[56,102,152][i]}));
 if(o.kind==='table')return [{x:o.x+3,y:o.y+4,w:o.w-6,h:18},{x:o.x+9,y:o.y+22,w:7,h:o.h-22},{x:o.x+o.w-18,y:o.y+22,w:7,h:o.h-22}];
 if(o.kind==='bubbles')return [{x:o.x+3,y:o.y+4,w:45,h:29},{x:o.x+43,y:o.y+13,w:42,h:30}];
 return [{x:o.x+5,y:o.y+4,w:o.w-10,h:o.h-8}];
}
export class Engine{
 constructor(rng=Math.random){this.rng=rng;this.width=640;this.playerX=140;this.reset()}
 reset(){Object.assign(this,{time:0,distance:0,dodged:0,y:0,vy:0,jumps:0,slide:0,shield:0,items:[],spawn:2.3,nextEvent:26,event:null,eventTime:0,deck:eventDeck(this.rng),over:false,paused:false,lastFail:null,milestone:0,flash:'右边跳跃，左边滑铲。',flashTime:4,ability:null,abilityUses:0,nextSupply:14,supplyIndex:Math.floor(this.rng()*4),pendingAbility:null,encounters:{meeting:0,boss:0,kpi:0,messages:0,overtime:0,phone:0},choices:[],flags:{},harder:0,endingId:null,cleared:0,pattern:[],lastKind:null});}
 resize(width){this.width=Math.max(480,Math.min(800,width));this.playerX=this.width*.22;}
 get speed(){return Math.min(speedAt(this.time+this.harder)*(this.ability?.id==='boost'?1.18:1),(this.width-this.playerX-60)/1.3)}
 get warning(){let o=this.items.find(o=>!o.passed&&o.x>this.playerX);return o?`${o.name} · ${o.lane==='high'?'滑铲躲过':['chart','boss','bubbles'].includes(o.kind)?'二段跳越过':o.hint}`:''}
 jump(){if(this.over||this.paused||this.event||this.jumps>=2)return false;this.slide=0;this.vy=-JUMP;this.jumps++;return true}
 duck(){if(this.over||this.paused||this.event||this.y<0||this.slide>0)return false;this.slide=.85;return true}
 box(){return{x:this.playerX-18,y:280+this.y+(this.slide?35:0),w:36,h:this.slide?23:58}}
 grant(id){if(!abilities[id])return;this.ability={id,remaining:abilities[id].duration};this.abilityUses++;if(id==='ghost')this.flags.ghostUsed=true;if(id==='unread'){let before=this.items.length;this.items=this.items.filter(o=>o.id!=='messages');this.cleared+=before-this.items.length}this.flash=`${abilities[id].name}！${abilities[id].description}`;this.flashTime=3}
 activate(){if(!this.pendingAbility||this.over||this.paused||this.event)return false;this.grant(this.pendingAbility);this.pendingAbility=null;return true}
 choose(index){if(!this.event||this.over||this.paused)return false;let event=this.event,option=event.options[index];if(!option)return false;this.choices.push({event:event.id,text:option.text});this.event=null;this.eventTime=0;this.shield=2;this.items=[];this.y=0;this.vy=0;this.jumps=0;this.slide=0;this.spawn=.2;this.nextEvent=this.time+24+this.rng()*8;
 if(option.ending){this.endingId=option.ending;this.over=true;return true}
 let effect=option.effect;if(effect==='challenge'){this.harder+=20;effect='coffee'}if(effect==='promotion'){this.flags.promoted=true;effect='unread'}if(effect==='card'){this.flags.card=true;effect='fish'}this.grant(effect);this.flash=event.quip;this.flashTime=3;return true}
 spawnObstacle(){let pool=this.time<15?[0]:this.time<30?[0,1,4,5]:[0,1,2,3,4,5];let index=pool[Math.floor(this.rng()*pool.length)];if(this.time>=60){if(!this.pattern?.length)this.pattern=[...[[0,5,2],[3,4,1],[2,0,5]][Math.floor(this.rng()*3)]];index=this.pattern.shift()}else if(this.lastKind===index&&pool.length>1)index=pool[(pool.indexOf(index)+1)%pool.length];this.lastKind=index;let base=obstacles[index];let high=['boss','messages'].includes(base.id)&&this.rng()<.5;let o={...base,x:this.width+50,y:338-base.h-(high?40:base.air),lane:high||base.id==='phone'?'high':'low',passed:false,age:0};if(base.id==='boss'&&high)o.y=222;if(base.id==='messages'){o.y=high?252:292;o.lane=high?'high':'low'}o.targetY=o.y;this.items.push(o);this.spawn=2.35+100/this.speed+this.rng()*.45;}
 update(dt){if(this.over||this.paused)return;dt=Math.min(Math.max(dt,0),.05);if(this.event){this.eventTime+=dt;return}
 this.time+=dt;let speed=this.speed;this.distance+=speed*dt/14;this.slide=Math.max(0,this.slide-dt);this.shield=Math.max(0,this.shield-dt);this.flashTime-=dt;if(this.ability){this.ability.remaining-=dt;if(this.ability.remaining<=0)this.ability=null}
 this.vy+=GRAVITY*dt;this.y+=this.vy*dt;if(this.y>=0){this.y=0;this.vy=0;this.jumps=0}
 this.spawn-=dt;if(this.spawn<=0)this.spawnObstacle();
 for(let o of this.items){o.age=(o.age||0)+dt;o.x-=speed*dt;
 if(o.targetY!==undefined){let far=o.x>this.playerX+speed*1.3;if(o.kind==='folder')o.y=o.targetY-(far?Math.max(0,1-o.age/.75)*150:0);if(o.kind==='bubbles')o.y=o.targetY+(far?Math.sin(o.age*6)*18:0)}
 if(!o.passed&&o.x+o.w<this.playerX-18){o.passed=true;if(this.ability?.id!=='ghost'){this.dodged++;this.encounters[o.id]=(this.encounters[o.id]||0)+1}this.flash=['会议可以迟到，自由不能。','已读，乱回。','这班，谁爱上谁上。'][this.dodged%3];this.flashTime=1.2}
 let immune=this.shield>0||['fish','ghost'].includes(this.ability?.id);
 if(!immune&&obstacleBoxes(o).some(b=>intersects(this.box(),b))){if(this.ability?.id==='coffee'){this.ability=null;this.flags.coffeeUsed=true;this.shield=1.6;this.flash='咖啡替你上了一次班！';this.flashTime=2;o.x=-200;continue}this.over=true;this.lastFail=o;return}}
 this.items=this.items.filter(o=>o.x+o.w>-20);if(this.ability?.id==='unread'){let before=this.items.length;this.items=this.items.filter(o=>o.id!=='messages');this.cleared+=before-this.items.length}
 let mile=Math.floor(this.distance/100);if(mile>this.milestone){this.milestone=mile;this.flash=`逃亡 ${mile*100} 米！自由 +1`;this.flashTime=2}
 if(this.time>=this.nextSupply&&!this.pendingAbility){this.pendingAbility=['fish','unread','ghost','coffee'][this.supplyIndex++%4];this.nextSupply=this.time+24}
 if(this.deck.length&&this.time>=this.nextEvent&&this.items.every(o=>o.x>this.playerX+speed*1.2||o.x+o.w<this.playerX-40)){this.event=this.deck.pop();this.eventTime=0}
 }
}
