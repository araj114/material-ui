let React = require('react');
let SvgIcon = require('../../svg-icon');

let EditorFormatTextdirectionRToL = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 10v5h2V4h2v11h2V4h2V2h-8C7.79 2 6 3.79 6 6s1.79 4 4 4zm-2 7v-3l-4 4 4 4v-3h12v-2H8z"/>
      </SvgIcon>
    );
  }

});

module.exports = EditorFormatTextdirectionRToL;