namespace SpriteKind {
    //% isKind
    export const AffectedByPhysics = SpriteKind.create()
}
let cany = 0
let canx = 0
let repeat = 0
let cury = 0
let curx = 0
let TileCollisionArrayY = [0]
let TileCollisionArrayX = [0]
TileCollisionArrayY = []
TileCollisionArrayX = []
namespace MiniTilemaps {
    //% block="Clear all mini tilemaps"
    export function ClearAll () {
    let TileCollisionArrayX = [0]
    let TileCollisionArrayY = [0]
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
