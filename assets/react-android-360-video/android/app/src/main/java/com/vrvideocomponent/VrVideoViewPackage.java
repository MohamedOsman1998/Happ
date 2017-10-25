package com.vrvideocomponent;

import android.app.Activity;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.io.IOException;


/**
 * Created by root on 23/3/17.
 */

public class VrVideoViewPackage implements ReactPackage  {

    public static Activity mActivity;

public static void setActivity(Activity a){
    VrVideoViewPackage.mActivity=a;
}
    public VrVideoViewPackage() {
    }



    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        // Add native modules here
        return modules;
    }

    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
            //   if(mActivity==null)throw new ArithmeticException("dividing a number by 5 is not allowed in this program");
        return Arrays.<ViewManager>asList(
                new VrVideoViewManager(VrVideoViewPackage.mActivity)
        );
    }

}
