import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import { ArrowDown, ArrowDownLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Code2, Cpu, ExternalLink, Menu, Pause, Play, Radio, RotateCw, Sparkles, Terminal, Wifi, X, Zap } from 'lucide-react';

const SLACK = 'https://hackclub.slack.com/archives/C0C421M2MU0';
const candidate = import.meta.env.VITE_RSVP_URL?.trim();
const RSVP = candidate && /^https:\/\//i.test(candidate) ? candidate : '';
const projects = [
  { title: 'A tiny internet of things.', category: 'CONNECTED', type: 'network', description: 'A room full of sensors. A dashboard you wrote. Your own little network.', tags: ['IoT networks', 'Web servers'] },
  { title: 'Give your desk a brain.', category: 'EVERYDAY MAGIC', type: 'device', description: 'A weather station, a smart display, or the device you wish existed.', tags: ['Smart devices', 'Sensors'] },
  { title: 'Make the pixels move.', category: 'ROBOTICS', type: 'robot', description: 'A robot arm. A curious rover. A four-legged friend with a mind of its own.', tags: ['Robot arms', 'Rovers', 'Quadrupeds'] },
  { title: 'See things differently.', category: 'VISION', type: 'camera', description: 'Give your project eyes with an ESP32 camera and a little creative code.', tags: ['Cameras', 'Computer vision'] },
];
const faqs = [
  ['Do I need prior hardware experience?', 'Nope. Actuate is being designed for beginners, including people who have never used a microcontroller. Planned guides will cover setup, your first LED, sensors, networking, and motors.'],
  ['Can I make a software-heavy ESP32 project?', 'Yes—that fits the current broader ESP32 proposal. Think custom firmware, a web server running on the board, or an IoT network. Your original code should meaningfully use the ESP32. Final submission rules will be confirmed before launch.'],
  ['Do I need to use an ESP32?', 'Yes, the ESP32 family is the focus of Actuate. Pick a board suited to your idea. Capabilities vary between models, so check Wi-Fi, Bluetooth, camera support, and available pins before choosing one.'],
  ['How expensive can my build be?', 'The current planning range is roughly $30–50 USD for a hardware project’s bill of materials (BOM). This is a target, not an approved grant amount. Funding, eligible parts, and shipping details are still being worked out.'],
  ['Is Actuate launched yet?', 'Not yet! Actuate is a proposed Hack Club YSWS. Dates, funding, eligibility, and final requirements are not confirmed. Join #actuate to follow the proposal and help shape it.'],
  ['What is a YSWS, anyway?', 'It stands for “You Ship, We Ship.” You make an original project; the program helps you get something to keep building with. For Actuate, the proposed support is ESP32 boards, parts or hardware grants, and beginner tutorials.'],
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
    <text x="23" y="108" fill="#85917c" fontSize="9" letterSpacing="1.5" fontFamily="monospace">INPUT / YOUR IDEA</text>
    <text x="416" y="177" fill="#85917c" fontSize="9" letterSpacing="1.5" fontFamily="monospace">WIRELESS / ON</text>
    <text x="427" y="416" fill="#85917c" fontSize="9" letterSpacing="1.5" fontFamily="monospace">OUTPUT / REAL LIFE</text>
  </svg>;
}

