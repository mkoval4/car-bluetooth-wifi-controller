document.getElementById('forward').addEventListener('click', async () => {
    await window.moveCar.forward()
})

document.getElementById('reverse').addEventListener('click', async () => {
    await window.moveCar.reverse()
})

document.getElementById('left').addEventListener('click', async () => {
    await window.moveCar.left()
})

document.getElementById('right').addEventListener('click', async () => {
    await window.moveCar.right()
})

document.getElementById('updateLeftAngle').addEventListener('click', async () => {
    let angle = document.getElementById('leftAngle').value
    await window.carStats.updateLeftAngle(angle)
})

document.getElementById('updateRightAngle').addEventListener('click', async () => {
    let angle = document.getElementById('rightAngle').value
    await window.carStats.updateRightAngle(angle)
})

async function getCarStats() {
    const stats = await window.carStats.get()
    document.getElementById('temperature').innerText = stats.temperature
    document.getElementById('distance').innerText = stats.distance
    document.getElementById('battery').innerText = stats.battery
}

getCarStats();

setInterval(getCarStats, 5000);