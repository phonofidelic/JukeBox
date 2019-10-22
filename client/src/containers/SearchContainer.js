import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SearchBar from '../components/SearchBar';

class SearchContainer extends Component {
  render() {
    return <SearchBar />;
  }
}

const mapStateToProps = state => {
  return {
    library: state.library
  };
};

export default connect(
  mapStateToProps,
  actions
)(SearchContainer);
