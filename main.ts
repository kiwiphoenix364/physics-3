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
let prevy = 0
let prevx = 0
let cany = false
let canx = false
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
scene.cameraFollowSprite(mySprite)
let mySprite3 = sprites.create(img`
    c 
    `, SpriteKind.Player)
mySprite3.setFlag(SpriteFlag.Invisible, true)
mySprite.y = 128
controller.moveSprite(mySprite, 30, 30)
let mySpritePixels: number[] = []
for (let index = 0; index <= mySprite.width; index++) {
    for (let index2 = 0; index2 <= mySprite.height; index2++) {
        let list: boolean[] = []
        if (mySprite.image.getPixel(index, index2) > 0) {
            list.push(true)
        } else {
            list.push(false)
        }
    }
}
GenerateCollision()
game.onUpdate(function () {
    curx = mySprite.x
    cury = mySprite.y
    mySprite.setFlag(SpriteFlag.GhostThroughWalls, false)
    canx = true
    cany = true
    for (let index4 = 0; index4 <= TileCollisionArrayX.length; index4++) {
        if (TileCollisionArrayY[index4] >= mySprite.top && TileCollisionArrayY[index4] <= mySprite.bottom && (TileCollisionArrayX[index4] >= mySprite.left && TileCollisionArrayX[index4] <= mySprite.right)) {
            if (true) {
                mySprite.x = prevx
                mySprite.y = prevy
            }
        }
    }
    prevx = mySprite.x
    prevy = mySprite.y
})