function ProjectArt({ type }: { type: string }) {
  return <svg viewBox="0 0 320 180" fill="none" aria-hidden="true" className={`project-art art-${type}`}>
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
  function rsvp() { if(RSVP) window.location.assign(RSVP); else setModal(true); }
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
      <a className="brand" href="#" aria-label="Actuate home"><Mark/><span>actuate<span className="brand-dot">.</span></span></a>
      <nav className={menu?'nav open':'nav'} aria-label="Main navigation">
        <a href="#about" onClick={()=>setMenu(false)}>The idea</a><a href="#build" onClick={()=>setMenu(false)}>What to build</a><a href="#how" onClick={()=>setMenu(false)}>How it works</a><a href="#faq" onClick={()=>setMenu(false)}>FAQ</a>
      </nav>
      <div className="header-actions"><button className="button nav-rsvp" onClick={rsvp}>RSVP <ArrowUpRight size={16}/></button><button className="menu-button icon-button" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div>
    </header>
    <main id="main">
      <section className="hero section-shell">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="status-dot"/> A HACK CLUB YSWS IN THE MAKING</div>
          <h1>Little board.<br/><span>Big ideas.</span><svg className="headline-spark" viewBox="0 0 60 60" aria-hidden="true"><path d="m30 1 3 21L49 8 39 27l21 3-21 5 10 18-17-14-2 21-5-21L8 51l13-18L0 30l21-5L8 8l18 13Z" fill="currentColor"/></svg></h1>
          <h2 className="hero-subtitle">Build something with an ESP32.</h2>
          <p className="hero-description">Make a thing that senses, connects, or moves.<br className="desktop-break"/> We’re putting the tools to build it in your hands.</p>
          <div className="hero-buttons"><button className="button primary" onClick={rsvp}>I’m in. RSVP <ArrowUpRight size={19}/></button><a className="button secondary" href={SLACK} target="_blank" rel="noreferrer"><span className="hash">#</span> Join #actuate <ArrowUpRight size={16}/></a></div>
          <div className="hero-note"><span className="small-dot"/> Beginner-friendly <span className="note-divider"/> Wild ideas welcome</div>
        </div>
        <div className="hero-lab" onPointerMove={tilt} onPointerLeave={resetTilt}>
          <div className="lab-corner top-left"/><div className="lab-corner bottom-right"/>
          <div className="lab-topline"><span>THE POSSIBILITIES BOARD</span><span><span className="status-dot"/> LIVE DEMO</span></div>
          <div className="orbital orbital-one"/><div className="orbital orbital-two"/>
          <div className="board-perspective" ref={board}><Board mode={mode}/></div>
          <div className="lab-bottom"><span className="lab-caption">GO ON, TRY SOMETHING.</span><div className="demo-controls" aria-label="Board demo mode">{[<Zap size={14}/>,<Wifi size={14}/>,<RotateCw size={14}/>].map((icon,i)=><button key={i} className={mode===i?'selected':''} aria-pressed={mode===i} onClick={()=>setMode(i)}>{icon}{['Blink','Connect','Move'][i]}</button>)}</div></div>
          <div className="terminal-status" aria-live="polite"><span>›</span> {['digitalWrite(LED, your_first_idea);','WiFi.begin("a_little_possibility");','servo.write(something_awesome);'][mode]}<span className="cursor">▌</span></div>
        </div>
        <a href="#about" className="scroll-cue"><ArrowDown size={16}/> SCROLL TO GET INSPIRED</a>
        <span className="hero-index">ESP32 / ENDLESS POSSIBILITIES</span>
      </section>
      <div className="possibility-strip" aria-label="Code it. Connect it. Make it move."><div>{[0,1,2,3].map(i=><span key={i} aria-hidden={i>0}>CODE IT <span>✳</span> CONNECT IT <span>✳</span> MAKE IT MOVE <span>✳</span> MAKE IT YOURS <span>✳</span></span>)}</div></div>
      <section id="about" className="about section-shell section-space">
        <div className="section-label reveal"><span>01 / THE IDEA</span><ArrowDownLeft size={22}/></div>
        <div className="about-content reveal"><h2>Your code deserves<br/>to leave the <span className="muted-word">screen.</span></h2><div className="about-bottom"><p>Actuate is a proposed, beginner-friendly <strong>You Ship, We Ship</strong> program built around the ESP32: a tiny microcontroller with a whole lot of potential. Learn embedded programming, play with sensors, explore wireless connections, and bring your own idea to life.</p><div className="tiny-board"><Cpu size={35}/><span>ONE LITTLE CHIP.<br/>A WHOLE NEW WORLD.</span></div></div></div>
      </section>
      <section id="build" className="build section-shell section-space">
        <div className="section-heading reveal"><div><div className="eyebrow">02 / PICK YOUR POSSIBILITY</div><h2>What will you <span className="serif-word">bring to life?</span></h2></div><p>Useful. Playful. A little weird.<br/>There’s room for all of it.</p></div>
        <div className="projects">{projects.map((project,i)=><article className="project-card reveal" key={project.type} style={{'--delay':`${i*70}ms`} as CSSProperties}><div className="project-card-top"><span>0{i+1}</span><span>{project.category}</span><ArrowUpRight size={17}/></div><ProjectArt type={project.type}/><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div></article>)}</div>
        <div className="build-footnote reveal"><Sparkles size={17}/><p>Have something else in mind? <strong>If an ESP32 is at its heart, let’s talk.</strong></p><a href={SLACK} target="_blank" rel="noreferrer">Share your idea <ArrowUpRight size={16}/></a></div>
      </section>
      <section id="how" className="how section-shell section-space">
        <div className="section-heading reveal"><div><div className="eyebrow">03 / THE EXCHANGE</div><h2>A little effort.<br/>A lot of <span className="serif-word">possibility.</span></h2></div><span className="draft-chip">PROPOSED PROGRAM</span></div>
        <div className="exchange reveal"><article className="you-ship"><div className="exchange-label"><Code2 size={22}/><span>YOUR SIDE OF THE DEAL</span></div><h3>You ship<span>↗</span></h3><p>An original ESP32 project.<br/>Something you made. Something that works.</p><ul><li><Check/> Dream up an idea that’s yours</li><li><Check/> Build it, code it, figure it out</li><li><Check/> Share your code and show it in action</li></ul></article><div className="exchange-connector"><ArrowRight/></div><article className="we-ship"><div className="exchange-label"><Cpu size={22}/><span>WHAT WE’RE PLANNING</span></div><h3>We ship<span>↙</span></h3><p>The spark to get you started.<br/>And the support to keep you going.</p><ul><li><Check/> ESP32 boards</li><li><Check/> Parts or hardware grants</li><li><Check/> Tutorials and a community to build with</li></ul><div className="budget"><strong>$30–50</strong><span>target hardware BOM<br/><small>Funding and details subject to approval.</small></span></div></article></div>
      </section>
      <section id="start" className="beginner section-shell section-space">
        <div className="beginner-copy reveal"><div className="eyebrow">04 / START FROM ZERO</div><h2>Never used an<br/>MCU before?<br/><span className="serif-word">That’s fine.</span></h2><p>An MCU is just a tiny computer you can teach to do things. Your first project doesn’t have to be a robot dog. Start with a blinking light. Get curious. Keep going.</p><a className="text-link" href={SLACK} target="_blank" rel="noreferrer">Find your people in #actuate <ArrowUpRight size={18}/></a></div>
        <div className="learning-panel reveal"><div className="learning-top"><Terminal size={17}/><span>YOUR FIRST “IT WORKS!”</span><span className="draft-chip">PLANNED GUIDES</span></div>{[['01','Meet your ESP32','Setup, tools & your first upload'],['02','Hello, real world','GPIO, LEDs & reading sensors'],['03','Let’s get connected','Wi-Fi, Bluetooth & web servers'],['04','Make your move','Motors, servos & a starter robot arm']].map(([n,title,desc],i)=><div className="lesson" key={n}><span className="lesson-number">{n}</span><div><h3>{title}</h3><p>{desc}</p></div>{i===0?<Zap size={19}/>:<ArrowDown size={17}/>}</div>)}<div className="learning-note"><span className="status-dot"/> Tutorials are in the works. Curiosity is the only prerequisite.</div></div>
      </section>
      <section id="faq" className="faq section-shell section-space"><div className="faq-heading reveal"><div className="eyebrow">05 / GOOD QUESTIONS</div><h2>A few things<br/>you might <br/><span className="serif-word">be wondering.</span></h2><p>Still have a question?</p><a href={SLACK} target="_blank" rel="noreferrer" className="text-link">Ask in #actuate <ArrowUpRight size={17}/></a></div><div className="faq-list reveal">{faqs.map(([q,a])=><details key={q}><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}</div></section>
      <section id="rsvp" className="final-cta section-shell reveal"><div className="cta-traces" aria-hidden="true"/><div className="eyebrow"><span className="status-dot"/> YOUR NEXT “WHAT IF” STARTS HERE</div><h2>Go on.<br/>Make it <span className="serif-word">do something.</span></h2><p>A tiny board. An idea that won’t leave you alone.<br/>Let’s see what happens.</p><button className="button dark-button" onClick={rsvp}>Count me in <ArrowUpRight size={20}/></button><div className="cta-note">Actuate is a draft YSWS. Help us bring it to life.</div><Zap className="cta-bolt" aria-hidden="true"/></section>
    </main>
    <footer className="footer section-shell"><div><a className="brand" href="#" aria-label="Actuate home"><Mark/><span>actuate.</span></a><p>Made for curious minds & a world that moves.</p></div><div className="footer-links"><a href="https://hackclub.com" target="_blank" rel="noreferrer">Hack Club <ArrowUpRight size={13}/></a><a href={SLACK} target="_blank" rel="noreferrer">#actuate <ArrowUpRight size={13}/></a><button onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?<Play size={13}/>:<Pause size={13}/>} {paused?'Play motion':'Pause motion'}</button></div><div className="footer-bottom"><span>AN INDEPENDENTLY PROPOSED HACK CLUB YSWS</span><span>BUILT WITH CURIOSITY. POWERED BY ESP32.</span></div></footer>
    <dialog ref={dialog} className="rsvp-dialog" onCancel={()=>setModal(false)} onClose={()=>setModal(false)} onClick={e=>{if(e.target===e.currentTarget){ const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)setModal(false);}}} aria-labelledby="rsvp-title" aria-describedby="rsvp-description"><button autoFocus className="dialog-close icon-button" onClick={()=>setModal(false)} aria-label="Close RSVP panel"><X/></button><div className="dialog-icon"><Radio size={30}/></div><div className="eyebrow">A LITTLE EARLY. RIGHT ON TIME.</div><h2 id="rsvp-title">Let’s make<br/>Actuate happen.</h2><p id="rsvp-description">The RSVP form isn’t open yet. Join <strong>#actuate</strong> to follow the proposal, share what you’d build, and find out when sign-ups open.</p><a className="button primary" href={SLACK} target="_blank" rel="noreferrer">Join #actuate <ExternalLink size={17}/></a><p className="dialog-disclaimer">No RSVP has been recorded. Actuate is still a draft; dates and hardware funding aren’t confirmed.</p><a className="new-to-slack" href="https://hackclub.com/slack/" target="_blank" rel="noreferrer">New to Hack Club? Start here <ArrowUpRight size={14}/></a></dialog>
  </>;
}


