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

    function start() {
        if (!isGameOver) {
            createJumperMan()
            createPlatforms()
        }
    }
    start()
})