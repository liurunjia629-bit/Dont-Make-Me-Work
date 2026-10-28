export function potato(c,x,y,state='run',t=0,scale=1){
 c.save();c.translate(x,y);c.scale(scale,scale);let slide=state==='slide',dead=['hit','fail'].includes(state),air=['jump','double'].includes(state);c.translate(0,slide?15:0);c.scale(slide?1.25:1,slide?.52:1);c.lineWidth=2.8;c.strokeStyle='#252520';c.lineJoin='round';
 const path=(f,fill)=>{c.beginPath();f();if(fill){c.fillStyle=fill;c.fill()}c.stroke()};
 let stride=state==='run'?Math.sin(t*17)*10:0;
 path(()=>{c.moveTo(-12,24);c.lineTo(-17+stride,40);c.lineTo(-24+stride,40);c.moveTo(12,24);c.lineTo(17-stride,39);c.lineTo(24-stride,39)});
 path(()=>{c.ellipse(0,-6,29,40,Math.sin(t*8)*.035,0,Math.PI*2)},'#dfba77');
 path(()=>{c.moveTo(-27,1);c.quadraticCurveTo(0,11,28,1);c.lineTo(25,24);c.quadraticCurveTo(0,33,-25,24);c.closePath()},'#fffdf5');
 path(()=>{c.moveTo(-7,5);c.lineTo(1,13);c.lineTo(8,5);c.moveTo(1,11);c.lineTo(air?20:8,air?4:29);c.lineTo(air?23:1,air?11:33);c.lineTo(-2,16);c.closePath()},'#ec4934');
 path(()=>{c.moveTo(26,7);c.lineTo(36,18);c.moveTo(33,20);c.lineTo(43,20);c.lineTo(43,25)});path(()=>c.roundRect(30,25,24,18,3),'#b5cf6b');
 if(dead){path(()=>{for(let ex of [-11,10]){c.moveTo(ex-4,-18);c.lineTo(ex+4,-10);c.moveTo(ex+4,-18);c.lineTo(ex-4,-10)}});path(()=>c.ellipse(0,-1,7,9,0,0,7),'#ec4934')}
 else{c.fillStyle='#252520';c.beginPath();c.ellipse(-10,-15,2.5,4,0,0,7);c.ellipse(10,-15,2.5,4,0,0,7);c.fill();path(()=>{c.moveTo(-5,-3);c.quadraticCurveTo(1,state==='celebrate'?9:0,7,-5)});path(()=>{c.moveTo(-16,-25);c.lineTo(-7,-27);c.moveTo(6,-27);c.lineTo(15,-24)})}
 if(state==='double'){c.strokeStyle='#ec4934';for(let i=0;i<3;i++)path(()=>c.ellipse(0,44+i*6,30-i*6,5,0,0,Math.PI*1.7))}c.restore();
}
export function portrait(){return `<svg viewBox="0 0 240 250" role="img" aria-label="疲惫但充满求生欲的打工土豆"><g stroke="#252520" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M95 195l-9 29H70m65-29 12 29h18" fill="none"/><path d="M58 117C51 43 83 22 115 22c45-1 69 47 64 105-2 47-25 77-62 77-40 0-58-35-59-87Z" fill="#dfba77"/><path d="M59 132q58 23 119-1l-7 54q-53 28-104 0Z" fill="#fffdf5"/><path d="m100 140 16 14 15-14m-15 14 18 37-17 10-9-42" fill="#ec4934"/><path d="m175 144 22 25m-4 10v-12h18v14" fill="none"/><rect x="183" y="179" width="43" height="34" rx="4" fill="#b5cf6b"/><path d="m83 80 16-4m29 0 16 5M106 119q10 5 21-2" fill="none"/><ellipse cx="94" cy="96" rx="3" ry="5"/><ellipse cx="134" cy="96" rx="3" ry="5"/></g><path d="m33 73-17-8m23 32H13m31 26-21 8" stroke="#ec4934" stroke-width="3"/></svg>`}
