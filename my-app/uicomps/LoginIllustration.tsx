"use client"

// Four flat-geometric characters sharing one baseline, drawn as a single inline
// SVG so the whole thing scales with its container and needs no image asset.
// Draw order is back-to-front: purple, charcoal, yellow, then orange on top.
//
// Each character is rigged in two parts: a body group that leans from its foot
// on the baseline, and a face group whose pupils track the cursor inside it.

import * as React from "react"

const PURPLE = "#5a22f0"
const INK = "#1d1d21"
const YELLOW = "#e7d302"
const ORANGE = "#f98336"

const VIEW_W = 640
const VIEW_H = 520

// How far the cursor must sit from a face before that character is looking as
// hard as it can. Roughly two thirds of the drawing's width, so a cursor over
// the form on the right still reads as "the whole cast turned to watch".
const SATURATION = 380

// Per-frame approach rate. The pupils chase harder than the bodies, so a glance
// lands first and the lean follows a beat later — that lag is most of the charm.
const GAZE_EASE = 0.16
const BODY_EASE = 0.07

type Rig = {
    /** Point on the baseline the body pivots around. */
    pivot: readonly [number, number]
    /** Centre of the face, i.e. what the cursor is measured against. */
    face: readonly [number, number]
    /** Degrees of lean at full deflection. */
    lean: number
    /** Pixels the character lifts when the cursor is overhead. */
    rise: number
    /** Pixels the pupils travel at full deflection. */
    gaze: number
}

// Deliberately uneven: a tall block tipping 1.6° swings its head further than
// the squat arch does at 3°, and staggering the values keeps them from moving
// as one rigid unit.
const RIGS = {
    purple: { pivot: [277, 520], face: [306, 38], lean: 1.6, rise: 5, gaze: 3 },
    charcoal: { pivot: [400, 520], face: [446, 201], lean: 2.2, rise: 4, gaze: 4 },
    yellow: { pivot: [516, 520], face: [499, 311], lean: 3, rise: 6, gaze: 3.5 },
    orange: { pivot: [198, 520], face: [236, 436], lean: 1.2, rise: 3, gaze: 5 },
} as const satisfies Record<string, Rig>

type CharName = keyof typeof RIGS

const NAMES = Object.keys(RIGS) as CharName[]

const clamp1 = (n: number) => (n < -1 ? -1 : n > 1 ? 1 : n)

