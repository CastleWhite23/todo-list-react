import { useState } from "react";

const TodoForm = ({ addTodo })=>{

    const [value, setValue] = useState("");  //useState("") é o valor inicial
    const [category, setCategory] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!value || !category) return;
        
        addTodo(value, category);


        setCategory("");
        setValue("");

    }
    //onChange={(e) => (setValue(e.target.value)) --> esse código ocorre tod vez que algo ocorrer no input
    //o setValue vai ser responsável por guardar esse valor
    //o (e) é de evento, target é o elemento que disparou o evento, o value é o valor do elemento
    //ou seja quando o evento for disparado, o setValue recebe como parametro o valor do input
    return(

        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Digite o titulo" value={value}
            onChange={
                (e) => (setValue(e.target.value))
            }/>
            <select value={category} onChange={
                (e) => (setCategory(e.target.value)
            )}>
                <option value="">Selecione uma categoria</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Pessoal">Pessoal</option>
                <option value="Estudos">Estudos</option>
            </select>
            <button type="submit" className="criar">Crie sua tarefa</button>
        </form>

    )
}

export default TodoForm;