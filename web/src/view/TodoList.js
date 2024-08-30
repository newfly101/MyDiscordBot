import React, {useEffect, useRef, useState} from 'react';
import classes from "../css/Discord.module.css";

const TodoList = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [addTodoVisible, setAddTodoVisible] = useState(false);
    const [todoText, setTodoText] = useState("");
    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null);

    const toggleCheckBox = () => {
        setIsChecked(!isChecked);
        console.log(isChecked);
    }
    const addTodoComponent = () => {
        if (!addTodoVisible) {
            setAddTodoVisible(true);
        }
    }
    const handleInputChange = (e) => {
        setTodoText(e.target.value);
    }

    const handleInputSubmit = (e) => {
        if (todoText.trim()) {
            setTodos([...todos, todoText]); 
            setTodoText('');
            setAddTodoVisible(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                handleInputSubmit(event);
                setAddTodoVisible(false);
                setTodoText('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [inputRef, todoText]);

    return (
        <div className={classes.test}>
            <article>
                <button className={classes.todoTemplate} data-icon="alone"
                        onClick={addTodoComponent}>&#36;&#123;할일제목&#125;</button>
                {todos.map((todo, index) => (
                    <div className={classes.addTodo}>
                            <span className={`${classes.checkbox} ${isChecked ? classes.active : ''}`}
                                  onClick={toggleCheckBox}/>
                        <label>{todo}</label>
                    </div>
                ))}
                {addTodoVisible && (
                    <div className={classes.addTodo} ref={inputRef}>
                            <span className={`${classes.checkbox} ${isChecked ? classes.active : ''}`}
                                  onClick={toggleCheckBox}/>
                        <input
                            type='text'
                            placeholder="할 일 입력"
                            value={todoText}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                e.key === 'Enter' && handleInputSubmit(e);
                            }}
                        />
                    </div>
                )}
            </article>
            <article>
                <button className={classes.todoTemplate} data-icon="alone"
                        onClick={addTodoComponent}>&#36;&#123;할일제목&#125;</button>
                {todos.map((todo, index) => (
                    <div className={classes.addTodo}>
                            <span className={`${classes.checkbox} ${isChecked ? classes.active : ''}`}
                                  onClick={toggleCheckBox}/>
                        <label>{todo}</label>
                    </div>
                ))}
                {addTodoVisible && (
                    <div className={classes.addTodo} ref={inputRef}>
                            <span className={`${classes.checkbox} ${isChecked ? classes.active : ''}`}
                                  onClick={toggleCheckBox}/>
                        <input
                            type='text'
                            placeholder="할 일 입력"
                            value={todoText}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                e.key === 'Enter' && handleInputSubmit(e);
                            }}
                        />
                    </div>
                )}

            </article>
            <article>
                    <button className={classes.todoTemplate} data-icon="alone"
                            onClick={addTodoComponent}>&#36;&#123;할일제목&#125;</button>
                    {todos.map((todo, index) => (
                        <div className={classes.addTodo}>
                            <span className={`${classes.checkbox} ${isChecked ? classes.active : ''}`}
                                  onClick={toggleCheckBox}/>
                            <label>{todo}</label>
                        </div>
                    ))}
                    {addTodoVisible && (
                        <div className={classes.addTodo} ref={inputRef}>
                            <span className={`${classes.checkbox} ${isChecked ? classes.active : ''}`}
                                  onClick={toggleCheckBox}/>
                            <input
                                type='text'
                                placeholder="할 일 입력"
                                value={todoText}
                                onChange={handleInputChange}
                                onKeyDown={(e) => {
                                    e.key === 'Enter' && handleInputSubmit(e);
                                }}
                            />
                        </div>
                    )}
            </article>
        </div>
    );
};

export default TodoList;
