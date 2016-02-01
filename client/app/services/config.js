const localStorage = window.localStorage;

class Config {
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  set(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
  keys() {
    return Object.keys(localStorage);
  }
  getItems() {
    const items = {};
    this.keys().forEach(key => {
      items[key] = this.get(key);
    });
    return items;
  }
};

const config = new Config();

const defaultConfig = {
  mturkEndpoint: 'https://mechanicalturk.sandbox.amazonaws.com',
  taskPoolAddress: 'https://task.mocos.kitchen',
};
for (let key in defaultConfig) {
  if (config.get(key) === null) {
    config.set(key, defaultConfig[key]);
  }
}

export default config;
