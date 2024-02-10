# from transformers import AutoModelForCausalLM, AutoTokenizer
# from jsonformer.format import highlight_values
# from jsonformer.main import Jsonformer

# # Load model and tokenizer from the local directory
# model_path = "dolly-v2-3b"
# model = AutoModelForCausalLM.from_pretrained(model_path, use_cache=True, local_files_only=True)
# tokenizer = AutoTokenizer.from_pretrained(model_path, use_fast=True, use_cache=True, local_files_only=True)
# print("Loaded model and tokenizer")

# # Define your JSON schema
# stock = {
#     "type": "object",
#     "properties": {
#         "name": {"type": "string"},
#         "problem": {"type": "string"},
#         "location": {"type": "string"}
#     }
# }

# # Create a Jsonformer instance
# builder = Jsonformer(
#     model=model,
#     tokenizer=tokenizer,
#     json_schema=stock,
#     prompt="I am Hari facing headaches , iam in hack this fall , kudasan,gujarat.",
# )

# print("Generating...")

# # Generate data based on the prompt and JSON schema
# output = builder()

# # Highlight the generated values
# highlight_values(output)



from transformers import AutoModelForCausalLM, AutoTokenizer
from jsonformer.main import Jsonformer

def generate_json(prompt: str, model_path: str = "dolly-v2-3b") -> dict:
    # Load model and tokenizer from the local directory
    model = AutoModelForCausalLM.from_pretrained(model_path, use_cache=True, local_files_only=True)
    tokenizer = AutoTokenizer.from_pretrained(model_path, use_fast=True, use_cache=True, local_files_only=True)
    
    # Define your JSON schema
    stock_schema = {
        "type": "object",
        "properties": {
            "name": {"type": "string"},
            "problem": {"type": "string"},
            "location": {"type": "string"}
        }
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
# Define your JSON schema


# Define your prompt
prompt_text = "I am Hari facing headaches, I am in Hack this fall, Kudasan, Gujarat."

# Generate JSON data based on the prompt and JSON schema
generated_json = generate_json(prompt_text)

# Print the generated JSON data
print("Generated JSON:")
print(generated_json)
