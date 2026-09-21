import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Cpu } from 'lucide-react';
import type { CSSProperties, KeyboardEvent } from 'react';
import './board-picker.css';

const boards = [
  {
    id: 'p4', name: 'ESP32-P4', short: 'P4', nickname: 'Big ideas. Extra horsepower.',
    label: 'THE HEAVY LIFTER', color: '#d2fa69', cost: 4,
    description: 'The most powerful processor in this lineup. Dual-core RISC-V compute, an image signal processor, and hardware H.264 encoding give ambitious video, vision, and display projects room to grow.',
    stats: [['CPU', 'Up to 400 MHz · dual-core'], ['SUPERPOWER', 'Camera, display & video hardware'], ['BUILD THIS', 'A touch-screen vision controller']],
    note: 'The P4 chip has no built-in Wi-Fi or Bluetooth. Some boards add a companion chip. Check your board revision: some P4 boards run at 360 MHz.',
    example: 'Waveshare P4-NANO basic kit',
    priceUrl: 'https://www.waveshare.com/esp32-p4-nano.htm',
    specsUrl: 'https://www.espressif.com/en/products/socs/esp32-p4',
  },
  {
    id: 'c6', name: 'ESP32-C6', short: 'C6', nickname: 'Your home, a little smarter.',
    label: 'THE CONNECTED ONE', color: '#8ad7c4', cost: 2,
    description: 'A great fit for connected sensors and smart-home experiments. It brings 2.4 GHz Wi-Fi 6, Bluetooth LE, and an 802.15.4 radio for Thread and Zigbee to one small chip.',
    stats: [['CPU', '160 MHz · RISC-V main core'], ['SUPERPOWER', 'Wi-Fi 6 + Thread / Zigbee'], ['BUILD THIS', 'A connected room sensor']],
    note: 'Wi-Fi 6 here means 2.4 GHz, not 5 GHz. Thread, Zigbee, and Matter projects need the appropriate firmware and network setup.',
    example: 'Waveshare C6-Zero with headers',
    priceUrl: 'https://www.waveshare.com/esp32-c6-zero.htm?sku=26976',
    specsUrl: 'https://www.espressif.com/en/products/socs/esp32-c6',
  },
  {
    id: 'c3', name: 'ESP32-C3 SuperMini', short: 'C3', nickname: 'Small board. Smaller budget.',
    label: 'THE POCKET-SIZED ONE', color: '#e8bf87', cost: 1,
    description: 'Tiny enough to tuck into a little gadget, capable enough for a sensor, a button, or a Wi-Fi-connected desk companion. USB-C and a compact footprint make it a handy place to start.',
    stats: [['CPU', '160 MHz · single-core RISC-V'], ['SUPERPOWER', 'Tiny footprint + Wi-Fi / BLE'], ['BUILD THIS', 'A pocket-sized sensor node']],
    note: 'SuperMini is a board design, not a separate chip family. Pinouts, antennas, and build quality can differ between sellers; check the exact board.',
    example: 'ProtoSupplies C3 SuperMini',
    priceUrl: 'https://protosupplies.com/product/esp32c3-supermini/',
    specsUrl: 'https://www.espressif.com/en/products/socs/esp32-c3',
  },
  {
    id: 's3', name: 'ESP32-S3', short: 'S3', nickname: 'Small things. Serious potential.',
    label: 'THE VERSATILE ONE', color: '#c0b2f0', cost: 2,
    description: 'A capable choice for sensor-rich gadgets, little robots, and compact devices that do more. Two fast cores, native USB, and vector instructions give you room for signal processing and small on-device ML experiments.',
    stats: [['CPU', '240 MHz · dual-core Xtensa LX7'], ['SUPERPOWER', 'Native USB + Wi-Fi / BLE'], ['BUILD THIS', 'A smart sensor or mini robot']],
    note: 'Pick a board with enough exposed GPIO for your sensors. Flash, PSRAM, and camera connectors depend on the board; Bluetooth is LE only.',
    example: 'Seeed Studio XIAO ESP32S3',
    priceUrl: 'https://www.seeedstudio.com/XIAO-ESP32S3-p-5627.html',
    specsUrl: 'https://www.espressif.com/en/products/socs/esp32-s3',
  },
  {
    id: 'wroom', name: 'ESP32-WROOM-32', short: '32', nickname: 'The classic for a reason.',
    label: 'THE FAMILIAR FACE', color: '#9cc2e5', cost: 2,
    description: 'The original ESP32 experience: two cores, Wi-Fi, and both Classic Bluetooth and BLE. A familiar starting point for breadboard experiments, motor control, and projects with plenty of community examples.',
    stats: [['CPU', 'Up to 240 MHz · dual-core LX6'], ['SUPERPOWER', 'Wi-Fi + Classic Bluetooth / BLE'], ['BUILD THIS', 'Your first sensor-powered rover']],
    note: 'WROOM names the module. For a first project, buy a USB development board using that module, rather than a bare module that needs its own circuit.',
    example: 'DFRobot FireBeetle ESP32 board',
    priceUrl: 'https://www.dfrobot.com/product-1590.html',
    specsUrl: 'https://www.dfrobot.com/product-1559.html',
  },
  {
    id: 'cam', name: 'ESP32-CAM', short: 'CAM', nickname: 'Give your next idea eyes.',
    label: 'THE LITTLE OBSERVER', color: '#f1a997', cost: 2,
    description: 'A camera-focused board built around the classic ESP32. Common OV2640 kits make a fun starting point for Wi-Fi snapshots, simple camera streams, and a rover that can show you what it sees.',
    stats: [['CPU', 'Classic ESP32 · dual-core LX6'], ['SUPERPOWER', 'Camera connector + microSD'], ['BUILD THIS', 'A Wi-Fi camera rover']],
    note: 'CAM is a board format, not a separate ESP32 processor. Many versions need a USB-to-serial adapter or a programmer base; check what the kit includes.',
    example: 'diymore ESP32-CAM + OV2640',
    priceUrl: 'https://www.diymore.cc/products/esp32-cam-wifi-wireless-module-esp32-serial-to-wifi-esp32-cam-spi-flash-bluetooth-development-board-with-ov2640-camera-module',
    specsUrl: 'https://www.dfrobot.com/product-1879.html',
  },
];

