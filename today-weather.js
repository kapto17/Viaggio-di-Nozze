/* V40 · Oggi/Domani + meteo della giornata */
(() => {
  if (typeof openTodayScreen !== "function" || typeof PROGRAM_GUIDE === "undefined") return;

  const LOC = {
    sf:{key:"sf",lat:37.7749,lon:-122.4194,tz:"America/Los_Angeles",label:"San Francisco"},
    la:{key:"la",lat:34.0522,lon:-118.2437,tz:"America/Los_Angeles",label:"Los Angeles"},
    vegas:{key:"vegas",lat:36.1699,lon:-115.1398,tz:"America/Los_Angeles",label:"Las Vegas"},
    page:{key:"page",lat:36.9147,lon:-111.4558,tz:"America/Phoenix",label:"Page"},
    grandCanyon:{key:"grand-canyon",lat:36.0544,lon:-112.1401,tz:"America/Phoenix",label:"Grand Canyon"},
    chicago:{key:"chicago",lat:41.8781,lon:-87.6298,tz:"America/Chicago",label:"Chicago"},
    bayahibe:{key:"bayahibe",lat:18.3690,lon:-68.8385,tz:"America/Santo_Domingo",label:"Bayahibe"}
  };

  const SPECIAL_DAYS = {
    "2026-10-23": {
      primary: LOC.la,
      segments: [
        {info:LOC.sf,label:"San Francisco · mattina",from:7,to:12},
        {info:LOC.la,label:"Los Angeles · pomeriggio/sera",from:13,to:23}
      ]
    },
    "2026-10-27": {
      primary: LOC.vegas,
      segments: [
        {info:LOC.la,label:"Los Angeles · mattina",from:7,to:11},
        {info:LOC.vegas,label:"Las Vegas · pomeriggio/sera",from:14,to:23}
      ]
    },
    "2026-10-28": {
      primary: LOC.grandCanyon,
      segments: [
        {info:LOC.vegas,label:"Las Vegas · partenza",from:6,to:9},
        {info:LOC.grandCanyon,label:"Grand Canyon · giornata",from:10,to:17},
        {info:LOC.page,label:"Page · sera",from:18,to:23}
      ]
    },
    "2026-10-29": {
      primary: LOC.page,
      segments: [
        {info:LOC.page,label:"Page · mattina/pomeriggio",from:7,to:17},
        {info:LOC.vegas,label:"Las Vegas · sera",from:18,to:23}
      ]
    },
    "2026-10-30": {
      primary: LOC.chicago,
      segments: [
        {info:LOC.vegas,label:"Las Vegas · mattina",from:6,to:11},
        {info:LOC.chicago,label:"Chicago · pomeriggio/sera",from:16,to:23}
      ]
    },
    "2026-11-03": {
      primary: LOC.bayahibe,
      segments: [
        {info:LOC.chicago,label:"Chicago · mattina",from:6,to:10},
        {info:LOC.bayahibe,label:"Bayahibe · pomeriggio/sera",from:16,to:23}
      ]
    }
  };

  const LEG_LOC = {
    sfo: LOC.sf,
    la: LOC.la,
    vegas1: LOC.vegas,
    vegas2: LOC.vegas,
    page: LOC.page,
    chicago: LOC.chicago,
    bayahibe: LOC.bayahibe
  };

  let anchorDate = null;
  let switchingDay = false;
  let clockTimer = null;

  function plusDate(iso,days){
    const d=new Date(`${iso}T12:00:00Z`);
    d.setUTCDate(d.getUTCDate()+days);
    return d.toISOString().slice(0,10);
  }

  function shortDate(iso){
    return new Date(`${iso}T12:00:00`).toLocaleDateString("it-IT",{day:"numeric",month:"short"});
  }

  function allDays(){
    return Object.entries(PROGRAM_GUIDE).flatMap(([legId,days]) => (days||[]).map(day=>({legId,day}))).sort((a,b)=>a.day.date.localeCompare(b.day.date));
  }

  function entryForDate(iso){
    return allDays().find(x=>x.day.date===iso) || null;
  }

  function dayPlan(iso,legId){
    if(SPECIAL_DAYS[iso]) return SPECIAL_DAYS[iso];
    const info=LEG_LOC[legId] || LOC.sf;
    return {primary:info,segments:[{info,label:info.label,from:7,to:23}]};
  }

  function weatherText(code){
    code=Number(code);
    if(code===0)return "Sereno";
    if([1,2].includes(code))return "Poco nuvoloso";
    if(code===3)return "Coperto";
    if([45,48].includes(code))return "Nebbia";
    if([51,53,55,56,57].includes(code))return "Pioviggine";
    if([61,63,65,66,67,80,81,82].includes(code))return "Pioggia";
    if([71,73,75,77,85,86].includes(code))return "Neve";
    if([95,96,99].includes(code))return "Temporali";
    return "Meteo variabile";
  }

  function icon(code,hour){
    if(typeof weatherIcon === "function") return weatherIcon(Number(code),hour>=7&&hour<19);
    return "🌡️";
  }

  function cacheKey(info){ return `lf-today-forecast-v40-${info.key}`; }

  async function forecast(info){
    let cached=null;
    try{ cached=JSON.parse(localStorage.getItem(cacheKey(info))||"null"); }catch(_){ }
    const fresh=cached && cached.savedAt && (Date.now()-cached.savedAt < 90*60*1000);
    if(fresh && cached.data) return {data:cached.data,savedAt:cached.savedAt,cached:true};

    try{
      const url=`https://api.open-meteo.com/v1/forecast?latitude=${info.lat}&longitude=${info.lon}&hourly=temperature_2m,apparent_temperature,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=celsius&timezone=${encodeURIComponent(info.tz)}&forecast_days=16`;
      const r=await fetch(url,{headers:{"Accept":"application/json"}});
      if(!r.ok) throw new Error("forecast unavailable");
      const data=await r.json();
      const savedAt=Date.now();
      try{ localStorage.setItem(cacheKey(info),JSON.stringify({savedAt,data})); }catch(_){ }
      return {data,savedAt,cached:false};
    }catch(err){
      if(cached?.data) return {data:cached.data,savedAt:cached.savedAt,cached:true,stale:true};
      throw err;
    }
  }

  function extractDay(bundle,iso){
    const data=bundle?.data;
    if(!data?.hourly?.time || !data?.daily?.time) return null;
    const di=data.daily.time.indexOf(iso);
    if(di<0) return null;
    const hourly=[];
    data.hourly.time.forEach((time,i)=>{
      if(!String(time).startsWith(iso)) return;
      const hour=Number(String(time).slice(11,13));
      hourly.push({
        hour,
        time:String(time).slice(11,16),
        temp:Number(data.hourly.temperature_2m?.[i]),
        feels:Number(data.hourly.apparent_temperature?.[i]),
        rain:Number(data.hourly.precipitation_probability?.[i]),
        code:Number(data.hourly.weather_code?.[i])
      });
    });
    return {
      code:Number(data.daily.weather_code?.[di]),
      max:Number(data.daily.temperature_2m_max?.[di]),
      min:Number(data.daily.temperature_2m_min?.[di]),
      rain:Number(data.daily.precipitation_probability_max?.[di]),
      hourly,
      savedAt:bundle.savedAt,
      cached:bundle.cached,
      stale:bundle.stale
    };
  }

  async function dayForecast(info,iso){
    try{return extractDay(await forecast(info),iso);}catch(_){return null;}
  }

  function formatUpdated(ts){
    if(!ts)return "";
    return new Date(ts).toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"});
  }

  function setClock(info){
    const clock=document.getElementById("today-screen-clock");
    const label=document.querySelector("#screen-today .today-local-time em");
    if(label) label.textContent=info.label;
    if(!clock)return;
    const tick=()=>{
      try{clock.textContent=new Intl.DateTimeFormat("it-IT",{timeZone:info.tz,hour:"2-digit",minute:"2-digit",hour12:false}).format(new Date());}
      catch(_){clock.textContent="--:--";}
    };
    if(clockTimer)clearInterval(clockTimer);
    tick();
    clockTimer=setInterval(tick,30000);
  }

  function setTopWeather(info,day){
    const box=document.getElementById("today-screen-weather");
    if(!box)return;
    box.classList.remove("city-live-loading");
    if(!day){
      box.innerHTML=`<span>🌡️</span><strong>Previsione n/d</strong>`;
      box.title="La previsione comparirà automaticamente quando la data entra nell'orizzonte meteo";
      return;
    }
    box.innerHTML=`<span>${icon(day.code,12)}</span><strong>${Math.round(day.min)}–${Math.round(day.max)}°</strong><small>☔ ${Math.round(day.rain||0)}%</small>`;
    box.title=`${info.label} · ${weatherText(day.code)} · minima ${Math.round(day.min)}°, massima ${Math.round(day.max)}°`;
  }

  function hourlyHtml(day,from,to){
    const rows=(day?.hourly||[]).filter(x=>x.hour>=from&&x.hour<=to);
    if(!rows.length)return `<div class="today-weather-unavailable">Previsione oraria non ancora disponibile.</div>`;
    return `<div class="today-hourly-scroll">${rows.map(x=>`<div class="today-hour-card"><b>${x.time}</b><span>${icon(x.code,x.hour)}</span><strong>${Number.isFinite(x.temp)?Math.round(x.temp):"–"}°</strong><small>☔ ${Number.isFinite(x.rain)?Math.round(x.rain):0}%</small></div>`).join("")}</div>`;
  }

  async function renderWeather(legId,iso){
    const host=document.getElementById("today-weather-detail");
    const plan=dayPlan(iso,legId);
    setClock(plan.primary);
    const primaryDay=await dayForecast(plan.primary,iso);
    setTopWeather(plan.primary,primaryDay);
    if(!host)return;

    if(!primaryDay){
      host.innerHTML=`<div class="today-weather-empty"><strong>Previsione non ancora disponibile</strong><span>Questa sezione si aggiorna automaticamente quando ${shortDate(iso)} entra nell'orizzonte delle previsioni. Non mostriamo il meteo di oggi come se fosse quello del viaggio.</span></div>`;
      return;
    }

    const segmentResults=[];
    for(const seg of plan.segments){
      const day=seg.info.key===plan.primary.key ? primaryDay : await dayForecast(seg.info,iso);
      segmentResults.push({seg,day});
    }

    const dailySummary=`<div class="today-weather-summary"><div><span>${icon(primaryDay.code,12)}</span><div><b>${weatherText(primaryDay.code)}</b><small>${plan.primary.label}</small></div></div><div class="today-weather-numbers"><strong>${Math.round(primaryDay.min)}–${Math.round(primaryDay.max)}°</strong><small>Pioggia max ${Math.round(primaryDay.rain||0)}%</small></div></div>`;

    const sections=segmentResults.map(({seg,day})=>`<section class="today-weather-segment"><div class="today-weather-segment-head"><strong>${seg.label}</strong>${day?`<span>${Math.round(day.min)}–${Math.round(day.max)}°</span>`:""}</div>${hourlyHtml(day,seg.from,seg.to)}</section>`).join("");
    const stale=segmentResults.some(x=>x.day?.stale);
    const stamp=formatUpdated(Math.max(...segmentResults.map(x=>Number(x.day?.savedAt||0))));

    host.innerHTML=`${dailySummary}${sections}<div class="today-weather-source">${stale?"Ultimi dati salvati offline":"Previsioni aggiornate"}${stamp?` · ${stamp}`:""} · Open-Meteo</div>`;
  }

  function decorate(legId,iso){
    const screen=document.getElementById("screen-today");
    if(!screen || !screen.classList.contains("active"))return;
    screen.dataset.todayDate=iso;
    const hero=screen.querySelector(".today-screen-hero");
    if(!hero)return;

    const base=anchorDate||iso;
    const tomorrow=plusDate(base,1);
    const baseEntry=entryForDate(base);
    const nextEntry=entryForDate(tomorrow);
    const existing=screen.querySelector(".today-plus-wrap");
    if(existing)existing.remove();

    const wrap=document.createElement("div");
    wrap.className="today-plus-wrap";
    wrap.innerHTML=`
      <div class="today-day-switch">
        ${baseEntry?`<button type="button" class="${iso===base?"active":""}" data-plus-leg="${baseEntry.legId}" data-plus-date="${base}"><b>Oggi</b><span>${shortDate(base)}</span></button>`:""}
        ${nextEntry?`<button type="button" class="${iso===tomorrow?"active":""}" data-plus-leg="${nextEntry.legId}" data-plus-date="${tomorrow}"><b>Domani</b><span>${shortDate(tomorrow)}</span></button>`:""}
      </div>
      <details class="today-weather-panel" open>
        <summary><span>🌦️ Meteo della giornata</span><span class="today-weather-chevron">⌄</span></summary>
        <div id="today-weather-detail" class="today-weather-detail"><div class="today-weather-loading">Caricamento previsioni…</div></div>
      </details>`;
    hero.insertAdjacentElement("afterend",wrap);

    const heroKicker=screen.querySelector(".today-screen-hero small");
    if(heroKicker){
      const label=iso===tomorrow?"DOMANI":"OGGI";
      heroKicker.textContent=`${label} · ${fmtDateFull(iso)}`;
    }

    wrap.querySelectorAll("[data-plus-date]").forEach(btn=>btn.addEventListener("click",()=>{
      const target=btn.dataset.plusDate;
      if(!target || target===iso)return;
      switchingDay=true;
      try{openTodayScreen(btn.dataset.plusLeg,target);}finally{switchingDay=false;}
    }));

    renderWeather(legId,iso);
  }

  const originalTodayLiveInfo = typeof todayLiveInfo === "function" ? todayLiveInfo : null;
  if(originalTodayLiveInfo){
    todayLiveInfo=function(iso,legId){
      const plan=dayPlan(iso,legId);
      return plan.primary || originalTodayLiveInfo(iso,legId);
    };
  }

  if(typeof refreshDedicatedTodayLive === "function"){
    refreshDedicatedTodayLive=async function(iso){
      const screen=document.getElementById("screen-today");
      const legId=screen?.dataset?.legId||"";
      const plan=dayPlan(iso,legId);
      setClock(plan.primary);
      const day=await dayForecast(plan.primary,iso);
      setTopWeather(plan.primary,day);
    };
  }

  const originalOpenTodayScreen=openTodayScreen;
  openTodayScreen=function(legId,iso,...args){
    if(!switchingDay)anchorDate=iso;
    const result=originalOpenTodayScreen(legId,iso,...args);
    requestAnimationFrame(()=>requestAnimationFrame(()=>decorate(legId,iso)));
    return result;
  };
})();
