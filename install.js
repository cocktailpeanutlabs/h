module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/peanutcocktail/hallo app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
//        env: {
//          GIT_CLONE_PROTECTION_ACTIVE: "false"
//        },
        path: "app",
        message: [
          "git lfs install",
          "git clone https://huggingface.co/fudan-generative-ai/hallo pretrained_models"
        ]
      }
    },
    {
      method: "fs.download",
      params: {
        dir: "app/pretrained_models/hallo",
        uri: "https://huggingface.co/fudan-generative-ai/hallo/resolve/main/hallo/net.pth?download=true"
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "pip install gradio devicetorch",
          "{{platform === 'darwin' ? 'pip install eva-decord' : 'pip install decord'}}",
          "pip install -r ../requirements.txt",
        ]
      }
    },
    //  Uncomment this step to add automatic venv deduplication (Experimental)
    {
      method: "fs.link",
      params: {
        venv: "app/env"
      }
    },
    {
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }
  ]
}