function ChipArt({ id, short }: { id: string; short: string }) {
  return <svg className={`picker-chip chip-${id}`} viewBox="0 0 320 290" fill="none" aria-hidden="true">
    <circle cx="160" cy="145" r="119" stroke="currentColor" opacity=".13" strokeDasharray="3 7"/>
    <circle cx="160" cy="145" r="98" stroke="currentColor" opacity=".16"/>
    <g transform="rotate(-10 160 145)">
      <rect x="77" y="43" width="166" height="204" rx="12" fill="#172015" stroke="currentColor" strokeOpacity=".65"/>
      {[84,229].map(x=><g key={x}>{Array.from({length:10},(_,i)=><g key={i}><rect x={x} y={66+i*16} width="8" height="8" rx="2" stroke="currentColor" opacity=".55"/><circle cx={x+4} cy={70+i*16} r="1.5" fill="currentColor" opacity=".7"/></g>)}</g>)}
      <path d="M111 67h12V54h12v13h12V54h12v13h12V54h12v13h25" stroke="currentColor" strokeWidth="2" opacity=".8"/>
      <rect x="108" y="86" width="104" height="94" rx="5" fill="#283326" stroke="currentColor" strokeOpacity=".5"/>
      <text x="160" y="108" textAnchor="middle" fill="currentColor" opacity=".65" fontFamily="monospace" fontSize="9" letterSpacing="2">ESP32</text>
      <text x="160" y="151" textAnchor="middle" fill="currentColor" fontFamily="'Space Grotesk Variable', sans-serif" fontSize={id==='cam'?32:42} fontWeight="500">{short}</text>
      <path d="M113 192h24v19m14-19v28m14-28v17h37m-21-17v10h21" stroke="currentColor" opacity=".45"/>
      <rect x="141" y="220" width="38" height="26" rx="5" fill="#75816b"/><rect x="146" y="233" width="28" height="8" rx="4" fill="#172015"/>
      <circle className="chip-led" cx="203" cy="218" r="3" fill="currentColor"/>
      {id==='cam' && <g><circle cx="160" cy="140" r="29" fill="#192217" stroke="currentColor"/><circle cx="160" cy="140" r="20" stroke="currentColor" strokeOpacity=".6"/><circle cx="160" cy="140" r="11" fill="currentColor" fillOpacity=".2"/><circle cx="156" cy="135" r="3" fill="currentColor" fillOpacity=".6"/></g>}
    </g>
  </svg>;
}

