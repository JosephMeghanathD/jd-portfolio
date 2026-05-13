import type { ReactNode } from 'react';

/* ── Design tokens ─────────────────────────────────────── */
const C = {
    svc:  { fill: 'rgba(34,211,238,0.15)',  stroke: 'rgba(34,211,238,0.65)' },
    ext:  { fill: 'rgba(139,92,246,0.15)',  stroke: 'rgba(139,92,246,0.68)' },
    db:   { fill: 'rgba(34,211,238,0.26)',  stroke: 'rgba(34,211,238,0.85)' },
    cli:  { fill: 'rgba(255,255,255,0.09)', stroke: 'rgba(255,255,255,0.32)' },
    arr:  'rgba(34,211,238,0.88)',
    arrE: 'rgba(139,92,246,0.82)',
    t1:   'rgba(250,250,250,0.96)',
    t2:   'rgba(161,161,170,0.85)',
    t3:   'rgba(34,211,238,0.90)',
};
const F = "'JetBrains Mono','Courier New',monospace";

/* ── Primitives ─────────────────────────────────────────── */
type BT = 'svc' | 'ext' | 'db' | 'cli';

function Box({ x, y, w, h = 48, type = 'svc', label, sub }: {
    x: number; y: number; w: number; h?: number;
    type?: BT; label: string; sub?: string;
}) {
    const s = C[type];
    const cx = x + w / 2;
    return (
        <g>
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
        </g>
    );
}

function Curve({ x1, y1, x2, y2, label, ext }: {
    x1: number; y1: number; x2: number; y2: number;
    label?: string; ext?: boolean;
}) {
    const my = (y1 + y2) / 2;
    const d = `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;
    return (
        <g>
            <path d={d} fill="none"
                stroke={ext ? C.arrE : C.arr} strokeWidth={1.6}
                markerEnd={`url(#${ext ? 'ae' : 'am'})`} />
            {label && (
                <text x={(x1 + x2) / 2} y={my - 4}
                    textAnchor="middle" fontSize={8} fill={C.t2} fontFamily={F}>
                    {label}
                </text>
            )}
        </g>
    );
}

function Seg({ x1, y1, x2, y2, label, ext, dashed }: {
    x1: number; y1: number; x2: number; y2: number;
    label?: string; ext?: boolean; dashed?: boolean;
}) {
    return (
        <g>
            <line x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={ext ? C.arrE : C.arr} strokeWidth={1.6}
                strokeDasharray={dashed ? '5 3' : undefined}
                markerEnd={`url(#${ext ? 'ae' : 'am'})`} />
            {label && (
                <text x={(x1 + x2) / 2} y={Math.min(y1, y2) - 4}
                    textAnchor="middle" fontSize={8} fill={C.t2} fontFamily={F}>
                    {label}
                </text>
            )}
        </g>
    );
}

/* Legend strip at the bottom of each canvas */
function LegendStrip({ y, items, note }: {
    y: number;
    items: { type: BT; label: string }[];
    note?: string;
}) {
    const itemW = 58;
    return (
        <g>
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
                <text x={280} y={y + 8} textAnchor="middle" fontSize={7.5} fill={C.t2} fontFamily={F}>
                    {note}
                </text>
            )}
        </g>
    );
}

function Canvas({ w, h, children }: { w: number; h: number; children: ReactNode }) {
    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet">
            <defs>
                <pattern id="dp" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="1" fill="rgba(255,255,255,0.07)" />
                </pattern>
                <marker id="am" viewBox="0 0 10 10" refX={8} refY={5}
                    markerWidth={5} markerHeight={5} orient="auto">
                    <path d="M0 0 L10 5 L0 10z" fill={C.arr} />
                </marker>
                <marker id="ae" viewBox="0 0 10 10" refX={8} refY={5}
                    markerWidth={5} markerHeight={5} orient="auto">
                    <path d="M0 0 L10 5 L0 10z" fill={C.arrE} />
                </marker>
            </defs>
            <rect width={w} height={h} fill="rgba(255,255,255,0.03)" rx={10} />
            <rect width={w} height={h} fill="url(#dp)" rx={10} />
            {children}
        </svg>
    );
}

/* ══════════════════════════════════════════════════════════
   TASKPILOT  —  viewBox 560 × 260
   L1(y=10) Frontend · L2(y=102) Services · L3(y=192) DB
   Legend y=244
   ══════════════════════════════════════════════════════════ */
