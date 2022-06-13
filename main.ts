namespace SpriteKind {
    export const movingplatform = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy = -200
    mySprite.ay = 400
})
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
                    for (let index222 = 0; index222 <= collisionImages.height; index222++) {
                        if (0 != collisionImages.getPixel(index32, index222)) {
                            TileCollisionArrayX.push(value2.column * 16 + index32)
                            TileCollisionArrayY.push(value2.row * 16 + index222 + 1)
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
let repeat = 0
let prevx = 0
let prevy = 0
let cany = false
let canx = false
let cury = 0
let curx = 0
let item: tiles.Location[] = []
let mySprite: Sprite = null
let TileCollisionArrayX: number[] = []
let TileCollisionArrayY: number[] = []
let collisionImages: Image = null
TileCollisionArrayY = [0]
TileCollisionArrayX = [0]
tiles.setCurrentTilemap(tilemap`level2`)
mySprite = sprites.create(img`
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    `, SpriteKind.Player)
mySprite.vy = 100
scene.cameraFollowSprite(mySprite)
let mySprite3 = sprites.create(img`
    c 
    `, SpriteKind.Player)
mySprite3.setFlag(SpriteFlag.Invisible, true)
GenerateCollision()
game.onUpdate(function () {
    curx = Math.round(mySprite.x)
    cury = Math.round(mySprite.y)
    controller.moveSprite(mySprite, 100, 0)
    mySprite.setFlag(SpriteFlag.GhostThroughWalls, false)
    canx = true
    cany = true
    for (let index4 = 0; index4 <= TileCollisionArrayX.length; index4++) {
        mySprite3.setPosition(TileCollisionArrayX[index4], TileCollisionArrayY[index4])
        mySprite.y = prevy
        if (mySprite.overlapsWith(mySprite3)) {
            mySprite.x = prevx
            repeat = 2
            for (let index = 0; index < repeat; index++) {
                if (mySprite.overlapsWith(mySprite3)) {
                    repeat += 1
                    mySprite.x += Math.constrain(curx - prevx, -1, 1)
                } else {
                    mySprite.x += 0 - Math.constrain(curx - prevx, -1, 1)
                    repeat = 0
                }
            }
            canx = false
        } else {
            if (canx) {
                mySprite.x = curx
            }
        }
        if (cany) {
            mySprite.y = cury
        }
        if (mySprite.overlapsWith(mySprite3)) {
            mySprite.y = prevy
            repeat = 2
            for (let index = 0; index < repeat; index++) {
                if (mySprite.overlapsWith(mySprite3)) {
                    repeat += 1
                    mySprite.y += Math.constrain(cury - prevy, -1, 1)
                } else {
                    mySprite.y += 0 - Math.constrain(cury - prevy, -1, 1)
                    repeat = 0
                }
            }
            cany = false
        } else {
            if (cany) {
                mySprite.y = cury
            }
        }
    }
    prevx = Math.round(mySprite.x)
    prevy = Math.round(mySprite.y)
})
