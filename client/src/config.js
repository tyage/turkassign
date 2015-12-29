let config = new Map();

const defaultConfig = {
  taskPoolerAddress: 'https://task.mocos.kitchen' // call workerProxyServer.reconnect after change this
};
for (let key in defaultConfig) {
  if (config.get(key) === undefined) {
    config.set(key, defaultConfig[key]);
  }
}

export default config;