export function TaskPilotDiagram() {
    return (
        <Canvas w={560} h={260}>
            <Box x={138} y={10} w={284} h={48} type="cli" label="React Frontend" sub="TypeScript · Vite · Zustand · Netlify" />

            <Curve x1={202} y1={58}  x2={91}  y2={102} label="JWT Auth" />
            <Curve x1={360} y1={58}  x2={289} y2={102} label="REST" />

            <Box x={12}  y={102} w={158} h={48} type="svc" label="User Service"     sub="Spring Boot 3 · :8081" />
            <Box x={200} y={102} w={178} h={48} type="svc" label="TodoList Service" sub="Spring Boot 3 · :8082" />
            <Box x={414} y={102} w={132} h={48} type="ext" label="Gemini AI"        sub="Google Cloud" />

            <Seg x1={378} y1={126} x2={414} y2={126} label="AI call" ext />

            <Curve x1={91}  y1={150} x2={208} y2={192} />
            <Curve x1={289} y1={150} x2={289} y2={192} />

            <Box x={148} y={192} w={220} h={42} type="db" label="NeonDB · PostgreSQL · Serverless" />

            <LegendStrip y={244}
                items={[{ type: 'cli', label: 'Client' }, { type: 'svc', label: 'Service' }, { type: 'db', label: 'Storage' }, { type: 'ext', label: 'External' }]}
                note="Google Cloud Run · auto-scaling · independent deploys" />
        </Canvas>
    );
}

/* ══════════════════════════════════════════════════════════
   MARKETPLACE  —  viewBox 560 × 270
   L1(y=10) Frontend · L2(y=102) Services · L3(y=196) DB
   Legend y=252
   ══════════════════════════════════════════════════════════ */
export function MarketplaceDiagram() {
    return (
        <Canvas w={560} h={270}>
            <Box x={90} y={10} w={380} h={48} type="cli" label="React Frontend" sub="Bootstrap 5 · React Router v7 · Axios" />

            <Curve x1={164} y1={58}  x2={88}  y2={102} label="Auth" />
            <Curve x1={280} y1={58}  x2={275} y2={102} label="Products" />
            <Curve x1={396} y1={58}  x2={466} y2={102} label="Orders" />

            <Box x={12}  y={102} w={152} h={48} type="svc" label="User Service"    sub=":8081 · user_schema" />
            <Box x={194} y={102} w={162} h={48} type="svc" label="Product Service" sub=":8082 · product_schema" />
            <Box x={386} y={102} w={160} h={48} type="svc" label="Order Service"   sub=":8083 · order_schema" />

            <Seg x1={386} y1={114} x2={356} y2={114} label="calls" dashed />

            <Curve x1={88}  y1={150} x2={218} y2={196} />
            <Curve x1={275} y1={150} x2={274} y2={196} />
            <Curve x1={466} y1={150} x2={355} y2={196} />

            <Box x={128} y={196} w={308} h={46} type="db" label="PostgreSQL 13" sub="user_schema | product_schema | order_schema · Docker Volume" />

            <LegendStrip y={252}
                items={[{ type: 'cli', label: 'Client' }, { type: 'svc', label: 'Service' }, { type: 'db', label: 'Storage' }]}
                note="Docker Compose · bytebazar-net bridge · schema isolation per service" />
        </Canvas>
    );
}

/* ══════════════════════════════════════════════════════════
   RIDESHARE  —  viewBox 560 × 258
   L1(y=10) Frontend · L2(y=102) Services · L3(y=182) Storage
   Legend y=240
   ══════════════════════════════════════════════════════════ */
export function RideShareDiagram() {
    return (
        <Canvas w={560} h={258}>
            <Box x={90} y={10} w={330} h={48} type="cli" label="React Frontend" sub="Material-UI · Framer Motion · React Router" />

            <Curve x1={150} y1={58}  x2={86}  y2={102} label="Auth / JWT" />
            <Curve x1={255} y1={58}  x2={256} y2={102} label="Rides" />
            <Curve x1={360} y1={58}  x2={426} y2={102} label="Chat" />

            <Box x={12}  y={102} w={148} h={48} type="svc" label="Auth Service"  sub="Spring Boot · :8080 · Gradle" />
            <Box x={182} y={102} w={148} h={48} type="svc" label="Ride Service"  sub="Spring Boot · :8081 · Gradle" />
            <Box x={352} y={102} w={148} h={48} type="svc" label="Chat Service"  sub="Spring Boot · :8082 · Gradle" />

            <Curve x1={52}  y1={150} x2={72}  y2={182} label="SMTP" ext />
            <Curve x1={120} y1={150} x2={212} y2={182} />
            <Curve x1={256} y1={150} x2={278} y2={182} />
            <Curve x1={426} y1={150} x2={352} y2={182} />

            <Box x={12}  y={182} w={130} h={42} type="ext" label="Gmail SMTP"          sub="spring-mail" />
            <Box x={158} y={182} w={252} h={42} type="db"  label="NeonDB · PostgreSQL"  sub="Serverless · Azure eastus2 · GCP Secrets" />

            <LegendStrip y={238}
                items={[{ type: 'cli', label: 'Client' }, { type: 'svc', label: 'Service' }, { type: 'db', label: 'Storage' }, { type: 'ext', label: 'External' }]}
                note="Docker Compose · shared library · GCP Cloud Run" />
        </Canvas>
    );
}

