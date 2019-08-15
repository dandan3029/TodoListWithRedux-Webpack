import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, Switch} from 'antd';

const TodoItem = ({onToggle, onRemove, completed, text}) => {
  const checkedProp = completed ? {checked: true} : {checked: false};
  return (
    <li
      className="todo-item"
      style={{
        textDecoration: completed ? 'line-through' : 'none'
      }}
    >
      <Switch
        className="toggle"
        size="small"
        checkedChildren={<Icon type="check" />}
        unCheckedChildren={<Icon type="close" />}
        {...checkedProp}
        readOnly
        onClick={onToggle}
      />
      <label className="text">{text}</label>
      <Button className="remove" size="small" onClick={onRemove}>
        <Icon className="x" type="close" size="small" />
      </Button>
    </li>
  )
}

TodoItem.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default TodoItem;
