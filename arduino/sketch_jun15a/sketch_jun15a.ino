#include<Wire.h>
#include <LiquidCrystal.h>

// initialize the library with the numbers of the interface pins
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
const int MPU=0x68;  
int AcX,AcY,AcZ,Tmp,GyX,GyY,GyZ;
int relay = 13;
int time = 0;
float desired_temp = 21;

int btn_down = 9;
int btn_up = 6;

void setup()
{
  pinMode(btn_down, INPUT_PULLUP);
  pinMode(btn_up, INPUT_PULLUP);
  Serial.begin(9600);
  Wire.begin();
  Wire.beginTransmission(MPU);
  Wire.write(0x6B); 
  
  pinMode (relay, OUTPUT);
  lcd.begin(16, 2);
  // Print a message to the LCD.
  lcd.print("Procurando MPU6050...");
   
  //Inicializa o MPU-6050
  Wire.write(0); 
  Wire.endTransmission(true);
}

void loop(){
  Wire.beginTransmission(MPU);
  Wire.write(0x3B);
  Wire.endTransmission(false);
  Wire.requestFrom(MPU,14,true);  
  AcX=Wire.read()<<8|Wire.read(); //0x3B (ACCEL_XOUT_H) & 0x3C (ACCEL_XOUT_L)     
  AcY=Wire.read()<<8|Wire.read(); //0x3D (ACCEL_YOUT_H) & 0x3E (ACCEL_YOUT_L)
  AcZ=Wire.read()<<8|Wire.read(); //0x3F (ACCEL_ZOUT_H) & 0x40 (ACCEL_ZOUT_L)
  Tmp=Wire.read()<<8|Wire.read(); //0x41 (TEMP_OUT_H) & 0x42 (TEMP_OUT_L)
  GyX=Wire.read()<<8|Wire.read(); //0x43 (GYRO_XOUT_H) & 0x44 (GYRO_XOUT_L)
  GyY=Wire.read()<<8|Wire.read(); //0x45 (GYRO_YOUT_H) & 0x46 (GYRO_YOUT_L)
  GyZ=Wire.read()<<8|Wire.read(); //0x47 (GYRO_ZOUT_H) & 0x48 (GYRO_ZOUT_L)
  //Serial.print(" | Temp = "); Serial.println(Tmp/340.00+36.53);
  
  lcd.clear();
  float temp = (Tmp/340.00+36.53);
  lcd.print(temp);
  lcd.print("C");
  lcd.print(" - ");
  lcd.print(time);
  lcd.print("T");
  
  lcd.setCursor(0, 1);
  lcd.print(desired_temp);
  lcd.print("C");

  if(temp > desired_temp){
    time += 1;
    if(time >= (4 * 60)){
      digitalWrite (relay, HIGH);
      time = 0;
    }
  }
  else{
    time = 0;
    digitalWrite (relay, LOW);
  }
  
  int buttonStateDown = digitalRead(btn_down);
  if (buttonStateDown == HIGH) {
    desired_temp -= 0.25;
  }
  
  int buttonStateUp = digitalRead(btn_up);
  if (buttonStateUp == HIGH) {
    desired_temp += 0.25;
  }
  
  delay(250);
}
