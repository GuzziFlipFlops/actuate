import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import { ArrowDown, ArrowUpRight, ChevronDown, ExternalLink, Menu, Pause, Play, RotateCw, Wifi, X, Zap } from 'lucide-react';

const SLACK = 'https://hackclub.slack.com/archives/C0C421M2MU0';
const candidate = import.meta.env.VITE_RSVP_URL?.trim();
const RSVP = candidate && /^https:\/\//i.test(candidate) ? candidate : 'https://rsvp.hackclub.community/actuate';
const projects = [
  { title: 'Wi-Fi & Bluetooth tools', type: 'wireless', description: 'A BLE remote or a Wi-Fi signal monitor.', color: '#7ccaf4' },
  { title: 'IoT networks', type: 'network', description: 'Connect a few boards. Make them talk.', color: '#f2c66d' },
  { title: 'Web servers & dashboards', type: 'server', description: 'Host a page right on your ESP32.', color: '#b6a0ed' },
  { title: 'Sensors & displays', type: 'device', description: 'Check the weather. Log your plant’s soil moisture.', color: '#d2fa69' },
  { title: 'Robots, arms & rovers', type: 'robot', description: 'A rover, a robot arm, or a quadruped.', color: '#ff9587' },
  { title: 'Cameras & vision', type: 'camera', description: 'See what your rover sees over Wi-Fi.', color: '#80d9bd' },
];
const faqs = [
  ['Can I mostly write software?', 'Yep. Firmware, wireless tools, web servers, and IoT networks all count. You don’t have to build a robot.'],
  ['Does it have to use an ESP32?', 'Yes. Use it for something the project needs: wireless, sensors, a display, a camera, motors, or GPIO. Just running unrelated code on it doesn’t count.'],
  ['What if I’ve never used one?', 'You’re welcome here. We’re writing guides from the first upload onward, and you can ask for help in #actuate.'],
  ['How much can I spend?', 'Aim for a $30–50 bill of materials for hardware-heavy builds. Software projects can use fewer parts; there’s no minimum spend.'],
  ['When does it start?', 'We’re still putting Actuate together. Dates, funding, and final rules aren’t set yet. RSVP and join #actuate for updates.'],
];

function Mark() { return <svg viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="m7 28 9-20h5l9 20h-7l-1.7-5H15l-2 5H7Zm10-10h3l-1.5-4-1.5 4Z" fill="currentColor"/><path d="M1 17h7m21 0h6" stroke="currentColor" strokeWidth="2"/></svg>; }

