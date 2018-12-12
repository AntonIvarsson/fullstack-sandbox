import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { TextField } from "../../shared/FormFields";
import { DateModal } from "./DateModal";
import axios from "axios";

const uppDateTodoEndpoint = "http://localhost:3001/todo";

const useStyles = makeStyles({
  card: {
    margin: "1rem"
  },
  todoLine: {
    display: "flex",
    alignItems: "center"
  },
  textField: {
    flexGrow: 2
  },
  standardSpace: {
    margin: "8px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  }
});

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  if (!toDoList) return null;

  const classes = useStyles();
  const [todos, setTodos] = useState(toDoList.todos);

  useEffect(
    () => {
      setTodos(toDoList.todos);
    },
    [toDoList.id]
  );

  const updateTodoList = () => {
    saveToDoList(parseInt(toDoList.id, 10) - 1, { todos });
    axios
      .post(uppDateTodoEndpoint, { list_id: toDoList.id, todos: todos })
      .catch(() =>
        alert("There was a problem saving your todos, sorry for that.")
      );
  };

  const handleSubmit = event => {
    event.preventDefault();
    updateTodoList();
  };

  return (
    <Card className={classes.card}>
      <CardContent onBlur={event => updateTodoList()}>
        <Typography variant="headline" component="h2">
          {toDoList.title}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map((todoItem, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant="title">
                {index + 1}
              </Typography>
              <TextField
                label="What to do?"
                value={todoItem.message}
                onChange={event => {
                  todos[index].message = event.target.value;
                  setTodos(todos);
                }}
                className={classes.textField}
              />
              <DateModal
                todos={todos}
                index={index}
                updateTodoList={updateTodoList}
              />
              <Tooltip title="Delete">
                <Button
                  size="small"
                  color="secondary"
                  className={classes.standardSpace}
                  onClick={() => {
                    todos.splice(index, 1);
                    setTodos(todos);
                    updateTodoList();
                  }}
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
              <Tooltip
                title={todoItem.finished ? "You are done! Good work." : "Done?"}
              >
                <Button
                  onClick={() => {
                    todoItem.finished = !todoItem.finished;
                    updateTodoList();
                  }}
                >
                  <Checkbox checked={todoItem.finished} />
                </Button>
              </Tooltip>
            </div>
          ))}
          <CardActions>
            <Button
              type="button"
              color="primary"
              onClick={() => {
                setTodos([...todos, { message: "", finished: false, deadline: "" }]);
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};
