module.exports = {
    apps: [
      {
        name: "yarn",
        script: "yarn",
        args: "start",
        interpreter: "/bin/bash",
        env: {
          NODE_ENV: "production",
          LD_LIBRARY_PATH: "/usr/local/lib",
        },
      },
    ],
  };