import { createAppContainer, createStackNavigator } from 'react-navigation';

import Lista from '~/pages/Lista';
import Issues from '~/pages/Issues';

const Routes = createAppContainer(
  createStackNavigator({
    Lista,
    Issues,
  }),
);
export default Routes;
