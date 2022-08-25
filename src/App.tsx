import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";


export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  //   let [todolists, setTodolists] = useState<Array<TodolistsType>>([
  //     { id: v1(), title: "What to learn", filter: "all" },
  //     { id: v1(), title: "What to buy", filter: "completed" }
  //   ]);

  //   let [tasks, setTasks] = useState([
  //     { id: v1(), title: "HTML&CSS", isDone: true },
  //     { id: v1(), title: "JS", isDone: true },
  //     { id: v1(), title: "ReactJS", isDone: false },
  //     { id: v1(), title: "Rest API", isDone: false },
  //     { id: v1(), title: "GraphQL", isDone: false }
  //   ]);
  //   let [filter, setFilter] = useState<FilterValuesType>("all");

  let todolistID_1 = v1();
  let todolistID_2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: todolistID_1, title: "What to learn", filter: "all" },
    { id: todolistID_2, title: "What to buy", filter: "all" }
  ]);

  let [tasks, setTasks] = useState({
    [todolistID_1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false }
    ],
    [todolistID_2]: [
      { id: v1(), title: "Bread", isDone: true },
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Watermelon", isDone: false },
      { id: v1(), title: "Vegetables", isDone: false },
      { id: v1(), title: "Sigaretes", isDone: false }
    ]
  });

  function removeTask(todolistID: string, id: string) {
    // let filteredTasks = tasks.filter((t) => t.id !== id);
    // setTasks(filteredTasks);
    setTasks( {...tasks,[todolistID]: tasks[todolistID].filter(el => el.id !== id)} )
  }

  function addTask(todolistID: string, title: string) {
    // let task = { id: v1(), title: title, isDone: false };
    // let newTasks = [task, ...tasks];
    // setTasks(newTasks);
    let newTasks = { id: v1(), title: title, isDone: false };
    setTasks(  { ...tasks, [todolistID]: [newTasks,...tasks[todolistID]] }  )
  }

  function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
    // let task = tasks.find((t) => t.id === taskId);
    // if (task) {
    //   task.isDone = isDone;
    // }
    // setTasks([...tasks]);

    setTasks( {...tasks,[todolistID]:tasks[todolistID].map((el) =>el.id === taskId ? { ...el, isDone: isDone } : el)} )
    

  }

  const removeTodoList = (todolistID: string) => {
    setTodolists(todolists.filter((el) => el.id !== todolistID))
    delete tasks[todolistID]
    console.log(tasks)
  };

  //   let tasksForTodolist = tasks;

  //   if (filter === "active") {
  //     tasksForTodolist = tasks.filter((t) => t.isDone === false);
  //   }
  //   if (filter === "completed") {
  //     tasksForTodolist = tasks.filter((t) => t.isDone === true);
  //   }

  function changeFilter(todolistID: string, value: FilterValuesType) {
    setTodolists(todolists.map((el) =>el.id === todolistID ? { ...el, filter: value } : el))
  }


  const TodolistForApp = todolists.map((el) => {
    let tasksForTodolist = tasks[el.id];

    if (el.filter === "active") {
      tasksForTodolist = tasks[el.id].filter((t) => t.isDone === false);
    }
    if (el.filter === "completed") {
      tasksForTodolist = tasks[el.id].filter((t) => t.isDone === true);
    }

    return (
      <Todolist
        key={el.id} // for virtual DOM
        todolistID={el.id}
        title={el.title}
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={el.filter}
        removeTodoList={removeTodoList}
      />
    );
  })

  return (
    <div className="App">

      {TodolistForApp.length !== 0 ? TodolistForApp : <span style={{"margin":"auto"}}>Список тудулистов пуст</span>}

    </div>
  );
}

export default App;
