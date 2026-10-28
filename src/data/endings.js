export const endings=[
 {id:'dream',name:'梦里也在开会',text:'你选择回家睡觉，却梦见自己还在开会。',hint:'遇到周六，选择回家。'},
 {id:'director',name:'自由部门主管',text:'你成功获得自由，却被任命为自由部门主管。',hint:'接受升职，再跑到600米。'},
 {id:'cafe',name:'咖啡店新员工',text:'你跑进咖啡店，被误认为新员工。咖啡免费，工时另算。',hint:'实际消耗一次咖啡保护。'},
 {id:'holiday',name:'老板的三公里',text:'老板追了你三公里，只为了告诉你今天放假。',hint:'一局跑满3000米。'},
 {id:'edge',name:'世界尽头正在招聘',text:'你逃到世界尽头，发现那里正在招聘。',hint:'用过精神离职，跑过1000米。'},
 {id:'another',name:'隔壁公司欢迎你',text:'你终于逃离公司，却发现自己进入了另一家公司。',hint:'完成任意一次逃亡。'}
];
export function endingFor(g){let id=g.endingId||(g.distance>=3000?'holiday':g.flags.promoted&&g.distance>=600?'director':g.flags.coffeeUsed?'cafe':g.flags.ghostUsed&&g.distance>=1000?'edge':'another');return endings.find(e=>e.id===id)||endings[5]}
export function storyFor(g){let names={meeting:'场会议',boss:'次老板查岗',kpi:'座KPI大山',messages:'组工作消息',overtime:'份加班通知',phone:'通领导来电'};let parts=Object.entries(g.encounters).filter(([,n])=>n).map(([id,n])=>`${n}${names[id]}`);return `你躲过了${parts.length?parts.join('、'):'零个障碍（生存本身就是成就）'}，做了${g.choices.length}次职场选择，使用${g.abilityUses}次能力，${g.lastFail?`最后败给了${g.lastFail.name}。`:'最后亲自决定了今天的去向。'}`}
