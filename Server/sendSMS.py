import os
from twilio.rest import Client

def sendMSG(msg, ph_no) :
    account_sid = "ACc6897f286917dd1f0d8ea3365581ef3f"
    auth_token = "17efc0fd87ae7318eca78b636e00cebd"
    client = Client(account_sid, auth_token)
    message = client.messages.create(
      body=msg,
      from_="+19897047564",
      to=ph_no
    )
    return (message.sid)