export default function BoardPicker({ onTutorial, paused }: { onTutorial: (name: string) => void; paused: boolean }) {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  function move(index: number) {
    const element = track.current;
    if (!element) return;
    const next = Math.max(0, Math.min(boards.length - 1, index));
    current.current = next;
    setActive(next);
    element.scrollTo({ left: next * element.clientWidth, behavior: paused ? 'auto' : 'smooth' });
  }
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new ResizeObserver(() => element.scrollTo({ left: current.current * element.clientWidth, behavior: 'instant' }));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  function syncScroll() {
    const element = track.current;
    if (!element || !element.clientWidth) return;
    const index = Math.max(0, Math.min(boards.length - 1, Math.round(element.scrollLeft / element.clientWidth)));
    current.current = index;
    setActive(index);
  }
  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    const destinations: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: boards.length - 1 };
    if (event.key in destinations) { event.preventDefault(); move(destinations[event.key]); }
  }
  return <section id="boards" className="board-picker section-shell section-space" aria-labelledby="boards-title">
    <div className="section-heading reveal"><div><div className="eyebrow">03 / FIND YOUR LITTLE BRAIN</div><h2 id="boards-title">Pick your <span className="serif-word">ESP32.</span></h2></div><p>Same family. Different superpowers. <br/>Find the one that fits your idea.</p></div>
    <div className="picker-tabs" aria-label="Choose an ESP32 to explore">{boards.map((board, index)=><button key={board.id} aria-pressed={active===index} aria-controls="board-slides" onClick={()=>move(index)}><span className="picker-tab-dot" style={{background:board.color}}/>{board.id==='wroom'?'WROOM-32':board.id==='c3'?'C3 SuperMini':board.short}</button>)}</div>
    <div className="picker-carousel" role="region" aria-roledescription="carousel" aria-label="ESP32 board comparison">
      <div id="board-slides" className="picker-track" ref={track} tabIndex={0} onKeyDown={keyboard} onScroll={syncScroll} aria-label="Swipe or use left and right arrow keys to explore boards">
        {boards.map((board,index)=><article key={board.id} className="picker-slide" inert={active!==index} role="group" aria-roledescription="slide" aria-label={`${index+1} of ${boards.length}: ${board.name}`} style={{'--board-accent':board.color} as CSSProperties}>
          <div className="picker-visual"><div className="picker-visual-label"><Cpu size={14}/>{board.label}</div><ChipArt id={board.id} short={board.short}/><div className="picker-price"><span>RELATIVE COST</span><strong className="cost-scale" role="img" aria-label={`Cost level ${board.cost} of 4`}>{[1,2,3,4].map(level=><span key={level} className={level<=board.cost ? "cost-on" : "cost-off"} aria-hidden="true">$</span>)}</strong><a href={board.priceUrl} target="_blank" rel="noreferrer">{board.example} <ArrowUpRight size={13}/></a></div></div>
          <div className="picker-content"><span className="picker-model">{board.name}</span><h3>{board.nickname}</h3><p className="picker-description">{board.description}</p><dl className="picker-specs">{board.stats.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p className="picker-note">{board.note}</p><div className="picker-links"><button className="text-link" onClick={()=>onTutorial(`${board.name} getting started`)}><BookOpen size={16}/> Getting started <ArrowUpRight size={16}/></button><a href={board.specsUrl} target="_blank" rel="noreferrer">Read the specs <ArrowUpRight size={14}/></a></div></div>
        </article>)}
      </div>
      <div className="picker-controls"><span className="picker-counter" aria-live="polite" aria-atomic="true">0{active+1} <span>/ 0{boards.length}</span> <strong>{boards[active].name}</strong></span><div className="picker-arrows"><span>SWIPE TO EXPLORE</span><button onClick={()=>move(active-1)} disabled={active===0} aria-label="Previous ESP32 board"><ArrowLeft size={19}/></button><button onClick={()=>move(active+1)} disabled={active===boards.length-1} aria-label="Next ESP32 board"><ArrowRight size={19}/></button></div></div>
    </div>
    <p className="picker-price-note">Cost key: $ = budget-friendly · $$$$ = higher cost. Relative guide only: seller, memory, accessories, and shipping can change the price. Example boards are not confirmed Actuate rewards.</p>
  </section>;
}
