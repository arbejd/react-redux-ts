//import React from 'react';
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Todo, fetchTodos, deleteTodo } from "./actions";
import { StoreState } from "./reducers";

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: Function;
}

const _App: React.FC<AppProps> = ({ fetchTodos, deleteTodo, todos }) => {
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (todos.length && fetching) {
      setFetching(false);
    }
  }, [todos, fetching]);

  const onButtonClick = (): void => {
    fetchTodos();
    setFetching(true);
  };

  const onListClick = (id: number): void => {
    deleteTodo(id);
  };

  const renderList = (): JSX.Element[] => {
    return todos.map((todo) => (
      <div key={todo.id} onClick={() => onListClick(todo.id)}>
        {todo.title}
      </div>
    ));
  };

  return (
    <div>
      <button onClick={onButtonClick}>Fetch</button> {fetching && <span>Loading</span>}
      {renderList()}
    </div>
  );
};

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
};

export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App);
