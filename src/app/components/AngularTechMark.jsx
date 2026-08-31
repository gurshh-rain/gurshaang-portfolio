export default function AngularTechMark({ color = "#111" }) {
  return (
    <svg
      viewBox="0 0 600 170"
      width="100%"
      height="100%"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <g fill={color}>
        <path d="M18 121 91 48h87l-74 73H18Z" />
        <path d="M128 121 201 48h74l-73 73h-74Z" />
        <path d="M226 121 299 48h68l-73 73h-68Z" />
        <path d="M319 121 392 48h57l-43 43-30-30-60 60h3Z" />
        <path d="M407 121 480 48h66l-73 73h-66Z" />
        <path d="M500 121 573 48h9l-73 73h-9Z" />
        <path d="m266 12 22 1 28 27h-24l-26-28Z" />
        <path d="m294 43 27 1 170 170h-43L294 43Z" transform="translate(0 -43)" />
        <path d="m311 66 44 1 140 140h-60L311 66Z" transform="translate(0 -43)" />
      </g>
      <g fill="none" stroke={color} strokeWidth="3">
        <path d="M21 116 91 46h82" />
        <path d="M131 116 201 46h69" />
      </g>
      <text
        x="570"
        y="148"
        fill={color}
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="12"
        fontWeight="700"
      >
        TM
      </text>
    </svg>
  );
}
