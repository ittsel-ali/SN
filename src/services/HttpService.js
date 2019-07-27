export const HttpService = {
  
  post: function(url, data){ 
    return(
      fetch(url, {
        method: "POST",
        body: data,
        headers: this.headers 
        })
      
      .then( response => {
        if(!response.ok)
          throw response.json();
        return response.json();
        })
      
      .catch( err => err.then( err => {throw err} ))
      );
    },
  
  get: function(url) { 
    return(
      fetch(url, {
        method: "GET",
        headers: this.headers
        })

      .then( response => {
        if(!response.ok)
          throw response.json();
        return response.json();
        })
      
      .catch( err => err.then( err => {throw err} ))
      );
    },

  put: function(url, data){ 
    return(
      fetch(url, {
        method: "PUT",
        body: data,
        headers: this.headers 
        })
      
      .then( response => {
        if(!response.ok)
          throw response.json();
        return response.json();
        })
      
      .catch( err => err.then( err => {throw err} ))
      );
    },
  
  patch: function(url, data){ 
    return(
      fetch(url, {
        method: "PATCH",
        body: data,
        headers: this.headers 
        })
      
      .then( response => {
        if(!response.ok)
          throw response.json();
        return response.json();
        })
      
      .catch( err => err.then( err => {throw err} ))
      );
    },

  

  headers: {
    "Authorization": null,
  },

  setAuthHeader: function(authType, authToken) {
    this.headers = {
      ...this.headers,
      "Authorization": authType+" "+authToken
    };
  },

}