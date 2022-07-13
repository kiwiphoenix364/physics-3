namespace SpriteKind {
    export const AffectedByPhysics = SpriteKind.create()
}
let cany = 0
let canx = 0
let repeat = 0
let cury = 0
let curx = 0
let item: tiles.Location[] = []
let collisionImages: Image = null
let TileCollisionArrayX: number[] = []
let TileCollisionArrayY: number[] = []
TileCollisionArrayY = [0]
TileCollisionArrayX = [0]
TileCollisionArrayY = []
TileCollisionArrayX = []
tiles.setCurrentTilemap(tilemap`level2`)
let myPlayerSprite = sprites.create(img`
    22222222222222222222222222222223
    22222222222222222222222222222232
    22222222222222222222222222222322
    22222222222222222222222222223222
    22222222222222222222222222232222
    22222222222222222222222222322222
    22222222222222222222222223222222
    22222222222222222222222232222222
    22222222222222222222222322222222
    22222222222222222222223222222222
    22222222222222222222232222222222
    22222222222222222222322222222222
    22222222222222222223222222222222
    22222222222222222232222222222222
    22222222222222222322222222222222
    22222222222222223222222222222222
    22222222222222232222222222222222
    22222222222222322222222222222222
    22222222222223222222222222222222
    22222222222232222222222222222222
    22222222222322222222222222222222
    22222222223222222222222222222222
    22222222232222222222222222222222
    22222222322222222222222222222222
    22222223222222222222222222222222
    22222232222222222222222222222222
    22222322222222222222222222222222
    22223222222222222222222222222222
    22232222222222222222222222222222
    22322222222222222222222222222222
    23222222222222222222222222222222
    32222222222222222222222222222222
    `, SpriteKind.AffectedByPhysics)
let prevx = myPlayerSprite.x
let prevy = myPlayerSprite.y
scene.cameraFollowSprite(myPlayerSprite)
myPlayerSprite.y = 128
controller.moveSprite(myPlayerSprite, 100, 100)
let mySprite3 = sprites.create(img`
    c . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.AffectedByPhysics)
mySprite3.setVelocity(0, 50)
game.onUpdate(function () {
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
                    for (let index2 = 0; index2 <= TileCollisionArrayY.length; index2++) {
                        if (cany == 1) {
                            if (TileCollisionArrayX[index2] - mySprite.left >= 0 && TileCollisionArrayX[index2] - mySprite.left < mySprite.width && (TileCollisionArrayY[index2] - mySprite.top >= 0 && TileCollisionArrayY[index2] - mySprite.top < mySprite.height)) {
                                if (mySprite.image.getPixel(TileCollisionArrayX[index2] - mySprite.left, TileCollisionArrayY[index2] - mySprite.top) != 0) {
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
})
namespace MiniTilemaps {
    //% block="Generate mini tilemap on all $tiles tiles with collision $collisionImg"
    export function GenerateCollision(selected: any, collisionImg: Image) {
        collisionImages = collisionImg
        item = selected
        for (let value2 of item) {
            for (let index32 = 0; index32 <= collisionImages.width; index32++) {
                for (let index2 = 0; index2 <= collisionImages.height; index2++) {
                    if (0 != collisionImages.getPixel(index32, index2)) {
                        TileCollisionArrayX.push(value2.column * 16 + index32)
                        TileCollisionArrayY.push(value2.row * 16 + index2)
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