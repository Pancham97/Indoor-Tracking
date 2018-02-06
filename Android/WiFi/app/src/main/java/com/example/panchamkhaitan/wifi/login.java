package com.example.panchamkhaitan.wifi;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class login extends AppCompatActivity {

    EditText username, password;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        username = (EditText) findViewById(R.id.email);;
        password = (EditText) findViewById(R.id.password);
        Button loginButton = (Button) findViewById(R.id.button_login);

        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(username.getText().toString().equals("admin") && password.getText().toString().equals("admin")) {
                    Intent intent = new Intent(login.this, MainActivity.class);
                    startActivity(intent);

                } else {
                    Toast.makeText(getApplicationContext(), "Incorrect ID or password!", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}