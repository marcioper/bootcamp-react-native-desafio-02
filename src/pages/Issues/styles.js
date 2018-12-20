import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },

  backIcon: {
    color: colors.black,
    marginLeft: metrics.baseMargin,
  },
});

export default styles;
