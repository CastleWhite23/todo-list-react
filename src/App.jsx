import { useState } from 'react'
import "./App.css"
import Todo from './components/Todo';
 import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';

function App() {

  //como ver os dados[todos], como alterar os dados[setTodos]
  //isso é o useState
  if(!localStorage.getItem("todos")){
    localStorage.setItem("todos", JSON.stringify([]));
  }
  
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")));

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");


  //Math.floor(Math.random * 10000) -- gera um número aleatório
  const addtodo = (text, category) => {
    const newTodos = [
      ...todos, //pega todos os valores do to-dos
      {
        id: Math.floor(10000 * Math.random()),
        text,
        category,
        isCompleted: false,
      }
    ];

    setTodos(newTodos);

    localStorage.setItem("todos", JSON.stringify(newTodos));

    // console.log(JSON.parse(localStorage.getItem("todo")));
  }

  const removeTodo = (id) => {
    const newTodos = JSON.parse(localStorage.getItem("todos"));
    const filteredTodos = newTodos.filter((todo) => todo.id !== id ? todo : null);//filtra cada item desse array

    setTodos(filteredTodos);

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
  }

  const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.map((todo) => todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo)
    setTodos(newTodos);

    localStorage.setItem("todos", JSON.stringify(newTodos));
  }


  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>

      <Search search={search} setSearch={setSearch} />

      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />

      <div className="todo-list">


        {/* Percorrer a lista de tarefas e exibir aqui */}
        {/* map percorre todos os items do array e realiza uma função com cada item */}
        {/* o key é nessessário para não dar problema*/}

        {todos
          .filter((todo) =>
            filter === "All"
              ? true
              : filter === "Completed"
                ? todo.isCompleted
                : !todo.isCompleted
          )
          .filter(
            (todo) => todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) =>
            sort === "Asc"
              ? a.text.localeCompare(b.text)
              : b.text.localeCompare(a.text)
          ).map(
            (todo) => (
              <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo} />
            ))}
      </div>

      <h2 className="aviso"
        style={
          {
            display: todos.length !== 0 ? "none" : "inline"
          }
        }
      >Não tem nenhuma tarefa para ser feita!</h2>
      

      <div className="criar-todo">
        <h1>Criar tarefa:</h1>
        <TodoForm addTodo={addtodo} />
      </div>

    </div>
  )
}

export default App
