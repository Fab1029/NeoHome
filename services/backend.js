const BASE_URL = "http://10.26.19.69:8000"

export const healthCheck = async() => {
  try {
    const response = await fetch(`${BASE_URL}/health`);
    
    const data = await response.json();
    
    if(data.status !== 'online')
      throw new Error("Server disconected");
    
    
    if(data.system.bluetooth.state !== 'connected')
      throw new Error("Server bluetooth disconected");

    return data;

  }catch(error) {
    throw new Error('Server disconected');
  }
};

export const sendAction = async(command) => {
  try{
    const response = await fetch(`${BASE_URL}/execute-command`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ command })
    });

    const data = await response.json(); 
    
    if (data.status !== 'sent') {
        throw new Error('Server cant not run action');
    }
    console.log(data);
    return data;

  }catch(eror) {
    throw new Error('Server disconected');
  }
};


export const uploadAudio = async (uri) => {
  try {
    const formData = new FormData();
    formData.append("file", {
      uri,
      name: "recording.m4a",
      type: "audio/m4a",
    });

    const response = await fetch(`${BASE_URL}/voice-command`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if(data.status !== 'executed')
      throw new Error("Action not executed");

    return data;

  }catch(error) {
    throw new Error('Server disconected');
  }
  
};

