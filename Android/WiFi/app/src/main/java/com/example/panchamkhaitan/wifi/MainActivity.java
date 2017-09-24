
package com.example.panchamkhaitan.wifi;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.ListView;
import android.widget.Switch;
import android.widget.Toast;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.wifi.ScanResult;
import android.net.wifi.WifiManager;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    Switch aSwitch;
    WifiManager wifiManager;
    //TextView textView;
    ListView listView;
    //StringBuffer buffer = new StringBuffer();
    Context context;
    Button mapsButton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        aSwitch = (Switch) findViewById(R.id.myswitch);
        wifiManager = (WifiManager) getSystemService(WIFI_SERVICE);
        //textView = (TextView) findViewById(R.id.textView);
        listView = (ListView) findViewById(R.id.listView);
        context = this;
        mapsButton = (Button) findViewById(R.id.map_button);
        mapsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this, MapsActivity.class);
                startActivity(intent);
            }
        });

        aSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener(){

            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked){
                if (isChecked && !wifiManager.isWifiEnabled()){
                    wifiManager.setWifiEnabled(true);
                }
                else if (!isChecked && wifiManager.isWifiEnabled()){
                    wifiManager.setWifiEnabled(false);
                }
            }
        });
        MyBroadCastReceiver myBroadCastReceiver = new MyBroadCastReceiver();
        registerReceiver(myBroadCastReceiver,new IntentFilter(wifiManager.SCAN_RESULTS_AVAILABLE_ACTION));
    }

    public void callme(StringBuffer buffer) {
        Toast toast = Toast.makeText(context, "start " + buffer.toString(), Toast.LENGTH_SHORT);
        toast.show();
        String[] val = buffer.toString().split("\n");
        ArrayAdapter<String> ar = new ArrayAdapter<>(context, android.R.layout.simple_list_item_1, val);
        listView.setAdapter(ar);

        Toast toast1 = Toast.makeText(context, "finished", Toast.LENGTH_SHORT);
        toast1.show();
    }
    class MyBroadCastReceiver extends BroadcastReceiver{

        @Override
        public void onReceive(Context context, Intent intent) {
            StringBuffer stringBuffer = new StringBuffer();

            List<ScanResult> list = wifiManager.getScanResults();
            for (ScanResult scanResult : list){
                stringBuffer.append(scanResult.SSID+ ": "+scanResult.level+" "+scanResult.BSSID+"\n");

            }
            //textView.setText(stringBuffer);
            //buffer = stringBuffer;
            callme(stringBuffer);
        }
    }
}
