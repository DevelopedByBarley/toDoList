async function getToDo() {
    const toDo = await fetch('/toDoList')
    console.log(await toDo.json())
}

getToDo();