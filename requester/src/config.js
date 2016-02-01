const config = new Map();

const defaultConfig = {
  taskPoolAddress: 'https://task.mocos.kitchen' // call workerProxyServer.reconnect after change this
};
for (let key in defaultConfig) {
  if (config.get(key) === undefined) {
    config.set(key, defaultConfig[key]);
  }
}

export default config;
