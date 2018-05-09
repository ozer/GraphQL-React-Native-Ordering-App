import { AppRegistry, YellowBox } from 'react-native';
import aslanOrder from './aslanOrder';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent('aslanOrder', () => aslanOrder);
