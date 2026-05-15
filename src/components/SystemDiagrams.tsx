import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/* ── Design tokens ─────────────────────────────────────── */
const C = {
    svc:  { fill: 'rgba(34,211,238,0.13)',  stroke: 'rgba(34,211,238,0.62)' },
    ext:  { fill: 'rgba(139,92,246,0.13)',  stroke: 'rgba(139,92,246,0.65)' },
    db:   { fill: 'rgba(34,211,238,0.24)',  stroke: 'rgba(34,211,238,0.82)' },
    cli:  { fill: 'var(--d-cli-fill)',       stroke: 'var(--d-cli-stroke)' },
    ml:   { fill: 'rgba(251,146,60,0.13)',  stroke: 'rgba(251,146,60,0.62)' },
    arr:    'rgba(34,211,238,0.88)',
    arrE:   'rgba(139,92,246,0.82)',
    arrML:  'rgba(251,146,60,0.82)',
    t1:   'var(--d-t1)',
    t2:   'var(--d-t2)',
    t3:   'rgba(34,211,238,0.90)',
};
const F = "'JetBrains Mono','Courier New',monospace";
type BT = 'svc' | 'ext' | 'db' | 'cli' | 'ml';

/* ── Box ────────────────────────────────────────────────── */
function Box({ x, y, w, h = 48, type = 'svc', label, sub, delay = 0 }: {
    x: number; y: number; w: number; h?: number;
    type?: BT; label: string; sub?: string; delay?: number;
}) {
    const s = C[type];
    const cx = x + w / 2;
    return (
        <motion.g
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {type === 'db' && (
                <rect x={x - 2} y={y - 2} width={w + 4} height={h + 4} rx={11}
                    fill="none" stroke="rgba(34,211,238,0.20)" strokeWidth={1.2}>
                    <animate attributeName="stroke-opacity" values="0.20;0.50;0.20"
                        dur="3s" repeatCount="indefinite" />
                </rect>
            )}
            <rect x={x} y={y} width={w} height={h} rx={9}
                fill={s.fill} stroke={s.stroke} strokeWidth={1.8} />
            <text x={cx} y={y + (sub ? h / 2 - 3 : h / 2 + 5)}
                textAnchor="middle" fontSize={11} fontWeight={700}
                fill={C.t1} fontFamily={F}>
                {label}
            </text>
            {sub && (
                <text x={cx} y={y + h / 2 + 12}
                    textAnchor="middle" fontSize={9}
                    fill={C.t2} fontFamily={F}>
                    {sub}
                </text>
            )}
        </motion.g>
    );
}

/* ── Curved connection + flow dot ───────────────────────── */
function Curve({ x1, y1, x2, y2, label, ext, ml, delay = 0.3, flowDur = '1.9s' }: {
    x1: number; y1: number; x2: number; y2: number;
    label?: string; ext?: boolean; ml?: boolean; delay?: number; flowDur?: string;
}) {
    const my = (y1 + y2) / 2;
    const d = `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;
    const color = ml ? C.arrML : ext ? C.arrE : C.arr;
    const marker = ml ? 'am-ml' : ext ? 'ae' : 'am';
    return (
        <g>
            <motion.path d={d} fill="none"
                stroke={color} strokeWidth={1.6}
                markerEnd={`url(#${marker})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
            />
            {label && (
                <motion.text x={(x1 + x2) / 2} y={my - 5}
                    textAnchor="middle" fontSize={8} fill={C.t2} fontFamily={F}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: delay + 0.3 }}>
                    {label}
                </motion.text>
            )}
            <circle r="2.4" fill={color} filter="url(#fdg)">
                <animateMotion dur={flowDur} repeatCount="indefinite" path={d} />
            </circle>
        </g>
    );
}

