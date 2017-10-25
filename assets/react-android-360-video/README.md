## react-android-360-video

A React Native wrapper for Google VrVideoView (for android) for playing 360 video

Supports Android API 19+

### Add it to your project via npm

Run `npm install react-android-360-video`

#### Android

Make the following additions to the given files manually:

**android/settings.gradle**

```gradle
include ':react-android-360-video'
project(':react-android-360-video').projectDir = new File(rootProject.projectDir, '../node_modules/react-android-360-video/android/app')
```

**android/app/build.gradle**

```gradle
dependencies {
   ...
   compile project(':react-android-360-video')
}
```

**MainActivity.java**

On top, where imports are:

```java
import android.app.Activity;
import android.util.Log;
import android.os.Bundle;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.common.LifecycleState;

import com.vrvideocomponent.VrVideoViewPackage; // // VrVideoViewPackage component  
```

Add the `VrVideoViewPackage` react-native android module like below:

```java
@Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    ReactRootView mReactRootView = new ReactRootView(this);

    ReactInstanceManager mReactInstanceManager = ReactInstanceManager.builder()
      .setApplication(getApplication())
      .setBundleAssetName("index.android.bundle")
      .setJSMainModuleName("index.android")
      .addPackage(new MainReactPackage())
      .addPackage(new VrVideoViewPackage(this)) //<----------  VrVideoViewPackage component          
      .setUseDeveloperSupport(BuildConfig.DEBUG)
      .setInitialLifecycleState(LifecycleState.RESUMED)
      .build();

    /* replace VrVideoComponent by your root react component name */
    mReactRootView.startReactApplication(mReactInstanceManager, "VrVideoComponent", null);

    setContentView(mReactRootView);
  }   

```

## Usage

Import VrVideoComponent module in js file,

```javascript
import VrVideoComponent from 'react-android-360-video';
```

```javascript

<VrVideoComponent
  style={{height:300,width:300,backgroundColor:'#000000'}}
  video={{ uri:'https://d2v9y0dukr6mq2.cloudfront.net/video/preview/eG7t61g/underwater-coral-reef-360-vr_S94kBUa0__WM.mp4',
           type: 'stereo'}}
  displayMode={'fullscreen'}
  volume={1.0}
  enableFullscreenButton={true}
  enableCardboardButton={true}
  enableTouchTracking={true}
  hidesTransitionView={false}
  enableInfoButton={true} />

```
