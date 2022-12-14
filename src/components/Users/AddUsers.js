import React, { useState } from 'react'
import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css';
import ErrorModal from '../UI/ErrorModal';
const AddUsers = (props) => {
    //state for handling inputs
    const [enteredUsername, setEnteredusername]= useState('');
    const [enteredAge, setEnteredAge]= useState('');
    const [error, setError] = useState();

    //Add user function
    const addUserHandler = (event) =>{
        event.preventDefault();
        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0){
            setError({
                title: 'Invalid input',
                message: 'Please enter valid name and age(non-empty value)'
            })
            return;
        }
        if(+enteredAge < 1){
            setError({
                title: 'Invalid Age',
                message: 'Please enter valid age'
            })
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredusername('');
        setEnteredAge('');
    }

    const errorHandler =() =>{
        setError(null);
    }

    const usernameChangeHandler = (event) =>{
        setEnteredusername(event.target.value);
    }

    const ageChangeHandler = (event) =>{
        setEnteredAge(event.target.value);
    }
  return (
    <>
    {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
    <Card className={classes.input}>
    <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input type="text" id='username' value={enteredUsername} onChange={usernameChangeHandler}/>
        <label htmlFor="age">Age (Years)</label>
        <input type="number" id='age' value={enteredAge} onChange={ageChangeHandler} />
        <Button type='submit'>Add User</Button>
    </form>
    </Card>
    </>
  )
}

export default AddUsers