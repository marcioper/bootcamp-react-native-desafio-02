import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '~/services/api';

import {
  View, Text, ActivityIndicator, FlatList, TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import IssueItem from './IssueItem';
import styles from './styles';

export default class Issues extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

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
    status: 'all',
    issues: [],
    loading: true,
    refreshing: true,
    error: '',
  };

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = async () => {
    const { navigation } = this.props;
    const repo = navigation.getParam('repository');

    this.setState({
      refreshing: true,
    });

    const { status } = this.state;

    try {
      const { data: issues } = await api.get(`/repositories/${repo.id}/issues?state=${status}`);

      this.setState({
        issues,
        loading: false,
        refreshing: false,
      });
    } catch (error) {
      this.setState({ loading: false, refreshing: false, error: 'Repositório não existe!' });
    }
  };

  renderListItem = ({ item }) => <IssueItem issue={item} />;

  renderList = () => {
    const { issues, refreshing } = this.state;

    return issues.length > 0 ? (
      <FlatList
        data={issues}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadIssues}
        refreshing={refreshing}
      />
    ) : (
      <View style={styles.noneContainer}>
        <Text style={styles.noneText}>Nenhum issue adicionado!</Text>
      </View>
    );
  };

  filterIssueHandle = async (status) => {
    await this.setState({ status });
    await this.loadIssues();
  };

  render() {
    const { status, loading, error } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.filterIssue}>
          <TouchableOpacity
            onPress={() => {
              this.filterIssueHandle('all');
            }}
          >
            <Text style={status === 'all' ? styles.filterTextActivate : styles.filterText}>
              Todas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.filterIssueHandle('open');
            }}
          >
            <Text style={status === 'open' ? styles.filterTextActivate : styles.filterText}>
              Abertas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.filterIssueHandle('closed');
            }}
          >
            <Text style={status === 'closed' ? styles.filterTextActivate : styles.filterText}>
              Fechadas
            </Text>
          </TouchableOpacity>
          {!!error && <Text style={styles.error}>Error.</Text>}
        </View>
        <View style={styles.listRepository}>
          {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
        </View>
      </View>
    );
  }
}