/* ── Straight segment + flow dot ───────────────────────── */
function Seg({ x1, y1, x2, y2, label, ext, ml, dashed, delay = 0.3, flowDur = '1.4s' }: {
    x1: number; y1: number; x2: number; y2: number;
    label?: string; ext?: boolean; ml?: boolean; dashed?: boolean;
    delay?: number; flowDur?: string;
}) {
    const d = `M${x1},${y1} L${x2},${y2}`;
    const color = ml ? C.arrML : ext ? C.arrE : C.arr;
    const marker = ml ? 'am-ml' : ext ? 'ae' : 'am';
    const lx = (x1 + x2) / 2;
    const ly = Math.min(y1, y2) - 5;
    return (
        <g>
            <motion.path d={d} fill="none"
                stroke={color} strokeWidth={1.6}
                strokeDasharray={dashed ? '5 3' : undefined}
                markerEnd={`url(#${marker})`}
                initial={dashed ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
                animate={dashed ? { opacity: 0.75 } : { pathLength: 1, opacity: 1 }}
                transition={{ duration: dashed ? 0.3 : 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
            />
            {label && (
                <motion.text x={lx} y={ly}
                    textAnchor="middle" fontSize={8} fill={C.t2} fontFamily={F}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: delay + 0.2 }}>
                    {label}
                </motion.text>
            )}
            {!dashed && (
                <circle r="2.4" fill={color} filter="url(#fdg)">
                    <animateMotion dur={flowDur} repeatCount="indefinite" path={d} />
                </circle>
            )}
        </g>
    );
}

/* ── Tier zone background ───────────────────────────────── */
function LayerZone({ y, h, label, w = 556 }: { y: number; h: number; label: string; w?: number }) {
    return (
        <g>
            <rect x={2} y={y - 5} width={w} height={h + 10} rx={6}
                fill="var(--d-zone-fill)"
                stroke="var(--d-zone-stroke)"
                strokeWidth={1} />
            <text x={w - 4} y={y + h / 2 + 4}
                textAnchor="end" fontSize={7}
                fill="var(--d-zone-label)"
                fontFamily={F} letterSpacing={1.5}>
                {label.toUpperCase()}
            </text>
        </g>
    );
}

/* ── Legend strip ───────────────────────────────────────── */
function LegendStrip({ y, items, note, delay = 0.55 }: {
    y: number; items: { type: BT; label: string }[]; note?: string; delay?: number;
}) {
    const itemW = 72;
    return (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay }}>
            {items.map(({ type, label }, i) => {
                const ix = 12 + i * itemW;
                return (
                    <g key={label}>
                        <rect x={ix} y={y} width={10} height={10} rx={2}
                            fill={C[type].fill} stroke={C[type].stroke} strokeWidth={1.2} />
                        <text x={ix + 14} y={y + 8} fontSize={8} fill={C.t2} fontFamily={F}>{label}</text>
                    </g>
                );
            })}
            {note && (
                <text x={548} y={y + 8} textAnchor="end" fontSize={7.5} fill={C.t2} fontFamily={F}>
                    {note}
                </text>
            )}
        </motion.g>
    );
}

/* ── Canvas wrapper ─────────────────────────────────────── */
function Canvas({ w, h, children }: { w: number; h: number; children: ReactNode }) {
    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet">
            <defs>
                <pattern id="dp" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="0.9" fill="var(--d-dot-fill)" />
                </pattern>
                <filter id="fdg" x="-160%" y="-160%" width="420%" height="420%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <marker id="am" viewBox="0 0 10 10" refX={8} refY={5}
                    markerWidth={5} markerHeight={5} orient="auto">
                    <path d="M0 0 L10 5 L0 10z" fill={C.arr} />
                </marker>
                <marker id="ae" viewBox="0 0 10 10" refX={8} refY={5}
                    markerWidth={5} markerHeight={5} orient="auto">
                    <path d="M0 0 L10 5 L0 10z" fill={C.arrE} />
                </marker>
                <marker id="am-ml" viewBox="0 0 10 10" refX={8} refY={5}
                    markerWidth={5} markerHeight={5} orient="auto">
                    <path d="M0 0 L10 5 L0 10z" fill={C.arrML} />
                </marker>
            </defs>
            <rect width={w} height={h} fill="var(--d-canvas-bg)" rx={10} />
            <rect width={w} height={h} fill="url(#dp)" rx={10} />
            {children}
        </svg>
    );
}

/* ══════════════════════════════════════════════════════════
   TASKPILOT  —  560 × 262
   ══════════════════════════════════════════════════════════ */
