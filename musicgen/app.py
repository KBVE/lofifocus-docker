# Generate multi line comment with post body example
"""
{
    "model_name": "facebook/musicgen-small",
    "duration": 15,
    "prompt": "I love",
    "strategy": "loudness",
    "sampling": true,
    "top_k": 0,
    "top_p": 0.9,
    "temperature": 0.9
    "use_diffusion": true
}
"""


from flask import Flask, request, send_file, abort
from audiocraft.models import musicgen
from audiocraft.data.audio import audio_write
from audiocraft.models import MultiBandDiffusion
import uuid
import io

app = Flask(__name__)


@app.route("/generate_music", methods=["POST"])
def generate_music():
    # Get the model name, duration, prompt, and strategy from the request body
    model_name = request.json.get("model_name")
    duration = request.json.get("duration")
    prompt = request.json.get("prompt")
    strategy = request.json.get("strategy")
    sampling = request.json.get("sampling")
    top_k = request.json.get("top_k")
    top_p = request.json.get("top_p")
    temperature = request.json.get("temperature")
    use_diffusion = request.json.get("use_diffusion")

    # Check if the model name is valid
    if model_name not in [
        "facebook/musicgen-small",
        "facebook/musicgen-medium",
        "facebook/musicgen-large",
    ]:
        abort(
            400,
            "Invalid model name (facebook/musicgen-small, facebook/musicgen-medium, facebook/musicgen-large)",
        )

    # Check if the duration is valid
    if duration not in [15, 30, 60, 90, 120]:
        abort(400, "Invalid duration in seconds (15, 30, 60, 90, 120)")

    # Check if the prompt is valid
    if not isinstance(prompt, str):
        abort(400, "Invalid prompt (string)")

    # Check if the strategy is valid
    if strategy not in ["loudness", "peak", "clip"]:
        abort(400, "Invalid strategy (loudness, peak, clip)")

    # Check if the sampling is true or false
    if not isinstance(sampling, bool):
        abort(400, "Invalid sampling (true, false)")

    # Check if the top_k is valid
    if not isinstance(top_k, int):
        abort(400, "Invalid top_k (int)")

    # Check if the top_p is valid
    if not isinstance(top_p, float):
        abort(400, "Invalid top_p (float)")

    # Check if the temperature is valid
    if not isinstance(temperature, float):
        abort(400, "Invalid temperature (float)")

    # Check if the use_diffusion is valid
    if not isinstance(use_diffusion, bool):
        abort(400, "Invalid use_diffusion (true, false)")

    # Print the request body
    print(request.json)

    # Generate a unique UUID for the generated .wav file
    myuuid = uuid.uuid4()

    # Load the specified model and set the generation parameters
    model = musicgen.MusicGen.get_pretrained(model_name, device="cuda")
    model.set_generation_params(
        duration=duration,
        use_sampling=sampling,
        top_k=top_k,
        top_p=top_p,
        temperature=temperature,
    )

    # Generate the music using the specified prompt
    wav = model.generate([prompt], progress=True, return_tokens=True)

    # if use_diffusion:
    if use_diffusion:
        print("Using diffusion")
        mbd = MultiBandDiffusion.get_mbd_musicgen()
        diff = mbd.tokens_to_wav(wav[1])
        create_wav(diff, myuuid, model, strategy)
    else:
        print("Not using diffusion")
        create_wav(wav[0], myuuid, model, strategy)

    # Read the generated .wav file into memory
    with open(f"{str(myuuid)}.wav", "rb") as f:
        wav_data = f.read()

    # Return the .wav file as a response
    return send_file(
        io.BytesIO(wav_data),
        mimetype="audio/wav",
        as_attachment=True,
        download_name=f"{str(myuuid)}.wav",
    )


def create_wav(output, myuuid, model, strategy):
    for idx, one_wav in enumerate(output):
        audio_write(
            f"{str(myuuid)}",
            one_wav.cpu(),
            model.sample_rate,
            strategy=strategy,
            loudness_compressor=True,
        )


if __name__ == "__main__":
    app.run()
