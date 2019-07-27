const prod = {
  keys: {
    NOTIFIER_KEY: "a89b945f4dec90c0527f"
  },

  url: {
    API_URL: "https://linkup-backend-rails.herokuapp.com"
  }
}; 

const dev = {
  keys: {
    NOTIFIER_KEY: "a89b945f4dec90c0527f"
  },
  
  url: {
    API_URL: "http://localhost:3000"
  }
};

export const config = process.env.NODE_ENV == 'development' ? dev : prod;
