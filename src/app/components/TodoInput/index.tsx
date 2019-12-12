import * as React from 'react';
import * as style from './style.css';

import { TodoActions } from 'app/actions/todos';

export namespace TodoInput {
  export interface Props {
    text?: string;
    addTodo: typeof TodoActions.addTodo;
  }

  export interface State {
    text: string;
  }
}

export class TodoInput extends React.Component<TodoInput.Props, TodoInput.State> {
  constructor(props: TodoInput.Props, context?: any) {
    super(props, context);
    this.state = { text: this.props.text || '' };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: event.target.value });
  }

  handleBlur(event: React.FocusEvent<HTMLInputElement>) {
  }

  handleKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.which === 13) {
      this.handleSave()
    }
  }

  handleButtonClick () {
    this.handleSave()
  }

  handleSave() {
    const textInput = this.refs.input as HTMLInputElement;
    const text = textInput.value.trim();

    if (!text.length) {
      return;
    }
    
    this.props.addTodo({ text });
    this.setState({ text: '' });
  }

  render () {
    return (
      <div className={style['todoinput']}>
        <input ref="input" placeholder="new task"
          value={this.state.text}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeydown}></input>
        <button className={style['todoinput-button-add']}
          onClick={this.handleButtonClick}>ADD</button>
      </div>
    )
  }
}