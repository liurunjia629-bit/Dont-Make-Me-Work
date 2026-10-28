export const achievements=[
 {id:'meeting',name:'会议绝缘体',text:'累计躲过10场会议',met:p=>p.counts.meeting>=10},
 {id:'messages',name:'已读不回大师',text:'累计躲过20组工作消息',met:p=>p.counts.messages>=20},
 {id:'distance',name:'带薪失踪艺术家',text:'累计逃跑3000米',met:p=>p.distance>=3000},
 {id:'runs',name:'稳定离职倾向',text:'单次打开页面连续完成5局',met:(_p,session)=>session>=5},
 {id:'weekend',name:'周末保护协会',text:'累计选择周六事件3次',met:p=>p.saturdays>=3},
 {id:'coffee',name:'续命不是续班',text:'消耗一次咖啡保护',met:p=>p.coffees>=1},
 {id:'collector',name:'离谱档案管理员',text:'发现全部6种结局',met:p=>p.endings.length===6}
];
