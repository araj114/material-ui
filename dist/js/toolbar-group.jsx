/**
 * @jsx React.DOM
 */

var React = require('react'),
    mui = require('mui'),
    Classable = require('./mixins/classable.js');

var ToolbarGroup = React.createClass({

  propTypes: {
    key: React.PropTypes.number.isRequired,
    float: React.PropTypes.string,
    groupItems: React.PropTypes.array
  },

  mixins: [Classable],

  getInitialState: function() {
    return {
    }
  },

  getDefaultProps: function() {
    return {
    };
  },

  render: function() {

    var classes = this.getClasses('mui-toolbar-group', {
      'mui-left': this.props.float === 'left',
      'mui-right': this.props.float === 'right'
    })

    return (
      <div className={classes}>
        {this._getChildren()}
      </div>
    );
  },

  _getChildren: function() {
    var children = [],
        item,
        itemComponent;

    for (var i=0; i < this.props.groupItems.length; i++) {
      item = this.props.groupItems[i];

      switch (item.type) {

        case 'separator':
          itemComponent = (
            <span className="mui-toolbar-separator">
              &nbsp;
            </span>
          );
          break;

        case 'title':
          itemComponent = (
            <span className="mui-toolbar-title">
              {item.title}
            </span>
          );
          break;

          default:
            itemComponent = item;
      }

      children.push(itemComponent);
    }

    return children;
  }

});

module.exports = ToolbarGroup;