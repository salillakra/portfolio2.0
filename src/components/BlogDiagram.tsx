type BlogDiagramVariant =
  | "api-reliability"
  | "systems-design"
  | "observability"
  | "orm-choice"
  | "architecture-choice"
  | "database-migration"
  | "contract-drift";

type BlogDiagramProps = {
  variant: BlogDiagramVariant;
  title: string;
  caption: string;
};

type BoxProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  detail?: string;
  tone?: "primary" | "muted" | "accent";
};

const toneClass = {
  primary: "blog-diagram-box-primary",
  muted: "blog-diagram-box-muted",
  accent: "blog-diagram-box-accent",
};

function Box({
  x,
  y,
  width,
  height,
  label,
  detail,
  tone = "primary",
}: BoxProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="14"
        className={`blog-diagram-box ${toneClass[tone]}`}
      />
      <text x={x + width / 2} y={detail ? y + 30 : y + height / 2 + 5}>
        <tspan className="blog-diagram-label" textAnchor="middle">
          {label}
        </tspan>
      </text>
      {detail ? (
        <text x={x + width / 2} y={y + 58}>
          <tspan className="blog-diagram-detail" textAnchor="middle">
            {detail}
          </tspan>
        </text>
      ) : null}
    </g>
  );
}

function Arrow({
  from,
  to,
  label,
  dashed = false,
}: {
  from: [number, number];
  to: [number, number];
  label?: string;
  dashed?: boolean;
}) {
  const midX = (from[0] + to[0]) / 2;
  const midY = (from[1] + to[1]) / 2;

  return (
    <g>
      <line
        x1={from[0]}
        y1={from[1]}
        x2={to[0]}
        y2={to[1]}
        className="blog-diagram-arrow"
        strokeDasharray={dashed ? "8 8" : undefined}
        markerEnd="url(#blog-diagram-arrowhead)"
      />
      {label ? (
        <text x={midX} y={midY - 10} className="blog-diagram-edge-label">
          <tspan textAnchor="middle">{label}</tspan>
        </text>
      ) : null}
    </g>
  );
}