export function TaskPilotDiagram() {
    return (
        <Canvas w={560} h={262}>
            <LayerZone y={5}   h={53} label="Client" />
            <LayerZone y={97}  h={53} label="Services" />
            <LayerZone y={188} h={49} label="Storage" />

            <Box x={138} y={9}   w={284} h={45} type="cli" label="React Frontend"
                sub="TypeScript · Vite · Zustand · Netlify"          delay={0.05} />
            <Box x={12}  y={101} w={158} h={45} type="svc" label="User Service"
                sub="Spring Boot 3 · :8081"                           delay={0.12} />
            <Box x={200} y={101} w={178} h={45} type="svc" label="TodoList Service"
                sub="Spring Boot 3 · :8082"                           delay={0.19} />
            <Box x={414} y={101} w={132} h={45} type="ext" label="Gemini AI"
                sub="Google Cloud"                                     delay={0.26} />
            <Box x={148} y={192} w={220} h={42} type="db"
                label="NeonDB · PostgreSQL · Serverless"               delay={0.50} />

            <Curve x1={202} y1={54}  x2={91}  y2={101} label="JWT Auth" delay={0.34} />
            <Curve x1={360} y1={54}  x2={289} y2={101} label="REST"     delay={0.40} />
            <Seg   x1={378} y1={123} x2={414} y2={123} label="AI call"  ext delay={0.46} flowDur="1.2s" />
            <Curve x1={91}  y1={146} x2={210} y2={192}                   delay={0.54} />
            <Curve x1={289} y1={146} x2={290} y2={192}                   delay={0.60} />

            <LegendStrip y={246}
                items={[{ type:'cli', label:'Client' }, { type:'svc', label:'Service' }, { type:'db', label:'Storage' }, { type:'ext', label:'External' }]}
                note="GCP Cloud Run · auto-scaling · independent deploys" delay={0.68} />
        </Canvas>
    );
}

/* ══════════════════════════════════════════════════════════
   MARKETPLACE  —  560 × 272
   ══════════════════════════════════════════════════════════ */
export function MarketplaceDiagram() {
    return (
        <Canvas w={560} h={272}>
            <LayerZone y={5}   h={53} label="Client" />
            <LayerZone y={97}  h={53} label="Services" />
            <LayerZone y={193} h={52} label="Storage" />

            <Box x={90}  y={9}   w={380} h={45} type="cli" label="React Frontend"
                sub="Bootstrap 5 · React Router v7 · Axios"          delay={0.05} />
            <Box x={12}  y={101} w={152} h={45} type="svc" label="User Service"
                sub=":8081 · user_schema"                              delay={0.12} />
            <Box x={194} y={101} w={162} h={45} type="svc" label="Product Service"
                sub=":8082 · product_schema"                           delay={0.19} />
            <Box x={386} y={101} w={160} h={45} type="svc" label="Order Service"
                sub=":8083 · order_schema"                             delay={0.26} />
            <Box x={128} y={197} w={308} h={46} type="db"  label="PostgreSQL 13"
                sub="user_schema | product_schema | order_schema · Docker Volume" delay={0.52} />

            <Curve x1={164} y1={54}  x2={88}  y2={101} label="Auth"     delay={0.34} />
            <Curve x1={280} y1={54}  x2={275} y2={101} label="Products" delay={0.40} />
            <Curve x1={396} y1={54}  x2={466} y2={101} label="Orders"   delay={0.46} />
            <Seg   x1={386} y1={113} x2={356} y2={113} label="calls"    dashed delay={0.50} />
            <Curve x1={88}  y1={146} x2={220} y2={197}                   delay={0.56} />
            <Curve x1={275} y1={146} x2={274} y2={197}                   delay={0.62} />
            <Curve x1={466} y1={146} x2={356} y2={197}                   delay={0.68} />

            <LegendStrip y={254}
                items={[{ type:'cli', label:'Client' }, { type:'svc', label:'Service' }, { type:'db', label:'Storage' }]}
                note="Docker Compose · bytebazar-net · schema isolation" delay={0.76} />
        </Canvas>
    );
}

/* ══════════════════════════════════════════════════════════
   RIDESHARE  —  560 × 260
   ══════════════════════════════════════════════════════════ */
