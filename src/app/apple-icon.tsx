import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
    return new ImageResponse(
        <div style={{ width: '100%', height: '100%', display: 'flex', background: '#05080c' }}>
            <svg width="180" height="180" viewBox="0 0 64 64">
                <ellipse
                    cx="32"
                    cy="32"
                    rx="24"
                    ry="9"
                    fill="none"
                    stroke="#eef2f5"
                    strokeOpacity="0.45"
                    strokeWidth="2"
                    transform="rotate(-20 32 32)"
                />
                <circle cx="32" cy="32" r="7" fill="#c6fb50" />
                <circle cx="53" cy="24" r="3.5" fill="#eef2f5" />
            </svg>
        </div>,
        size
    );
}
