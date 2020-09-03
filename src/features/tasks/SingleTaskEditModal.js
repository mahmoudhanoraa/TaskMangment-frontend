import React, {useState} from "react";
import Modal from "react-bootstrap/cjs/Modal";
import Button from "react-bootstrap/cjs/Button";
import InputGroup from "react-bootstrap/InputGroup"
import { useSelector, useDispatch} from "react-redux";
import FormControl from "react-bootstrap/FormControl";
import {modalChange} from "./TaskModalSlice";
import {taskEdited, editTask, addNewTaskm, selectAllTasks, addNewTask} from "./tasksSlice";

export const SingleTaskEditModal = () => {

    const modal = useSelector(state => state.modal)
    const tasks = useSelector(selectAllTasks)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(modalChange({id: -1, show: false, title: '', description: ''}))
    }
    const handleDescriptionEdit = async (e) => {
        const value = e.target.value
        dispatch(taskEdited({...modal, description: value}))
        dispatch(modalChange({...modal, description: value}))
        const resultAction = await dispatch(
            editTask({...modal, description: value})
        )
    }

    const handleTitleEdit = async (e) => {
        const value = e.target.value
        dispatch(taskEdited({...modal, title: value}))
        dispatch(modalChange({...modal, title: value}))
        const resultAction = await dispatch(
            editTask({...modal, title: value})
        )
    }

    return (
        <Modal
            show={modal.show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                        <FormControl onChange={handleTitleEdit} aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={modal.title}/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                    onChange={handleDescriptionEdit}
                    value={modal.description}
                    as="textarea"
                    placeholder="Description"
                    aria-label="Description"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}