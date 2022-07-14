namespace SpriteKind {
    //% isKind
    export const AffectedByPhysics = SpriteKind.create()
}
let cany = 0
let canx = 0
let repeat = 0
let cury = 0
let curx = 0
let TileCollisionArrayX: number[] = []
let TileCollisionArrayY: number[] = []
TileCollisionArrayY = [0]
TileCollisionArrayX = [0]
TileCollisionArrayY = []
TileCollisionArrayX = []
namespace MiniTilemaps {
    //% block="Generate mini tilemap on all $selected tiles with collision $collisionImg"
    //% selected.shadow=tileset_tile_picker
    //% collisionImg.shadow=screen_image_picker
    export function GenerateCollision(selected: Image, collisionImg: Image) {
        for (let value2 of tiles.getTilesByType(selected)) {
            for (let index32 = 0; index32 <= collisionImg.width; index32++) {
                for (let index23 = 0; index23 <= collisionImg.height; index23++) {
                    if (0 != collisionImg.getPixel(index32, index23)) {
                        TileCollisionArrayX.push(value2.column * 16 + index32)
                        TileCollisionArrayY.push(value2.row * 16 + index23)
                    }
                }
            }
        }
    }
    //% block="Clear all mini tilemaps"
    export function ClearAll () {
    let TileCollisionArrayX = []
    let TileCollisionArrayY = []
    TileCollisionArrayX = []
    TileCollisionArrayY = []
}
}