import * as React from 'react';
import * as style from './style.css';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { omit } from 'app/utils';

import { TodoActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { TodoInput, TodoList } from 'app/components';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    todos: RootState.TodoState;
    actions: TodoActions;
  }
}

@connect(
  (state: RootState, ownProps): Pick<App.Props, 'todos'> => {
    return { todos: state.todos };
  },
  (dispatch: Dispatch): Pick<App.Props, 'actions'> => ({
    actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.Props> {
  constructor(props: App.Props, context?: any) {
    super(props, context);
    this.handleClear = this.handleClear.bind(this);
  }

  handleClear(): void {
    const hasCompletedTodo = this.props.todos.some((todo) => todo.completed || false);
    if (hasCompletedTodo) {
      this.props.actions.clearCompleted();
    }
  }
  
  render () {
    const { todos, actions } = this.props;

    return (
      <div className={style['app']}>
        <div className={style['app-wrapper']}>
          <div className={style['app-header']}>TO-DO LIST</div>
          <div className={style['input-section']}>
            <TodoInput addTodo={actions.addTodo} />
          </div>
          <div className={style['list-section']}>
            <TodoList todos={todos} actions={actions} />
          </div>
        </div>
      </div>
    )
  }
}