import {scoreStep} from '../data/music-score.js';
let ctx,master,timer,step=0,next=0,mode='home',phase=0;const active=new Set();
export let musicEnabled=true;
export function unlockMusic(){try{ctx??=new (window.AudioContext||window.webkitAudioContext)();ctx.resume().then(schedule).catch(()=>{});if(!master){master=ctx.createGain();master.gain.value=.55;master.connect(ctx.destination)}schedule()}catch{}}
function stop(){clearInterval(timer);timer=null;for(let node of active){try{node.stop()}catch{}}active.clear()}
export function setMusicMode(value,time=0){phase=time<30?0:time<60?1:2;if(mode===value)return;mode=value;stop();step=0;if(ctx)next=ctx.currentTime+.04;schedule()}
export function toggleMusic(){musicEnabled=!musicEnabled;if(!musicEnabled)stop();else unlockMusic();return musicEnabled}
function schedule(){if(timer||!ctx||ctx.state!=='running'||!musicEnabled||!['run','mini','result'].includes(mode)||typeof document!=='undefined'&&document.hidden)return;next=ctx.currentTime+.05;timer=setInterval(pump,40);pump()}
function pump(){if(!ctx||ctx.state!=='running')return;let half=60/(mode==='result'?84:mode==='mini'?124:112)/2;if(next<ctx.currentTime-.1)next=ctx.currentTime+.04;while(next<ctx.currentTime+.16){for(let note of scoreStep(step,mode==='mini'?2:phase,mode==='result'))voice(note,next);next+=half*(step%2?.88:1.12);step++}}
function voice(n,when){let o=ctx.createOscillator(),gain=ctx.createGain(),filter=ctx.createBiquadFilter();o.type=n.voice==='bass'?'triangle':'sine';o.frequency.value=440*2**((n.note-69)/12);filter.type='lowpass';filter.frequency.value=n.voice==='tap'?1000:1800;gain.gain.setValueAtTime(0,when);gain.gain.linearRampToValueAtTime(n.gain,when+.012);gain.gain.exponentialRampToValueAtTime(.0001,when+n.duration);o.connect(filter);filter.connect(gain);gain.connect(master);o.start(when);o.stop(when+n.duration+.04);active.add(o);o.onended=()=>{active.delete(o);o.disconnect();filter.disconnect();gain.disconnect()}}
export function disposeMusic(){stop();if(ctx){ctx.close();ctx=null;master=null}}
if(typeof window!=='undefined'){window.addEventListener('blur',stop);window.addEventListener('focus',schedule);window.addEventListener('pagehide',disposeMusic);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else schedule()})}
