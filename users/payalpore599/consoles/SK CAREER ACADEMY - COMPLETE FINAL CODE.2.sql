-- connection: 6ada3d28f0661cf5ae0f0a33
-- schedule: 0 * * * *
-- timezone: Asia/Calcutta

<!DOCTYPE html>
<html lang="mr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SK Career Academy</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',Tahoma,sans-serif}
body{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;padding:20px}
.container{max-width:1200px;margin:0 auto}
.card{background:white;border-radius:20px;padding:30px;margin-bottom:20px;box-shadow:0 10px 30px rgba(0,0,0,0.2)}
.btn{padding:12px 30px;border:none;border-radius:10px;cursor:pointer;font-size:16px;font-weight:600;transition:all 0.3s}
.btn-primary{background:linear-gradient(135deg,#667eea,#764ba2);color:white}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 5px 15px rgba(102,126,234,0.4)}
.btn-success{background:linear-gradient(135deg,#11998e,#38ef7d);color:white}
.btn-danger{background:linear-gradient(135deg,#eb3349,#f45c43);color:white}
.btn-warning{background:linear-gradient(135deg,#f093fb,#f5576c);color:white}
.btn-info{background:linear-gradient(135deg,#4facfe,#00f2fe);color:white}
input,select,textarea{width:100%;padding:12px;border:2px solid #e0e0e0;border-radius:10px;font-size:15px;margin-bottom:15px}
input:focus,select:focus,textarea:focus{outline:none;border-color:#667eea}
.text-center{text-align:center}
.mt-20{margin-top:20px}.mb-20{margin-bottom:20px}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}
.grid-4{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px}
.subject-card{background:linear-gradient(135deg,#667eea20,#764ba220);border:2px solid #667eea;border-radius:15px;padding:20px;cursor:pointer;transition:all 0.3s}
.subject-card:hover{transform:scale(1.05);box-shadow:0 5px 20px rgba(102,126,234,0.3)}
.option{padding:15px;border:2px solid #e0e0e0;border-radius:10px;margin-bottom:10px;cursor:pointer;transition:all 0.3s}
.option:hover{border-color:#667eea;background:#667eea10}
.option.selected{border-color:#667eea;background:#667eea30}
.stat-box{background:linear-gradient(135deg,#667eea20,#764ba220);border-radius:15px;padding:20px;text-align:center}
.stat-number{font-size:36px;font-weight:bold;color:#667eea}
.stat-label{color:#666;margin-top:5px}
.attendance-day{padding:15px;border-radius:10px;text-align:center;cursor:pointer;transition:all 0.3s;margin-bottom:10px}
.attendance-day.present{background:#11998e;color:white}
.attendance-day.absent{background:#eb3349;color:white}
.attendance-day:hover{transform:scale(1.05)}
.progress-bar{width:100%;height:30px;background:#e0e0e0;border-radius:15px;overflow:hidden;margin-top:10px}
.progress-fill{height:100%;background:linear-gradient(90deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold}
.timer{font-size:24px;font-weight:bold;color:#eb3349;text-align:center;margin:20px 0}
.question-counter{text-align:center;color:#666;margin-bottom:15px}
</style>
</head>
<body>
<div class="container" id="app"></div>
<script>
// ============ SUBJECTS ============
var subjects = {marathi:"मराठी व्याकरण",gk:"GK/GS",ganit:"गणित",buddhi:"बुद्धिमत्ता"};

// ============ UTILS ============
function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function pick(arr){return arr[Math.floor(Math.random()*arr.length)]}
function shuffle(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t}return b}
function makeOpts(correct){
  var c=Number(correct);var range=Math.max(Math.abs(c)*0.3,5);
  var w=[];while(w.length<3){var v=c+rand(-Math.ceil(range),Math.ceil(range));if(v!==c&&v>0&&w.indexOf(v)===-1)w.push(v)}
  var opts=[String(c),String(w[0]),String(w[1]),String(w[2])];var s=shuffle(opts);
  return{o:s,a:s.indexOf(String(c))}
}

// ============ GANIT GENERATOR ============
function genGanit(n){
  var qs=[],types=['percent','avg','profit','si','speed','series','equation'];
  for(var i=0;i<n;i++){
    var t=types[i%types.length],q;
    if(t==='percent'){var p=rand(5,60),num=rand(100,5000),a=Math.round(p*num/100),r=makeOpts(a);q={q:p+'% of '+num+' = ?',o:r.o,a:r.a,t:"टक्केवारी"}}
    else if(t==='avg'){var cnt=rand(3,7),nums=[];for(var j=0;j<cnt;j++)nums.push(rand(10,100));var sum=0;for(var j=0;j<nums.length;j++)sum+=nums[j];var av=Math.round(sum/cnt),r=makeOpts(av);q={q:nums.join(', ')+' — सरासरी?',o:r.o,a:r.a,t:"सरासरी"}}
    else if(t==='profit'){var cp=rand(100,2000),pp=rand(5,40),sp=Math.round(cp*(100+pp)/100),r=makeOpts(sp);q={q:'वस्तू ₹'+cp+' ला विकत घेतली, '+pp+'% नफा. विक्री किंमत?',o:r.o,a:r.a,t:"नफा-तोटा"}}
    else if(t==='si'){var p=rand(1000,20000),r2=rand(4,15),yr=rand(1,4),si=Math.round(p*r2*yr/100),r=makeOpts(si);q={q:'₹'+p+' वर '+r2+'% दराने '+yr+' वर्षांचे सोपे व्याज?',o:r.o,a:r.a,t:"सोपे व्याज"}}
    else if(t==='speed'){var sp=rand(20,120),tm=rand(1,8),d=sp*tm,r=makeOpts(d);q={q:sp+' km/h वेगाने '+tm+' तासात अंतर?',o:r.o,a:r.a,t:"काल-काम-वेग"}}
    else if(t==='series'){var s=rand(1,10),d=rand(2,8),seq=[s,s+d,s+2*d,s+3*d];var ans=s+4*d,r=makeOpts(ans);q={q:seq.join(', ')+' — पुढील?',o:r.o,a:r.a,t:"श्रेणी"}}
    else{var x=rand(2,20),co=rand(2,6),cn=rand(1,20),res=co*x+cn,r=makeOpts(x);q={q:co+'x + '+cn+' = '+res+', x = ?',o:r.o,a:r.a,t:"समीकरण"}}
    qs.push(q);
  }
  return qs;
}

// ============ BUDDHIMATA GENERATOR ============
function genBuddhi(n){
  var qs=[],names=['A','B','C','D','E','F'],types=['series','direction','logic','coding','blood'];
  for(var i=0;i<n;i++){
    var t=types[i%types.length],q;
    if(t==='series'){var s=rand(1,10),d=rand(2,10),seq=[s,s+d,s+2*d,s+3*d];var ans=s+4*d,r=makeOpts(ans);q={q:seq.join(', ')+' — पुढील?',o:r.o,a:r.a,t:"आकडेवारी"}}
    else if(t==='direction'){var sd=rand(0,3),dn=['उत्तर','पूर्व','दक्षिण','पश्चिम'],t1=pick(['डावीकडे','उजवीकडे']),t2=pick(['डावीकडे','उजवीकडे']);var dir=sd;if(t1==='उजवीकडे')dir=(dir+1)%4;else dir=(dir+3)%4;if(t2==='उजवीकडे')dir=(dir+1)%4;else dir=(dir+3)%4;var ans2=dn[dir],wr=dn.filter(function(x){return x!==ans2});var opts=shuffle([ans2].concat(wr.slice(0,3)));q={q:'माणूस '+dn[sd]+'कडे चालतो, '+t1+' वळतो, मग '+t2+' वळतो. आता कोणत्या दिशेला?',o:opts,a:opts.indexOf(ans2),t:"दिशा"}}
    else if(t==='logic'){var a2=rand(10,50),b2=rand(10,50),r3=rand(2,5),r4=rand(2,5),ans3=r3*a2+r4*b2,r=makeOpts(ans3);q={q:'जर '+a2+'+'+b2+'='+(a2+b2)+', तर '+r3+'×'+a2+' + '+r4+'×'+b2+' = ?',o:r.o,a:r.a,t:"तर्कशक्ती"}}
    else if(t==='coding'){var words=['BOOK','CAT','DOG','RED','PEN'];var w1=pick(words),w2;do{w2=pick(words)}while(w2===w1);function wv(w){var s=0;for(var c=0;c<w.length;c++)s+=(w.charCodeAt(c)-64);return s}var v1=wv(w1),v2=wv(w2),r=makeOpts(v2);q={q:w1+' = '+v1+', '+w2+' = ?',o:r.o,a:r.a,t:"शब्दकोड"}}
    else{var n1=pick(['A','B','C','D']),n2,n3;do{n2=pick(names)}while(n2===n1);do{n3=pick(names)}while(n3===n1||n3===n2);q={q:n1+', '+n2+' चा भाऊ. '+n3+', '+n1+' ची आई. '+n2+' चा '+n3+' शी संबंध?',o:['आजोबा','काका','मामा','वडील'],a:0,t:"रक्तसंबंध"}
    }
    qs.push(q);
  }
  return qs;
}

// ============ MARATHI GENERATOR ============
function genMarathi(n){
  var pool=[
    {q:"'देव+आलय' संधी?",o:["देवालय","देवाअलय","देवआलय","देवाल"],a:0,t:"संधी"},
    {q:"'राज+इंद्र' संधी?",o:["राजेंद्र","राजिंद्र","राजाइंद्र","राजईंद्र"],a:0,t:"संधी"},
    {q:"'न+चिर' संधी?",o:["नचिर","नाचिर","नश्चिर","नचिर्"],a:2,t:"संधी"},
    {q:"'महा+उत्सव' संधी?",o:["महोत्सव","महाउत्सव","महोत्सव","महा उत्सव"],a:0,t:"संधी"},
    {q:"'विद्या+आलय' संधी?",o:["विद्यालय","विद्याआलय","विद्यआलय","विद्यालय"],a:0,t:"संधी"},
    {q:"'नम:+कार' संधी?",o:["नमस्कार","नमकार","नमोकार","नम+कार"],a:0,t:"संधी"},
    {q:"'सूर्य+उदय' संधी?",o:["सूर्योदय","सूर्यउदय","सूरउदय","सूरोदय"],a:0,t:"संधी"},
    {q:"'गण+ईश' संधी?",o:["गणेश","गणईश","गणीश","गनेश"],a:0,t:"संधी"},
    {q:"'सु+जन' समास?",o:["तत्पुरुष","द्वंद्व","कर्मधारय","बहुव्रीही"],a:2,t:"समास"},
    {q:"'पंचवटी' समास?",o:["द्विगू","तत्पुरुष","कर्मधारय","बहुव्रीही"],a:0,t:"समास"},
    {q:"'चतुर्मुखा' समास?",o:["द्वंद्व","बहुव्रीही","तत्पुरुष","कर्मधारय"],a:1,t:"समास"},
    {q:"'राजपुत्र' समास?",o:["तत्पुरुष","द्वंद्व","कर्मधारय","बहुव्रीही"],a:0,t:"समास"},
    {q:"'नीलकंठ' समास?",o:["द्वंद्व","बहुव्रीही","तत्पुरुष","कर्मधारय"],a:1,t:"समास"},
    {q:"'मातृभूमी' समास?",o:["तत्पुरुष","द्वंद्व","कर्मधारय","बहुव्रीही"],a:0,t:"समास"},
    {q:"'उपमा' अलंकार?",o:["चंद्रासारखा उजळ","चंद्र उजळला","चंद्राचा प्रकाश","चंद्र उगवला"],a:0,t:"अलंकार"},
    {q:"'रूपक' अलंकार?",o:["तो सिंह आहे","तो सिंहासारखा","सिंहाची गर्जना","सिंह गर्जला"],a:0,t:"अलंकार"},
    {q:"'अनुप्रास' अलंकार?",o:["काळी काळी रात्र","रात्र काळी","काळसर रात्र","अंधार"],a:0,t:"अलंकार"},
    {q:"'यमक' अलंकार?",o:["राजाला राज माने","राजा राजासारखा","राजाचा राज","राजा राज"],a:0,t:"अलंकार"},
    {q:"'आहे' कोणता काळ?",o:["भूतकाळ","वर्तमानकाळ","भविष्यकाळ","आज्ञार्थी"],a:1,t:"व्याकरण"},
    {q:"'जाईल' कोणता काळ?",o:["भूतकाळ","वर्तमानकाळ","भविष्यकाळ","संकेतार्थी"],a:2,t:"व्याकरण"},
    {q:"'गेला' कोणता काळ?",o:["भूतकाळ","वर्तमानकाळ","भविष्यकाळ","आज्ञार्थी"],a:0,t:"व्याकरण"},
    {q:"'चालतो' कोणता काळ?",o:["भूतकाळ","वर्तमानकाळ","भविष्यकाळ","आज्ञार्थी"],a:1,t:"व्याकरण"},
    {q:"'खाईल' कोणता काळ?",o:["भूतकाळ","वर्तमानकाळ","भविष्यकाळ","आज्ञार्थी"],a:2,t:"व्याकरण"},
    {q:"'बसला' कोणता काळ?",o:["भूतकाळ","वर्तमानकाळ","भविष्यकाळ","आज्ञार्थी"],a:0,t:"व्याकरण"},
    {q:"विभक्ती किती?",o:["5","6","7","8"],a:2,t:"व्याकरण"},
    {q:"'कर्ता' विभक्ती?",o:["प्रथमा","द्वितीया","तृतीया","चतुर्थी"],a:0,t:"व्याकरण"},
    {q:"'कर्म' विभक्ती?",o:["प्रथमा","द्वितीया","तृतीया","चतुर्थी"],a:1,t:"व्याकरण"},
    {q:"'करण' विभक्ती?",o:["प्रथमा","द्वितीया","तृतीया","चतुर्थी"],a:2,t:"व्याकरण"},
    {q:"'संप्रदान' विभक्ती?",o:["प्रथमा","द्वितीया","तृतीया","चतुर्थी"],a:3,t:"व्याकरण"},
    {q:"'अपादान' विभक्ती?",o:["पंचमी","षष्ठी","सप्तमी","संबोधन"],a:0,t:"व्याकरण"},
    {q:"'संबोधन' विभक्ती?",o:["पंचमी","षष्ठी","सप्तमी","संबोधन"],a:3,t:"व्याकरण"},
    {q:"'पण' कोणता अव्यय?",o:["समुच्चयबोधक","विधेयबोधक","कालबोधक","स्थितीबोधक"],a:0,t:"अव्यय"},
    {q:"'म्हणून' कोणता अव्यय?",o:["समुच्चयबोधक","हेतुबोधक","कालबोधक","स्थितीबोधक"],a:1,t:"अव्यय"},
    {q:"'जरी...तरी'?",o:["विरोध","हेतू","अट","कारण"],a:2,t:"अव्यय"},
    {q:"'जर...तर'?",o:["विरोध","हेतू","अट","कारण"],a:2,t:"अव्यय"},
    {q:"'पाण्यात राहणारा' एक शब्द?",o:["जलचर","स्थलचर","नभचर","द्विचर"],a:0,t:"वाक्प्रचार"},
    {q:"'डोळ्यांत अंजन घालणे' अर्थ?",o:["फसवणे","जागरूक करणे","आनंद देणे","दुःख देणे"],a:1,t:"वाक्प्रचार"},
    {q:"'हातावरचे पोट' अर्थ?",o:["दररोज काम करून जगणे","श्रीमंत","आळशी","बुद्धिमान"],a:0,t:"वाक्प्रचार"},
    {q:"'अग्नि' समानार्थी?",o:["पावक","वायु","जल","भू"],a:0,t:"वाक्प्रचार"},
    {q:"'सूर्य' समानार्थी?",o:["दिवाकर","चंद्र","तारा","ग्रह"],a:0,t:"वाक्प्रचार"},
    {q:"'चंद्र' समानार्थी?",o:["शशी","सूर्य","तारा","अग्नि"],a:0,t:"वाक्प्रचार"},
    {q:"'सुंदर' कोणते नामविशेषण?",o:["गुणवाचक","संख्यावाचक","सार्वनामिक","देशवाचक"],a:0,t:"व्याकरण"},
    {q:"'क्रियापद' ओळखा: 'तो शाळेत जातो'",o:["जातो","शाळेत","तो","काही नाही"],a:0,t:"व्याकरण"},
    {q:"'सर्वनाम' — 'तो'?",o:["पुरुषवाचक","प्रश्नवाचक","निश्चयार्थी","संबंधवाचक"],a:0,t:"व्याकरण"},
    {q:"'अष्टभुजा' समास?",o:["द्विगू","तत्पुरुष","कर्मधारय","बहुव्रीही"],a:0,t:"समास"}
  ];
  var s=shuffle(pool),r=[];for(var i=0;i<n;i++)r.push(s[i%s.length]);return r;
}

// ============ GK GENERATOR ============
function genGK(n){
  var pool=[
    {q:"राज्यघटना कधी लागू?",o:["26 जानेवारी 1950","15 ऑगस्ट 1947","26 नोव्हेंबर 1949","1 एप्रिल 1950"],a:0,t:"राज्यघटना"},
    {q:"घटनेचे शिल्पकार?",o:["गांधी","आंबेडकर","नेहरू","पटेल"],a:1,t:"राज्यघटना"},
    {q:"राष्ट्रगीत कोणी लिहिले?",o:["बंकिमचंद्र","टागोर","सुभाष बोस","गांधी"],a:1,t:"इतिहास"},
    {q:"महाराष्ट्र स्थापना?",o:["1 मे 1960","15 ऑगस्ट 1947","26 जानेवारी 1950","1 नोव्हेंबर 1956"],a:0,t:"इतिहास"},
    {q:"सर्वात लांब नदी?",o:["गोदावरी","नर्मदा","गंगा","कृष्णा"],a:2,t:"भूगोल"},
    {q:"महाराष्ट्रातील सर्वात उंच शिखर?",o:["कळसूबाई","तोरणा","राजगड","सिंहगड"],a:0,t:"भूगोल"},
    {q:"पहिले प्रधानमंत्री?",o:["गांधी","नेहरू","पटेल","राजेंद्र प्रसाद"],a:1,t:"इतिहास"},
    {q:"मूलभूत हक्क कोणत्या भागात?",o:["भाग II","भाग III","भाग IV","भाग V"],a:1,t:"राज्यघटना"},
    {q:"लोकसभा कमाल सदस्य?",o:["500","545","550","552"],a:3,t:"राज्यघटना"},
    {q:"राज्यसभा सदस्य?",o:["245","250","255","260"],a:0,t:"राज्यघटना"},
    {q:"राष्ट्रीय पक्षी?",o:["मोर","घुबड","हंस","बगळा"],a:0,t:"विज्ञान"},
    {q:"राष्ट्रीय प्राणी?",o:["वाघ","सिंह","हत्ती","गेंडा"],a:0,t:"विज्ञान"},
    {q:"सूर्यापासून जवळचा ग्रह?",o:["शुक्र","बुध","पृथ्वी","मंगळ"],a:1,t:"विज्ञान"},
    {q:"पाण्याचे सूत्र?",o:["H2O","CO2","NaCl","O2"],a:0,t:"विज्ञान"},
    {q:"शरीरात किती हाडे?",o:["206","208","210","204"],a:0,t:"विज्ञान"},
    {q:"RBI स्थापना?",o:["1 एप्रिल 1935","1 जानेवारी 1935","15 ऑगस्ट 1947","26 जानेवारी 1950"],a:0,t:"अर्थशास्त्र"},
    {q:"GST कधी?",o:["1 जुलै 2017","1 एप्रिल 2017","1 जानेवारी 2018","15 ऑगस्ट 2017"],a:0,t:"अर्थशास्त्र"},
    {q:"भारताची राजधानी?",o:["मुंबई","नवी दिल्ली","कोलकाता","चेन्नई"],a:1,t:"भूगोल"},
    {q:"महाराष्ट्राची राजधानी?",o:["पुणे","नागपूर","मुंबई","औरंगाबाद"],a:2,t:"भूगोल"},
    {q:"राष्ट्रीय फूल?",o:["गुलाब","कमळ","जास्वंद","चमेली"],a:1,t:"विज्ञान"},
    {q:"सर्वात मोठे राज्य?",o:["मध्य प्रदेश","महाराष्ट्र","राजस्थान","उत्तर प्रदेश"],a:2,t:"भूगोल"},
    {q:"शिवाजी महाराजांचा जन्म?",o:["1627","1630","1632","1625"],a:1,t:"इतिहास"},
    {q:"पानिपत पहिले युद्ध?",o:["1526","1556","1761","1527"],a:0,t:"इतिहास"},
    {q:"विटामिन C?",o:["अस्कॉर्बिक आम्ल","रेटिनॉल","कॅल्सिफेरॉल","टोकोफेरॉल"],a:0,t:"विज्ञान"},
    {q:"रक्तगट शोध?",o:["लँडस्टाइनर","फ्लेमिंग","पाश्चर","न्यूटन"],a:0,t:"विज्ञान"},
    {q:"सर्वात मोठे धरण?",o:["भाखरा","हीराकुंड","टिहरी","नागार्जुन"],a:2,t:"भूगोल"},
    {q:"चलन नियंत्रक?",o:["SBI","RBI","SEBI","IRDA"],a:1,t:"अर्थशास्त्र"},
    {q:"सर्वात लहान राज्य?",o:["गोवा","सिकीम","त्रिपुरा","मिझोरम"],a:0,t:"भूगोल"},
    {q:"राष्ट्रीय गीत कोणी?",o:["टागोर","बंकिमचंद्र","मैथिलीशरण","सुभाष"],a:1,t:"इतिहास"},
    {q:"पंचवर्षीय योजना?",o:["गांधी","नेहरू","पटेल","आंबेडकर"],a:1,t:"अर्थशास्त्र"},
    {q:"पहिले राष्ट्रपती?",o:["राजेंद्र प्रसाद","नेहरू","गांधी","पटेल"],a:0,t:"इतिहास"},
    {q:"भारतात किती राज्ये?",o:["28","29","30","27"],a:0,t:"भूगोल"},
    {q:"गोवा कधी सामील?",o:["1961","1947","1950","1965"],a:0,t:"इतिहास"},
    {q:"जलियांवाला बाग?",o:["1919","1920","1918","1921"],a:0,t:"इतिहास"},
    {q:"भारत छोडो?",o:["1942","1940","1945","1939"],a:0,t:"इतिहास"},
    {q:"असहकार चळवळ?",o:["1920","1919","1921","1922"],a:0,t:"इतिहास"},
    {q:"स्वातंत्र्य दिन?",o:["15 ऑगस्ट","26 जानेवारी","2 ऑक्टोबर","1 मे"],a:0,t:"इतिहास"},
    {q:"प्रजासत्ताक दिन?",o:["26 जानेवारी","15 ऑगस्ट","1 मे","2 ऑक्टोबर"],a:0,t:"इतिहास"},
    {q:"पहिले गृहमंत्री?",o:["सरदार पटेल","गांधी","नेहरू","आंबेडकर"],a:0,t:"इतिहास"},
    {q:"राष्ट्रीय खेळ?",o:["हॉकी","क्रिकेट","फुटबॉल","कबड्डी"],a:0,t:"सामान्य"},
    {q:"संविधान सभा अध्यक्ष?",o:["राजेंद्र प्रसाद","आंबेडकर","नेहरू","गांधी"],a:0,t:"राज्यघटना"},
    {q:"मूलभूत कर्तव्ये?",o:["भाग III","भाग IV","भाग IVA","भाग V"],a:2,t:"राज्यघटना"},
    {q:"पंचायती राज दुरुस्ती?",o:["73वी","74वी","72वी","75वी"],a:0,t:"राज्यघटना"},
    {q:"मानवी हृदय कुठे?",o:["छातीत","पोटात","डोक्यात","पायात"],a:0,t:"विज्ञान"},
    {q:"सर्वात मोठे अवयव?",o:["त्वचा","यकृत","फुफ्फुस","हृदय"],a:0,t:"विज्ञान"}
  ];
  var s=shuffle(pool),r=[];for(var i=0;i<n;i++)r.push(s[i%s.length]);return r;
}

// ============ UNIFIED GENERATOR ============
function generateQuestions(subj,count){
  if(subj==='ganit')return genGanit(count);
  if(subj==='buddhi')return genBuddhi(count);
  if(subj==='marathi')return genMarathi(count);
  return genGK(count);
}

// ============ STATE ============
var currentUser=JSON.parse(localStorage.getItem('currentUser'))||null;
var users=JSON.parse(localStorage.getItem('users'))||[];
var attendance=JSON.parse(localStorage.getItem('attendance'))||{};
var quizResults=JSON.parse(localStorage.getItem('quizResults'))||[];
var writtenPractice=JSON.parse(localStorage.getItem('writtenPractice'))||[];
var teacherAttendance=JSON.parse(localStorage.getItem('teacherAttendance'))||{};

function save(){
  localStorage.setItem('users',JSON.stringify(users));
  localStorage.setItem('currentUser',JSON.stringify(currentUser));
  localStorage.setItem('attendance',JSON.stringify(attendance));
  localStorage.setItem('quizResults',JSON.stringify(quizResults));
  localStorage.setItem('writtenPractice',JSON.stringify(writtenPractice));
  localStorage.setItem('teacherAttendance',JSON.stringify(teacherAttendance));
}

// ============ RENDER ============
function render(){
  if(!currentUser)renderLogin();
  else if(currentUser.role==='admin')renderAdminDashboard();
  else if(currentUser.role==='teacher')renderTeacherDashboard();
  else renderStudentDashboard();
}

// ============ LOGIN ============
function renderLogin(){
  var a=document.getElementById('app');
  a.innerHTML='<div class="card text-center"><h1 style="font-size:48px;margin-bottom:20px">🎓 SK Career Academy</h1>'+
  '<p style="font-size:20px;color:#666;margin-bottom:30px">Police Bharti Preparation</p>'+
  '<div class="grid-3">'+
    '<div><h2 style="margin-bottom:20px">👨‍🎓 Student Login</h2>'+
    '<input type="text" id="sMob" placeholder="Mobile Number">'+
    '<input type="email" id="sEmail" placeholder="Email">'+
    '<input type="password" id="sPass" placeholder="Password (SK@0812)">'+
    '<button class="btn btn-primary" onclick="studentLogin()" style="width:100%">Sign In</button>'+
    '<button class="btn btn-info mt-20" onclick="showStudentReg()" style="width:100%">Create Account</button></div>'+
    '<div><h2 style="margin-bottom:20px">👨‍🏫 Teacher Login</h2>'+
    '<input type="text" id="tName" placeholder="Name">'+
    '<input type="text" id="tMob" placeholder="Mobile Number">'+
    '<input type="email" id="tEmail" placeholder="Email">'+
    '<input type="password" id="tPass" placeholder="Password (SK@2005)">'+
    '<button class="btn btn-primary" onclick="teacherLogin()" style="width:100%">Sign In</button>'+
    '<button class="btn btn-info mt-20" onclick="showTeacherReg()" style="width:100%">Create Account</button></div>'+
    '<div><h2 style="margin-bottom:20px">👑 Admin Login</h2>'+
    '<input type="email" id="aEmail" placeholder="Admin Email">'+
    '<input type="password" id="aPass" placeholder="Password (email)">'+
    '<button class="btn btn-warning" onclick="adminLogin()" style="width:100%">Admin Sign In</button></div>'+
  '</div></div>';
}

function showStudentReg(){
  var a=document.getElementById('app');
  a.innerHTML='<div class="card"><h2 class="text-center mb-20">📝 Student Registration</h2>'+
  '<input type="text" id="rName" placeholder="Full Name">'+
  '<input type="text" id="rMob" placeholder="Mobile Number">'+
  '<input type="email" id="rEmail" placeholder="Email">'+
  '<p style="color:#666;margin-bottom:15px">Password: SK@0812 (fixed)</p>'+
  '<button class="btn btn-success" onclick="regStudent()" style="width:100%">Register</button>'+
  '<button class="btn btn-danger mt-20" onclick="renderLogin()" style="width:100%">Back</button></div>';
}

function regStudent(){
  var n=document.getElementById('rName').value,m=document.getElementById('rMob').value,e=document.getElementById('rEmail').value;
  if(!n||!m||!e){alert('सर्व माहिती भरा!');return}
  users.push({name:n,mobile:m,email:e,role:'student',password:'SK@0812'});save();
  alert('Registration successful! आता Sign In करा.');renderLogin();
}

function studentLogin(){
  var m=document.getElementById('sMob').value,e=document.getElementById('sEmail').value,p=document.getElementById('sPass').value;
  var u=null;for(var i=0;i<users.length;i++){if(users[i].mobile===m&&users[i].email===e&&users[i].password===p&&users[i].role==='student'){u=users[i];break}}
  if(u){currentUser=u;save();render()}else{alert('Invalid credentials! Create Account करा.')}
}

function showTeacherReg(){
  var a=document.getElementById('app');
  a.innerHTML='<div class="card"><h2 class="text-center mb-20">📝 Teacher Registration</h2>'+
  '<input type="text" id="rTName" placeholder="Full Name">'+
  '<input type="text" id="rTMob" placeholder="Mobile Number">'+
  '<input type="email" id="rTEmail" placeholder="Email">'+
  '<p style="color:#666;margin-bottom:15px">Password: SK@2005 (fixed)</p>'+
  '<button class="btn btn-success" onclick="regTeacher()" style="width:100%">Register</button>'+
  '<button class="btn btn-danger mt-20" onclick="renderLogin()" style="width:100%">Back</button></div>';
}

function regTeacher(){
  var n=document.getElementById('rTName').value,m=document.getElementById('rTMob').value,e=document.getElementById('rTEmail').value;
  if(!n||!m||!e){alert('सर्व माहिती भरा!');return}
  users.push({name:n,mobile:m,email:e,role:'teacher',password:'SK@2005'});save();
  alert('Registration successful! आता Sign In करा.');renderLogin();
}

function teacherLogin(){
  var n=document.getElementById('tName').value,m=document.getElementById('tMob').value,e=document.getElementById('tEmail').value,p=document.getElementById('tPass').value;
  var u=null;for(var i=0;i<users.length;i++){if(users[i].name===n&&users[i].mobile===m&&users[i].email===e&&users[i].password===p&&users[i].role==='teacher'){u=users[i];break}}
  if(u){currentUser=u;save();render()}else{alert('Invalid credentials! Create Account करा.')}
}

function adminLogin(){
  var e=document.getElementById('aEmail').value,p=document.getElementById('aPass').value;
  if(p==='email'){currentUser={name:'Admin',email:e,role:'admin'};save();render()}
  else{alert('Invalid Admin Password! Password is: email')}
}

function logout(){currentUser=null;save();render()}

// ============ STUDENT DASHBOARD ============
function renderStudentDashboard(){
  var a=document.getElementById('app');
  var mr=quizResults.filter(function(r){return r.email===currentUser.email});
  var ma=attendance[currentUser.email]||{};
  var mp=writtenPractice.filter(function(p){return p.email===currentUser.email});
  var tt=mr.length,as=tt>0?Math.round(mr.reduce(function(s,r){return s+r.score},0)/tt):0;
  var pd=Object.values(ma).filter(function(x){return x==='present'}).length;
  var td=Object.keys(ma).length;
  a.innerHTML='<div class="card"><div style="display:flex;justify-content:space-between;align-items:center"><div>'+
  '<h1>🙏 Welcome, '+currentUser.name+'!</h1><p style="color:#666;margin-top:5px">Student Dashboard</p></div>'+
  '<button class="btn btn-danger" onclick="logout()">Logout</button></div></div>'+
  '<div class="grid-4">'+
  '<div class="stat-box"><div class="stat-number">'+tt+'</div><div class="stat-label">Tests Given</div></div>'+
  '<div class="stat-box"><div class="stat-number">'+as+'%</div><div class="stat-label">Average Score</div></div>'+
  '<div class="stat-box"><div class="stat-number">'+pd+'/'+td+'</div><div class="stat-label">Attendance</div></div>'+
  '<div class="stat-box"><div class="stat-number">'+mp.length+'</div><div class="stat-label">Written Practice</div></div></div>'+
  '<div class="card mt-20"><h2 style="margin-bottom:20px">📝 Test/Quiz</h2><p style="margin-bottom:15px">Select subject:</p>'+
  '<div class="grid-4">'+
  '<div class="subject-card" onclick="showQuizOptions(\'marathi\')"><h3>📖 मराठी व्याकरण</h3></div>'+
  '<div class="subject-card" onclick="showQuizOptions(\'gk\')"><h3>🌍 GK/GS</h3></div>'+
  '<div class="subject-card" onclick="showQuizOptions(\'ganit\')"><h3>🔢 गणित</h3></div>'+
  '<div class="subject-card" onclick="showQuizOptions(\'buddhi\')"><h3>🧠 बुद्धिमत्ता</h3></div></div></div>'+
  '<div class="grid-2 mt-20">'+
  '<div class="card"><h2 style="margin-bottom:20px">📅 Attendance</h2><button class="btn btn-info" onclick="showAttendance()" style="width:100%">View Attendance</button></div>'+
  '<div class="card"><h2 style="margin-bottom:20px">📊 Progress</h2><button class="btn btn-info" onclick="showProgress()" style="width:100%">View Progress</button></div></div>'+
  '<div class="card mt-20"><h2 style="margin-bottom:20px">✍️ Written Practice</h2><button class="btn btn-info" onclick="showWrittenPractice()" style="width:100%">Log Practice</button></div>';
}

function showQuizOptions(subj){
  var a=document.getElementById('app');
  a.innerHTML='<div class="card"><h2 class="text-center mb-20">'+subjects[subj]+' - Quiz Options</h2>'+
  '<div class="grid-3">'+
  '<div class="subject-card" onclick="startQuiz(\''+subj+'\',25,20)"><h3>25 Questions</h3><p>20 Minutes</p></div>'+
  '<div class="subject-card" onclick="startQuiz(\''+subj+'\',50,45)"><h3>50 Questions</h3><p>45 Minutes</p></div>'+
  '<div class="subject-card" onclick="startQuiz(\''+subj+'\',100,90)"><h3>100 Questions</h3><p>90 Minutes</p></div></div>'+
  '<button class="btn btn-danger mt-20" onclick="renderStudentDashboard()" style="width:100%">Back</button></div>';
}

var currentQuiz=null,quizTimer=null;

function startQuiz(subj,numQ,mins){
  var qs=generateQuestions(subj,numQ);
  currentQuiz={subject:subj,questions:qs,current:0,answers:[],timeLeft:mins*60};
  renderQuizQuestion();
  quizTimer=setInterval(function(){
    currentQuiz.timeLeft--;
    var te=document.getElementById('timer');
    if(te)te.textContent=formatTime(currentQuiz.timeLeft);
    if(currentQuiz.timeLeft<=0)finishQuiz();
  },1000);
}

function renderQuizQuestion(){
  var a=document.getElementById('app'),q=currentQuiz.questions[currentQuiz.current];
  var prog=((currentQuiz.current+1)/currentQuiz.questions.length*100).toFixed(1);
  var oh='';for(var i=0;i<q.o.length;i++)oh+='<div class="option" onclick="selectOption('+i+')">'+String.fromCharCode(65+i)+'. '+q.o[i]+'</div>';
  a.innerHTML='<div class="card"><div class="timer" id="timer">'+formatTime(currentQuiz.timeLeft)+'</div>'+
  '<div class="question-counter">Question '+(currentQuiz.current+1)+' of '+currentQuiz.questions.length+' ('+prog+'%)</div>'+
  '<div class="progress-bar"><div class="progress-fill" style="width:'+prog+'%">'+prog+'%</div></div>'+
  '<h2 style="margin:30px 0;font-size:22px">'+q.q+'</h2><div id="options">'+oh+'</div>'+
  '<div class="grid-2 mt-20">'+
  '<button class="btn btn-warning" onclick="prevQ()"'+(currentQuiz.current===0?' disabled':'')+'>Previous</button>'+
  '<button class="btn btn-primary" onclick="nextQ()">'+(currentQuiz.current===currentQuiz.questions.length-1?'Finish':'Next')+'</button></div></div>';
  if(currentQuiz.answers[currentQuiz.current]!==undefined){
    var opts=document.querySelectorAll('.option');
    if(opts[currentQuiz.answers[currentQuiz.current]])opts[currentQuiz.answers[currentQuiz.current]].classList.add('selected');
  }
}

function selectOption(idx){currentQuiz.answers[currentQuiz.current]=idx;document.querySelectorAll('.option').forEach(function(o,i){o.classList.toggle('selected',i===idx)})}
function prevQ(){if(currentQuiz.current>0){currentQuiz.current--;renderQuizQuestion()}}
function nextQ(){if(currentQuiz.current<currentQuiz.questions.length-1){currentQuiz.current++;renderQuizQuestion()}else{finishQuiz()}}

function finishQuiz(){
  clearInterval(quizTimer);var c=0;
  currentQuiz.questions.forEach(function(q,i){if(currentQuiz.answers[i]===q.a)c++});
  var sc=Math.round((c/currentQuiz.questions.length)*100);
  quizResults.push({email:currentUser.email,name:currentUser.name,subject:currentQuiz.subject,score:sc,correct:c,total:currentQuiz.questions.length,date:new Date().toISOString()});
  save();
  var a=document.getElementById('app');
  a.innerHTML='<div class="card text-center"><h1 style="font-size:64px;margin-bottom:20px">'+(sc>=70?'🎉':sc>=40?'👍':'💪')+'</h1>'+
  '<h2 style="margin-bottom:30px">Quiz Complete!</h2>'+
  '<div class="grid-3">'+
  '<div class="stat-box"><div class="stat-number">'+c+'</div><div class="stat-label">Correct</div></div>'+
  '<div class="stat-box"><div class="stat-number">'+(currentQuiz.questions.length-c)+'</div><div class="stat-label">Wrong</div></div>'+
  '<div class="stat-box"><div class="stat-number">'+sc+'%</div><div class="stat-label">Score</div></div></div>'+
  '<button class="btn btn-primary mt-20" onclick="renderStudentDashboard()" style="width:100%">Back to Dashboard</button></div>';
}

function formatTime(s){var m=Math.floor(s/60),sec=s%60;return m+':'+(sec<10?'0':'')+sec}

function showAttendance(){
  var a=document.getElementById('app'),ma=attendance[currentUser.email]||{};
  var pd=Object.values(ma).filter(function(x){return x==='present'}).length;
  var ad=Object.values(ma).filter(function(x){return x==='absent'}).length;
  var td=Object.keys(ma).length,pct=td>0?Math.round(pd/td*100):0;
  a.innerHTML='<div class="card"><h2 class="mb-20">📅 My Attendance</h2>'+
  '<div class="grid-3 mb-20">'+
  '<div class="stat-box"><div class="stat-number" style="color:#11998e">'+pd+'</div><div class="stat-label">Present</div></div>'+
  '<div class="stat-box"><div class="stat-number" style="color:#eb3349">'+ad+'</div><div class="stat-label">Absent</div></div>'+
  '<div class="stat-box"><div class="stat-number">'+pct+'%</div><div class="stat-label">Attendance %</div></div></div>'+
  '<div class="progress-bar"><div class="progress-fill" style="width:'+pct+'%;background:linear-gradient(90deg,#11998e,#38ef7d)">'+pct+'%</div></div>'+
  '<button class="btn btn-danger mt-20" onclick="renderStudentDashboard()" style="width:100%">Back</button></div>';
}

function showProgress(){
  var a=document.getElementById('app'),mr=quizResults.filter(function(r){return r.email===currentUser.email});
  var ss={};mr.forEach(function(r){if(!ss[r.subject])ss[r.subject]={t:0,c:0};ss[r.subject].t+=r.score;ss[r.subject].c++});
  var h='<div class="card"><h2 class="mb-20">📊 My Progress</h2>';
  if(Object.keys(ss).length===0)h+='<p class="text-center">No tests taken yet!</p>';
  else{Object.entries(ss).forEach(function(e){var s=e[0],st=e[1],av=Math.round(st.t/st.c);
    h+='<div class="mb-20"><h3>'+subjects[s]+'</h3><div class="progress-bar"><div class="progress-fill" style="width:'+av+'%">'+av+'%</div></div><p style="color:#666;margin-top:5px">'+st.c+' tests</p></div>'})}
  h+='<button class="btn btn-danger mt-20" onclick="renderStudentDashboard()" style="width:100%">Back</button></div>';
  a.innerHTML=h;
}

function showWrittenPractice(){
  var a=document.getElementById('app'),mp=writtenPractice.filter(function(p){return p.email===currentUser.email});
  var h='<div class="card"><h2 class="mb-20">✍️ Written Practice Log</h2>'+
  '<textarea id="pNotes" placeholder="आज काय अभ्यास केला ते लिहा..." rows="5"></textarea>'+
  '<button class="btn btn-success" onclick="savePractice()" style="width:100%">Save</button>'+
  '<h3 class="mt-20 mb-20">Previous Entries:</h3>';
  if(mp.length===0)h+='<p class="text-center">No entries yet!</p>';
  else{mp.slice().reverse().forEach(function(p){h+='<div class="stat-box mb-20" style="text-align:left"><p style="color:#666;font-size:14px">'+new Date(p.date).toLocaleString('mr-IN')+'</p><p style="margin-top:10px">'+p.notes+'</p></div>'})}
  h+='<button class="btn btn-danger mt-20" onclick="renderStudentDashboard()" style="width:100%">Back</button></div>';
  a.innerHTML=h;
}

function savePractice(){
  var n=document.getElementById('pNotes').value;
  if(!n.trim()){alert('काहीतरी लिहा!');return}
  writtenPractice.push({email:currentUser.email,name:currentUser.name,notes:n,date:new Date().toISOString()});save();
  alert('Saved!');showWrittenPractice();
}

// ============ TEACHER DASHBOARD ============
function renderTeacherDashboard(){
  var a=document.getElementById('app'),st=users.filter(function(u){return u.role==='student'});
  a.innerHTML='<div class="card"><div style="display:flex;justify-content:space-between;align-items:center"><div>'+
  '<h1>🙏 Welcome Sir!</h1><p style="color:#666;margin-top:5px">Teacher Dashboard</p></div>'+
  '<button class="btn btn-danger" onclick="logout()">Logout</button></div></div>'+
  '<div class="grid-3">'+
  '<div class="stat-box"><div class="stat-number">'+st.length+'</div><div class="stat-label">Total Students</div></div>'+
  '<div class="stat-box"><div class="stat-number">'+quizResults.length+'</div><div class="stat-label">Total Tests</div></div>'+
  '<div class="stat-box"><div class="stat-number">'+Object.keys(attendance).length+'</div><div class="stat-label">Attendance Records</div></div></div>'+
  '<div class="card mt-20"><h2 style="margin-bottom:20px">📅 Mark Attendance</h2><button class="btn btn-info" onclick="markAttendance()" style="width:100%">Mark Attendance (Mon-Sat)</button></div>'+
  '<div class="card mt-20"><h2 style="margin-bottom:20px">👥 View Students</h2><button class="btn btn-info" onclick="viewStudents()" style="width:100%">View All Students</button></div>'+
  '<div class="card mt-20"><h2 style="margin-bottom:20px">📊 View Reports</h2><button class="btn btn-info" onclick="viewReports()" style="width:100%">View Reports</button></div>';
}

function markAttendance(){
  var a=document.getElementById('app'),st=users.filter(function(u){return u.role==='student'});
  var today=new Date().toISOString().split('T')[0];
  var h='<div class="card"><h2 class="mb-20">📅 Mark Attendance - '+new Date().toLocaleDateString('mr-IN')+'</h2>'+
  '<p style="color:#666;margin-bottom:20px">Click to toggle: Present ✅ ↔ Absent ❌</p>';
  if(st.length===0)h+='<p class="text-center">No students registered yet!</p>';
  else{st.forEach(function(s){
    var status=(attendance[s.email]&&attendance[s.email][today])||'none';
    var label=status==='present'?'✅ Present':status==='absent'?'❌ Absent':'⚪ Not Marked';
    h+='<div class="attendance-day '+status+'" onclick="toggleAtt(\''+s.email+'\',\''+today+'\')"><strong>'+s.name+'</strong> ('+s.email+')<br><small>'+label+'</small></div>'})}
  h+='<button class="btn btn-danger mt-20" onclick="renderTeacherDashboard()" style="width:100%">Back</button></div>';
  a.innerHTML=h;
}

function toggleAtt(email,date){
  if(!attendance[email])attendance[email]={};
  var c=attendance[email][date];
  attendance[email][date]=c==='present'?'absent':c==='absent'?'none':'present';
  if(attendance[email][date]==='none')delete attendance[email][date];
  save();markAttendance();
}

function viewStudents(){
  var a=document.getElementById('app'),st=users.filter(function(u){return u.role==='student'});
  var h='<div class="card"><h2 class="mb-20">👥 All Students ('+st.length+')</h2>';
  if(st.length===0)h+='<p class="text-center">No students yet!</p>';
  else{st.forEach(function(s){
    var sr=quizResults.filter(function(r){return r.email===s.email});
    var av=sr.length>0?Math.round(sr.reduce(function(sm,r){return sm+r.score},0)/sr.length):0;
    h+='<div class="stat-box mb-20" style="text-align:left"><h3>'+s.name+'</h3><p style="color:#666">'+s.email+' | '+s.mobile+'</p><p style="margin-top:10px">Tests: '+sr.length+' | Average: '+av+'%</p></div>'})}
  h+='<button class="btn btn-danger mt-20" onclick="renderTeacherDashboard()" style="width:100%">Back</button></div>';
  a.innerHTML=h;
}

function viewReports(){
  var a=document.getElementById('app'),st=users.filter(function(u){return u.role==='student'});
  var h='<div class="card"><h2 class="mb-20">📊 All Reports</h2>';
  if(quizResults.length===0)h+='<p class="text-center">No test results yet!</p>';
  else{st.forEach(function(s){
    var sr=quizResults.filter(function(r){return r.email===s.email});if(sr.length===0)return;
    var ss={};sr.forEach(function(r){if(!ss[r.subject])ss[r.subject]={t:0,c:0};ss[r.subject].t+=r.score;ss[r.subject].c++});
    h+='<div class="stat-box mb-20" style="text-align:left"><h3>'+s.name+'</h3><p style="color:#666">'+s.email+'</p>';
    Object.entries(ss).forEach(function(e){var sj=e[0],st=e[1],av=Math.round(st.t/st.c);
      h+='<div style="margin-top:15px"><strong>'+subjects[sj]+'</strong><div class="progress-bar"><div class="progress-fill" style="width:'+av+'%">'+av+'%</div></div><small style="color:#666">'+st.c+' tests</small></div>'});
    h+='</div>'})}
  h+='<button class="btn btn-danger mt-20" onclick="renderTeacherDashboard()" style="width:100%">Back</button></div>';
  a.innerHTML=h;
}

// ============ ADMIN DASHBOARD ============
function renderAdminDashboard(){
  var a=document.getElementById('app');
  var tch=users.filter(function(u){return u.role==='teacher'});
  var stu=users.filter(function(u){return u.role==='student'});
  a.innerHTML='<div class="card"><div style="display:flex;justify-content:space-between;align-items:center"><div>'+
  '<h1>👑 Admin Dashboard</h1><p style="color:#666;margin-top:5px">Welcome Admin!</p></div>'+
  '<button class="btn btn-danger" onclick="logout()">Logout</button></div></div>'+
  '<div class="grid-4">'+
  '<div class="stat-box"><div class="stat-number">'+stu.length+'</div><div class="stat-label">Total Students</div></div>'+
  '<div class="stat-box"><div class="stat-number">'+tch.length+'</div><div class="stat-label">Total Teachers</div></div>'+
  '<div class="stat-box"><div class="stat-number">'+quizResults.length+'</div><div class="stat-label">Total Tests</div></div>'+
  '<div class="stat-box"><div class="stat-number">'+Object.keys(teacherAttendance).length+'</div><div class="stat-label">Teacher Attendance</div></div></div>'+
  '<div class="card mt-20"><h2 style="margin-bottom:20px">📅 Teacher Attendance</h2><button class="btn btn-warning" onclick="markTeacherAtt()" style="width:100%">Mark Teacher Attendance (Mon-Sat)</button></div>'+
  '<div class="card mt-20"><h2 style="margin-bottom:20px">👥 View All Teachers</h2><button class="btn btn-info" onclick="viewAllTeachers()" style="width:100%">View Teachers</button></div>'+
  '<div class="card mt-20"><h2 style="margin-bottom:20px">👨‍🎓 View All Students</h2><button class="btn btn-info" onclick="viewAllStudentsA()" style="width:100%">View Students</button></div>'+
  '<div class="card mt-20"><h2 style="margin-bottom:20px">📊 Full Reports</h2><button class="btn btn-info" onclick="viewFullReports()" style="width:100%">View Reports</button></div>';
}

function markTeacherAtt(){
  var a=document.getElementById('app'),tch=users.filter(function(u){return u.role==='teacher'});
  var today=new Date().toISOString().split('T')[0];
  var h='<div class="card"><h2 class="mb-20">📅 Teacher Attendance - '+new Date().toLocaleDateString('mr-IN')+'</h2>'+
  '<p style="color:#666;margin-bottom:20px">Click to toggle: Present ✅ ↔ Absent ❌</p>';
  if(tch.length===0)h+='<p class="text-center">No teachers registered yet!</p>';
  else{tch.forEach(function(t){
    var status=(teacherAttendance[t.email]&&teacherAttendance[t.email][today])||'none';
    var label=status==='present'?'✅ Present':status==='absent'?'❌ Absent':'⚪ Not Marked';
    h+='<div class="attendance-day '+status+'" onclick="toggleTAtt(\''+t.email+'\',\''+today+'\')"><strong>'+t.name+'</strong> ('+t.email+')<br><small>'+label+'</small></div>'})}
  h+='<button class="btn btn-danger mt-20" onclick="renderAdminDashboard()" style="width:100%">Back</button></div>';
  a.innerHTML=h;
}

function toggleTAtt(email,date){
  if(!teacherAttendance[email])teacherAttendance[email]={};
  var c=teacherAttendance[email][date];
  teacherAttendance[email][date]=c==='present'?'absent':c==='absent'?'none':'present';
  if(teacherAttendance[email][date]==='none')delete teacherAttendance[email][date];
  save();markTeacherAtt();
}

function viewAllTeachers(){
  var a=document.getElementById('app'),tch=users.filter(function(u){return u.role==='teacher'});
  var h='<div class="card"><h2 class="mb-20">👥 All Teachers ('+tch.length+')</h2>';
  if(tch.length===0)h+='<p class="text-center">No teachers yet!</p>';
  else{tch.forEach(function(t){
    var ta=teacherAttendance[t.email]||{};
    var pd=Object.values(ta).filter(function(x){return x==='present'}).length;
    var ad=Object.values(ta).filter(function(x){return x==='absent'}).length;
    var td=Object.keys(ta).length,pct=td>0?Math.round(pd/td*100):0;
    h+='<div class="stat-box mb-20" style="text-align:left"><h3>'+t.name+'</h3><p style="color:#666">'+t.email+' | '+t.mobile+'</p><p style="margin-top:10px">Attendance: '+pd+' Present / '+ad+' Absent ('+pct+'%)</p></div>'})}
  h+='<button class="btn btn-danger mt-20" onclick="renderAdminDashboard()" style="width:100%">Back</button></div>';
  a.innerHTML=h;
}

function viewAllStudentsA(){
  var a=document.getElementById('app'),stu=users.filter(function(u){return u.role==='student'});
  var h='<div class="card"><h2 class="mb-20">👨‍🎓 All Students ('+stu.length+')</h2>';
  if(stu.length===0)h+='<p class="text-center">No students yet!</p>';
  else{stu.forEach(function(s){
    var sr=quizResults.filter(function(r){return r.email===s.email});
    var av=sr.length>0?Math.round(sr.reduce(function(sm,r){return sm+r.score},0)/sr.length):0;
    var sa=attendance[s.email]||{};var pd=Object.values(sa).filter(function(x){return x==='present'}).length;
    h+='<div class="stat-box mb-20" style="text-align:left"><h3>'+s.name+'</h3><p style="color:#666">'+s.email+' | '+s.mobile+'</p><p style="margin-top:10px">Tests: '+sr.length+' | Average: '+av+'% | Attendance: '+pd+' days</p></div>'})}
  h+='<button class="btn btn-danger mt-20" onclick="renderAdminDashboard()" style="width:100%">Back</button></div>';
  a.innerHTML=h;
}

function viewFullReports(){
  var a=document.getElementById('app'),stu=users.filter(function(u){return u.role==='student'});
  var h='<div class="card"><h2 class="mb-20">📊 Full Reports</h2>';
  if(quizResults.length===0)h+='<p class="text-center">No test results yet!</p>';
  else{stu.forEach(function(s){
    var sr=quizResults.filter(function(r){return r.email===s.email});if(sr.length===0)return;
    var ss={};sr.forEach(function(r){if(!ss[r.subject])ss[r.subject]={t:0,c:0};ss[r.subject].t+=r.score;ss[r.subject].c++});
    h+='<div class="stat-box mb-20" style="text-align:left"><h3>'+s.name+'</h3><p style="color:#666">'+s.email+'</p>';
    Object.entries(ss).forEach(function(e){var sj=e[0],st=e[1],av=Math.round(st.t/st.c);
      h+='<div style="margin-top:15px"><strong>'+subjects[sj]+'</strong><div class="progress-bar"><div class="progress-fill" style="width:'+av+'%">'+av+'%</div></div><small style="color:#666">'+st.c+' tests</small></div>'});
    h+='</div>'})}
  h+='<button class="btn btn-danger mt-20" onclick="renderAdminDashboard()" style="width:100%">Back</button></div>';
  a.innerHTML=h;
}

// ============ INIT ============
render();
</script>
</body>
</html>
