import React, { useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import styles from './app.module.css'
import Taskform from './components/taskform'
import TaskList from './components/tasklist';
import { ITask } from './interfaces/task';
import Modal from './components/modal';


function App() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter(task => {
        return task.id !== id
      })
    )
  }

    const editTask = (task: ITask): void => {
    hideOrShowModal(true);  
    setTaskToUpdate(task);
  }
  
  const updateTask = (id: number, title: string, difficulty: number) => {
    const updateTask: ITask = {id, title, difficulty}

    const updatedItems = taskList.map((task) => {
      return task.id === updateTask.id ? updateTask : task
    })

    setTaskList(updatedItems)

    hideOrShowModal(false)

  }


  const hideOrShowModal = (display: boolean) => {
  const modal = document.querySelector("#modal")
  if(display){
      modal!.classList.remove("hide")
    } else {
      modal!.classList.add("hide")
    }
  }
  
  return (
  <div>
      
    <Modal 
    children={
    <Taskform 
    btnText='Edit task' 
    taskList={taskList} 
    task={taskToUpdate} 
    handleUpdate={updateTask}
    />
    }
    />
    <Header />
    <main 
    className={styles.main}
    >
    <div>
      <h2>What are you going to do?</h2>
      <Taskform 
      btnText='Create a task' 
      taskList={taskList} 
      setTaskList={setTaskList}
      />
    </div>
    
    <div>
      <h2>Your taks:</h2>
      <TaskList 
      taskList={taskList} 
      handleDelete={deleteTask} 
      handleEdit={editTask} />
    </div>
    </main>
    <Footer />
  </div>

)
  
}

export default App;
