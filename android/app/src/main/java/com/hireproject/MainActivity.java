package com.hireproject;

import com.facebook.react.ReactActivity;
import com.vrvideocomponent.VrVideoViewPackage; // // VrVideoViewPackage component


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
     public MainActivity(){
         super();
                 VrVideoViewPackage.setActivity(this);
     }

    @Override
    protected String getMainComponentName() {
        return "hireProject";
    }
}
