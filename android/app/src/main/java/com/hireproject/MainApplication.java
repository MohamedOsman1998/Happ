package com.hireproject;

import android.app.Application;
import android.app.Activity;
import android.os.Bundle;


import com.facebook.react.ReactApplication;
import com.airbnb.android.react.maps.MapsPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.vrvideocomponent.VrVideoViewPackage; // // VrVideoViewPackage component

import java.util.Arrays;
import java.util.List;
import java.io.IOException;

public class MainApplication extends Application implements ReactApplication ,Application.ActivityLifecycleCallbacks{

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

// public static Activity getActivity(){
//       if(mCurrentActivity==null)throw new ArithmeticException("dividing a number by 5 is not allowed in this program");

//   return mCurrentActivity;
// }
    @Override
    protected List<ReactPackage> getPackages() {
      // if(mCurrentActivity==null)throw new ArithmeticException("dividing a number by 5 is not allowed in this program");
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new MapsPackage(),
            new LottiePackage(),
            new VrVideoViewPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
    private Activity mCurrentActivity;

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }



    @Override
    public void onActivityStarted(Activity activity) {
    }

    @Override
    public void onActivityResumed(Activity activity) {
    }

    @Override
    public void onActivityPaused(Activity activity) {
    }

    @Override
    public void onActivitySaveInstanceState(Activity activity, Bundle outState) {
    }

    @Override
    public void onActivityStopped(Activity activity) {
    }

    @Override
    public void onActivityDestroyed(Activity activity) {
    }

      @Override
    public void onActivityCreated(Activity activity, Bundle savedInstanceState) {
                   throw new ArithmeticException("dividing a number by 123 is not allowed in this program");
        // VrVideoViewPackage.setActivity(activity);
        // mCurrentActivity = activity;
    }
}
