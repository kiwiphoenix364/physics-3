namespace SpriteKind {
    export const movingplatform = SpriteKind.create()
}
function GenerateCollision () {
    timer.background(function () {
        TileCollisionArrayY = []
        TileCollisionArrayX = []
        for (let index6 = 0; index6 <= 2; index6++) {
            // put the tilemap locations that correspond to the order of your index of regular platform images and collisions
            if (index6 == 0) {
                collisionImages = img`
                    ..............................cc
                    ............................cc..
                    ..........................cc....
                    ........................cc......
                    ......................cc........
                    ....................cc..........
                    ..................cc............
                    ................cc..............
                    ..............cc................
                    ............cc..................
                    ..........cc....................
                    ........cc......................
                    ......cc........................
                    ....cc..........................
                    ..cc............................
                    cc..............................
                    `
            } else if (index6 == 1) {
                collisionImages = img`
                    c . . . . . . . . . . . . . . . 
                    . c . . . . . . . . . . . . . . 
                    . . c . . . . . . . . . . . . . 
                    . . . c . . . . . . . . . . . . 
                    . . . . c . . . . . . . . . . . 
                    . . . . . c . . . . . . . . . . 
                    . . . . . . c . . . . . . . . . 
                    . . . . . . . c . . . . . . . . 
                    . . . . . . . . c . . . . . . . 
                    . . . . . . . . . c . . . . . . 
                    . . . . . . . . . . c . . . . . 
                    . . . . . . . . . . . c . . . . 
                    . . . . . . . . . . . . c . . . 
                    . . . . . . . . . . . . . c . . 
                    . . . . . . . . . . . . . . c . 
                    . . . . . . . . . . . . . . . c 
                    `
            } else if (index6 == 2) {
            	
            } else {
            	
            }
            // put the tilemap locations that correspond to the order of your index of regular platform images and collisions
            if (index6 == 0) {
                item = tiles.getTilesByType(assets.tile`myTile13`)
            } else if (index6 == 1) {
                item = tiles.getTilesByType(assets.tile`myTile`)
            } else if (index6 == 2) {
            	
            } else {
            	
            }
            for (let value2 of item) {
                for (let index32 = 0; index32 <= collisionImages.width; index32++) {
                    for (let index2 = 0; index2 <= collisionImages.height; index2++) {
                        if (0 != collisionImages.getPixel(index32, index2)) {
                            TileCollisionArrayX.push(value2.column * 16 + index32)
                            TileCollisionArrayY.push(value2.row * 16 + index2 + 1)
                        }
                    }
                }
            }
        }
    })
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    stats.turnStats(true)
})
let cany = 0
let canx = 0
let repeat = 0
let cury = 0
let curx = 0
let item: tiles.Location[] = []
let TileCollisionArrayX: number[] = []
let TileCollisionArrayY: number[] = []
let collisionImages: Image = null
TileCollisionArrayY = [0]
TileCollisionArrayX = [0]
tiles.setCurrentTilemap(tilemap`level2`)
let mySprite = sprites.create(img`
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `, SpriteKind.Player)
let prevx = mySprite.x
let prevy = mySprite.y
scene.cameraFollowSprite(mySprite)
mySprite.y = 128
controller.moveSprite(mySprite, 100, 100)
GenerateCollision()
game.onUpdate(function () {
    curx = mySprite.x
    cury = mySprite.y
    repeat = Math.abs(curx - prevx) + Math.abs(cury - prevy)
    mySprite.setPosition(prevx, prevy)
    canx = 1
    cany = 1
    for (let index = 0; index <= repeat; index++) {
        if (index != 0) {
            if (canx == 1) {
                mySprite.x += (curx - prevx) / repeat
                for (let index2 = 0; index2 <= TileCollisionArrayX.length; index2++) {
                    if (canx == 1) {
                        if (TileCollisionArrayX[index2] - mySprite.left >= 0 && TileCollisionArrayX[index2] - mySprite.left < mySprite.width && (TileCollisionArrayY[index2] - mySprite.top >= 1 && TileCollisionArrayY[index2] - mySprite.top <= mySprite.height)) {
                            if (mySprite.image.getPixel(TileCollisionArrayX[index2] - mySprite.left, TileCollisionArrayY[index2] - mySprite.top) != 0) {
                                mySprite.x += 0 - (curx - prevx) / repeat
                                canx = 0
                            }
                        }
                    }
                }
            }
            if (cany == 1) {
                mySprite.y += (cury - prevy) / repeat
                for (let index2 = 0; index2 <= TileCollisionArrayY.length; index2++) {
                    if (cany == 1) {
                        if (TileCollisionArrayX[index2] - mySprite.left >= 0 && TileCollisionArrayX[index2] - mySprite.left < mySprite.width && (TileCollisionArrayY[index2] - mySprite.top >= 1 && TileCollisionArrayY[index2] - mySprite.top <= mySprite.height)) {
                            if (mySprite.image.getPixel(TileCollisionArrayX[index2] - mySprite.left, TileCollisionArrayY[index2] - mySprite.top) != 1) {
                                mySprite.y += 0 - (cury - prevy) / repeat
                                cany = 0
                            }
                        }
                    }
                }
            }
        }
    }
    prevx = mySprite.x
    prevy = mySprite.y
})
