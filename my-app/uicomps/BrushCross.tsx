// The painted X struck through the 404 headline.
//
// The two arms are plain thick strokes; all of the hand-painted character comes
// from a turbulence displacement filter chewing up their edges. That is far more
// reliable than hand-authoring ragged bezier outlines, and it stays crisp at any
// size because the whole thing is still vector.

export default function BrushCross({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 300 300" className={className} aria-hidden>
            <defs>
                {/* sRGB matters here: in the default linearRGB the white arms pick up
                    grey fringing where the displacement thins them out. */}
                <filter
                    id="brush-arm"
                    x="-25%"
                    y="-25%"
                    width="150%"
                    height="150%"
                    colorInterpolationFilters="sRGB"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.035"
                        numOctaves="4"
                        seed="9"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="18"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>

                {/* Gentler displacement for the flecks — at scale 18 something only a
                    few units across gets torn apart instead of roughened. */}
                <filter
                    id="brush-fleck"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                    colorInterpolationFilters="sRGB"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.08"
                        numOctaves="3"
                        seed="4"
                        result="grain"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="grain"
                        scale="7"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </defs>

            {/* Uneven arm weights — a brush does not lay down the same width twice. */}
            <g filter="url(#brush-arm)" fill="none" stroke="#fff" strokeLinecap="round">
                <path d="M56 34C92 88 140 152 244 266" strokeWidth="42" />
                <path d="M246 38C196 96 128 170 58 264" strokeWidth="36" />
            </g>

            {/* Spatter thrown off the upper-left arm, where the stroke started. */}
            <g fill="#fff" filter="url(#brush-fleck)">
                <ellipse cx="118" cy="52" rx="7" ry="5" />
                <ellipse cx="136" cy="69" rx="9" ry="6" />
                <ellipse cx="160" cy="96" rx="6" ry="4" />
                <ellipse cx="185" cy="124" rx="5" ry="4" />
                <ellipse cx="97" cy="38" rx="5" ry="4" />
            </g>
        </svg>
    )
}
