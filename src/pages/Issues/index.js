import React, { Component } from 'react';

import { View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

export default class Issues extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name,
    headerLeft: (
      <Icon
        name="angle-left"
        size={24}
        style={styles.backIcon}
        onPress={() => {
          navigation.goBack();
        }}
      />
    ),
  });

  state = {
    status: '',
  };

  render() {
    const { navigation } = this.props;
    const repo = navigation.getParam('repository');
    return (
      <View style={styles.container}>
        <Text>{repo.name}</Text>
      </View>
    );
  }
}
