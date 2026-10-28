export const miniDefinitions={
 ppt:{title:'假装认真工作',rule:'先选一种图表，再点PPT空位。放入4种不同图表，专业程度达到100%！',instruction:'选图表 → 点空位 · 每种只能用一次',seconds:10,success:'虽然我看不懂，但很专业。',failure:'不错，再做十份。',quip:'复杂不一定有用，但简单一定显得不忙。'},
 messages:{title:'工作群求生',rule:'连续3次找到准确的「收到」。按钮每轮换位置，选错扣1秒。',instruction:'找到「收到」 · 其他回复不算数',seconds:9,success:'你成功维持了职场社交关系。',failure:'你被拉进了三个新的工作群。',quip:'社交关系保住了，下班时间没有。'}
};
export const chartTypes=[{id:'bars',label:'增长柱图',caption:'假装增长率'},{id:'pie',label:'画饼圆图',caption:'饼的完成度'},{id:'arrows',label:'战略箭头',caption:'向上管理力'},{id:'funnel',label:'闭环漏斗',caption:'闭环的闭环'}];
function shuffle(a,rng){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
export class MiniGame{
 constructor(id,rng=Math.random){if(!miniDefinitions[id])throw Error('Unknown minigame');this.id=id;this.rng=rng;this.phase='rules';this.remaining=miniDefinitions[id].seconds;this.elapsed=0;this.revision=0;this.round=0;this.slots=[null,null,null,null];this.selected=null;this.wrong=0;this.notice='';this.result=null;this.options=[];this.variant=Math.floor(rng()*3);this.charts=shuffle(chartTypes,rng);this.makeReplies()}
 get progress(){return this.id==='ppt'?this.slots.filter(Boolean).length/4:this.round/3}
 start(){if(this.phase!=='rules')return false;this.phase='playing';this.revision++;return true}
 update(dt){if(this.phase!=='playing')return;dt=Math.max(0,dt);this.elapsed+=dt;this.remaining=Math.max(0,this.remaining-dt);if(this.remaining===0)this.finish(false)}
 finish(success){if(this.phase!=='playing')return false;this.phase='feedback';this.result={id:this.id,success,elapsed:this.elapsed,wrong:this.wrong,variant:this.variant};this.revision++;return true}
 makeReplies(){this.options=shuffle(['收到','好的','了解','已阅','我不想干了','退群'],this.rng).map((label,i)=>({id:`${this.round}-${i}`,label}))}
 act(action,value){if(this.phase!=='playing')return false;
  if(this.id==='ppt'){
   if(action==='select'&&chartTypes.some(c=>c.id===value)&&!this.slots.includes(value)){this.selected=value;this.notice='现在点一个空位，让PPT变复杂。';this.revision++;return true}
   if(action==='place'&&Number.isInteger(value)&&value>=0&&value<4&&!this.slots[value]&&this.selected){this.slots[value]=this.selected;this.selected=null;this.notice=['不错，已经开始看不懂了。','数据来源：老板的直觉。','战略正在形成闭环。','专业程度：无法解释。'][this.slots.filter(Boolean).length-1];this.revision++;if(this.progress===1)this.finish(true);return true}
  }else if(action==='reply'){
   let option=this.options.find(o=>o.id===value);if(!option)return false;
   if(option.label==='收到'){this.round++;this.notice='收到！下一条：还是收到。';if(this.round===3)this.finish(true);else this.makeReplies()}
   else{this.wrong++;this.remaining=Math.max(0,this.remaining-1);this.notice=`你回复了「${option.label}」，老板正在截图。`;if(this.remaining===0)this.finish(false);else this.makeReplies()}
   this.revision++;return true;
  }
  return false;
 }
}
