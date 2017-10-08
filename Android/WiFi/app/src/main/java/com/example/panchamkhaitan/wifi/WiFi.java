package com.example.panchamkhaitan.wifi;

/**
 * Created by panchamkhaitan on 08/10/17.
 */

public class WiFi {
    private String mWifiName;
    private int mWifiStrength;
    private String mWifiMAC;


    WiFi(String wifiName, int wifiStrength, String wifiMAC) {
        mWifiName = wifiName;
        mWifiStrength = wifiStrength;
        mWifiMAC = wifiMAC;
    }

    public String getmWifiName() { return mWifiName; }

    public int getmWifiStrength() { return mWifiStrength; }

    public String getmWifiMAC() { return mWifiMAC; }
}
