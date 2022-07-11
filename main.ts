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
                            TileCollisionArrayX.push(value2.column * 16 + index32 + 1)
                            TileCollisionArrayY.push(value2.row * 16 + index2)
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
    `, SpriteKind.Player)
let prevx = mySprite.x
let prevy = mySprite.y
scene.cameraFollowSprite(mySprite)
let mySprite3 = sprites.create(img`
    c 
    `, SpriteKind.Player)
mySprite3.setFlag(SpriteFlag.Invisible, true)
mySprite.y = 128
controller.moveSprite(mySprite, 100, 100)
GenerateCollision()
game.onUpdate(function () {
    curx = mySprite.x
    cury = mySprite.y
    mySprite.setPosition(prevx, prevy)
    repeat = Math.abs(curx - prevx) + Math.abs(cury - prevy)
    canx = 1
    cany = 1
    for (let index = 0; index <= repeat; index++) {
        if (repeat > 0) {
            let index4 = 0
            if (canx == 1) {
                mySprite.x += (curx - prevx) / repeat
                for (let index2 = 0; index2 <= TileCollisionArrayX.length; index2++) {
                    if (canx == 1) {
                        if (mySprite.image.getPixel(TileCollisionArrayX[index4] - mySprite.left, TileCollisionArrayY[index4] - mySprite.top) != 0) {
                            mySprite.x += 0 - (curx - prevx) / repeat
                            canx = 0
                        }
                    }
                }
            }
            if (cany == 1) {
                mySprite.y += (cury - prevy) / repeat
                for (let index2 = 0; index2 <= TileCollisionArrayY.length; index2++) {
                    if (cany == 1) {
                        if (mySprite.image.getPixel(TileCollisionArrayX[index4] - mySprite.left, TileCollisionArrayY[index4] - mySprite.top) != 0) {
                            mySprite.y += 0 - (cury - prevy) / repeat
                            cany = 0
                        }
                    }
                }
            }
        }
    }
    prevx = mySprite.x
    prevy = mySprite.y
})