function Board({ mode }: { mode: number }) {
  return <svg className="board-art" viewBox="0 0 580 500" role="img" aria-label="Illustrated ESP32 development board connected to a sensor, Wi-Fi signal, and servo">
    <defs>
      <linearGradient id="pcb" x2="1" y2="1"><stop stopColor="#303d2c"/><stop offset="1" stopColor="#1c251a"/></linearGradient>
      <linearGradient id="metal" x2=".8" y2="1"><stop stopColor="#d1d2c5"/><stop offset=".42" stopColor="#90978c"/><stop offset=".5" stopColor="#b6bbaf"/><stop offset="1" stopColor="#686f65"/></linearGradient>
      <linearGradient id="pin" x2="1" y2="0"><stop stopColor="#746440"/><stop offset=".5" stopColor="#d1c28e"/><stop offset="1" stopColor="#7c6c45"/></linearGradient>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#000" floodOpacity=".5"/></filter>
      <filter id="glow"><feGaussianBlur stdDeviation="4"/></filter>
    </defs>
    <g className="circuit-traces" fill="none" stroke="#566846" strokeWidth="1.5">
      <path d="M190 230H114L84 200V129H48"/><path d="M360 160h54l25-25h85"/><path d="M387 280h54l33 33v70h57"/><path d="M224 360v43l-36 36H88"/>
    </g>
    <g className="signal-lines" fill="none" stroke="#d2fa69" strokeWidth="2" strokeDasharray="7 180">
      <path d="M48 129h36v71l30 30h76"/><path d="M360 160h54l25-25h85"/><path d="M387 280h54l33 33v70h57"/>
    </g>
    <g fill="#d2fa69">{[[48,129],[524,135],[531,383],[88,439]].map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="3"/>)}</g>
    <g className="board-float"><g transform="translate(176 66) rotate(-12 115 180)" filter="url(#shadow)">
      <rect x="0" y="5" width="232" height="354" rx="17" fill="#0d120b" stroke="#48513d" strokeWidth="2"/>
      <rect width="232" height="350" rx="17" fill="url(#pcb)" stroke="#66754b"/>
      {[13,218].map((x)=><g key={x}>{Array.from({length:15},(_,i)=><g key={i}><rect x={x-11} y={36+i*19} width="21" height="9" rx="1" fill="url(#pin)"/><rect x={x-3} y={37+i*19} width="6" height="7" fill="#12160f"/></g>)}</g>)}
      <g fill="none" stroke="#607246" strokeWidth="1" opacity=".6"><path d="M32 110h23v119l22 22v59M199 112h-21v121l-22 22v53M32 158h15v84l31 31M200 145h-15v97l-28 30M34 291h24l20 20h21"/></g>
      <g fill="#11170f" stroke="#77805b">{[[17,15],[214,15],[17,334],[214,334]].map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="6"/>)}</g>
      <rect x="57" y="19" width="117" height="173" rx="3" fill="#151b12" stroke="#92957c"/>
      <path d="M66 30h16v38h12V30h15v38h12V30h15v38h12V30h17" fill="none" stroke="#b9b187" strokeWidth="4"/>
      <rect x="58" y="83" width="115" height="111" rx="3" fill="url(#metal)" stroke="#c4c9bc"/>
      <path d="M67 91h96M67 185h96" stroke="#e4e6da" opacity=".35"/>
      <text x="116" y="121" textAnchor="middle" fontSize="12" fontWeight="700" fill="#343b30" fontFamily="monospace">ESPRESSIF</text>
      <text x="116" y="144" textAnchor="middle" fontSize="17" fontWeight="700" fill="#343b30" fontFamily="monospace">ESP32</text>
      <text x="116" y="165" textAnchor="middle" fontSize="7" letterSpacing="2" fill="#464e40" fontFamily="monospace">WROOM · 32</text>
      <g fill="#b6b695">{[74,97,120,143].map(x=><rect key={x} x={x} y="207" width="10" height="18" rx="1"/>)}</g>
      <rect x="96" y="235" width="40" height="39" rx="2" fill="#11140f" stroke="#66715a"/>
      {Array.from({length:6},(_,i)=><g key={i} stroke="#a6aa91" strokeWidth="2"><path d={`M91 ${239+i*6}h5m40 0h5M${101+i*6} 230v5m0 39v5`}/></g>)}
      <rect x="41" y="270" width="17" height="26" rx="2" fill="#bbbca9"/><rect x="45" y="274" width="9" height="18" fill="#191d15"/>
      <rect x="176" y="270" width="17" height="26" rx="2" fill="#bbbca9"/><rect x="180" y="274" width="9" height="18" fill="#191d15"/>
      <circle className={mode===0?'led blink':'led'} cx="161" cy="244" r="10" fill="#d2fa69" filter="url(#glow)" opacity=".45"/>
      <circle className={mode===0?'blink':''} cx="161" cy="244" r="4" fill="#d2fa69"/>
      <text x="65" y="295" fill="#aab299" fontSize="7" fontFamily="monospace">EN</text><text x="148" y="295" fill="#aab299" fontSize="7" fontFamily="monospace">BOOT</text>
      <rect x="87" y="303" width="58" height="48" rx="5" fill="url(#metal)" stroke="#d2d5c6"/><rect x="94" y="326" width="44" height="18" rx="6" fill="#22251e"/><rect x="101" y="332" width="30" height="5" rx="2" fill="#6c7063"/>
      <text x="115" y="288" textAnchor="middle" fill="#a6b78c" fontSize="7" letterSpacing="1" fontFamily="monospace">ACTUATE / 001</text>
    </g></g>
    <g className={`wifi-art ${mode===1?'active':''}`} transform="translate(484 94)" stroke="#d2fa69" strokeWidth="2" fill="none"><path d="M-20 3q20-19 40 0"/><path d="M-13 11q13-12 26 0"/><path d="M-6 19q6-6 12 0"/><circle cy="26" r="2" fill="#d2fa69"/></g>
    <g transform="translate(468 330)"><rect x="-22" y="-18" width="49" height="38" rx="5" fill="#2f3727" stroke="#78855f"/><circle cx="2" cy="0" r="8" fill="#afb799"/><g className={mode===2?'servo-arm active':'servo-arm'}><rect x="-3" y="-25" width="10" height="50" rx="5" fill="#d7dfc1"/><circle cx="2" cy="0" r="3" fill="#445135"/></g></g>
    <text x="23" y="108" fill="#85917c" fontSize="9" letterSpacing="1.5" fontFamily="monospace">sensor</text>
    <text x="416" y="177" fill="#85917c" fontSize="9" letterSpacing="1.5" fontFamily="monospace">Wi-Fi</text>
    <text x="427" y="416" fill="#85917c" fontSize="9" letterSpacing="1.5" fontFamily="monospace">servo</text>
  </svg>;
}

