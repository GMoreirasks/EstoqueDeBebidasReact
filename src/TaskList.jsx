
import PropTypes from "prop-types"; 
import "./TaskList.css";
import {
  AiOutlineFileText,
  AiFillExclamationCircle,
  AiFillEdit,
} from "react-icons/ai";

function TaskList({ tasks, removeTask, updateTask }) {
  return (
    <table className="task-table">
      <thead>
        <tr>
          <th className="task-header">
            <AiOutlineFileText className="header-icon" /> Bebida
          </th>
          <th>
            <AiFillExclamationCircle className="header-icon" /> Quantidade
          </th>
          <th>
            <AiFillEdit className="header-icon" /> Preço
          </th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td className={`task-cell`}>{task.nome || 'N/A'}</td>
            <td>{task.quantidade || 'N/A'}</td>
            <td>
              {typeof task.preco === 'number' ? 
                `R$ ${task.preco.toFixed(2).replace('.', ',')}` : 
                'N/A'}
            </td>
            <td>
              <button
                className="remove-button"
                onClick={() => removeTask(index)}
              >
                Remover
              </button>
              <button
                className="update-button"
                onClick={() => updateTask(index)}
              >
                Atualizar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Definindo as PropTypes
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string.isRequired,
      quantidade: PropTypes.number.isRequired,
      preco: PropTypes.number.isRequired,
    })
  ).isRequired,
  removeTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskList;
