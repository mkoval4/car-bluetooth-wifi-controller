document.getElementById('straight').addEventListener('click', async () => {
    const isDarkMode = await window.moveCar.straight()
    // document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reverse').addEventListener('click', async () => {
    await window.moveCar.reverse()
    // document.getElementById('theme-source').innerHTML = 'System'
})