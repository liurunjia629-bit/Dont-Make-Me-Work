// Original 16-bar office jazz. MIDI pitches; rests are intentional, not random.
const harmony=[[48,52,55,59],[45,48,52,55],[50,53,57,60],[43,47,50,53]];
const melody=[[76,0,79,78,76,72,0,74],[72,0,76,79,0,76,74,72],[74,77,0,81,79,77,74,0],[71,74,77,0,76,74,71,0],
 [79,0,83,81,79,76,0,74],[76,79,0,84,83,79,76,0],[77,0,81,79,77,74,72,0],[74,71,0,67,0,0,0,0]];
export function scoreStep(step,phase=0,result=false){
 if(result){let riff=[72,0,71,67,0,64,0,0,65,0,64,60,0,0,0,0];let n=riff[step%16];return n?[{note:n,voice:'pluck',duration:.23,gain:.038}]:[]}
 let bar=Math.floor(step/8)%16,slot=step%8,chord=harmony[bar%4],out=[];
 // A full-band comic breath at the end of every eighth bar.
 if(bar%8===7&&slot>=5)return out;
 if(slot%2===0)out.push({note:chord[0]+(slot===4?7:slot===6?12:0),voice:'bass',duration:.19,gain:.07});
 if([1,4,7].includes(slot)){for(let note of chord.slice(1))out.push({note:note+12,voice:'chord',duration:.12,gain:.012})}
 let note=melody[bar%8][slot];if(note)out.push({note,voice:bar>=8?'whistle':'pluck',duration:slot%2?.14:.22,gain:.026});
 if(phase>=1&&slot%2===1)out.push({note:slot===3||slot===7?50:90,voice:'tap',duration:.035,gain:.022});
 if(phase>=2&&slot===6)out.push({note:84,voice:'pluck',duration:.08,gain:.014});
 return out;
}
