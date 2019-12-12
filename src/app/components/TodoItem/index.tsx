  
import * as React from 'react';
import * as style from './style.css';
import { TodoModel } from 'app/models';
import { TodoActions } from 'app/actions';

export namespace TodoItem {
  export interface Props {
    todo: TodoModel;
    deleteTodo: typeof TodoActions.deleteTodo;
    completeTodo: typeof TodoActions.completeTodo;
  }

  export interface State {}
}

export class TodoItem extends React.Component<TodoItem.Props, TodoItem.State> {
  constructor(props: TodoItem.Props, context?: any) {
    super(props, context);
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props;

    let itemClassNames = style['todoitem']

    if (todo.completed) {
      itemClassNames = style['todoitem-completed']
    }

    return (
      <li className={itemClassNames}>
        <div className={style['todoitem-view']}>
          <button
            className={style['todoitem-delete']}
            onClick={() => {
              if (todo.id) deleteTodo(todo.id);
            }}
          >X</button>
          <input
            className={style['todoitem-toggle']}
            type="checkbox"
            checked={todo.completed}
            onChange={() => todo.id && completeTodo(todo.id)}
          />
          <label>{todo.text}</label>
        </div>
      </li>
    );
  }
}