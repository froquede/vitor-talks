#include <SoftwareSerial.h>
SoftwareSerial mySerial(10, 11); // RX, TX

void setup(){
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
  mySerial.begin(38400);

  mySerial.print("AT");
  delay(500);
  mySerial.print("AT+NAMEvitortalks");
  delay(500);
  mySerial.print("AT+PIN0000");
  delay(500);
}

void loop(){
  if (mySerial.available()){
    Serial.println("connected");
    Serial.write(mySerial.read());
  }
  if (Serial.available()){
    mySerial.write(Serial.read());  
  }

  delay(100);
}
