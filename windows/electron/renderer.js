document.getElementById('straight').addEventListener('click', async () => {
    const isDarkMode = await window.moveCar.straight()
    // document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reverse').addEventListener('click', async () => {
    await window.moveCar.reverse()
    // document.getElementById('theme-source').innerHTML = 'System'
})

function myFunction() {
    console.log("executing myFunction")
  }
  
  // Call myFunction immediately (optional)
  myFunction();
  
  // Call myFunction every 5 seconds
  setInterval(myFunction, 5000);