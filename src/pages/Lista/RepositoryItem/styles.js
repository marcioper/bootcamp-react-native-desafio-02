import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    padding: metrics.basePadding,
    marginHorizontal: metrics.baseMargin * 2,
    marginTop: metrics.baseMargin,
    flexDirection: 'row',
  },

  avatar: {
    width: 30,
    height: 30,
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: metrics.baseMargin,
  },

  titleSecundary: {
    fontSize: 12,
    color: colors.regular,
    marginLeft: metrics.baseMargin,
  },

  info: {
    flexDirection: 'column',
    marginLeft: metrics.baseMargin,
    width: metrics.screenWidth - 130,
  },

  boxIcon: {
    flex: 1,
    width: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoIcon: {
    color: colors.light,
  },
});

export default styles;
