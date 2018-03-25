/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { ListView, Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PeopleItem from './PeopleItem';
import Icon from 'react-native-vector-icons/EvilIcons';
import PeopleDetail from './PeopleDetail'

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: 353,
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingLeft: 20, 
  },
});

 class PeopleList extends Component {
  static navigationOptions = {
    tabBarLabel: 'People',
    tabBarIcon: ({ tintColor }) => (
      <Icon
          name={ 'user' }
          size={50}
          style={{ color: tintColor }}
      />
    )
  }

  renderInitalView() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(this.props.people);
    if(this.props.detailView === true) {
      return (
        <PeopleDetail />
      );
    } else {
      return (
        <ListView 
        enableEmptySections={true}
        dataSource={this.dataSource}
        renderRow={(rowData) =>
          <PeopleItem people={rowData} />
        }
        />
      );
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderInitalView()}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    people: state.people,
    detailView: state.detailView
   };
};

export default connect(mapStateToProps)(PeopleList);