/* ══════════════════════════════════════════════════════════
   NANORETRY  —  viewBox 560 × 228
   Row1(y=10) Entry · Row2(y=108) Execution · Row3(y=168) Exception
   Legend y=212
   ══════════════════════════════════════════════════════════ */
export function NanoRetryDiagram() {
    return (
        <Canvas w={560} h={228}>
            <Box x={10}  y={10} w={120} h={48} type="cli" label="Caller Code"       sub="CheckedSupplier<T>" />
            <Box x={172} y={10} w={165} h={48} type="db"  label="NanoRetry.retry()" sub="fluent config · timeouts" />
            <Box x={382} y={10} w={163} h={48} type="svc" label="VirtualThread"      sub="Project Loom · JDK 21+" />

            <Seg x1={130} y1={34} x2={172} y2={34} />
            <Seg x1={337} y1={34} x2={382} y2={34} />

            <Curve x1={463} y1={58}  x2={280} y2={108} label="executes attempt" />
            <Curve x1={254} y1={58}  x2={90}  y2={108} label="configures" />

            <Box x={10}  y={108} w={160} h={48} type="svc" label="Backoff Strategy"  sub="Fixed · Linear · Exponential" />
            <Box x={205} y={108} w={150} h={48} type="svc" label="Attempt Execution" sub="per-attempt timeout" />
            <Box x={393} y={108} w={152} h={48} type="svc" label="Return T"          sub="result propagated" />

            <Seg x1={355} y1={132} x2={393} y2={132} label="success" />
            <Curve x1={355} y1={144} x2={476} y2={168} label="exhausted" />

            <Box x={374} y={168} w={174} h={34} type="ext" label="RetryException / TimeoutException" />

            <LegendStrip y={212}
                items={[{ type: 'db', label: 'Core' }, { type: 'svc', label: 'Component' }, { type: 'ext', label: 'Exception' }]}
                note="Zero external dependencies · Maven Central · JDK 21 · Project Loom" />
        </Canvas>
    );
}

/* ══════════════════════════════════════════════════════════
   RECORDRULES  —  viewBox 560 × 218
   Row1(y=10) Input · Row2(y=92) Core · Row3(y=156) Outcomes
   Legend y=202
   ══════════════════════════════════════════════════════════ */
export function RecordRulesDiagram() {
    return (
        <Canvas w={560} h={218}>
            <Box x={155} y={10} w={250} h={48} type="cli" label="Java Record" sub="compact constructor · Java 17+" />

            <Seg x1={280} y1={58} x2={280} y2={92} />

            <Box x={155} y={92}  w={250} h={48} type="db"  label="RecordRules.of(record)" sub="required · notBlank · email · min · max · regex" />

            <Curve x1={224} y1={140} x2={86}  y2={156} label="pass" />
            <Curve x1={336} y1={140} x2={474} y2={156} label="fail" ext />

            <Box x={12}  y={156} w={148} h={34} type="svc" label="Valid Record · continues" />
            <Box x={400} y={156} w={148} h={34} type="ext" label="RecordValidationException" />

            <text x={474} y={200} textAnchor="middle" fontSize={8.5} fill={C.t3} fontFamily={F}>
                Map&lt;field, List&lt;String&gt;&gt;
            </text>

            <LegendStrip y={202}
                items={[{ type: 'db', label: 'Core' }, { type: 'svc', label: 'Success' }, { type: 'ext', label: 'Error' }]}
                note="Eager error collection · all violations at once · Maven Central · JDK 17+" />
        </Canvas>
    );
}

/* ── Public registry ──────────────────────────────────── */
export type DiagramKey =
    | 'TaskPilot: AI Microservices To-Do App'
    | 'Specialty Marketplace'
    | 'AAD RideShare Application'
    | 'NanoRetry'
    | 'RecordRules v1.0.4';

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
