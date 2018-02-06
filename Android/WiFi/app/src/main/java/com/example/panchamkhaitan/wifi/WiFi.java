package com.example.panchamkhaitan.wifi;

/**
 * Created by panchamkhaitan on 08/10/17.
 */

public class WiFi {
    private String mWifiName;
    private int mWifiStrength;
    private String mWifiMAC;
    private String mDistance;

    WiFi(String wifiName, int wifiStrength, String wifiMAC, String distance) {
        mWifiName = wifiName;
        mWifiStrength = wifiStrength;
        mWifiMAC = wifiMAC;
        mDistance = distance;
    }

    public String getmWifiName() { return mWifiName; }

    public int getmWifiStrength() { return mWifiStrength; }

    public String getmWifiMAC() { return mWifiMAC; }

    public String getmDistance() { return mDistance; }
}
