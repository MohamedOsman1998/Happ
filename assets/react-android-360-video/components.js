import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

var iface = {
  name: 'CVrVideoView',
  propTypes: {
      video: PropTypes.shape({
        uri: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
      volume: PropTypes.number,
      displayMode: PropTypes.string,
      enableFullscreenButton: PropTypes.bool,
      enableCardboardButton: PropTypes.bool,
      enableInfoButton: PropTypes.bool,
      enableTouchTracking: PropTypes.bool,
      hidesTransitionView: PropTypes.bool,
      ...View.propTypes
  }
};

export default requireNativeComponent('CVrVideoView', iface);
