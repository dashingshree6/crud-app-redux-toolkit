import React, { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { updateTutorial, deleteTutorial } from '../slices/tutorials';
import TutorialService from '../services/TutorialService';
import { current } from 'immer/dist/internal';


const Tutorial = (props) => {
    const initialTutorialState = {
        id: null,
        title: "",
        description: "",
        published: false
    };
    const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState)
    const [message, setMessage] = useState("")

    const dispatch = useDispatch();

    const getTutorial = (id) => {
        TutorialService.get(id).then(res => {
            setCurrentTutorial(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getTutorial(props.match.params.id)
    }, [props.match.params.id])

    const handleInputChange = event => {
        const { name, value} = event.target;
        setCurrentTutorial({ ...currentTutorial, [name]:value})
    }

    const updateStatus = status => {
        const data = {
            id: currentTutorial.id,
            title: currentTutorial.title,
            description: currentTutorial.description,
            published: status
        }

        dispatch(updateTutorial({ id:currentTutorial.id, data})).unwrap().then(res => {
            setCurrentTutorial({ ...currentTutorial, published:status})
            setMessage("This status was updated succesffully")
        }).catch(err => {
            console.log(err)
        })
    }

    const updateContent = () => {
        dispatch(updateTutorial({ id:currentTutorial.id, data:currentTutorial})).unwrap().then(res => {
            setMessage('The tutorial was updated successfully')
        }).catch(err => {
            console.log(err)
        })
    }

    const removeTutorial = () => {
        dispatch(deleteTutorial({ id:currentTutorial.id})).unwrap().then(() => {
            props.history.published("/tutorials")
        }).catch(err => {
            console.log(err)
        })

    }

    return (
        <div>
            { currentTutorial ? (
                <div className='edit-form'>
                    <h4>Tutorial</h4>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='title'>Title</label>
                            <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={currentTutorial.title}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='description'>Description</label>
                            <input
                            type='text'
                            className='form-control'
                            id='description'
                            name='description'
                            value={currentTutorial.description}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label>
                                <strong>Status</strong>
                            </label>
                            { currentTutorial.published ? "Published" : "Pending"}
                        </div>

                        { currentTutorial.published ? (
                            <button 
                            className='badge badge-primary mr-2'
                            onClick={() => updateStatus(false)}
                            >
                                Unpublish
                            </button>
                        ) : (
                            <button
                            className='badge badge-primary mr-2'
                            onClick={() => updateStatus(true)}
                            >
                                Publish
                            </button>
                        )}

                        <button 
                        className='badge badge-danger mr-2'
                        onClick={() => updateStatus(true)}
                        >
                            Delete
                        </button>

                        <button
                        type='submit'
                        className='badge nadge-success'
                        onClick={updateContent}
                        >
                            Update
                        </button>

                        <p>{message}</p>
                    </form>
                </div>
            ) : (
                <div>
                    <br/>
                    <p>Please click on a TUtorial...</p>
                </div>
            )}
        </div>
    )
}

export default Tutorial;