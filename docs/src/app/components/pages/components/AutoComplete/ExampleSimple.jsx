import React from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';

export default class AutoCompleteExampleSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
  }

  handleUpdateInput = (t) => {
    this.setState({
      dataSource: [t, t + t, t + t + t],
    });
  };

  render() {
    return (
      <AutoComplete
        hintText="Type c"
        dataSource={this.state.dataSource}
        onUpdateInput={this.handleUpdateInput}
      />
    );
  }
}
