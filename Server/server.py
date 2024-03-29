from flask import Flask, request
import requests
import time
from twilio.twiml.voice_response import VoiceResponse
from twilio.rest import Client
from threading import Thread
from datetime import datetime
import json
from web3 import Web3
import random
from sendSMS import sendMSG;
from LLM import generate_json;

app = Flask( __name__ )
base_url = "https://api.assemblyai.com/v2"

headers = {"authorization": "56b358be260841d0acc6c2480ceafa2e"}
client = Client("ACc6897f286917dd1f0d8ea3365581ef3f", "17efc0fd87ae7318eca78b636e00cebd")

#Eth Starts Here
provider = Web3.HTTPProvider('https://eth-sepolia.g.alchemy.com/v2/zDdlaNQNTz6PrbF8nXtdvbM6BEt2aMFW')
w3 = Web3(provider)

contract_address = Web3.to_checksum_address("0x18F47f219a7E722D146E481c7Dd8771d95CA1C0f")


contract_abi =[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_emergency_type",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_priority",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_problem",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_callerNumber",
				"type": "string"
			}
		],
		"name": "addOperation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_new",
				"type": "address"
			}
		],
		"name": "addToWhitelist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProposals",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "emergency_type",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "priority",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "problem",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "callerNumber",
						"type": "string"
					},
					{
						"internalType": "enum Contract.Status",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct Contract.Proposal[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_unresolved_proposals",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_remove",
				"type": "address"
			}
		],
		"name": "removeFromWhitelist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "enum Contract.Status",
				"name": "_status",
				"type": "uint8"
			}
		],
		"name": "updateStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "whiteList",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

contract = w3.eth.contract(address=contract_address, abi=contract_abi)
sender_address = Web3.to_checksum_address("0x9DCF58834F0e75Ffd72623cCf5447D01dd85Ba81")
w3.eth.defaultAccount = sender_address

#Eth Ends Here

@app.route("/answer", methods=['GET', 'POST'])
def answer_call():
  """Respond to incoming phone calls with a brief message."""
  # Start our TwiML response
  resp = VoiceResponse()

  # Read a message aloud to the caller
  resp.say(
    "Hello, this is AI the emergency helpline. Please state your name, current location, and describe your emergency situation, Cut the call when you are finished, Your request will be registered once you end the call and we will notify you as your request is registered.",
    voice='alice')
  resp.record(maxLength="120", action="/handle-recording")
  resp.say("Thank you for your message. Goodbye.", voice='alice')
  return str(resp)



@app.route("/handle-recording", methods=['GET', 'POST'])
def handle_recording():
  recording_url = request.form['RecordingUrl']
  data = {"audio_url": recording_url}
  # print(data)
  url = base_url + "/transcript"
  response = requests.post(url, json=data, headers=headers)
  # print(response)
  transcript_id = response.json()['id']


  polling_endpoint = f"https://api.assemblyai.com/v2/transcript/{transcript_id}"

  
  while True:
    transcription_result = requests.get(polling_endpoint,
                                        headers=headers).json()

    # print(transcribed_text)

    if transcription_result['status'] == 'completed':
      # Get the call sid from the request
      call_sid = request.form['CallSid']

      # Get the call details from Twilio
      call = client.calls(call_sid).fetch()
      caller_number = call.from_formatted

      print(caller_number)
      print("Getting priority info from OpenAI");
      transcription_text = transcription_result['text']
      print(transcription_text)
      
      prompt_JSON=generate_json(transcription_text)
      
      
      # prompt_dist=json.loads(prompt_JSON);
      
      

      # s="a call from :"+caller_number+"the context is :"+transcription_text

         
      # rand_12_digit_id = random.randint(100000000000,999999999999)
     
      transaction = contract.functions.addOperation(prompt_JSON["name"],prompt_JSON["location"],prompt_JSON["emergency_type"],prompt_JSON["priority"],prompt_JSON["problem"],caller_number).build_transaction({
             'gas': 2000000,
             'gasPrice': w3.to_wei('50', 'gwei'),
             'nonce': w3.eth.get_transaction_count(sender_address),
      })

      signed_txn = w3.eth.account.sign_transaction(transaction, private_key='')
      tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)

      print(tx_hash)
      print("Transaction Completed Successfully.")
      print("\n")

      print(sendMSG("Thank for using EMCALL your response is stored and within short time you will be provided with required services", caller_number))
      
 

      break

    elif transcription_result['status'] == 'error':
      raise RuntimeError(
        f"Transcription failed: {transcription_result['error']}")

    else:
      time.sleep(3)
  return "OK"


def run():
  app.run(host='0.0.0.0', port=80)


run()