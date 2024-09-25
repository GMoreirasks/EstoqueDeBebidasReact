// TaskForm.js
import { useState, useEffect } from "react";
import PropTypes from "prop-types"; 

function TaskForm({ addTask, editingTask, tasks }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(""); 
  const [quantidade, setQuantidade] = useState(""); 

  useEffect(() => {
    if (editingTask !== null) {
      const taskToEdit = tasks[editingTask];
      setNome(taskToEdit.nome || ""); 
      setPreco(
        taskToEdit.preco !== undefined
          ? taskToEdit.preco.toFixed(2).replace(".", ",")
          : ""
      ); 
      setQuantidade(
        taskToEdit.quantidade !== undefined
          ? taskToEdit.quantidade.toString()
          : ""
      ); 
    } else {
      setNome("");
      setPreco("");
      setQuantidade("");
    }
  }, [editingTask, tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({
      nome,
      preco: parseFloat(preco.replace(",", ".")) || 0, 
      quantidade: parseInt(quantidade) || 0, 
    });
    setNome("");
    setPreco("");
    setQuantidade("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome da Bebida"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text" 
        placeholder="Preço (R$)"
        value={preco}
        onChange={(e) => setPreco(e.target.value)} 
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
      />
      <button type="submit">Adicionar Bebida</button>
    </form>
  );
}


TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
  editingTask: PropTypes.number, 
  tasks: PropTypes.array.isRequired,
};

export default TaskForm;
