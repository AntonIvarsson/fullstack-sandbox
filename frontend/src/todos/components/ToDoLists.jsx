import React, { Fragment, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { ToDoListForm } from "./ToDoListForm";
import axios from "axios";

const personalTodosEndpoint = "http://localhost:3001/todolists";

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({});
  const [activeList, setActiveList] = useState();

  useEffect(() => {
    axios
      .get(personalTodosEndpoint)
      .then(resp => setToDoLists(resp.data.data))
      .catch(() =>
        alert("Something went wrong loading your todos, sorry for that :(")
      );
  }, []);

  if (!Object.keys(toDoLists).length) return null;
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography variant="headline" component="h2">
            My ToDo Lists
          </Typography>
          <List>
            {Object.keys(toDoLists).map(key => (
              <ListItem key={key} button onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={toDoLists[key].title} />
                <Checkbox
                  disabled={true}
                  checked={
                    !toDoLists[key].todos.map(x => x.finished).includes(false)
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <ToDoListForm
        toDoList={toDoLists[activeList]}
        saveToDoList={(id, { todos }) => {
          const listToUpdate = toDoLists[id];
          setToDoLists({
            ...toDoLists,
            [id]: { ...listToUpdate, todos }
          });
        }}
      />
    </Fragment>
  );
};
