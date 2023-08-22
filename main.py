import json
import sys
import os

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv

try:
    import websockets
except ImportError:
    print("Websockets package not found. Make sure it's installed.")

origins = ["*"]

load_dotenv()

URI = os.environ.get("MODEL_HOST_STRING")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def run(context):
    # Note: the selected defaults change from time to time.
    request = {
        'prompt': context,
        'max_new_tokens': 250,
        'auto_max_new_tokens': False,

        # Generation params. If 'preset' is set to different than 'None', the values
        # in presets/preset-name.yaml are used instead of the individual numbers.
        'preset': 'None',
        'do_sample': True,
        'temperature': 0.7,
        'top_p': 0.1,
        'typical_p': 1,
        'epsilon_cutoff': 0,  # In units of 1e-4
        'eta_cutoff': 0,  # In units of 1e-4
        'tfs': 1,
        'top_a': 0,
        'repetition_penalty': 1.18,
        'repetition_penalty_range': 0,
        'top_k': 40,
        'min_length': 0,
        'no_repeat_ngram_size': 0,
        'num_beams': 1,
        'penalty_alpha': 0,
        'length_penalty': 1,
        'early_stopping': False,
        'mirostat_mode': 0,
        'mirostat_tau': 5,
        'mirostat_eta': 0.1,
        'guidance_scale': 1,
        'negative_prompt': '',

        'seed': -1,
        'add_bos_token': True,
        'truncation_length': 2048,
        'ban_eos_token': False,
        'skip_special_tokens': True,
        'stopping_strings': []
    }

    async with websockets.connect(URI, ping_interval=None) as websocket:
        await websocket.send(json.dumps(request))

        yield context  # Remove this if you just want to see the reply

        while True:
            incoming_data = await websocket.recv()
            incoming_data = json.loads(incoming_data)

            match incoming_data['event']:
                case 'text_stream':
                    yield incoming_data['text']
                case 'stream_end':
                    return

@app.post("/api/response")
async def get_response_from_AI_model(req: Request):
    output = []
    body = await req.json()
    prompt = body["prompt"]
    async for response in run(prompt):
        output.append(response)
        answer = "".join(output)
        response_list = answer.split("\n")
        sys.stdout.flush()
    return {
        "response": response_list[1]
    }