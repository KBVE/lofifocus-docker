# Docker Clarifai

## Background

This docker image is based upon `NodePy` from KBVE but extended out for the Clarifai hack-a-thon from LabLab!
The objective for this repo is to build a CI/CD pipeline that encompasses all of the basic pillars needed to build an application on top of Clarifai's API.

### Dev

For the install, please fork and clone this git repo, then inside of the forked/cloned repo folder, run:

- `yarn install` - Installs the Node modules.
- `poetry install` - Instals the Python modules.

After the packages are installed, you can start the dev environment with:

- `poetry shell` then `yarn start`.

#### Windows

For Windows Users, you will have to add Poetry to your path, it should be located here `C:\Users\$USER\AppData\Roaming\Python\Scripts\poetry` , with replacing $USER.

### Typescript Migration

Shifting the javascript codebase over to typescript would make things a bit easier in this mono-repo.

### CICD

The pipeline for this project will be:

- `install` - Which checks if the packages can be installed.
- `cloud` - Runs the different cloud functions.
- `release` - Packages the docker into an image for quick pulls.

### Rust

For the cache engine, I am thinking that the best option would be a rust-based internal engine that both the javascript and python files can call for data.
We might not have the time to build this out, as I am getting a decent chunk of errors all over the place.
