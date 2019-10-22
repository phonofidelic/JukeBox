import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/library.actions';
import SearchBar from '../components/SearchBar';

class SearchContainer extends Component {
  render() {
    return (
      <SearchBar
        toggleSearch={this.props.toggleSearch}
        searchLibrary={this.props.searchLibrary}
        searchIsOpen={this.props.library.searchIsOpen}
      />
    );
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
