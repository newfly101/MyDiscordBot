import React, {useCallback, useEffect, useRef, useState} from 'react';
import classes from "../css/Discord.module.css";

const TodoList = () => {
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: "할일 제목1",
            items: [{id: 1, isChecked: false, todoText: "예시1"}],
            todoText: '',
            addTodoVisible: false
        },
        {id: 2, title: "할일 제목2", items: [], addTodoVisible: false},
        {id: 3, title: "할일 제목3", items: [], addTodoVisible: false},
    ]);
    const inputRef = useRef([]);

    // todo #Toggle each CheckBox
    const toggleCheckBox = (index, itemIndex, e) => {
        const newTodos = [...todos];
        newTodos[index].items[itemIndex].isChecked = !newTodos[index].items[itemIndex].isChecked;
        setTodos(newTodos);
    }
    const addTodoComponent = (index, e) => {
        const newTodos = [...todos];
        newTodos[index].addTodoVisible = true;
        setTodos(newTodos);
    }
    const handleInputChange = (index, e) => {
        const newTodos = [...todos];
        newTodos[index].todoText = e.target.value;
        setTodos(newTodos);
    }

    const handleInputSubmit = useCallback((index, e) => {
        if (todos[index].todoText?.trim()) { // todo #trim() !== 0 이 값을 추가해줌
            const newTodos = [...todos];
            const newTodoId = newTodos[index].items.length + 1;
            newTodos[index].items.push({
                id: newTodoId,
                isChecked: false,
                todoText: newTodos[index].todoText
            });
            // todo #초기화 진행
            newTodos[index].todoText = '';
            newTodos[index].addTodoVisible = false;
            // todo #todo 값 설정
            setTodos(newTodos);
        }
        console.log("JSON => " + JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        // todo #input창 생성 시 focus 주기 필요함(편의성** )
        const handleClickOutside = (e) => {
            const newTodos = [...todos];
            newTodos.forEach((todo, index) => {
                if (todo.addTodoVisible && inputRef.current[index]) {
                    inputRef.current[index].focus();
                }
                if (inputRef.current[index] && !inputRef.current[index].contains(e.target)) {
                    handleInputSubmit(index, e);
                    newTodos[index].addTodoVisible = false;
                    newTodos[index].todoText = '';
                }
            });
            setTodos(newTodos);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [todos, handleInputSubmit]);

    return (
        <div className={classes.test}>
            {/*todo #todos[] 가 존재 하면  title 출력*/}
            {todos.map((todo, index) => (
                <article key={index}>
                    <button className={classes.todoTemplate} data-icon="alone"
                            onClick={(e) => addTodoComponent(index, e)}>{todo.title}</button>
                    {/* todo 2. todos[index].items 가 있으면 내용(label) 출력 */}
                    {todo.items && todo.items.map((item, itemIndex) => (
                        <div key={item.id} className={classes.addTodo}>
                                <span className={`${classes.checkbox} ${item.isChecked ? classes.active : ''}`}
                                      onClick={(e) => toggleCheckBox(index, itemIndex, e)}/>
                            <label>{item.todoText}</label>
                        </div>
                    ))}

                    {/*todo #addTodoComponent() 동작 이후 input 창 추가되어지는 부분*/}
                    {todo.addTodoVisible && (
                        <div className={classes.addTodo} ref={(el) => (inputRef.current[index] = el)}>
                            <span className={`${classes.checkbox} ${todo.isChecked ? classes.active : ''}`}
                                  onClick={toggleCheckBox}/>
                            <input
                                type='text'
                                placeholder="할 일 입력"
                                value={todo.todoText || ''}
                                onChange={(e) => handleInputChange(index, e)}
                                onKeyDown={(e) => {
                                    e.key === 'Enter' && handleInputSubmit(index, e);
                                }}
                            />
                        </div>
                    )}
                </article>
            ))}
        </div>
    );
};

export default TodoList;
