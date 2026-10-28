export const events = [
 {id:'call',title:'老板来电',story:'“你人呢？”电话里传来一种周一的声音。',quip:'精神到岗，肉体拒签。',options:[{text:'我在路上！',effect:'boost',label:'加速5秒'},{text:'我在精神上已经到岗。',effect:'fish',label:'带薪摸鱼4秒'}]},
 {id:'saturday',title:'今天是周六',story:'系统：恭喜，今天不用上班！远处团建大巴正在掉头。',quip:'周末是人类的基本形状。',options:[{text:'回家睡觉。',ending:'dream',label:'结束本局，解锁结局'},{text:'继续跑，以防万一。',effect:'challenge',label:'提升难度，获得一次咖啡保护'}]},
 {id:'bonus',title:'年终奖通知',story:'“恭喜获得年终奖！”附件只有一张电子感谢卡。',quip:'感谢可以很真诚，也可以很便宜。',options:[{text:'立即领取。',effect:'card',label:'收集电子感谢卡 + 带薪摸鱼'},{text:'我选择自由。',effect:'ghost',label:'精神离职5秒'}]},
 {id:'promotion',title:'升职通知',story:'恭喜！你升任高级会议旁听员，椅子仍需自带。',quip:'升的是职位，降的是血糖。',options:[{text:'接受，但不发言。',effect:'promotion',label:'记录升职，清除工作消息'},{text:'拒绝，我赶时间。',effect:'boost',label:'加速5秒'}]},
 {id:'remote',title:'远程办公',story:'今天可以在家办公，但必须先到公司打卡。',quip:'远的是通勤，程的是流程。',options:[{text:'让灵魂去打卡。',effect:'ghost',label:'精神离职5秒'},{text:'标记已读。',effect:'unread',label:'清除工作消息'}]},
 {id:'leave',title:'带薪休假',story:'你获得一天带薪休假。有效期：昨天。',quip:'把今天摸成昨天，也是一种时间管理。',options:[{text:'现在补休。',effect:'fish',label:'带薪摸鱼4秒'},{text:'换成咖啡。',effect:'coffee',label:'18秒内抵消一次碰撞'}]},
 {id:'care',title:'老板的关心',story:'“最近辛苦了，所以这个项目就交给你了。”',quip:'关心的计量单位是项目。',options:[{text:'已读，不回。',effect:'unread',label:'清除工作消息'},{text:'我已经离职（精神版）。',effect:'ghost',label:'精神离职5秒'}]},
 {id:'doctor',title:'土豆博士支援',story:'“本所不提供就业指导，只提供逃跑建议。”博士递来两样东西。',quip:'咖啡救急，摸鱼救命。',options:[{text:'拿一杯续命咖啡。',effect:'coffee',label:'18秒内抵消一次碰撞'},{text:'拿带薪摸鱼许可证。',effect:'fish',label:'带薪摸鱼4秒'}]}
];
export function eventDeck(rng=Math.random){let deck=[...events];for(let i=deck.length-1;i>0;i--){let j=Math.floor(rng()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]]}return deck.slice(0,3)}
