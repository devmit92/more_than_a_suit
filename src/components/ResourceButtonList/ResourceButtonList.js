import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../redux/mapRedux/mapStateToProps';
import { Tabs, Tab } from '@material-ui/core';
import './resourceButtonList.css';

const buttons = [
    { name: 'Job', value: 'job' },
    { name: 'Funeral', value: 'funeral' },
    { name: 'Court', value: 'court' },
    { name: 'Other', value: 'other' },
]

class ResourcesButtonList extends Component {
    state = {
        tabVal: 'job'
    }

    changeTab = (e, newValue) => {
        this.props.dispatch({
            type: 'GET_NEED_RESOURCES',
            payload: { categories_name: newValue }
        })
        this.setState({
            tabVal: newValue,
        })
    }

    render() {
        const tabList = buttons.map((tab, index) => {
            return <Tab value={tab.value} label={tab.name} key={index} />
        })

        return (
                <Tabs value={this.state.tabVal} onChange={this.changeTab} textColor="secondary">
                    {tabList}
                </Tabs>
        )
    }
}

export default connect(mapStateToProps)(ResourcesButtonList);