export function RideShareDiagram() {
    return (
        <Canvas w={560} h={260}>
            <LayerZone y={5}   h={53} label="Client" />
            <LayerZone y={97}  h={53} label="Services" />
            <LayerZone y={178} h={52} label="Storage / External" />

            <Box x={90}  y={9}   w={330} h={45} type="cli" label="React Frontend"
                sub="Material-UI · Framer Motion · React Router"      delay={0.05} />
            <Box x={12}  y={101} w={148} h={45} type="svc" label="Auth Service"
                sub="Spring Boot · :8080 · Gradle"                    delay={0.12} />
            <Box x={182} y={101} w={148} h={45} type="svc" label="Ride Service"
                sub="Spring Boot · :8081 · Gradle"                    delay={0.19} />
            <Box x={352} y={101} w={148} h={45} type="svc" label="Chat Service"
                sub="Spring Boot · :8082 · Gradle"                    delay={0.26} />
            <Box x={12}  y={182} w={130} h={42} type="ext" label="Gmail SMTP"
                sub="spring-mail"                                      delay={0.52} />
            <Box x={158} y={182} w={252} h={42} type="db"  label="NeonDB · PostgreSQL"
                sub="Serverless · Azure eastus2 · GCP Secrets"        delay={0.58} />

            <Curve x1={150} y1={54}  x2={86}  y2={101} label="Auth / JWT" delay={0.34} />
            <Curve x1={255} y1={54}  x2={256} y2={101} label="Rides"      delay={0.40} />
            <Curve x1={360} y1={54}  x2={426} y2={101} label="Chat"       delay={0.46} />
            <Curve x1={52}  y1={146} x2={72}  y2={182} label="SMTP"  ext  delay={0.62} />
            <Curve x1={120} y1={146} x2={214} y2={182}                     delay={0.68} />
            <Curve x1={256} y1={146} x2={280} y2={182}                     delay={0.74} />
            <Curve x1={426} y1={146} x2={355} y2={182}                     delay={0.80} />

            <LegendStrip y={240}
                items={[{ type:'cli', label:'Client' }, { type:'svc', label:'Service' }, { type:'db', label:'Storage' }, { type:'ext', label:'External' }]}
                note="Docker Compose · shared library · GCP Cloud Run" delay={0.88} />
        </Canvas>
    );
}

/* ══════════════════════════════════════════════════════════
   NANORETRY  —  560 × 232
   ══════════════════════════════════════════════════════════ */
export function NanoRetryDiagram() {
    return (
        <Canvas w={560} h={232}>
            <LayerZone y={5}   h={53} label="Entry" />
            <LayerZone y={105} h={53} label="Execution" />
            <LayerZone y={168} h={40} label="Exception" />

            <Box x={10}  y={9}   w={120} h={45} type="cli" label="Caller Code"
                sub="CheckedSupplier<T>"                               delay={0.05} />
            <Box x={172} y={9}   w={165} h={45} type="db"  label="NanoRetry.retry()"
                sub="fluent config · timeouts"                         delay={0.12} />
            <Box x={382} y={9}   w={163} h={45} type="svc" label="VirtualThread"
                sub="Project Loom · JDK 21+"                           delay={0.19} />
            <Box x={10}  y={109} w={160} h={45} type="svc" label="Backoff Strategy"
                sub="Fixed · Linear · Exponential"                     delay={0.40} />
            <Box x={205} y={109} w={150} h={45} type="svc" label="Attempt Execution"
                sub="per-attempt timeout"                               delay={0.46} />
            <Box x={393} y={109} w={152} h={45} type="svc" label="Return T"
                sub="result propagated"                                 delay={0.52} />
            <Box x={374} y={172} w={174} h={34} type="ext"
                label="RetryException / TimeoutException"               delay={0.70} />

            <Seg   x1={130} y1={31}  x2={172} y2={31}                         delay={0.27} flowDur="1.0s" />
            <Seg   x1={337} y1={31}  x2={382} y2={31}                         delay={0.32} flowDur="1.0s" />
            <Curve x1={463} y1={54}  x2={280} y2={109} label="executes"       delay={0.38} />
            <Curve x1={254} y1={54}  x2={90}  y2={109} label="configures"     delay={0.44} />
            <Seg   x1={355} y1={131} x2={393} y2={131} label="success"        delay={0.58} flowDur="1.0s" />
            <Curve x1={355} y1={145} x2={476} y2={172} label="exhausted"  ext delay={0.65} />

            <LegendStrip y={216}
                items={[{ type:'db', label:'Core' }, { type:'svc', label:'Component' }, { type:'ext', label:'Exception' }]}
                note="Zero deps · Maven Central · JDK 21 · Project Loom" delay={0.80} />
        </Canvas>
    );
}

