import * as React from 'react';
import * as style from './style.css';

import { TodoActions } from 'app/actions/todos';
import { TodoItem } from '../TodoItem';
import { TodoModel } from 'app/models/TodoModel';

export namespace TodoList {
  export interface Props {
    todos: TodoModel[];
    actions: TodoActions;
  }
}

export class TodoList extends React.Component<TodoList.Props> {
  render () {
    const { todos, actions } = this.props;
    
    return (
      <div className={style['todolist']}>
        <div className={style['todolist-body']}>
          <ul>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                completeTodo={actions.completeTodo}
                deleteTodo={actions.deleteTodo}
              />
            ))}
          </ul>
        </div>
        <div className={style['todolist-bottom']}>
          <button onClick={actions.clearCompleted}>Clear</button>
        </div>
      </div>
    )
  }
}