var db = require('../models');

// Helper function for retrieving all todos
exports.getTodos = function(req,res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    });
};

// Helper function for creating a new todo
exports.createTodo = function(req,res){
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    });
};

// Helper function for retrieving specific todo
exports.getTodo = function(req,res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    });
};

// Helper function for updating specific todo
exports.updateTodo = function(req,res){
    db.Todo.findByIdAndUpdate(req.params.todoId, req.body, {new: true})
    .then(function(updatedTodo){
        res.status(200).json(updatedTodo);
    })
    .catch(function(err){
        res.send(err);
    });
};

// Helper function for deleting specific todo
exports.deleteTodo = function(req,res){
    db.Todo.findByIdAndRemove(req.params.todoId)
    .then(function(){
        res.json({message: "We deleted it!"});
    })
    .catch(function(err){
        res.send(err);
    });
};

module.exports = exports;