/* ══════════════════════════════════════════════════════════
   RECORDRULES  —  560 × 220
   ══════════════════════════════════════════════════════════ */
export function RecordRulesDiagram() {
    return (
        <Canvas w={560} h={220}>
            <LayerZone y={5}   h={53} label="Input" />
            <LayerZone y={90}  h={53} label="Validation" />
            <LayerZone y={161} h={40} label="Outcome" />

            <Box x={155} y={9}   w={250} h={45} type="cli" label="Java Record"
                sub="compact constructor · Java 17+"                   delay={0.05} />
            <Box x={155} y={94}  w={250} h={45} type="db"  label="RecordRules.of(record)"
                sub="required · notBlank · email · min · max · regex"  delay={0.14} />
            <Box x={12}  y={162} w={148} h={34} type="svc" label="Valid Record · continues" delay={0.34} />
            <Box x={400} y={162} w={148} h={34} type="ext" label="RecordValidationException" delay={0.40} />

            <Seg   x1={280} y1={54}  x2={280} y2={94}                        delay={0.10} flowDur="1.0s" />
            <Curve x1={224} y1={139} x2={86}  y2={162} label="pass"          delay={0.24} />
            <Curve x1={336} y1={139} x2={474} y2={162} label="fail"    ext   delay={0.30} />
            <motion.text x={474} y={204} textAnchor="middle" fontSize={8.5}
                fill={C.t3} fontFamily={F}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.46 }}>
                Map&lt;field, List&lt;String&gt;&gt;
            </motion.text>

            <LegendStrip y={204}
                items={[{ type:'db', label:'Core' }, { type:'svc', label:'Success' }, { type:'ext', label:'Error' }]}
                note="Eager collection · Zero deps · Maven Central · JDK 17+" delay={0.55} />
        </Canvas>
    );
}

/* ══════════════════════════════════════════════════════════
   FINARA  —  560 × 285
   4-tier: React → Spring Boot → Flask ML + PostgreSQL → Gemma
   ══════════════════════════════════════════════════════════ */
export function FinaraDiagram() {
    return (
        <Canvas w={560} h={285}>
            <LayerZone y={4}   h={53}  label="Client" />
            <LayerZone y={75}  h={53}  label="API / Auth" />
            <LayerZone y={146} h={53}  label="ML · Storage" />
            <LayerZone y={217} h={44}  label="AI Model" />

            <Box x={90}  y={8}   w={380} h={45} type="cli" label="React 18 Frontend"
                sub="TypeScript · Chart.js · CSV upload · JWT"         delay={0.05} />
            <Box x={90}  y={79}  w={380} h={45} type="svc" label="Spring Boot 3 Backend"
                sub="Orchestrator · REST API · JPA · JWT · :8080"      delay={0.18} />
            <Box x={12}  y={150} w={252} h={45} type="ml"  label="Python Flask ML Service"
                sub="auto-categorise · anomaly detect · forecast · :8000" delay={0.36} />
            <Box x={292} y={150} w={256} h={45} type="db"  label="PostgreSQL 15"
                sub="transactions · users · budgets · Docker Volume"   delay={0.42} />
            <Box x={22}  y={221} w={232} h={38} type="ext" label="Gemma 3:4b (Ollama)"
                sub="local inference · financial narratives"            delay={0.56} />

            <Seg   x1={280} y1={53}  x2={280} y2={79}  label="REST / JWT"   delay={0.13} flowDur="1.1s" />
            <Seg   x1={190} y1={124} x2={148} y2={150} label="ML REST"  ml  delay={0.28} flowDur="1.3s" />
            <Seg   x1={372} y1={124} x2={418} y2={150} label="JPA / SQL"    delay={0.34} flowDur="1.3s" />
            <Seg   x1={130} y1={195} x2={130} y2={221} label="Ollama"   ext delay={0.50} flowDur="1.1s" />

            <LegendStrip y={268}
                items={[
                    { type:'cli', label:'Client' },
                    { type:'svc', label:'Service' },
                    { type:'ml',  label:'ML Layer' },
                    { type:'db',  label:'Storage' },
                    { type:'ext', label:'AI Model' },
                ]}
                note="Docker Compose · local LLM · no data egress" delay={0.65} />
        </Canvas>
    );
}

