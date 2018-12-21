import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const RepositoryItem = ({ repository, navigation }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => {
      navigation.navigate('Issues', {
        repository,
      });
    }}
  >
    <Image style={styles.avatar} source={{ uri: repository.owner.avatar_url }} />
    <View style={styles.info}>
      <Text style={styles.title}>{repository.name}</Text>
      <Text style={styles.titleSecundary}>{repository.owner.login}</Text>
    </View>
    <View style={styles.boxIcon}>
      <Icon name="angle-right" size={20} style={styles.infoIcon} />
    </View>
  </TouchableOpacity>
);

RepositoryItem.propTypes = {
  repository: PropTypes.shape({
    name: PropTypes.string,
    owner: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string,
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default RepositoryItem;
