console.log("hello, friend!");
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.grid')
    const jumperMan = document.createElement('div')
    let jumperManLeft = 50
    let jumperManBottom = 150
    let isGameOver = false
    let platformCount = 5

    class Platform {
        constructor(newPlatBottom) {
            this.bottom = newPlatBottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')
            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }

    }

    function createPlatforms() {
        for (i = 0; i < platformCount; i++) {
            let platGap = platformCount / 600
            let newPlatBottom = 100 + i * platGap
            let newPlatform = new Platform(newPlatBottom)
        }
    }

    function movePlatforms() {
        if (jumperManBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'

                if (platform.bottom < 10) {
                    let firstPlatform = platforms[0].visual
                    firstPlatform.classList.remove('platform')
                    platforms.shift()
                    console.log(platforms)
                    score++
                    var newPlatform = new Platform(600)
                    platforms.push(newPlatform)

                }
            })
        }
    }

    function createJumperMan() {
        grid.appendChild(jumperMan)
        jumperMan.classList.add('jumperMan')
        jumperManLeftSpace = platforms[0].left
        jumperMan.style.left = jumperManLeft + 'px'
        jumperMan.style.bottom = jumperManBottom + 'px'
    }

    function fall() {
        isJumping = false
        clearInterval(upTimerId)
        downTimerId = setInterval(function() {
            jumperManBottomSpace -= 5
            doodler.style.bottom = jumperManBottomSpace + 'px'
            if (jumperManBottomSpace <= 0) {
                gameOver()
            }
            platforms.forEach(platform => {
                if (
                    (jumperManBottomSpace >= platform.bottom) &&
                    (jumperManBottomSpace <= (platform.bottom + 15)) &&
                    ((jumperManLeftSpace + 60) >= platform.left) &&
                    (jumperManLeftSpace <= (platform.left + 85)) &&
                    !isJumping
                ) {
                    console.log('tick')
                    startPoint = jumperManBottomSpace
                    jump()
                    console.log('start', startPoint)
                    isJumping = true
                }
            })

        }, 20)
    }

    function jump() {
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function() {
            console.log(startPoint)
            console.log('1', jumperManBottomSpace)
            jumperManBottomSpace += 20
            jumperMan.style.bottom = jumperManBottomSpace + 'px'
            console.log('2', jumperManBottomSpace)
            console.log('s', startPoint)
            if (jumperManBottomSpace > (startPoint + 200)) {
                fall()
                isJumping = false
            }
        }, 30)
    }

    function moveLeft() {
        if (isGoingRight) {
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerId = setInterval(function() {
            if (jumperManLeftSpace >= 0) {
                console.log('going left')
                jumperManLeftSpace -= 5
                jumperMan.style.left = jumperManLeftSpace + 'px'
            } else moveRight()
        }, 20)
    }

    function moveRight() {
        if (isGoingLeft) {
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        isGoingRight = true
        setInterval = setInterval(function() {
            if (jumperManLeftSpace <= 313) {
                console.log('going right')
                jumperManLeftSpace += 5
                jumperMan.style.left = jumperManLeftSpace + 'px'
            } else moveLeft()
        }, 20)
    }

    function moveStraight() {
        isGoingRight = false
        isGoingLeft = false
        clearInterval(rightTimerId)
        clearInterval(LeftTimerId)
    }

    function control(e) {
        doodler.style.bottom = doodlerBottomSpace + 'px'
        if (e.key === 'ArrowLeft') {
            moveLeft()
        } else if (e.key === 'ArrowRight') {
            moveRight()
        } else if (e.key === 'ArrowUp') {
            moveStraight()
        }
    }

    function gameOver() {
        isGameOver = true
        while (grid.firstChild) {
            console.log('remove')
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
    }

    function start() {
        if (!isGameOver) {
            createPlatforms()
            createJumperMan()
            setInterval(movePlatforms, 30)
            jump(startPoint)
            document.addEventListener('keyup', control)
        }
    }
    start()
})