console.log("hello, friend!");
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.grid')
    const JumperMan = document.createElement('div')
    let JumperManLeft = 50
    let JumperManBottom = 150
    let isGameOver = false
    let platformCount = 5

    function createJumperMan() {
        grid.appendChild(JumperMan)
        JumperMan.classList.add('JumperMan')
        JumperManLeftSpace = platforms[0].left
        JumperMan.style.left = JumperManLeft + 'px'
        JumperMan.style.bottom = JumperManBottom + 'px'
    }
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

    function fall() {
        isJumping = false
        clearInterval(upTimerId)
        downTimerId = setInterval(function() {
            jumperManBottomSpace -= 5
            jumperMan.style.bottom = jumperManBottomSpace + 'px'
            if (jumperManBottomSpace <= 0) {
                gameOver()
            }
            platforms.forEach
        })
    }

    function start() {
        if (!isGameOver) {
            createJumperMan()
            createPlatforms()
        }
    }
    start()
})