function DiagramBody({ variant }: { variant: BlogDiagramVariant }) {
  if (variant === "api-reliability") {
    return (
      <>
        <Box x={52} y={78} width={150} height={72} label="Client" detail="retry budget" />
        <Box x={282} y={78} width={160} height={72} label="API boundary" detail="timeouts" tone="accent" />
        <Box x={532} y={50} width={150} height={72} label="Service" detail="circuit breaker" />
        <Box x={532} y={174} width={150} height={72} label="Queue" detail="durable intent" />
        <Box x={722} y={112} width={130} height={72} label="Database" detail="idempotent write" tone="muted" />
        <Arrow from={[202, 114]} to={[282, 114]} label="request" />
        <Arrow from={[442, 114]} to={[532, 86]} />
        <Arrow from={[442, 114]} to={[532, 210]} />
        <Arrow from={[682, 86]} to={[722, 138]} />
        <Arrow from={[682, 210]} to={[722, 158]} />
        <Arrow from={[282, 150]} to={[202, 150]} label="stable result" dashed />
      </>
    );
  }

  if (variant === "systems-design") {
    return (
      <>
        <Box x={46} y={90} width={145} height={70} label="Route" detail="user intent" />
        <Box x={242} y={90} width={145} height={70} label="Contract" detail="typed client" tone="accent" />
        <Box x={438} y={90} width={145} height={70} label="Domain" detail="business rule" />
        <Box x={634} y={38} width={145} height={70} label="Worker" detail="side effect" />
        <Box x={634} y={146} width={145} height={70} label="Model" detail="owned data" tone="muted" />
        <Box x={326} y={262} width={210} height={68} label="Operational guardrails" detail="flags, SLOs, runbooks" tone="muted" />
        <Arrow from={[191, 125]} to={[242, 125]} />
        <Arrow from={[387, 125]} to={[438, 125]} />
        <Arrow from={[583, 114]} to={[634, 73]} />
        <Arrow from={[583, 136]} to={[634, 181]} />
        <Arrow from={[431, 262]} to={[431, 160]} dashed />
      </>
    );
  }

  if (variant === "observability") {
    return (
      <>
        <Box x={40} y={92} width={125} height={68} label="User action" />
        <Box x={210} y={92} width={125} height={68} label="Browser" detail="span id" />
        <Box x={380} y={92} width={125} height={68} label="API" detail="trace context" tone="accent" />
        <Box x={550} y={92} width={125} height={68} label="Worker" detail="logs" />
        <Box x={720} y={92} width={125} height={68} label="Database" detail="query span" tone="muted" />
        <Box x={252} y={248} width={390} height={72} label="One correlated timeline" detail="metrics + logs + traces + business outcome" tone="muted" />
        <Arrow from={[165, 126]} to={[210, 126]} />
        <Arrow from={[335, 126]} to={[380, 126]} />
        <Arrow from={[505, 126]} to={[550, 126]} />
        <Arrow from={[675, 126]} to={[720, 126]} />
        <Arrow from={[445, 160]} to={[445, 248]} dashed />
      </>
    );
  }

  if (variant === "orm-choice") {
    return (
      <>
        <line x1="110" y1="220" x2="790" y2="220" className="blog-diagram-axis" markerEnd="url(#blog-diagram-arrowhead)" />
        <text x="118" y="188" className="blog-diagram-axis-label">Convenience</text>
        <text x="706" y="188" className="blog-diagram-axis-label">Control</text>
        <Box x={168} y={78} width={190} height={82} label="Prisma" detail="guardrails, generated client" tone="accent" />
        <Box x={542} y={78} width={190} height={82} label="Drizzle" detail="SQL-first, lightweight" />
        <Box x={314} y={282} width={272} height={68} label="Schema strategy" detail="migrations, indexes, ownership" tone="muted" />
        <Arrow from={[263, 160]} to={[396, 282]} dashed />
        <Arrow from={[637, 160]} to={[504, 282]} dashed />
      </>
    );
  }

  if (variant === "architecture-choice") {
    return (
      <>
        <rect x="58" y="70" width="310" height="210" rx="18" className="blog-diagram-boundary" />
        <text x="213" y="48" className="blog-diagram-section-title">Modular monolith</text>
        <Box x={92} y={106} width={105} height={58} label="Billing" tone="muted" />
        <Box x={228} y={106} width={105} height={58} label="Orders" tone="muted" />
        <Box x={92} y={190} width={105} height={58} label="Users" tone="muted" />
        <Box x={228} y={190} width={105} height={58} label="Inventory" tone="muted" />
        <rect x="532" y="70" width="288" height="210" rx="18" className="blog-diagram-boundary" />
        <text x="676" y="48" className="blog-diagram-section-title">Microservices</text>
        <Box x={562} y={106} width={92} height={58} label="Billing" />
        <Box x={698} y={106} width={92} height={58} label="Orders" />
        <Box x={562} y={190} width={92} height={58} label="Users" />
        <Box x={698} y={190} width={92} height={58} label="Inventory" />
        <Arrow from={[654, 135]} to={[698, 135]} dashed />
        <Arrow from={[608, 164]} to={[608, 190]} dashed />
        <Arrow from={[744, 164]} to={[744, 190]} dashed />
        <Arrow from={[368, 176]} to={[532, 176]} label="split when operations are ready" />
      </>
    );
  }

  if (variant === "database-migration") {
    return (
      <>
        <line x1="90" y1="180" x2="810" y2="180" className="blog-diagram-axis" markerEnd="url(#blog-diagram-arrowhead)" />
        <Box x={70} y={80} width={125} height={70} label="Expand" detail="add nullable field" />
        <Box x={228} y={216} width={125} height={70} label="Dual-write" detail="old + new path" tone="accent" />
        <Box x={386} y={80} width={125} height={70} label="Backfill" detail="chunked jobs" />
        <Box x={544} y={216} width={125} height={70} label="Shift reads" detail="verify parity" tone="accent" />
        <Box x={702} y={80} width={125} height={70} label="Contract" detail="remove old shape" tone="muted" />
        <Arrow from={[195, 115]} to={[228, 250]} />
        <Arrow from={[353, 250]} to={[386, 115]} />
        <Arrow from={[511, 115]} to={[544, 250]} />
        <Arrow from={[669, 250]} to={[702, 115]} />
      </>
    );
  }

  return (
    <>
      <Box x={70} y={92} width={160} height={74} label="Frontend" detail="expected payload" />
      <Box x={370} y={62} width={160} height={74} label="Shared schema" detail="OpenAPI / Zod" tone="accent" />
      <Box x={670} y={92} width={160} height={74} label="Backend" detail="runtime response" />
      <Box x={370} y={236} width={160} height={74} label="CI gate" detail="contract test" tone="muted" />
      <Arrow from={[230, 129]} to={[370, 99]} label="generate client" />
      <Arrow from={[530, 99]} to={[670, 129]} label="validate provider" />
      <Arrow from={[450, 136]} to={[450, 236]} label="block drift" dashed />
      <Arrow from={[670, 166]} to={[530, 273]} dashed />
      <Arrow from={[370, 273]} to={[230, 166]} dashed />
    </>
  );
}

export function BlogDiagram({ variant, title, caption }: BlogDiagramProps) {
  const titleId = `blog-diagram-${variant}`;

  return (
    <figure className="blog-diagram">
      <svg viewBox="0 0 900 390" role="img" aria-labelledby={titleId}>
        <title id={titleId}>{title}</title>
        <defs>
          <marker
            id="blog-diagram-arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" className="blog-diagram-arrowhead" />
          </marker>
        </defs>
        <DiagramBody variant={variant} />
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
