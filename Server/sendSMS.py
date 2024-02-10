import os
from twilio.rest import Client

def sendMSG(msg, ph_no) :
    account_sid = "AC60b4b1971498ba2a35488e24dca7b1ca"
    auth_token = "5b6c263c26420741e2779cc63eb3a27c"
    client = Client(account_sid, auth_token)
    message = client.messages.create(
      body=msg,
      from_="+16592447507",
      to=ph_no
    )
    return (message.sid)