function ProjectArt({ type }: { type: string }) {
  return <svg viewBox="0 0 320 180" fill="none" aria-hidden="true" className={`project-art art-${type}`}>
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {type==='wireless' && <><rect x="127" y="74" width="67" height="80" rx="8" fill="#222c20"/><path d="M148 131h26m-19-31 12 11-12 11V90l12 10-23 22"/><path className="diagram-signal" d="M105 59q55-50 110 0M117 72q44-40 88 0"/><circle cx="83" cy="112" r="13"/><circle cx="241" cy="112" r="13"/><path d="M97 112h28m70 0h31" strokeDasharray="3 5"/></>}
      {type==='server' && <><rect x="67" y="34" width="186" height="116" rx="7" fill="#1b2518"/><path d="M67 54h186M147 150v13m25-13v13m-40 0h55"/><circle cx="80" cy="44" r="2"/><circle cx="89" cy="44" r="2"/><rect x="80" y="69" width="47" height="65" rx="4"/><path d="m137 115 18-16 18 9 22-25 21 12 23-22M139 132h98"/><path d="M93 83h22m-22 12h17m-17 12h22m-22 12h14"/></>}
      {type==='network' && <><path className="diagram-signal" d="M160 90 74 45m86 45 87-44m-87 44-72 55m72-55 72 57" strokeDasharray="4 5"/><path d="m127 72 33-18 33 18v38l-33 18-33-18Z" fill="#222c20"/><path d="m127 72 33 19 33-19m-33 19v37"/><path d="m145 73 15-8 15 8-15 9Z"/>{[[74,45],[247,46],[88,145],[232,147]].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`}><rect x="-17" y="-14" width="34" height="28" rx="6" fill="#1b2118"/><circle r="5"/><path d="M-24 0h7m34 0h7"/></g>)}</>}
      {type==='device' && <><path d="m102 34 106 13 13 105-106-13Z" fill="#2a3126"/><path d="m102 34-11 9 13 105 11-9m-11 9 106 13 11-9"/><path d="m116 54 77 9 7 60-77-9Z" fill="#161e14"/><circle cx="150" cy="80" r="9"/><path d="m150 65-1-5m1 40 1-5m-16-16-5-1m40 5-5-1m-23-15-4-4m26 7 4-4"/><path d="m138 103 46 6m-52 20 10 1m13 2 10 1m13 1 10 1"/></>}
      {type==='robot' && <><path d="m101 137 62-24 63 24-62 24Z" fill="#293324"/><path d="M101 137v9l63 24 62-24v-9m-62 24v9"/><path d="m157 127-12-39 27-42 18 12-26 35 12 35" fill="#2c3827"/><circle cx="157" cy="88" r="11" fill="#182214"/><circle cx="157" cy="88" r="4"/><circle cx="180" cy="52" r="12" fill="#182214"/><path d="m188 43 31 14-7 17-32-12" fill="#2c3827"/><path d="m214 59 19-3 13 15-9 10m-24-10 11 21 17-1"/><circle cx="162" cy="131" r="6"/><path className="diagram-signal" d="M86 104V65h32m-32 0 7-7m-7 7 7 7" strokeDasharray="4 4"/></>}
      {type==='camera' && <><path d="m102 54 100-10 19 80-100 15Z" fill="#273321"/><path d="m121 139-12 9-19-80 12-14m7 94 99-15 13-9"/><ellipse cx="160" cy="91" rx="32" ry="31" transform="rotate(-14 160 91)" fill="#10190d"/><ellipse cx="160" cy="91" rx="22" ry="22"/><ellipse cx="160" cy="91" rx="10" ry="11" fill="#334628"/><path className="diagram-signal" d="M67 62V39h25m144 65v29h-22M68 118v25h28M227 61V33h-28"/><circle cx="191" cy="60" r="3" fill="currentColor"/></>}
    </g>
  </svg>;
}

export default function App() {
  const [mode,setMode] = useState(0);
  const [modal,setModal] = useState(false);
  const [tutorial,setTutorial] = useState<string | null>(null);
  const [menu,setMenu] = useState(false);
  const [paused,setPaused] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const board = useRef<HTMLDivElement>(null);
  const motionQuery = useRef<MediaQueryList | null>(null);
  useEffect(()=>{
    motionQuery.current = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = ()=>setPaused(Boolean(motionQuery.current?.matches));
    update(); motionQuery.current.addEventListener('change',update);
    return ()=>motionQuery.current?.removeEventListener('change',update);
  },[]);
  useEffect(()=>{
    document.documentElement.dataset.motion = paused?'paused':'running';
  },[paused]);
  useEffect(()=>{
    const observer = new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); }
    }),{threshold:0.08});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
    return ()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    if(modal) { dialog.current?.showModal(); document.body.style.overflow='hidden'; }
    else { dialog.current?.close(); document.body.style.overflow=''; }
    return ()=>{document.body.style.overflow='';};
  },[modal]);
  function openTutorial(name: string) { setTutorial(name); setModal(true); }
  function tilt(event: PointerEvent<HTMLDivElement>) {
    if(paused || event.pointerType!=='mouse' || !board.current) return;
    const rect=event.currentTarget.getBoundingClientRect();
    board.current.style.setProperty('--rx',`${-(event.clientY-rect.top-rect.height/2)/65}deg`);
    board.current.style.setProperty('--ry',`${(event.clientX-rect.left-rect.width/2)/65}deg`);
  }
  function resetTilt() { board.current?.style.setProperty('--rx','0deg');board.current?.style.setProperty('--ry','0deg'); }

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header">
      <a className="hackclub-flag" href="https://hackclub.com/" target="_blank" rel="noreferrer"><img src="/hackclub-flag.svg" alt="Hack Club" width="160" height="100"/></a>
      <a className="brand" href="#" aria-label="Actuate home"><Mark/><span>actuate<span className="brand-dot">.</span></span></a>
      <nav className={menu?'nav open':'nav'} aria-label="Main navigation">
        <a href="#build" onClick={()=>setMenu(false)}>build</a><a href="#how" onClick={()=>setMenu(false)}>how</a><a href="#start" onClick={()=>setMenu(false)}>learn</a><a href="#faq" onClick={()=>setMenu(false)}>faq</a>
      </nav>
      <div className="header-actions"><a className="button nav-rsvp" href={RSVP} target="_blank" rel="noreferrer">RSVP <ArrowUpRight size={16}/></a><button className="menu-button icon-button" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div>
    </header>
    <main id="main">
      <section className="hero section-shell">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="status-dot"/> A Hack Club YSWS in the making</div>
          <h1>Little board.<br/><span>Big ideas.</span></h1>
          <h2 className="hero-subtitle">Build something with an ESP32.</h2>
          <p className="hero-description">Make a thing that senses, connects, or moves.</p>
          <div className="hero-buttons"><a className="button primary" href={RSVP} target="_blank" rel="noreferrer">RSVP <ArrowUpRight size={19}/></a><a className="button secondary" href={SLACK} target="_blank" rel="noreferrer">Join #actuate <ArrowUpRight size={16}/></a></div>
          <p className="hero-note">No hardware experience required.</p>
        </div>
        <div className="hero-lab" onPointerMove={tilt} onPointerLeave={resetTilt}>
          <div className="lab-corner top-left"/><div className="lab-corner bottom-right"/>
          <div className="lab-topline"><span>ESP32</span><span><span className="status-dot"/> hello, world!</span></div>
          <div className="orbital orbital-one"/><div className="orbital orbital-two"/>
          <div className="board-perspective" ref={board}><Board mode={mode}/></div>
          <div className="lab-bottom"><span className="lab-caption">try it →</span><div className="demo-controls" aria-label="Board demo mode">{[<Zap size={14}/>,<Wifi size={14}/>,<RotateCw size={14}/>].map((icon,i)=><button key={i} className={mode===i?'selected':''} aria-pressed={mode===i} onClick={()=>setMode(i)}>{icon}{['Blink','Connect','Move'][i]}</button>)}</div></div>
          <div className="terminal-status" aria-live="polite"><span>›</span> {['digitalWrite(LED, HIGH);','WiFi.begin(ssid, password);','servo.write(90);'][mode]}<span className="cursor">▌</span></div>
        </div>
        <a href="#build" className="scroll-cue"><ArrowDown size={16}/> what would you make?</a>
      </section>
      <div className="possibility-strip" aria-label="Code it. Connect it. Make it move."><div>{[0,1,2,3].map(i=><span key={i} aria-hidden={i>0}>CODE IT <span>✳</span> CONNECT IT <span>✳</span> MAKE IT MOVE <span>✳</span></span>)}</div></div>
      <section id="build" className="build section-shell section-space">
        <div className="section-heading reveal"><h2>What can you <span>build?</span></h2><p>Software, hardware, or both. Your call.</p></div>
        <div className="projects">{projects.map((project,i)=><article className="project-card reveal" key={project.type} style={{'--delay':i*55+'ms', '--project-color':project.color} as CSSProperties}>
          <ProjectArt type={project.type}/><div className="project-copy"><h3>{project.title}</h3><p>{project.description}</p></div><ArrowUpRight className="project-arrow" size={20}/>
          <button className="project-tutorial-trigger" onClick={()=>openTutorial(project.title)} aria-label={'Open tutorial: '+project.title} aria-haspopup="dialog"/>
        </article>)}</div>
        <a className="text-link build-link reveal" href={SLACK} target="_blank" rel="noreferrer">Something else in mind? Tell us <ArrowUpRight size={17}/></a>
      </section>
      <section id="how" className="how section-shell section-space">
        <div className="exchange reveal">
          <article className="you-ship"><span className="exchange-number">01</span><h2>You ship.</h2><p>An original ESP32 project.<br/>Share your code and show it working.</p></article>
          <article className="we-ship"><span className="exchange-number">02</span><h2>We ship.</h2><p>We’re working on ESP32 boards, parts grants,<br className="desktop-break"/> and tutorials to help you build.</p></article>
        </div>
        <p className="budget reveal">Building hardware? Aim for a <strong>$30–50</strong> parts list.</p>
      </section>
      <section id="start" className="beginner section-shell section-space">
        <div className="beginner-copy reveal"><span className="hand-note">start here ↴</span><h2>First time?<br/>You’re in.</h2><p>The ESP32 is a good first microcontroller.<br/>Start with a blinking LED. Go from there.</p><a className="text-link" href={SLACK} target="_blank" rel="noreferrer">Ask us in #actuate <ArrowUpRight size={18}/></a></div>
        <div className="learning-panel reveal"><p className="learning-title">Guides we’re making</p>{['Your first upload','LEDs & sensors','Wi-Fi & Bluetooth','Motors & servos'].map((title,i)=><button className="lesson" key={title} onClick={()=>openTutorial(title)} aria-label={'Open tutorial: '+title} aria-haspopup="dialog"><span className="lesson-number">0{i+1}</span><span>{title}</span><ArrowUpRight size={18}/></button>)}</div>
      </section>
      <section id="faq" className="faq section-shell section-space"><div className="faq-heading reveal"><h2>Questions?</h2><a href={SLACK} target="_blank" rel="noreferrer" className="text-link">Come ask us <ArrowUpRight size={17}/></a></div><div className="faq-list reveal">{faqs.map(([q,a])=><details key={q}><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}</div></section>
      <section id="rsvp" className="final-cta section-shell reveal"><div className="cta-traces" aria-hidden="true"/><div><h2>Got an idea?</h2><p>We’d like to see it.</p></div><a className="button dark-button" href={RSVP} target="_blank" rel="noreferrer">RSVP for Actuate <ArrowUpRight size={20}/></a><Zap className="cta-bolt" aria-hidden="true"/></section>
    </main>
    <footer className="footer section-shell"><a className="brand" href="#" aria-label="Actuate home"><Mark/><span>actuate.</span></a><div className="footer-links"><a href="https://hackclub.com" target="_blank" rel="noreferrer">Hack Club <ArrowUpRight size={13}/></a><a href={SLACK} target="_blank" rel="noreferrer">#actuate <ArrowUpRight size={13}/></a><button onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?<Play size={13}/>:<Pause size={13}/>} {paused?'Play motion':'Pause motion'}</button></div></footer>
    <dialog ref={dialog} className="tutorial-dialog" onCancel={()=>setModal(false)} onClose={()=>setModal(false)} onClick={e=>{if(e.target===e.currentTarget){ const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)setModal(false);}}} aria-labelledby="tutorial-title" aria-describedby="tutorial-description">
      <button autoFocus className="dialog-close icon-button" onClick={()=>setModal(false)} aria-label="Close tutorial panel"><X/></button>
      <p className="dialog-topic">{tutorial}</p><h2 id="tutorial-title">Tutorial not<br/>made yet.</h2>
      <p id="tutorial-description">Join the Slack to see what’s happening!</p>
      <a className="button primary" href={SLACK} target="_blank" rel="noreferrer">Join #actuate <ExternalLink size={17}/></a>
      <a className="new-to-slack" href="https://hackclub.com/slack/" target="_blank" rel="noreferrer">New to Hack Club? Start here <ArrowUpRight size={14}/></a>
    </dialog>
  </>;
}
