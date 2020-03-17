let page = 1
const monsterList = document.querySelector("#monster-container")
const created = document.querySelector("#create-monster")
const back = document.querySelector("#back")
const forward = document.querySelector("#forward")

function ineedthis(){
fetch("http://localhost:3000/monsters?_limit=50&_page=" + page)
    .then(res => res.json())
    .then(monsters => {
        monsters.forEach(monster => {
            showMonster(monster)
        })
    })
}

    function showMonster(monster) {
        
        const div = document.createElement("div")

        const h1 = document.createElement("h1")
        h1.innerText = monster.name

        const h2 = document.createElement("h2")
        h2.innerText = monster.age

        const p = document.createElement("p")
        p.innerText = monster.description

        div.append(h1, h2, p)
        monsterList.append(div)
    }

    const form = document.createElement('form')

    const name = document.createElement('input')
    name.placeholder = "Name"
    name.id = "name"

    const age = document.createElement('input')
    age.placeholder = "age"
    age.id = "age"

    const bio = document.createElement("input")
    bio.placeholder = "description"
    bio.id = "bio"

    const btn = document.createElement("button")
    btn.innerText = "Create Monster"

    form.append(name, age, bio, btn)
    created.append(form)

    form.addEventListener('submit', () =>{
        event.preventDefault()

        let name = event.target[0].value
        let age = event.target[1].value
        let bio = event.target[2].value

        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                age: age,
                description: bio
            })
        })
        .then (res => res.json())
        .then (createdMonster => showMonster(createdMonster))
    })

    ineedthis()

    back.addEventListener('click', () => {
        if (page === 1){
            alert("Unable to go that way")
        }else
        monsterList.innerHTML = ""
        page--
        ineedthis(page)
    })

    forward.addEventListener("click", () =>{
        if (page === 20){
            alert("you Cant go that way")
        }else
        monsterList.innerHTML = ""
        page++
        ineedthis(page)

    })