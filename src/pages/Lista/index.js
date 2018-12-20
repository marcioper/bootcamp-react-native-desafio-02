import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '~/services/api';

import {
  View,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import RepositoryItem from './RepositoryItem';
import styles from './styles';
import { colors } from '~/styles';

export default class Lista extends Component {
  static navigationOptions = () => ({
    title: 'GitIssues',
  });

  state = {
    repositories: [],
    repositoryInput: '',
    loading: false,
    error: false,
  };

  async componentDidMount() {
    const string = await AsyncStorage.getItem('@GitIssues:repositories');

    // parse the AsyncStorage string and setState
    try {
      if (string !== null) {
        const repositories = JSON.parse(string);
        this.setState({ repositories });
      } else {
        this.setState({ repositories: [] });
      }
    } catch (e) {
      // handle empty string
      this.setState({ repositories: [] });
    }
  }

  handleAddRepository = async () => {
    this.setState({ loading: true });

    try {
      const { repositoryInput, repositories } = this.state;
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      this.setState({
        repositories: [...repositories, repository],
        repositoryInput: '',
        error: false,
      });

      const listRepo = [...repositories, repository];

      await AsyncStorage.setItem('@GitIssues:repositories', JSON.stringify(listRepo));
    } catch (error) {
      console.tron.log(`error: ${error}`);
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  renderListItem = ({ item }) => {
    const { navigation } = this.props;
    return <RepositoryItem repository={item} navigation={navigation} />;
  };

  renderList = () => {
    const { repositories } = this.state;

    return (
      <FlatList
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
      />
    );
  };

  render() {
    const { repositoryInput, loading, error } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Adicionar novo repositório"
            underlineColorAndroid="transparent"
            value={repositoryInput}
            onChangeText={text => this.setState({ repositoryInput: text })}
          />

          <TouchableOpacity style={styles.button} onPress={this.handleAddRepository}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Icon name="plus" size={20} color={colors.black} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.hr} />
        {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}