export default function LoginIllustration({ className }: { className?: string }) {
    const svgRef = React.useRef<SVGSVGElement>(null)
    const bodies = React.useRef<Partial<Record<CharName, SVGGElement | null>>>({})
    const faces = React.useRef<Partial<Record<CharName, SVGGElement | null>>>({})

    React.useEffect(() => {
        const svg = svgRef.current
        if (!svg) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        // `amp` fades the whole rig in and out, so "cursor has left the window"
        // settles everyone back to the drawn pose instead of freezing mid-lean.
        const target = { x: VIEW_W / 2, y: VIEW_H / 2, amp: 0 }
        const gaze = { x: VIEW_W / 2, y: VIEW_H / 2, amp: 0 }
        const body = { x: VIEW_W / 2, y: VIEW_H / 2, amp: 0 }

        let client: { x: number; y: number } | null = null
        let frame = 0

        const tick = () => {
            frame = 0

            if (client) {
                // One layout read per frame, and only while something is moving.
                const rect = svg.getBoundingClientRect()
                if (rect.width > 0 && rect.height > 0) {
                    target.x = ((client.x - rect.left) / rect.width) * VIEW_W
                    target.y = ((client.y - rect.top) / rect.height) * VIEW_H
                }
            }

            gaze.x += (target.x - gaze.x) * GAZE_EASE
            gaze.y += (target.y - gaze.y) * GAZE_EASE
            gaze.amp += (target.amp - gaze.amp) * GAZE_EASE
            body.x += (target.x - body.x) * BODY_EASE
            body.y += (target.y - body.y) * BODY_EASE
            body.amp += (target.amp - body.amp) * BODY_EASE

            for (const name of NAMES) {
                const rig = RIGS[name]

                const bx = clamp1((body.x - rig.face[0]) / SATURATION) * body.amp
                const by = clamp1((body.y - rig.face[1]) / SATURATION) * body.amp
                const el = bodies.current[name]
                if (el) {
                    // Lift only when the cursor is above the face — reaching up
                    // reads as interest, sinking down just reads as a glitch.
                    const lift = Math.min(0, by) * rig.rise
                    el.setAttribute(
                        "transform",
                        `translate(0 ${lift.toFixed(2)}) rotate(${(bx * rig.lean).toFixed(3)} ${rig.pivot[0]} ${rig.pivot[1]})`,
                    )
                }

                const gx = clamp1((gaze.x - rig.face[0]) / SATURATION) * gaze.amp
                const gy = clamp1((gaze.y - rig.face[1]) / SATURATION) * gaze.amp
                const face = faces.current[name]
                if (face) {
                    // Vertical travel is damped: these eyes are wider than tall,
                    // and a full-range drop pushes the pupils out of the whites.
                    face.setAttribute(
                        "transform",
                        `translate(${(gx * rig.gaze).toFixed(2)} ${(gy * rig.gaze * 0.65).toFixed(2)})`,
                    )
                }
            }

            const settling =
                Math.abs(target.x - body.x) > 0.05 ||
                Math.abs(target.y - body.y) > 0.05 ||
                Math.abs(target.amp - body.amp) > 0.002 ||
                Math.abs(target.x - gaze.x) > 0.05 ||
                Math.abs(target.y - gaze.y) > 0.05 ||
                Math.abs(target.amp - gaze.amp) > 0.002

            if (settling) frame = requestAnimationFrame(tick)
        }

        const wake = () => {
            if (!frame) frame = requestAnimationFrame(tick)
        }

        const onMove = (e: PointerEvent) => {
            client = { x: e.clientX, y: e.clientY }
            target.amp = 1
            wake()
        }

        const onRest = () => {
            target.amp = 0
            wake()
        }

        // pointerleave has to be bound on <html>, not document — the pointer
        // exiting the root element is what "cursor left the window" actually is.
        const root = document.documentElement

        window.addEventListener("pointermove", onMove, { passive: true })
        root.addEventListener("pointerleave", onRest)
        window.addEventListener("blur", onRest)

        return () => {
            window.removeEventListener("pointermove", onMove)
            root.removeEventListener("pointerleave", onRest)
            window.removeEventListener("blur", onRest)
            if (frame) cancelAnimationFrame(frame)
        }
    }, [])

    const setBody = (name: CharName) => (el: SVGGElement | null) => {
        bodies.current[name] = el
    }
    const setFace = (name: CharName) => (el: SVGGElement | null) => {
        faces.current[name] = el
    }

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className={className}
            role="img"
            aria-label="Four friendly geometric characters standing together"
        >
            {/* Tall purple block — eyes sit high, with a vertical bar between them. */}
            <g ref={setBody("purple")}>
                <rect x="159" y="3" width="236" height="517" fill={PURPLE} />
                <circle cx="270" cy="38" r="7" fill="#fff" />
                <circle cx="342" cy="38" r="7" fill="#fff" />
                <rect x="304" y="25" width="8" height="48" fill={INK} />
                <g ref={setFace("purple")}>
                    <circle cx="270" cy="38" r="3" fill={INK} />
                    <circle cx="342" cy="38" r="3" fill={INK} />
                </g>
            </g>

            {/* Charcoal block — its right eye is deliberately flush with the edge. */}
            <g ref={setBody("charcoal")}>
                <rect x="325" y="152" width="150" height="368" fill={INK} />
                <circle cx="423" cy="201" r="10" fill="#fff" />
                <circle cx="469" cy="201" r="10" fill="#fff" />
                <g ref={setFace("charcoal")}>
                    <circle cx="423" cy="201" r="4.5" fill={INK} />
                    <circle cx="469" cy="201" r="4.5" fill={INK} />
                </g>
            </g>

            {/* Yellow arch — one eye, and a beak that overhangs the shape on the right. */}
            <g ref={setBody("yellow")}>
                <path d="M432 520V341a84 84 0 0 1 168 0v179Z" fill={YELLOW} />
                <rect x="532" y="336" width="100" height="9" fill={INK} />
                {/* The beak stays put: it reads as part of the silhouette, so only
                    the eye is free to wander. */}
                <g ref={setFace("yellow")}>
                    <circle cx="499" cy="311" r="5" fill={INK} />
                </g>
            </g>

            {/* Orange dome — the face is offset right of centre, as in the reference. */}
            <g ref={setBody("orange")}>
                <path d="M0 520a198.5 198.5 0 0 1 397 0Z" fill={ORANGE} />
                {/* No whites to stay inside here, so eyes and smile travel together
                    and the whole face reads as turning. */}
                <g ref={setFace("orange")}>
                    <circle cx="188" cy="436" r="11" fill={INK} />
                    <circle cx="284" cy="436" r="11" fill={INK} />
                    <path d="M213 455a22 22 0 0 0 44 0Z" fill={INK} />
                </g>
            </g>
        </svg>
    )
}
