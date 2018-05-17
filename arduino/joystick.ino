const int buttonPin = 2;
int buttonState = 0;

void setup() {
  pinMode(buttonPin, INPUT);     
  Serial.begin(9600);
}

void loop(){
  buttonState = digitalRead(buttonPin);
  if(buttonState == HIGH){
     Serial.println('ok');
  }    
}