const output = document.querySelector('.output')
const form = document.querySelector('form')
const input = document.querySelector('input')
const clean = document.querySelector('.clean')


let todos = []


const createTask = () => {
    const task = {
        id: new Date().toISOString(),
        message: input.value,
        status: false,
        date: createDate()
    }

    todos = [task , ...todos]
    renderTodos()
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    createTask()
    e.target.reset(); 

  
    // console.log(todos);
})

const renderTodos = () => {
    output.innerHTML = ''
    todos.forEach((el) => {
        const block = document.createElement('div')
        const message = document.createElement('h3')
        const strike = document.createElement('strike')
        const showDate = document.createElement('h1')
        const edit = document.createElement('button')
        const deleteBtn = document.createElement('button')
        const done = document.createElement('button')

        message.textContent = el.message
        showDate.textContent = el.date
        edit.textContent = 'edit'
        deleteBtn.textContent = 'delete'
        done.textContent = 'done'
        block.className = 'output__style'

        block.style.background = el.status ? 'aqua'  : 'red';
        block.textContent = el.status ? 'Todo is completed' : 'Todo is not completed'

        block.textContent = ''
        edit.addEventListener('click', () => {
            if(el.status){
            editTodo(el.id)
            }
        })
        deleteBtn.addEventListener('click', () => {
            // deleteTodoSplice(el.id)
            if(el.status){
                deleteTodoFilter(el.id)
            }
        })
        done.addEventListener('click', () => {
            doneTodo(el.id)
        })
        
        clean.addEventListener('click' , () =>{
            cleanFcn(el)
        })   

        
        output.append(block)
        // strike.append(message)
        block.append( message,showDate,edit, deleteBtn, done)
    })

}




const editTodo = (id) => {
    // 6)Реализовать редактирование тудушки
    //  1.prompt не принимаеи пустоту и null
    let editedMessage = prompt ("Enter edit text", ""); 
    if (editedMessage==undefined||editedMessage==null||editedMessage=='') { 
       editedMessage = prompt ("Enter edit text", "");
    } else {
        todos = todos.map(item => {
            if (id === item.id) {
                return { ...item, message: editedMessage }
            }
            return item
        })
    }
    renderTodos()
}

const deleteTodoFilter = (id) => {
    todos = todos.filter(el => el.id !== id)
    renderTodos()
}
const cleanFcn = (all) => {
    todos = todos.filter(el => el !== all)
    renderTodos()
}

const doneTodo = (id) => {
    todos = todos.map(item => {
        if (id === item.id) {
            const res = { ...item, status: !item.status }
            return res
        } 
        return item
    }) 
   
    console.log(todos)
    renderTodos()
}



const createDate = () => {
    const date = new Date()
    const day = new Date().getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const generateZeroToDate = (time) => {
        return time < 10 ? '0' + time : time
    }
    const newMinutes = generateZeroToDate(minutes)
    const newSeconds = generateZeroToDate(seconds)
    const newDays = generateZeroToDate(day)

return `Date: ${newDays}-${month}-${year} ${hours}:${newMinutes}:${newSeconds}`
}


// 0)если статус true пусть отрисует todo is completed,
//  если false todo is not completed
// 1)Отрисовать дату по человечески
// 2)После добавления новой тудушки input очищается
// 3)input не должен принимать пустоту
// 4)Реализовать удаление тудушки
// 5)Удаление тудушки после Done(status:true)
// 6)Реализовать редактирование тудушки
//  1.prompt не принимаеи пустоту и null
// 7)редактирование не работает после Done(status:true)
// 8)Вместо кнопок поставить картинки-иконки
// 9)После Done(status:true) текст должен перечеркнутся
// 10)Созданная вами тудушка должна появится первой в списке
// 11)Пронумеровать ваши тудушки
// 12)Создать кнопку, которая очистит все тудушки
// 13)2/3 todos is done
// 14)Стилизовать
// 15)Залить в гитхаб