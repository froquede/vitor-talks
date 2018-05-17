int left_trigger = 0;
int left_switch = 5;
int up_trigger = 0;
int up_switch = 6;
int right_trigger = 0;
int right_switch = 7;
int down_trigger = 0;
int down_switch = 8;

void setup() {
  pinMode(left_switch, INPUT);     
  Serial.begin(38400);
}

void loop(){
  left_trigger = digitalRead(left_switch);
  if(left_trigger == HIGH){
     Serial.println('left');
  }

  up_trigger = digitalRead(up_switch);
  if(up_trigger == HIGH){
     Serial.println('up');
  }

  right_trigger = digitalRead(right_switch);
  if(right_trigger == HIGH){
     Serial.println('right');
  }

  down_trigger = digitalRead(down_switch);
  if(down_trigger == HIGH){
     Serial.println('down');
  }

  delay(500);
}
