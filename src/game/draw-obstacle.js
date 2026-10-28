const INK='#252520',PAPER='#fffdf5',RED='#ec4934',GREEN='#bad679';
export function drawObstacle(c,o,t){c.save();c.translate(o.x,o.y);c.lineWidth=2.5;c.strokeStyle=INK;c.lineJoin='round';c.lineCap='round';
 const path=(points,fill)=>{c.beginPath();points(c);if(fill){c.fillStyle=fill;c.fill()}c.stroke()};
 const text=(s,x,y,size=11)=>{c.fillStyle=INK;c.font=`bold ${size}px sans-serif`;c.fillText(s,x,y)};
 if(o.kind==='table'){
  c.scale(o.w/76,o.h/54);
  path(c=>{c.moveTo(12,20);c.lineTo(10,54);c.moveTo(62,20);c.lineTo(66,54)});
  path(c=>{c.moveTo(3,9);c.lineTo(60,2);c.lineTo(76,19);c.lineTo(16,28);c.closePath()},'#dfba77');
  path(c=>{c.moveTo(20,3);c.lineTo(52,0);c.lineTo(58,15);c.lineTo(25,20);c.closePath()},PAPER);text('紧急',28,12,9);
  path(c=>{c.moveTo(-9,5);c.lineTo(-9,-4);c.moveTo(-16,0);c.lineTo(-20,-6)},null);
 }else if(o.kind==='boss'){
  path(c=>{c.moveTo(16,62);c.lineTo(10,76);c.moveTo(40,62);c.lineTo(47,76)});
  path(c=>{c.moveTo(7,33);c.lineTo(45,32);c.lineTo(52,62);c.lineTo(5,62);c.closePath()},GREEN);
  path(c=>c.ellipse(27,20,21,21,.13,0,7),PAPER);
  path(c=>{c.moveTo(8,9);c.lineTo(11,-2);c.lineTo(24,5);c.lineTo(36,-2);c.lineTo(47,10)},INK);
  path(c=>{c.moveTo(13,17);c.lineTo(23,21);c.moveTo(33,21);c.lineTo(41,16);c.moveTo(20,30);c.lineTo(37,30)});
  path(c=>{c.moveTo(3,41);c.lineTo(-10,24);c.moveTo(-10,24);c.lineTo(-10,5)});
  path(c=>c.rect(-28,-17,43,24),PAPER);text('人呢？',-23,-1,12);text('BOSS',11,51,10);
  if(o.lane==='high'){path(c=>{c.moveTo(0,-26);c.lineTo(54,-26);c.moveTo(27,-26);c.lineTo(27,-50)});text('空降',10,-31,10)}
 }else if(o.kind==='chart'){
  [56,102,152].forEach((h,i)=>{let growth=Math.min(1,.45+(o.age||0)*1.2),actual=h*growth;path(c=>{c.moveTo(i*22,152);c.lineTo(i*22+1,152-actual);c.lineTo(i*22+20,150-actual);c.lineTo(i*22+20,152);c.closePath()},i===2?RED:GREEN)});
  text('KPI ↑',2,-13,12);path(c=>{c.moveTo(1,-4);c.lineTo(49,-23);c.lineTo(44,-24);c.moveTo(49,-23);c.lineTo(48,-17)});
 }else if(o.kind==='bubbles'){
  [[0,0,48,31],[42,12,44,30]].forEach(([x,y,w,h],i)=>{path(c=>{c.moveTo(x+4,y);c.lineTo(x+w,y+2);c.lineTo(x+w-1,y+h-6);c.lineTo(x+12,y+h-6);c.lineTo(x+7,y+h);c.lineTo(x+7,y+h-6);c.lineTo(x,y+h-7);c.closePath()},i?GREEN:PAPER);text(i?'收到？':'在吗？',x+5,y+18,10)});
  c.fillStyle=RED;c.beginPath();c.arc(84,10,10,0,7);c.fill();c.fillStyle=PAPER;c.font='9px sans-serif';c.fillText('99+',75,13);
 }else if(o.kind==='folder'){
  path(c=>{c.moveTo(0,9);c.lineTo(3,0);c.lineTo(24,2);c.lineTo(27,9);c.lineTo(52,8);c.lineTo(48,60);c.lineTo(2,57);c.closePath()},RED);
  path(c=>{c.moveTo(9,17);c.lineTo(44,15);c.lineTo(42,47);c.lineTo(8,49);c.closePath()},PAPER);text('加班',12,31);text('自愿',12,43,9);
  if(o.age<.75){path(c=>{c.moveTo(9,-12);c.lineTo(9,-30);c.moveTo(33,-8);c.lineTo(33,-25)})}
 }else if(o.kind==='phone'){
  c.translate(Math.sin(t*38)*1.5,0);path(c=>c.roundRect(0,0,38,65,7),INK);path(c=>c.roundRect(5,9,28,42,3),GREEN);
  c.strokeStyle=PAPER;path(c=>c.arc(19,57,2,0,7));c.strokeStyle=INK;path(c=>{c.moveTo(11,19);c.quadraticCurveTo(12,33,27,36);c.lineTo(29,30);c.lineTo(24,27);c.lineTo(21,30);c.lineTo(16,23);c.lineTo(17,20);c.closePath()},PAPER);
  path(c=>{c.moveTo(-6,13);c.quadraticCurveTo(-14,25,-6,38);c.moveTo(44,13);c.quadraticCurveTo(53,25,44,38)});
 }
 c.restore();}
