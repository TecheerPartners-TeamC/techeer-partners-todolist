import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import plus from '../assets/images/plus.png';
import notyet from '../assets/images/notyet.png';
import trash from '../assets/images/trash.png';
import completed from '../assets/images/completed.png';

function TodoList() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  // 로컬스토리지에서 할 일 목록 가져오기
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todoList')) || [];
    setTodoList(savedTodos);
  }, []);

  // 할 일 목록을 로컬스토리지에 저장
  const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todoList', JSON.stringify(todos));
  };

  // 할 일 추가
  const handleAddTodo = () => {
    if (todo.trim()) {
      const newTodo = { id: Date.now(), title: todo, isDone: false };
      const updatedTodoList = [...todoList, newTodo];
      setTodoList(updatedTodoList);
      saveTodosToLocalStorage(updatedTodoList);
      setTodo('');
      console.log('할 일이 추가되었습니다!');
    }
  };

  // 할 일 수정
  const handleUpdateTodo = (id, updatedTitle, isDone) => {
    const updatedTodoList = todoList.map((item) =>
      item.id === id ? { ...item, title: updatedTitle, isDone } : item,
    );
    setTodoList(updatedTodoList);
    saveTodosToLocalStorage(updatedTodoList);
    console.log('할 일 리스트가 수정되었습니다');
  };

  // 할 일 삭제
  const handleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(updatedTodoList);
    saveTodosToLocalStorage(updatedTodoList);
    console.log('할 일이 삭제되었습니다');
  };

  return (
    <Background>
      <ListContainer>
        <Wrapper>
          <Title>Todo List</Title>
          <InputWrapper>
            <TodoInput
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Add new task"
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            />
            <PlusButton type="button" onClick={handleAddTodo}>
              <PlusImage src={plus} alt="plus" />
            </PlusButton>
          </InputWrapper>
          <StyledTodoList>
            {todoList.map((item) => (
              <StyledTodoItem key={item.id}>
                <ActionButton
                  type="button"
                  onClick={() =>
                    handleUpdateTodo(item.id, item.title, !item.isDone)
                  }>
                  <ActionImage
                    src={item.isDone ? completed : notyet}
                    alt="complete"
                  />
                </ActionButton>
                <TodoText isDone={item.isDone}>{item.title}</TodoText>
                <DeleteButton
                  type="button"
                  onClick={() => handleDeleteTodo(item.id)}>
                  <DeleteImage src={trash} alt="delete" />
                </DeleteButton>
              </StyledTodoItem>
            ))}
          </StyledTodoList>
        </Wrapper>
      </ListContainer>
    </Background>
  );
}

export default TodoList;

// 스타일 정의
const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(145deg, #a6c0fe 0%, #cda1c2 50%, #f68084 100%);
  background-repeat: no-repeat;
`;

const ListContainer = styled.div`
  display: flex;
  width: 41.125rem;
  height: 46rem;
  background-color: white;
  border-radius: 1.875rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: black;
  font-weight: 600;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 2.5rem;
  max-width: 34rem;
  margin: 0 auto;
  font-size: 2rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TodoInput = styled.input`
  width: 29rem;
  height: 2.75rem;
  border: 1px solid #d9d9d9;
  border-radius: 0.3rem;
  outline: none;
  box-sizing: border-box;
  padding: 0.94rem;
  margin-right: 0.5rem;
  &::placeholder {
    color: #d9d9d9;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const PlusButton = styled.button`
  background-color: black;
  border-radius: 0.3rem;
  width: 3.5rem;
  height: 2.75rem;
  cursor: pointer;
`;

const PlusImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const StyledTodoList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const StyledTodoItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
  width: 100%;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
`;

const ActionImage = styled.img`
  width: 2rem;
  height: 2rem;
`;

const TodoText = styled.span`
  flex-grow: 1;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  text-decoration: ${(props) => (props.isDone ? 'line-through' : 'none')};
  color: ${(props) =>
    props.isDone ? '#d9d9d9' : 'black'}; // 완료된 항목은 회색으로 변경
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
`;

const DeleteImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;
