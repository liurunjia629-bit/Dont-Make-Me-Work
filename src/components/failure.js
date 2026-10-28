import {potato} from '../characters/potato.js';
import {drawObstacle} from '../game/draw-obstacle.js';
// One short, original failure sketch for phase one. No timer or state survives disposal.
export function showFailure(mount,g,done){let raf=0,last=performance.now(),elapsed=0,paused=false,disposed=false;
 mount(`<main class="failure-scene"><small>逃亡事故回放 / 可跳过</small><h2>你跑得很快。老板安排得更快。</h2><canvas id="failure-canvas" width="640" height="320" aria-label="土豆被安排在会议桌前主持会议的动画"></canvas><p>老板：「既然来了，你来主持一下。」</p><small>你撞上了${g.lastFail?.name||'职场现实'}，逃跑被临时改成了现场汇报。</small><div><button id="failure-skip" class="primary">跳过演出，查看本局故事 ↗</button><button id="failure-resume" hidden>继续演出</button></div></main>`);
 let canvas=document.getElementById('failure-canvas'),c=canvas.getContext('2d');let skip=document.getElementById('failure-skip'),resume=document.getElementById('failure-resume');
 function dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(raf);window.removeEventListener('blur',blur);document.removeEventListener('visibilitychange',visibility);skip.onclick=null;resume.onclick=null}
 function finish(){if(disposed)return;dispose();done()}
 function blur(){paused=true;resume.hidden=false}function visibility(){if(document.hidden)blur()}
 window.addEventListener('blur',blur);document.addEventListener('visibilitychange',visibility);skip.onclick=finish;resume.onclick=()=>{paused=false;resume.hidden=true;last=performance.now()};
 function frame(now){if(disposed)return;let dt=Math.min((now-last)/1000,.05);last=now;if(!paused)elapsed+=dt;drawMeetingFailure(c,elapsed);if(elapsed>=3){finish();return}raf=requestAnimationFrame(frame)}raf=requestAnimationFrame(frame);return dispose;
}
export function drawMeetingFailure(c,t){c.clearRect(0,0,640,320);c.fillStyle='#f5f1e5';c.fillRect(0,0,640,320);c.strokeStyle='#252520';c.lineWidth=2;c.beginPath();c.moveTo(45,282);c.lineTo(590,282);c.stroke();let drop=Math.min(1,t/.65),wobble=Math.sin(t*18)*Math.max(0,1-t/2);potato(c,320+wobble*6,160+drop*32,t<.9?'hit':'fail',t,1.45);c.save();c.translate(258,204);c.scale(1.8,1.35);drawObstacle(c,{kind:'table',w:76,h:54,x:0,y:0},t);c.restore();c.strokeStyle='#ec4934';c.beginPath();c.moveTo(320,75);c.lineTo(320,111);c.moveTo(312,102);c.lineTo(320,111);c.lineTo(328,102);c.stroke();c.fillStyle='#252520';c.font='bold 19px sans-serif';c.textAlign='center';c.fillText(t<1.1?'请坐。':'本次会议由土豆主持。',320,51);c.font='12px monospace';c.fillText('AGENDA: NONE.  /  DURATION: FOREVER.',320,306);c.textAlign='left';}
