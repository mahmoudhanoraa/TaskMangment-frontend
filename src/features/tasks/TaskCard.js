import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {taskAdded, taskEdited, taskRemoved, selectAllTasks, deleteTask, editTask} from "./tasksSlice";
import {modalChange} from "./TaskModalSlice"

import {nanoid} from "@reduxjs/toolkit";

export function TaskCard(probs){
    const [key, setKey] = useState(probs.key);
    const [id, setId] = useState(probs.id);

    const tasks = useSelector(selectAllTasks)
    const task = tasks.find(task => task.id === id)
    const title_limited = task.title.length > 15 ? task.title.slice(0, 15) + '...': task.title

    const dispatch = useDispatch()
    const taskCardClicked = () => {
        dispatch(modalChange({show: true, title: task.title, description: task.description, id: id}))
    }

    const handleDescriptionChange = async (e)=>{
        console.log(probs)
        const value = e.target.value
        dispatch(taskEdited({...probs, description: value}))
        const resultAction = await dispatch(
            editTask({...probs, title: value})
        )
    }
    const handleRemoveBtnClicked = async () => {
        const resultAction = await dispatch(
            deleteTask(task)
        )
        // dispatch(taskRemoved({...probs}))
    }
    return (
            <Card style={{ width: '20rem' }}>
                <Card.Body>
                    <a style={{cursor: 'pointer'}} onClick={taskCardClicked}>
                    <InputGroup size="sm" className="mb-3">
                        <Card.Title>{title_limited}</Card.Title>
                    </InputGroup>
                    </a>
                    <InputGroup>
                        <FormControl
                            onChange={handleDescriptionChange}
                            value={task.description}
                            as="textarea"
                            placeholder="Description"
                            aria-label="Description"
                        />
                    </InputGroup>
                </Card.Body>
                <div class="mb-1">
                    <Button onClick={handleRemoveBtnClicked} variant="danger" size="sm">Remove</Button>
                </div>
            </Card>
    );
}

