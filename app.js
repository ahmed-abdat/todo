
// declare  neccessaire element
// add todo
document.addEventListener('click',(e)=> {
   if(e.target.classList.contains('header') || e.target.classList.contains('add-icon')) {
    popup.classList.remove('hide')
   }
})



const popup = document.querySelector('.popup'),
 popupCancel = document.getElementById('cancel'),
 popupSend = document.querySelector(".btns input[type='submit']")


 const todoTitle = document.querySelector(".title input[type='text'"),
 todoDiscription = document.querySelector(".desc textarea")

 const wrapper = document.querySelector('.wrapper')




// cancel todo
popupCancel.addEventListener("click",()=> {
    popup.classList.add("hide")
})

// send todo

const todo = JSON.parse(localStorage.getItem("todo") || "[]");


popupSend.addEventListener('click', (e)=> {
    e.preventDefault()
    


    let obj = {
        title : todoTitle.value,
        description : todoDiscription.value.replaceAll('\n','<br/>'),
    }

    if(todoTitle.value || todoDiscription.value){
        todo.push(obj)
        localStorage.setItem('todo',JSON.stringify(todo))
    showTodo()
    popupCancel.click()
    }
})


// show todo
function showTodo(){
    document.querySelectorAll('.todo-list').forEach(el => {
        el.remove()
    });
  todo.forEach(el => {
        let todo = `<section class="todo-list">
    <h3>${el.title}</h3>
      <p>${el.description}</p>
      <div class="icons">
        <i class="fa-solid fa-ellipsis"></i>
      </div>
  </section>`
  wrapper.innerHTML += todo
    })

}
showTodo()