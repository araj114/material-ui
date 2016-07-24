// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import ClassNames from 'classnames';
import IconButton from '../IconButton';

export const styleSheet = createStyleSheet('Checkbox', (theme) => {
  return {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      color: theme.palette.text.secondary,
    },
    checked: {
      color: theme.palette.accent[500],
    },
    checkbox: {
      cursor: 'pointer',
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      margin: 0,
      padding: 0,
    },
  };
});

export default class Checkbox extends Component {
  static propTypes = {
    /**
     * Checkbox is checked if true.
     */
    checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * @ignore
     */
    defaultChecked: PropTypes.bool,
    /**
     * If true, the checkbox will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Callback function that is fired when the checkbox is changed.
     *
     * @param {object} event `change` event
     * @param {boolean} checked The `checked` value of the checkbox
     */
    onChange: PropTypes.func,
    /**
     * If false, the ripple effect will be disabled.
     */
    ripple: PropTypes.bool,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {};

  componentWillMount() {
    const { props } = this;

    this.isControlled = props.checked !== undefined;

    if (!this.isControlled) { // not controlled, use internal state
      this.setState({ checked: props.defaultChecked !== undefined ? props.defaultChecked : false });
    }
  }

  input = undefined;
  isControlled = undefined;

  handleChange = (event) => {
    let newChecked;

    if (this.isControlled) {
      newChecked = !this.props.checked;
    } else {
      newChecked = !this.state.checked;
      if (this.input && this.input.checked !== newChecked) {
        this.input.checked = newChecked;
      }
      this.setState({ checked: !this.state.checked });
    }

    if (this.props.onChange) {
      this.props.onChange(event, newChecked);
    }
  };

  render() {
    const {
      checked: checkedProp,
      className,
      disabled,
      onChange, // eslint-disable-line no-unused-vars
      ripple,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);
    const checked = this.isControlled ? checkedProp : this.state.checked;
    const classNames = ClassNames(classes.root, {
      [classes.disabled]: disabled,
      [classes.checked]: checked,
    }, className);

    return (
      <IconButton
        component="span"
        className={classNames}
        disabled={disabled}
        ripple={ripple}
        onClick={this.handleChange}
        role="checkbox"
        aria-checked={checked}
      >
        <span className="material-icons" aria-hidden="true">
          {checked ? 'check_box' : 'check_box_outline_blank'}
        </span>
        <input
          tabIndex="-1"
          ref={(c) => this.input = c}
          type="checkbox"
          checked={this.isControlled ? checkedProp : undefined}
          onChange={this.handleChange}
          className={classes.checkbox}
          disabled={disabled}
          {...other}
        />
      </IconButton>
    );
  }
}
