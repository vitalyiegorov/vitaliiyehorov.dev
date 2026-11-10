import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

export const alt = 'Vitalii Yehorov, Engineering Manager. I lead engineers and a fleet of AI agents.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const fontPath = (file: string): string => join(process.cwd(), 'node_modules/@fontsource', file);

const [display, mono] = await Promise.all([
    readFile(fontPath('bricolage-grotesque/files/bricolage-grotesque-latin-700-normal.woff')),
    readFile(fontPath('geist-mono/files/geist-mono-latin-400-normal.woff'))
]);

export default function OpengraphImage() {
    return new ImageResponse(
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                position: 'relative',
                background: '#05080c',
                color: '#eef2f5',
                fontFamily: 'Bricolage'
            }}
        >
            <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: 'absolute', inset: 0 }}>
                <defs>
                    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0" stopColor="#f4ffd6" stopOpacity="1" />
                        <stop offset="0.12" stopColor="#c6fb50" stopOpacity="0.75" />
                        <stop offset="0.45" stopColor="#c6fb50" stopOpacity="0.12" />
                        <stop offset="1" stopColor="#c6fb50" stopOpacity="0" />
                    </radialGradient>
                </defs>
                <circle cx="900" cy="300" r="230" fill="url(#glow)" />
                <ellipse
                    cx="900"
                    cy="300"
                    rx="140"
                    ry="52"
                    fill="none"
                    stroke="#eef2f5"
                    strokeOpacity="0.22"
                    transform="rotate(-12 900 300)"
                />
                <ellipse
                    cx="900"
                    cy="300"
                    rx="235"
                    ry="84"
                    fill="none"
                    stroke="#eef2f5"
                    strokeOpacity="0.16"
                    transform="rotate(16 900 300)"
                />
                <ellipse
                    cx="900"
                    cy="300"
                    rx="335"
                    ry="110"
                    fill="none"
                    stroke="#eef2f5"
                    strokeOpacity="0.11"
                    transform="rotate(-6 900 300)"
                />
                <circle cx="1031" cy="273" r="6" fill="#c6fb50" />
                <circle cx="676" cy="250" r="5" fill="#eef2f5" fillOpacity="0.8" />
                <circle cx="1120" cy="360" r="4" fill="#c6fb50" />
                <circle cx="780" cy="352" r="4" fill="#eef2f5" fillOpacity="0.7" />
                <circle cx="1222" cy="282" r="3" fill="#eef2f5" fillOpacity="0.6" />
                <circle cx="900" cy="300" r="9" fill="#ffffff" />
            </svg>
            <div
                style={{
                    position: 'absolute',
                    left: 72,
                    top: 64,
                    display: 'flex',
                    fontFamily: 'Geist Mono',
                    fontSize: 20,
                    letterSpacing: 3,
                    color: '#80878e'
                }}
            >
                VITALIIYEHOROV.DEV · VIENNA
            </div>
            <div style={{ position: 'absolute', left: 72, bottom: 72, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 132, lineHeight: 0.88, letterSpacing: -6, display: 'flex', flexDirection: 'column' }}>
                    <span>Vitalii</span>
                    <span>Yehorov</span>
                </div>
                <div style={{ marginTop: 34, fontSize: 38, letterSpacing: -1, display: 'flex' }}>
                    I lead engineers and a&nbsp;<span style={{ color: '#c6fb50' }}>fleet of AI agents.</span>
                </div>
                <div style={{ marginTop: 18, fontFamily: 'Geist Mono', fontSize: 20, letterSpacing: 2, color: '#a4acb4', display: 'flex' }}>
                    ENGINEERING MANAGER · TOOLSENSE · EX-FOUNDER, EX-CTO
                </div>
            </div>
        </div>,
        {
            ...size,
            fonts: [
                { name: 'Bricolage', data: display, weight: 700, style: 'normal' },
                { name: 'Geist Mono', data: mono, weight: 400, style: 'normal' }
            ]
        }
    );
}
