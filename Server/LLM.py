


from transformers import AutoModelForCausalLM, AutoTokenizer
from jsonformer.main import Jsonformer
import json

def generate_json(prompt: str, model_path: str = "../dolly-v2-3b") -> dict:
    # Load model and tokenizer from the local directory
    model = AutoModelForCausalLM.from_pretrained(model_path, use_cache=True, local_files_only=True)
    tokenizer = AutoTokenizer.from_pretrained(model_path, use_fast=True, use_cache=True, local_files_only=True)
    
    # Define your JSON schema
    stock_schema = {
        "type": "object",
        "properties": {
            "name": {"type": "string"},
            "problem": {"type": "string"},
            "location": {"type": "string"},
            "emergency_type": {
                "type": "string",
                "enum": ["ambulance", "Police", "Rescue team", "Fire brigade"]
            },
            "priority": {
                "type": "string",
                "enum": ["high", "medium", "low"]
            }
        },
        "required": ["name", "problem", "location", "emergency_type", "priority"]
    }

    
    # Create a Jsonformer instance
    builder = Jsonformer(
        model=model,
        tokenizer=tokenizer,
        json_schema=stock_schema,
        prompt=prompt,
    )

    # Generate data based on the prompt and JSON schema
    output = builder()

    return output


# # # Define your prompt
# prompt_text = "I am Hari facing headaches, I am in Hack this fall, Kudasan, Gujarat."

# # Generate JSON data based on the prompt and JSON schema
# generated_json1 = generate_json(prompt_text)

# # name=json.loads(generated_json1)\
# print( generated_json1['name'])


# print(name['name'])

# # Print the generated JSON data
# print("Generated JSON:")
# print(generated_json)