/* ══════════════════════════════════════════════════════════
   AIRCONTROL  —  560 × 268
   Camera → OpenCV/MediaPipe → HandProcessor → OS
   ══════════════════════════════════════════════════════════ */
export function AirControlDiagram() {
    return (
        <Canvas w={560} h={268}>
            <LayerZone y={4}   h={50}  label="Capture" />
            <LayerZone y={74}  h={50}  label="Vision" />
            <LayerZone y={144} h={50}  label="Gesture" />
            <LayerZone y={212} h={42}  label="Output" />

            <Box x={130} y={8}   w={300} h={42} type="cli" label="Webcam Input"
                sub="cv2.VideoCapture · 640×480 · flip + BGR→RGB"        delay={0.05} />
            <Box x={130} y={78}  w={300} h={42} type="ml"  label="MediaPipe Hands"
                sub="21 landmarks · detection: 0.6 · max_hands: 1"       delay={0.18} />
            <Box x={90}  y={148} w={380} h={42} type="svc" label="HandProcessor"
                sub="count_raised_fingers · click_distance · scroll_pos"  delay={0.32} />
            <Box x={10}  y={216} w={210} h={38} type="svc" label="MouseController"
                sub="smoothing=5 · debounce=200ms · move + click + scroll" delay={0.48} />
            <Box x={300} y={216} w={248} h={38} type="ext" label="PyAutoGUI → OS"
                sub="moveTo · click · scroll · 2560×1600"                  delay={0.56} />

            <Seg   x1={280} y1={50}  x2={280} y2={78}  label="raw frames"      delay={0.13} flowDur="1.0s" />
            <Seg   x1={280} y1={120} x2={280} y2={148} label="hand_landmarks"  ml delay={0.26} flowDur="1.1s" />
            <Curve x1={200} y1={190} x2={115} y2={216} label="1 finger"        delay={0.40} flowDur="1.2s" />
            <Curve x1={360} y1={190} x2={424} y2={216} label="2 fingers"       delay={0.46} flowDur="1.2s" />
            <Seg   x1={220} y1={235} x2={300} y2={235} label="move/click"      delay={0.52} flowDur="1.0s" />

            <LegendStrip y={252}
                items={[
                    { type:'cli', label:'Capture' },
                    { type:'ml',  label:'Vision' },
                    { type:'svc', label:'Logic' },
                    { type:'ext', label:'OS Output' },
                ]}
                note="Python · OpenCV · MediaPipe · PyAutoGUI" delay={0.65} />
        </Canvas>
    );
}

/* ══════════════════════════════════════════════════════════
   CULINAPLAN  —  560 × 248
   React 19 → Spring Boot 3 → Gemini 2.0 + PostgreSQL
   ══════════════════════════════════════════════════════════ */
export function CulinaPlanDiagram() {
    return (
        <Canvas w={560} h={248}>
            <LayerZone y={4}   h={50}  label="Client" />
            <LayerZone y={74}  h={50}  label="API / Auth" />
            <LayerZone y={144} h={76}  label="AI · Storage" />

            <Box x={90}  y={8}   w={380} h={42} type="cli" label="React 19 Frontend"
                sub="TypeScript · Vite · Recharts · Axios · JWT"          delay={0.05} />
            <Box x={90}  y={78}  w={380} h={42} type="svc" label="Spring Boot 3 Backend"
                sub="REST API · Spring Security · JPA · JWT · :8080"       delay={0.18} />
            <Box x={10}  y={150} w={240} h={52} type="ext" label="Gemini 2.0 Flash"
                sub="recipe gen · nutrition analysis · meal suggestions"    delay={0.36} />
            <Box x={296} y={150} w={252} h={52} type="db"  label="PostgreSQL 15"
                sub="recipes · meal_plans · daily_logs · users · Docker"   delay={0.44} />

            <Seg   x1={280} y1={50}  x2={280} y2={78}  label="REST / JWT"    delay={0.13} flowDur="1.1s" />
            <Curve x1={190} y1={120} x2={130} y2={150} label="Gemini API" ext delay={0.28} flowDur="1.4s" />
            <Curve x1={370} y1={120} x2={420} y2={150} label="JPA / SQL"      delay={0.34} flowDur="1.3s" />

            <LegendStrip y={232}
                items={[
                    { type:'cli', label:'Client' },
                    { type:'svc', label:'Service' },
                    { type:'ext', label:'AI' },
                    { type:'db',  label:'Storage' },
                ]}
                note="Docker Compose · Spring Security · JWT auth" delay={0.55} />
        </Canvas>
    );
}

