import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../redux/mapRedux/mapStateToProps';
import ResourcesPageList from '../ResourcesPageList/ResourcesPageList';
import ResourcesButtonList from '../ResourceButtonList/ResourceButtonList';
import { Typography, Paper, Box, } from '@material-ui/core';


class ResourcesPage extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_NEED_RESOURCES',
      payload: { categories_name: this.props.store.setReview.need }
    })
  }
  render() {
    return (
      <Paper elevation='15'>
        <Box p={3}>
        <Typography align="center" variant='h5'>Resources Page</Typography>
          <ResourcesButtonList />
          <ResourcesPageList />
          </Box>
      </Paper>
    );
  }
}

export default connect(mapStateToProps)(ResourcesPage);
