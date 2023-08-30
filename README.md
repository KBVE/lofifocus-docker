# Lofi Focus

<img src="https://cdn.discordapp.com/attachments/1047967719745667123/1146199674655608902/image.png" data-canonical-src="https://cdn.discordapp.com/attachments/1047967719745667123/1146199674655608902/image.png" width="200" />

Demo: https://lofifocus.kbve.com/#

Chrome Extension Repo: https://github.com/KBVE/lofifocus-chrome-extension

- [Lofi Focus](#lofi-focus)
  - [Overview](#overview)
  - [Benefits of LoFi Music](#benefits-of-lofi-music)
  - [Audiocraft to the Rescue](#audiocraft-to-the-rescue)
  - [Why Download Our Chrome Extension](#why-download-our-chrome-extension)
  - [How to Install Our Chrome Extension](#how-to-install-our-chrome-extension)
  - [Features](#features)
  - [Implementation](#implementation)
  - [Goals](#goals)
  - [Stretch Goals](#stretch-goals)
  - [Technologies Used](#technologies-used)
  - [High Level Design](#high-level-design)
- [API Documentation](#api-documentation)
  - [Flask API](#flask-api)
  - [N8N API](#n8n-api)
- [Contributions](#contributions)
- [Citations](#citations)


## Overview
Lofi Focus is a chrome extension that automatically generates lo-fi music when browsing articles, blogs, and other sites. The ambient, chilled-out sounds create an enjoyable atmosphere to help users focus while reading.

Lofi music, as explored in Justin Wang's study "Lofi hip-hop radio: Beats to relax/study to" offers a therapeutic escape for its listeners. The genre serves as a coping mechanism for stress and anxiety, with research suggesting that such music impacts the autonomic nervous system, potentially reducing subconscious stress levels (wang2020lofi, Page 5). Additionally, lofi provides solace during personal losses, with its comforting visuals and tones resonating with the emotions of its audience (wang2020lofi, Page 12). Many also use lofi as calming background music for various tasks, from studying to relaxation (wang2020lofi, Page 12). Furthermore, its nostalgic connection to late '90s and early 2000s anime offers a unique blend of soothing genres, providing listeners with a familiar yet calming auditory experience (wang2020lofi, Page 4).

## Benefits of LoFi Music
- Improves focus and concentration - The chill, repetitive beats help tune out distractions and keep you in a flow state. The lack of jarring changes also avoids breaking focus.
- Reduces stress and anxiety - The ambient sounds lower heart rate and have a calming effect on the mind and body.
- Enhances productivity - By helping you focus and relax, lo-fi enables you to work and study more efficiently for longer periods.
- Sets a peaceful mood - The mellow, nostalgic sounds induce feelings of tranquility and relaxation.
- Provides unobtrusive background music - As there are no attention-grabbing vocals, it subtly enhances an environment without being distracting.
- Inspires creativity - The simple compositions are unintimidating and let your mind wander productively.
- Helps with sleep and relaxation - The soothing tracks are great for relaxing the body and quieting the mind before sleep.
- Fosters pleasant memories and nostalgia - For many, it evokes nostalgia from times spent studying or relaxing to music.

## Audiocraft to the Rescue
With Audiocraft we can:
- Create fully AI-generated LoFi tracks tailored to specific use-cases
- Produce High-quality audio
- Create endless unique music
- Train new models tailored to LoFi

## Why Download Our Chrome Extension
- Improve focus and concentration when reading
- Make reading more enjoyable and relaxing
- Boost productivity
- Avoid listening fatigue
- Portability
- Ease of use
- Less anxiety
- Nostalgia

## How to Install Our Chrome Extension
1. Download the extension files here: 
   - You will need to download the files that make up the chrome extension, usually as a zip folder from the developer. This includes the manifest.json file, HTML/CSS/JS assets, and any images or resources.
2. Extract the zip folder
3. Unzip the folder containing the extension source files to a location on your computer. Avoid folders that require administrator access.
4. Open Google Chrome and navigate to chrome://extensions in the address bar. 
5. Enable Developer Mode via the toggle in the top right.
Load the extension
6. Click the "Load Unpacked" button and select the folder containing your extracted extension files. This will install the extension in developer mode.
7. For easy access, click the puzzle icon for your extensions and pin your newly installed extension. This will make it appear as an icon in your browser toolbar.

## Features

- Analyzes webpage content
- Generates a unique, customized lofi track for that page using AI music generation
- Allows users to adjust volume, pause, start, play, re-generate Lo-Fi Music

## Implementation

- Built as a Chrome browser extension for ease of use
- Uses JavaScript content scripts to analyze webpages and play lofi audio
- Leverages AudioCraft's MusicGen AI model to generate the lofi tracks
- Polished UI allows easy control over the music generation

## Goals

- Help people focus and be more productive when reading on the web
- Provide an ambient audio environment that blocks distracting sounds
- Make reading more enjoyable and relaxed through chill tunes
- Give users more options to customize their browsing experience

## Stretch Goals
- Train new model via https://github.com/chavinlo/musicgen_trainer by creating 30 second .wav files and corresponding .txt files with prompts from https://www.youtube.com/watch?v=BEXL80LS0-I
- User can favorite/save LoFi track URLs to browser storage to play later

## Technologies Used
- Audiocraft Music Generation
- Audiocraft Multi-Band Diffusion
- Audiocraft Audio Write
- ChatGPT 3.5-turbo
- JsonLink
- Local Tunnel
- ElevenLabs AI Voice Generation
- Min.io S3 Storage
- Python - Poetry - Flask API
- Node.js - Yarn
- HTML, CSS (Tailwind)
- Plasmo Browser Extension Framework
- Appwrite Backend as a Service
- Docker - Portainer - Coolify
- Github Actions (CI/CD)
- N8N Workflow Automation Tool

## High Level Design

- [x] User visits webpage

- [x] User opens extension

- [x] Browser extension loads ElevenLabs voice clip and says "Please wait patiently while your LoFi track is loading... We are fetching the contents of the page, generating the necessary prompts, and guiding Audiocraft to generate you ambient and chilled-out LoFi music to create an enjoyable atmosphere to help you focus while reading. Sit back... Relax... and focus on your breathing for next several seconds..."

- [x] Lofi Focus sends current URL to N8N workflow

- [x] N8N calls JsonLink API to extract URL metadata

- [x] JsonLink returns page metadata to N8N

- [x] N8N sends metadata to ChatGPT API

- [x] ChatGPT generates personalized lofi music prompts

- [x] N8N parses the prompts

- [x] N8N sets generation parameters (prompt, sampling, top_k, MBD, etc)

- [x] N8N calls custom AudioCraft REST API (Python Flask)

- [x] Flask app runs locally and exposes API via LocalTunnel

- [x] Flask app receives inputs and invokes AudioCraft generation

- [x] AudioCraft generates track using MusicGen + RTX 4090 GPU (CUDA)

- [x] Flask API returns .wav file to N8N

- [x] N8N uploads .wav to S3 storage (Min.io)

- [x] N8N sends audio URL to Lofi Focus

- [x] Lofi Focus plays the generated track

# API Documentation

## Flask API
POST - `https://.../generate_music`
```json
{
    "model_name": "facebook/musicgen-small",
    "duration": 15,
    "prompt": "LoFi Hip-Hop",
    "strategy": "loudness",
    "sampling": true,
    "top_k": 0,
    "top_p": 0.9,
    "temperature": 0.9,
	  "use_diffusion": false
}
```

## N8N API
POST - `https://.../generate-music`
```json
{
	"url": "https://medium.com/@KimWitten/stop-trying-to-manage-your-time-a07b6e45cec8"
}
```

# Contributions
https://github.com/h0lybyte - Docker, Portainer, Appwrite

https://github.com/BChip - Audiocraft, Flask API, N8N Workflow, Eleven
Labs Voice AI, Documentation

https://github.com/Ziggy9263 - Chrome Extension

https://github.com/ZachHandley - Custom Audiocraft Model for LoFi

https://github.com/8gratitude8 - Presentation, Static Site, Prompt Engineering

https://github.com/ernivani - Chrome Extension

# Citations

```
https://ojs.stanford.edu/ojs/index.php/theword/article/view/1705/1326
@article{wang2020lofi,
  title={Lofi hip-hop radio: Beats to relax/study to},
  author={Wang, Justin},
  journal={The Word: Tha Stanford Journal of Student Hiphop Research},
  volume={1},
  number={1},
  pages={10--23},
  year={2020}
}

```

```
@article{copet2023simple,
      title={Simple and Controllable Music Generation},
      author={Jade Copet and Felix Kreuk and Itai Gat and Tal Remez and David Kant and Gabriel Synnaeve and Yossi Adi and Alexandre Défossez},
      year={2023},
      journal={arXiv preprint arXiv:2306.05284},
}
```