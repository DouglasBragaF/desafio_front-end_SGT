import { useState, useEffect } from 'react';
import { Tarefa } from '../../domain/types/TarefaTypes';
import { CreateTarefaType } from '../../domain/types/CreateTarefaType';
import { TarefaService } from '../../application/services/TarefaService';

const useFormTask = (tarefa?: Tarefa, onTaskUpdated?: () => void) => {
  const [taskData, setTaskData] = useState<CreateTarefaType>({
    titulo: tarefa?.titulo || '',
    descricao: tarefa?.descricao || '',
    dataVencimento: tarefa?.dataVencimento?.toString().substring(0, 10) || '',
  });

  useEffect(() => {
    if (tarefa) {
      setTaskData({
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        dataVencimento: tarefa.dataVencimento?.toString().substring(0, 10) || '',
      });
    }
  }, [tarefa]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    setTaskData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (tarefa) {
        await TarefaService.update({ ...tarefa, ...taskData });
        onTaskUpdated?.();
      } else {
        await TarefaService.create(taskData);
      }
    } catch (error) {
      console.error('Erro ao salvar a tarefa:', error);
    }

    setTaskData({
      titulo: '',
      descricao: '',
      dataVencimento: '',
    });

    window.location.reload();
  };

  return {
    taskData,
    handleInputChange,
    handleSubmit,
  };
};

export default useFormTask;
