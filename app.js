'use strict';
const $=id=>document.getElementById(id);
const synth=window.speechSynthesis;
let voices=[],current=null,timeoutId=null;
const status=s=>$('status').textContent=s;
const presets={cute:{rate:1.13,pitch:1.35},soft:{rate:.92,pitch:1.17},normal:{rate:1,pitch:1}};
function setPreset(){const p=presets[$('preset').value];$('rate').value=p.rate;$('pitch').value=p.pitch;updateLabels();}
function updateLabels(){$('rateVal').textContent=Number($('rate').value).toFixed(2)+'倍';$('pitchVal').textContent=Number($('pitch').value).toFixed(2)}
function scoreVoice(v){const s=(v.name+' '+v.voiceURI).toLowerCase();let n=0;if(/female|woman|女性|女声|nanami|haruka|sayaka|kyoko|mizuki|ayumi|sakura|yuna|google 日本語/.test(s))n+=15;if(v.localService)n+=2;if(v.default)n+=1;return n;}
function loadVoices(){if(!synth)return;voices=synth.getVoices();const old=$('voice').value;const lang=$('lang').value.slice(0,2);$('voice').replaceChildren(new Option('自動選択（女性音声を優先）','auto'));voices.forEach((v,i)=>{if(v.lang.toLowerCase().startsWith(lang))$('voice').add(new Option(v.name+' ('+v.lang+')',String(i)))});if([...$('voice').options].some(o=>o.value===old))$('voice').value=old;else $('voice').value='auto';$('voiceInfo').textContent=voices.filter(v=>v.lang.toLowerCase().startsWith(lang)).length+'種類の音声が見つかりました。女性音声がない場合は標準音声を使用します。';}
function selectedVoice(){if($('voice').value!=='auto')return voices[Number($('voice').value)];const matches=voices.filter(v=>v.lang.toLowerCase().startsWith($('lang').value.slice(0,2)));return matches.sort((a,b)=>scoreVoice(b)-scoreVoice(a))[0]||null;}
function speak(){if(!synth||typeof SpeechSynthesisUtterance==='undefined'){status('このChromeでは音声読み上げが使えません');return;}const text=$('message').value.trim();if(!text){status('文章を入力してください');return;}if(timeoutId)clearTimeout(timeoutId);synth.cancel();const u=new SpeechSynthesisUtterance(text);current=u;u.lang=$('lang').value;u.rate=Number($('rate').value);u.pitch=Number($('pitch').value);const v=selectedVoice();if(v)u.voice=v;status('音声を準備しています…');u.onstart=()=>{if(current===u)status('読み上げ中…')};u.onend=()=>{if(current===u)status('読み上げ完了')};u.onerror=e=>{if(current===u)status('音声エラー：'+e.error+'。Androidの「テキスト読み上げ」設定を確認してください')};try{synth.speak(u);timeoutId=setTimeout(()=>{if(current===u&&!synth.speaking&&synth.pending)status('音声を開始できません。Chromeの再起動、Googleの音声サービスの設定をお試しください。')},3500)}catch(e){status('音声開始エラー：'+e.message)}}
$('speak').addEventListener('click',speak);$('stop').addEventListener('click',()=>{if(synth)synth.cancel();current=null;status('停止しました')});$('preset').addEventListener('change',setPreset);$('lang').addEventListener('change',loadVoices);for(const id of ['rate','pitch'])$(id).addEventListener('input',updateLabels);
['了解したよ！','ありがとう！','超キケン！','大丈夫だよ！','もうすぐ着くよ！','よろしくね！'].forEach(p=>{const b=document.createElement('button');b.className='secondary';b.textContent=p;b.addEventListener('click',()=>{$('message').value=p;speak()});$('phrases').append(b)});
setPreset();loadVoices();if(synth){synth.addEventListener('voiceschanged',loadVoices);setTimeout(loadVoices,1000)}
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
