// Dynamic hazards settle into a readable lane before reaching the player.
export const obstacles = [
 {id:'meeting',name:'紧急会议',kind:'table',w:60,h:46,air:0,hint:'跳过会议桌',fail:'你被迫参加了一场没有议程的会议。'},
 {id:'boss',name:'老板查岗',kind:'boss',w:56,h:76,air:0,hint:'老板来了：看位置！',fail:'老板找到了你，但没找到你的工作热情。'},
 {id:'kpi',name:'KPI大山',kind:'chart',w:66,h:152,air:0,hint:'连续两次跳跃',fail:'你的绩效正在以肉眼可见的速度下降。'},
 {id:'messages',name:'工作群轰炸',kind:'bubbles',w:88,h:46,air:40,hint:'高位滑铲，低位二段跳',fail:'99+条消息，0条与你的幸福有关。'},
 {id:'overtime',name:'加班通知',kind:'folder',w:52,h:60,air:0,hint:'看落点！落地后跳过',fail:'恭喜获得一份没有加班费的责任。'},
 {id:'phone',name:'领导来电',kind:'phone',w:38,h:65,air:40,hint:'滑铲，拒接来电',fail:'你接通了一个永远不会结束的电话。'}
];
