import React, {useEffect, useRef, useState} from 'react';
import classes from "../css/Discord.module.css";

const TodoList = () => {
    // const [isChecked, setIsChecked] = useState(false);
    // const [addTodoVisible, setAddTodoVisible] = useState(false);
    // const [todoText, setTodoText] = useState("");
    const [todos, setTodos] = useState([
        {id: 1, title:"할일 제목1", items: [], isChecked: false, todoText: "", addTodoVisible: false},
        {id: 2, title:"할일 제목2", items: [], isChecked: false, todoText: "", addTodoVisible: false},
        {id: 3, title:"할일 제목3", items: [], isChecked: false, todoText: "", addTodoVisible: false}
    ]);
    const inputRef = useRef([]);

    const toggleCheckBox = (index, e) => {
        const newTodos = [...todos];
        newTodos[index].isChecked = !newTodos[index].isChecked;
        setTodos(newTodos);
        // setIsChecked(!isChecked);
        // console.log(isChecked);
    }
    const addTodoComponent = (index, e) => {
        console.log(index);
        if (!todos[index]) {
            return ;
        }
        const newTodos = [...todos];
        newTodos[index].addTodoVisible = true;
        setTodos(newTodos);
        // if (!addTodoVisible) {
        //     setAddTodoVisible(true);
        // }
    }
    const handleInputChange = (index, e) => {
        const newTodos = [...todos];
        newTodos[index].todoText = e.target.value;
        setTodos(newTodos);
    }

    const handleInputSubmit = (index, e) => {
        if (todos[index].todoText.trim()) {
            const newTodos = [...todos];
            newTodos[index].items.push(newTodos[index].todoText);
            newTodos[index].addTodoVisible = false;
            newTodos[index].todoText = "";
            // setTodos([...todos, todoText]);
            // setTodoText('');
            // setAddTodoVisible(false);
            console.log("todos : => "+JSON.stringify(todos));
        }
    };

    useEffect(() => {
        const handleClickOutside = (index, e) => {
            const newTodos = [...todos];
            newTodos.forEach((todo) => {
                if (inputRef.current[index] && !inputRef.current[index].contains(e.target)) {
                    handleInputSubmit(index, e);
                    newTodos[index].addTodoVisible = false;
                    newTodos[index].todoText = '';
                }
            });
            setTodos(newTodos);
            // if (inputRef.current && !inputRef.current.contains(event.target)) {
            //     handleInputSubmit(event);
            //     setAddTodoVisible(false);
            //     setTodoText('');
            // }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [todos]);
    // }, [inputRef, todoText]);

    return (
        <div className={classes.test}>
            <article>
                {todos.map((todo, index) => (
                    <div key={todo.id}>
                        <button className={classes.todoTemplate} data-icon="alone"
                                onClick={(e) => addTodoComponent(index, e)}>{todo.title}</button>
                        {todo.items.map((item, itemIndex) => (
                            <div key={itemIndex} className={classes.addTodo}>
                                <span className={`${classes.checkbox} ${todo.isChecked ? classes.active : ''}`}
                                      onClick={(e) => toggleCheckBox(index, e)}/>
                                <label>{item}</label>
                            </div>
                        ))}

                        {todo.addTodoVisible && (
                            <div className={classes.addTodo}  ref={(el) => (inputRef.current[index] = el)}>
                            <span className={`${classes.checkbox} ${todo.isChecked ? classes.active : ''}`}
                                  onClick={toggleCheckBox}/>
                                <input
                                    type='text'
                                    placeholder="할 일 입력"
                                    value={todo.todoText}
                                    onChange={(e) => handleInputChange(index, e)}
                                    onKeyDown={(e) => {
                                        e.key === 'Enter' && handleInputSubmit(index, e);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                ))}
                {/*<button className={classes.todoTemplate} data-icon="alone"*/}
                {/*        onClick={addTodoComponent}>&#36;&#123;할일제목&#125;</button>*/}
                {/*{todos.map((todo, index) => (*/}
                {/*    <div className={classes.addTodo}>*/}
                {/*            <span className={`${classes.checkbox} ${isChecked ? classes.active : ''}`}*/}
                {/*                  onClick={toggleCheckBox}/>*/}
                {/*        <label>{todo}</label>*/}
                {/*    </div>*/}
                {/*))}*/}
                {/*{addTodoVisible && (*/}
                {/*    <div className={classes.addTodo} ref={inputRef}>*/}
                {/*            <span className={`${classes.checkbox} ${isChecked ? classes.active : ''}`}*/}
                {/*                  onClick={toggleCheckBox}/>*/}
                {/*        <input*/}
                {/*            type='text'*/}
                {/*            placeholder="할 일 입력"*/}
                {/*            value={todoText}*/}
                {/*            onChange={handleInputChange}*/}
                {/*            onKeyDown={(e) => {*/}
                {/*                e.key === 'Enter' && handleInputSubmit(e);*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*)}*/}
            </article>
        </div>
    );
};

export default TodoList;