/* ── Public registry ──────────────────────────────────── */
export type DiagramKey =
    | 'TaskPilot: AI Microservices To-Do App'
    | 'Specialty Marketplace'
    | 'AAD RideShare Application'
    | 'NanoRetry'
    | 'RecordRules v1.0.4'
    | 'Finara — AI Financial Storyteller'
    | 'AirControl — Gesture-Driven Desktop'
    | 'CulinaPlan — AI Meal Planner';

export const DIAGRAMS: Record<DiagramKey, { component: React.FC; insight: string }> = {
    'TaskPilot: AI Microservices To-Do App': {
        component: TaskPilotDiagram,
        insight: 'Two independently deployable Cloud Run services isolate auth from task logic — an AI outage in TodoList never cascades to authentication. JWT is issued once and validated stateless on each service, keeping both horizontally scalable.',
    },
    'Specialty Marketplace': {
        component: MarketplaceDiagram,
        insight: 'Schema-separated single PostgreSQL gives per-service data isolation without the cost of three databases — right-sized for a startup-scale platform. RestTemplate over the Docker bridge network keeps inter-service calls sub-millisecond.',
    },
    'AAD RideShare Application': {
        component: RideShareDiagram,
        insight: 'Three single-responsibility services share a Maven-local common library for JWT and exception utilities, eliminating duplication without coupling at runtime. Auth owns Gmail SMTP exclusively — email logic never leaks into Ride or Chat.',
    },
    'NanoRetry': {
        component: NanoRetryDiagram,
        insight: 'Virtual Threads (Project Loom) mean each retry attempt gets its own lightweight OS-thread-free execution context — no thread-pool exhaustion under high concurrency. Dual timeouts (per-attempt + global budget) prevent a single slow I/O call from consuming the full retry window.',
    },
    'RecordRules v1.0.4': {
        component: RecordRulesDiagram,
        insight: 'Eager error collection gathers all rule violations before throwing — one call reveals every field problem simultaneously, matching how users expect form validation to behave. Zero dependencies means the library adds 0 transitive bytes to any project that imports it.',
    },
    'Finara — AI Financial Storyteller': {
        component: FinaraDiagram,
        insight: 'The Spring Boot Backend is the sole orchestrator — React never contacts the ML service directly, keeping the AI boundary clean and auditable. Gemma runs locally via Ollama so transaction data never leaves the machine, solving the core privacy concern of AI-powered personal finance tools.',
    },
    'AirControl — Gesture-Driven Desktop': {
        component: AirControlDiagram,
        insight: 'The pipeline is single-threaded and synchronous by design — MediaPipe processes one frame at a time at ~34 FPS, so gesture state never races. A smoothing factor of 5 averages the last five index-tip positions before mapping to screen coordinates, eliminating the jitter that makes raw landmark-to-cursor mapping unusable.',
    },
    'CulinaPlan — AI Meal Planner': {
        component: CulinaPlanDiagram,
        insight: 'Gemini is invoked exclusively from the Spring Boot layer — the frontend never holds an API key and cannot make direct AI calls. This centralises rate-limit handling, prompt versioning, and safety filtering in one place, keeping the React client a pure UI consumer.',
    },
};

export function hasDiagram(title: string): title is DiagramKey {
    return title in DIAGRAMS;
}

export function SystemDiagram({ title }: { title: string }) {
    if (!hasDiagram(title)) return null;
    const { component: Diagram, insight } = DIAGRAMS[title];
    return (
        <div>
            <Diagram />
            <p className="mt-4 text-xs text-text-secondary leading-relaxed font-mono border-l-2 border-accent/30 pl-3">
                {insight}
            </p>
        </div>
    );
}
