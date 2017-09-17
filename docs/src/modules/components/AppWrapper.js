// @flow weak
/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import getContext, { getTheme } from 'docs/src/modules/styles/getContext';
import AppFrame from 'docs/src/modules/components/AppFrame';
import { lightTheme, darkTheme, setPrismTheme } from 'docs/src/modules/utils/prism';
import config from 'docs/src/config';

// Injected the insertion-point-jss after docssearch
if (process.browser && !global.__INSERTION_POINT__) {
  global.__INSERTION_POINT__ = true;
  const styleNode = document.createComment('insertion-point-jss');
  const docsearchStylesSheet = document.querySelector('#insertion-point-jss');

  if (document.head && docsearchStylesSheet) {
    document.head.insertBefore(styleNode, docsearchStylesSheet.nextSibling);
  }
}

class AppWrapper extends React.Component<any, any> {
  componentWillMount() {
    this.styleContext = getContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    if (this.props.dark) {
      setPrismTheme(darkTheme);
    } else {
      setPrismTheme(lightTheme);
    }

    // Wait for the title to be updated.
    this.googleTimer = setTimeout(() => {
      window.gtag('config', config.google.id, {
        page_path: location.pathname,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dark !== this.props.dark) {
      this.styleContext.theme = getTheme(nextProps.dark);

      if (nextProps.dark) {
        setPrismTheme(darkTheme);
      } else {
        setPrismTheme(lightTheme);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.googleTimer);
  }

  styleContext = null;
  googleTimer = null;

  render() {
    const { children } = this.props;

    return (
      <MuiThemeProvider
        theme={this.styleContext.theme}
        sheetsManager={this.styleContext.sheetsManager}
      >
        <AppFrame>{children}</AppFrame>
      </MuiThemeProvider>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  dark: PropTypes.bool.isRequired,
};

export default connect(state => state.theme)(AppWrapper);
