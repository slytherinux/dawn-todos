let todoList = {

    todos: [],

    load: function() {
        let listData = localStorage.getItem('todos');
        this.todos = JSON.parse(listData);
    },
    sync: function() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
        let listData = localStorage.getItem('todos');
        this.todos = JSON.parse(listData);
    },
    add: function(todo) {
        this.todos.push({
            task: todo,
            isDone: false
        });
    },

    toggle: function(pos) {
        this.todos[pos].isDone = !this.todos[pos].isDone;
    },

    remove: function(pos) {
        this.todos.splice(pos, 1);
    },

    removeAll: function() {
        this.todos = [];
    }

};

let handlers = {

    add: function() {
        textInput = document.querySelector('#addTodoInput');
        todoList.add(textInput.value);
        textInput.value = '';
        view.display();
    },

    toggle: function(pos) {
        todoList.toggle(pos);
        view.display();
    },

    remove: function(pos) {
        todoList.remove(pos);
        view.display();
    },

    removeAll: function() {
        todoList.removeAll();
        view.display();

        /* let element = document.querySelector('#refresh');
        element.style.transform = 'rotate(360deg)';
        setTimeout(function() {
            element.style.transform = 'rotate(0deg)';
        }, 200); */
    }

};

let view = {

    display: function() {
        const itemList = document.querySelector('ul');
        if (todoList.todos.length === 0) {
            itemList.innerHTML = '<p id="placeHolder">You\'re free for the day!</p>';
        } else {
            itemList.innerHTML = '';
            for (let i = 0; i < todoList.todos.length; i++) {

                let listItem = document.createElement('li');
                let todo = document.createElement('p');
                let toggle = document.createElement('i');

                listItem.id = i;
                listItem.className = 'todoItem';

                todo.textContent = todoList.todos[i].task;

                if (todoList.todos[i].isDone) {
                    toggle.className = 'fas fa-check-circle check';
                    todo.className = 'strikeThru';
                } else {
                    toggle.className = 'far fa-check-circle uncheck';
                }

                listItem.appendChild(toggle);
                listItem.appendChild(todo);
                listItem.appendChild(this.createButton());
                itemList.appendChild(listItem);
            }
        }

        view.date();
        todoList.sync();
    },

    createButton: function() {
        let button = document.createElement('i');
        button.className = 'far fa-trash-alt thrash';
        return button;
    },

    listen: function() {
        let todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function(event) {
            let element = event.target;
            if (element.className === 'far fa-trash-alt thrash') {
                let target = parseInt(element.parentNode.id);
                handlers.remove(target);
            } else if (element.className === 'fas fa-check-circle check' ||
                element.className === 'far fa-check-circle uncheck') {
                let target = parseInt(element.parentNode.id);
                handlers.toggle(target);
            }
        });
    },

    date: function() {
        let holder = document.querySelector('#date');
        let today = new Date();
        let days = ['Sundy', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let months = [
            'january', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];

        let day = today.getDay();
        let date = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();

        holder.textContent = `${days[day]}, ${date} ${months[month]} ${year}`;
    }

};

todoList.load();
view.display();
view.listen();

//that'll do it, pig