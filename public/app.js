$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos);

    $("#todoInput").keypress(function(event){
        if(event.which === 13){
            createTodo();
        }
    });

    $(".list").on("click","span",function(event){
        event.stopPropagation();
        let todoID = $(this).parent().data("id");
        $(this).parent().remove();
        $.ajax({
            method: "DELETE",
            url: "/api/todos/" + todoID
        })
        .catch(function(error){
            console.log(error);
        });
    });

    $(".list").on("click","li",function(){
        //add done class
        var tempThis = $(this);
        let todoID = $(this).data("id");
        let isDone = $(this).data("completed");
        var updateData = {completed: !isDone};

        //modify database
        $.ajax({
            method: "PUT",
            url: "/api/todos/" + todoID,
            data: updateData
        })
        .then(function(updatedTodo){
            tempThis.toggleClass("done");
            tempThis.data("completed") = !isDone;
        })
        .catch(function(error){
            console.log(error);
        });
    });


});

function addTodos(todosArr){
    //add todos to page here
    todosArr.forEach(function(todo){
        addTodo(todo);
    })
}

function createTodo(){
    var userInput = $("#todoInput").val();
    $.post("/api/todos", {name: userInput})
    .then(function(newTodo){
        $("#todoInput").val("");
        addTodo(newTodo);
    })
    .catch(function(error){
        console.log(error);
    });
}

function addTodo(todo){
    let newTodoLI = $("<li>" + todo.name + " <span>X</span></li>");
    newTodoLI.data('id', todo._id);
    newTodoLI.data('completed', todo.completed);
    newTodoLI.addClass("task");
    if(todo.completed){
        newTodoLI.addClass("done");
    }
    $(".list").append(newTodoLI);
}
