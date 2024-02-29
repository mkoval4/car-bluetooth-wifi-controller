document.getElementById('straight').addEventListener('click', async () => {
    const isDarkMode = await window.moveCar.straight()
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

document.getElementById('selfDrive').addEventListener('click', async () => {
    await window.moveCar.selfDrive()
})

document.getElementById('stopSelfDrive').addEventListener('click', async () => {
    await window.moveCar.stopSelfDrive()
})


async function getCarStats() {
    let val = await window.moveCar.get()
    console.log(val)
}

getCarStats();

setInterval(getCarStats, 5000);