import type { IUniform, Scene, Vector4 } from 'three';

export interface CastSurface {
    readonly scene: Scene;
    readonly uniforms: Record<string, IUniform>;
    readonly shield: Vector4[];
    readonly guard: Vector4;
    margin: number;
    height: number;
    shift: number;
    readonly resize: (width: number, viewHeight: number) => void;
    readonly place: (scrollY: number, pinned: boolean) => void;
    readonly render: () => void;
    readonly dispose: () => void;
}
