class Config {
  get(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }
  set(key, value) {
    return window.localStorage.setItem(key, JSON.stringify(value));
  }
};

let config = new Config();

let defaultConfig = {
  mturkEndpoint: 'https://mechanicalturk.sandbox.amazonaws.com',
  taskPoolAddress: 'https://task.mocos.kitchen',
};
for (let key in defaultConfig) {
  if (config.get(key) === null) {
    config.set(key, defaultConfig[key]);
  }
}

export default config;
