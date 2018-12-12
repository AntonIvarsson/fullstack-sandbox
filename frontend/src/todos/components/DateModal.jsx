import React, { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";
import DatePicker from "./DatePicker";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  paper: {
    position: "absolute",
    width: 300,
    height: 60,
    backgroundColor: "white",
    boxShadow: 5,
    padding: 40
  },
  textField: {
    flexGrow: 1
  }
});

export const DateModal = ({ todos, index, updateTodoList }) => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState();
  const [deadline, setDeadline] = useState(todos[index].deadline);

  Date.daysBetween = (date1, date2) => {
    var one_day = 1000 * 60 * 60 * 24;

    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    var difference_ms = date2_ms - date1_ms;

    return Math.round(difference_ms / one_day);
  };

  const calcuLateTime = () => {
    if (deadline === null) return "";

    const timeBetween = Date.daysBetween(
      new Date(),
      new Date(todos[index].deadline)
    );

    if (isNaN(timeBetween)) return "";

    if (timeBetween < 0) {
      return `, missed deadline with ${Math.abs(timeBetween)} days`;
    } else if (timeBetween === 0) {
      return " Hurry upp! You have less than 24 hours";
    }
    return `, ${Math.abs(timeBetween)} ${
      timeBetween === 1 ? "day" : "days"
    } left`;
  };

  const giveRender = () => {
    if (todos[index].finished) return;
    return (
      <Tooltip
        title={
          deadline === "" ? "Set deadline" : `Change deadline${calcuLateTime()}`
        }
      >
        <Button
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <img alt="" src={"baseline-query_builder-24px.svg"} />
        </Button>
      </Tooltip>
    );
  };

  return (
    <Fragment>
      {giveRender()}
      <Modal
        open={modalOpen || false}
        onClose={() => {
          setModalOpen(false);
          todos[index].deadline = deadline;
          updateTodoList();
        }}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <DatePicker deadline={deadline} setDeadline={setDeadline} />
        </div>
      </Modal>
    </Fragment>
  );
};
