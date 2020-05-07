#include <Servo.h>
Servo s1;
Servo s2;
int ir=2;
int tp=8,ep=9;
int f=0,x=2,k=2;
void setup()
{
  s1.attach(4);
  s2.attach(5);
  pinMode(2,INPUT);
  pinMode(tp,OUTPUT);
  pinMode(ep,INPUT);  
  Serial.begin(9600);
}

void loop() 
{
  int irs=digitalRead(ir);
    long dur,dis;
  if(irs==0)
  {
    f=1;
    k++;
    delay(500);
    digitalWrite(tp,LOW);
    delayMicroseconds(2);
    digitalWrite(tp,LOW);
    delayMicroseconds(2);
    digitalWrite(tp,HIGH);
    delayMicroseconds(10);
    digitalWrite(tp,LOW);
    dur = pulseIn(ep,HIGH);
    dis = (dur/2)/29.1;
  }
  if(f==1 && k%2==1)
  {
  Serial.print("k=");
  Serial.print(k);
    x++;
    Serial.print(" x=");
    Serial.print(x);
    if(x%2==1)
    {
      Serial.print(" S1 ");
     for(int i=0;i<=180;i++)
      {
          s1.write(i);
          delay(10);
      }
    }
    if(x%2==0)
    {
      if(dis>10&&dis<100)
      {
        for(int j=0;j<=180;j++)
        {
          s2.write(j);
          delay(10);
        }
      }
      else
      {
        k-=2;
        x--;
      }
    }
    f=0;
  }
  irs=digitalRead(ir);
  if(irs==1)
  {
    digitalWrite(13,LOW);    
    s1.write(0);
    s2.write(180);
  }

}
