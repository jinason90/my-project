import { Img } from "remotion";

/**
 * Product photos are shot on seamless white studio backgrounds. Rather than
 * requiring a pre-cut PNG, this keys the near-white background out to alpha
 * client-side via an SVG luminance filter, so the product floats cleanly on
 * a dark canvas without a white card behind it.
 */
export const CutoutImage: React.FC<{
  src: string;
  filterId: string;
  style?: React.CSSProperties;
}> = ({ src, filterId, style }) => (
  <>
    <svg width={0} height={0} style={{ position: "absolute" }}>
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feColorMatrix
            type="matrix"
            result="lum"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0.299 0.587 0.114 0 0"
          />
          <feComponentTransfer in="lum" result="alpha">
            <feFuncA type="table" tableValues="1 1 1 1 1 1 1 1 0.5 0" />
          </feComponentTransfer>
          <feComposite in="SourceGraphic" in2="alpha" operator="in" />
        </filter>
      </defs>
    </svg>
    <Img src={src} style={{ filter: `url(#${filterId})`, ...style }} />
  </>
);
