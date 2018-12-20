import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },

  form: {
    marginTop: metrics.baseMargin * 1.5,
    marginBottom: metrics.baseMargin * 1.5,
    marginHorizontal: metrics.baseMargin * 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  error: {
    color: colors.danger,
    textAlign: 'center',
    marginTop: metrics.baseMargin,
  },

  input: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    borderWidth: 0.3,
    borderColor: colors.regular,
    height: 30,
    paddingHorizontal: metrics.basePadding,
    width: metrics.screenWidth - 70,
  },

  hr: {
    height: 0.3,
    backgroundColor: colors.regular,
    marginHorizontal: metrics.baseMargin * 2,
    marginBottom: metrics.baseMargin - 5,
  },
});

export default styles;
