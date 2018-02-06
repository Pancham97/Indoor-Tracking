package com.example.panchamkhaitan.wifi;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import java.util.List;

/**
 * Created by panchamkhaitan on 08/10/17.
 */

public class WiFiAdapter extends ArrayAdapter<WiFi> {
    WiFiAdapter(Context context, List<WiFi> wiFiList) {
        super(context, 0, wiFiList);
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        View listItemView = convertView;

        if(listItemView == null) {
            listItemView = LayoutInflater.from(getContext()).inflate(
                    R.layout.wifi_list_item, parent, false
            );
        }

        WiFi currentWifi = getItem(position);

        TextView wifiNameView = (TextView) listItemView.findViewById(R.id.wifiName);
        String wifiName = currentWifi.getmWifiName();
        wifiNameView.setText(wifiName);

        TextView wifiStrengthView = (TextView) listItemView.findViewById(R.id.wifiStrength);
        int wifiStrength = currentWifi.getmWifiStrength();
        wifiStrengthView.setText("" + wifiStrength + "dB");

        TextView wifiMACView = (TextView) listItemView.findViewById(R.id.wifiMAC);
        String wifiMAC = currentWifi.getmWifiMAC();
        wifiMACView.setText(wifiMAC);

        TextView distanceView = (TextView) listItemView.findViewById(R.id.distanceTextView);
        String distance = currentWifi.getmDistance() + " m";
        distanceView.setText(distance);

        return listItemView;
    }
}
