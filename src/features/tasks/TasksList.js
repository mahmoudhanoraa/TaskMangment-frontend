import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {taskAdded, taskEdited} from "./tasksSlice";
import {nanoid} from "@reduxjs/toolkit";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import { TaskCard } from "./TaskCard";
import Container from "react-bootstrap/cjs/Container";
import ButtonGroup from "react-bootstrap/cjs/ButtonGroup";
import ButtonToolbar from "react-bootstrap/cjs/ButtonToolbar";
import { BsSearch } from 'react-icons/bs'
import { CgMathPlus } from 'react-icons/cg'
import { selectAllTasks, fetchTasks, addNewTask } from './tasksSlice'



export function TasksList(){
    const dispatch = useDispatch()
    const tasks = useSelector(selectAllTasks)
    const taskStatus = useSelector(state => state.tasks.status)


    useEffect(() => {
        if (taskStatus === 'idle') {
            dispatch(fetchTasks())
        }
    }, [taskStatus, dispatch])

    const renderedTasks = tasks.map(task => (
        taskStatus === 'succeeded' && task.hidden === true ? null :
            <Col>
                <TaskCard id={task.id} key={task.key} title={task.title} description={task.description}
                          hidden={task.hidden}/>
            </Col>
    ))

    const onAddNewTaskClicked = async () => {
        const randomVal = nanoid()
        const newTask = {id:randomVal, key:randomVal, title:'New Task', description:'', hidden:'false'}
        // dispatch(taskAdded(newTask))
        const resultAction = await dispatch(
            addNewTask(newTask)
        )
    }

    const handleUserSearchInput = (e) => {
        const searchTxt = e.target.value.toLowerCase()
        if (searchTxt === '')
            tasks.forEach(task => dispatch(taskEdited({...task, hidden:false})))

        const list_to_hide = tasks.filter(task => !task.description.toLowerCase().includes(searchTxt) &&
                                                    !task.title.toLowerCase().includes(searchTxt))

        const list_to_show = tasks.filter(task => task.description.toLowerCase().includes(searchTxt) ||
            task.title.toLowerCase().includes(searchTxt))
        list_to_hide.forEach(task => dispatch(taskEdited({...task, hidden:true})))
        list_to_show.forEach(task => dispatch(taskEdited({...task, hidden:false})))
        console.log(tasks)
    }

    return(
        <Container className="mt-4">
            <ButtonToolbar className="mb-4" aria-label="Toolbar with Button groups">
                <ButtonGroup className="mr-4" aria-label="First group">
                    <Button onClick={onAddNewTaskClicked} variant="primary"><CgMathPlus/></Button>{' '}
                </ButtonGroup>
                <InputGroup>
                    <FormControl
                        onChange={handleUserSearchInput}
                        type="text"
                        placeholder="Search"
                        aria-label="Input group example"
                        aria-describedby="btnGroupAddon"
                    />
                </InputGroup>
            </ButtonToolbar>

            <Row xs={3} md={3} lg={3}>
                { renderedTasks }
            </Row>
        </Container>
    );
}