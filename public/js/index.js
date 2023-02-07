const socket = io()

const input = document.querySelector("input")
document.querySelector("button").addEventListener("click", () => {
    socket.emit("message", input.value)
})

socket.on("message", data => {
    document.querySelector("p").innerText=data
})