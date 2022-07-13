// Copy of Arcade-Sprite-Data, used in this extension, but will not show up in the toolbox.
namespace sprites {
    export function setDataNumber(sprite: Sprite, name: string, value: number) {
        if (!sprite || !name) return;
        const d = sprite.data;
        d[name] = value;
    }
    export function changeDataNumberBy(sprite: Sprite, name: string, value: number) {
        if (!sprite || !name) return;
        const d = sprite.data;
        d[name] = (d[name] || 0) + value;
    }
    export function readDataNumber(sprite: Sprite, name: string): number {
        if (!sprite || !name) return 0;
        const d = sprite.data;
        return d[name] as number;
    }
    export function setDataString(sprite: Sprite, name: string, value: string) {
        if (!sprite || !name) return;
        const d = sprite.data;
        d[name] = value;
    }
    export function readDataString(sprite: Sprite, name: string): string {
        if (!sprite || !name) return "";
        const d = sprite.data;
        return d[name] as string;
    }
    export function setDataBoolean(sprite: Sprite, name: string, value: boolean) {
        if (!sprite || !name) return;
        const d = sprite.data;
        d[name] = !!value;
    }
    export function readDataBoolean(sprite: Sprite, name: string): boolean {
        if (!sprite || !name) return false;
        const d = sprite.data;
        return !!d[name];
    }
    export function setDataSprite(sprite: Sprite, name: string, value: Sprite) {
        if (!sprite || !name) return;
        const d = sprite.data;
        d[name] = value;
    }
    export function readDataSprite(sprite: Sprite, name: string): Sprite {
        if (!sprite || !name) return undefined;
        const d = sprite.data;
        return d[name] as Sprite;
    }
    export function setDataImage(sprite: Sprite, name: string, value: Image) {
        if (!sprite || !name) return;
        const d = sprite.data;
        d[name] = value;
    }
    export function readDataImage(sprite: Sprite, name: string): Image {
        if (!sprite || !name) return undefined;
        const d = sprite.data;
        return d[name] as Image;
    }
}