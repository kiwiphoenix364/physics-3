namespace SpriteKind {
    export const AffectedByPhysics = SpriteKind.create()
}
let cany = 0
let canx = 0
let repeat = 0
let cury = 0
let curx = 0
let collisionImages: Image = null
let TileCollisionArrayX: number[] = []
let TileCollisionArrayY: number[] = []
TileCollisionArrayY = [0]
TileCollisionArrayX = [0]
TileCollisionArrayY = []
TileCollisionArrayX = []
namespace MiniTilemaps {
    //% block="Generate mini tilemap on all $selected tiles with collision $collisionImg"
    export function GenerateCollision(selected: any, collisionImg: any) {
        collisionImages = collisionImg
        let item = tiles.getTilesByType(selected)
        for (let value2 of item) {
            for (let index32 = 0; index32 <= collisionImages.width; index32++) {
                for (let index23 = 0; index23 <= collisionImages.height; index23++) {
                    if (0 != collisionImages.getPixel(index32, index23)) {
                        TileCollisionArrayX.push(value2.column * 16 + index32)
                        TileCollisionArrayY.push(value2.row * 16 + index23)
                    }
                }
            }
        }
    }
    //% block="Clear all mini tilemaps"
    export function ClearAll () {
    TileCollisionArrayX = []
    TileCollisionArrayY = []
}
}
game.onUpdate(function () {
    if (TileCollisionArrayX.length != 0) {
        for (let mySprite of sprites.allOfKind(SpriteKind.AffectedByPhysics)) {
            curx = mySprite.x
            cury = mySprite.y
            mySprite.setPosition(sprites.readDataNumber(mySprite, "prevx"), sprites.readDataNumber(mySprite, "prevy"))
            repeat = Math.abs(curx - sprites.readDataNumber(mySprite, "prevx")) + Math.abs(cury - sprites.readDataNumber(mySprite, "prevy"))
            canx = 1
            cany = 1
            for (let index = 0; index <= repeat; index++) {
                if (repeat > 0) {
                    if (canx == 1) {
                        mySprite.x += (curx - sprites.readDataNumber(mySprite, "prevx")) / repeat
                        for (let index2 = 0; index2 <= TileCollisionArrayX.length; index2++) {
                            if (canx == 1) {
                                if (TileCollisionArrayX[index2] - mySprite.left >= 0 && TileCollisionArrayX[index2] - mySprite.left < mySprite.width && (TileCollisionArrayY[index2] - mySprite.top >= 0 && TileCollisionArrayY[index2] - mySprite.top < mySprite.height)) {
                                    if (mySprite.image.getPixel(TileCollisionArrayX[index2] - mySprite.left, TileCollisionArrayY[index2] - mySprite.top) != 0) {
                                        mySprite.x += 0 - (curx - sprites.readDataNumber(mySprite, "prevx")) / repeat
                                        canx = 0
                                    }
                                }
                            }
                        }
                    }
                    if (cany == 1) {
                        mySprite.y += (cury - sprites.readDataNumber(mySprite, "prevy")) / repeat
                        for (let index22 = 0; index22 <= TileCollisionArrayY.length; index22++) {
                            if (cany == 1) {
                                if (TileCollisionArrayX[index22] - mySprite.left >= 0 && TileCollisionArrayX[index22] - mySprite.left < mySprite.width && (TileCollisionArrayY[index22] - mySprite.top >= 0 && TileCollisionArrayY[index22] - mySprite.top < mySprite.height)) {
                                    if (mySprite.image.getPixel(TileCollisionArrayX[index22] - mySprite.left, TileCollisionArrayY[index22] - mySprite.top) != 0) {
                                        mySprite.y += 0 - (cury - sprites.readDataNumber(mySprite, "prevy")) / repeat
                                        cany = 0
                                    }
                                }
                            }
                        }
                    }
                }
            }
            sprites.setDataNumber(mySprite, "prevx", mySprite.x)
sprites.setDataNumber(mySprite, "prevy", mySprite.y)
        }
    }
})
