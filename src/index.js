const axios = require('axios');
const fs = require('fs');

const poblox = {
    cookie: null,
    username: null,
    userId: null,
    requests: {}
};

poblox.init = async () => {
    const modules = await fs.promises.readdir(`${__dirname}/modules`);
  
    for (const module of modules) {
      const endpoints = await fs.promises.readdir(`${__dirname}/modules/${module}`);
      const endpointFiles = endpoints.filter((endpoint) => endpoint.endsWith('.js'));
  
      for (const endpoint of endpointFiles) {
        const endpointData = require(`${__dirname}/modules/${module}/${endpoint}`);
        poblox[endpointData.name] = (...args) => {
          return endpointData.execute.apply(null, [poblox.requests, ...args]);
        };
      }
    }
  
    return poblox;
  };

/**
 * Sets the cookie to be used in authenticated requests
 * @param {String} cookie 
 */
poblox.setCookie = async (cookie) => {
    if (!cookie) throw new Error("No cookie provided");
    if (typeof cookie !== "string") throw new Error("Cookie must be a string");
    if (cookie.toLowerCase().includes('warnings:-')) throw new Error("Roblox warning doesn\'t seem to be in this cookie. Ensure you copied the entire .ROBLOSECURITY cookie into the cookie parameter.");
    poblox.cookie = cookie;
    await axios.get('https://users.roblox.com/v1/users/authenticated', {
        headers: {
            "cookie": `.ROBLOSECURITY=${cookie};`
        }
    }).then((res) => {
        poblox.userId = res.data.id;
        poblox.username = res.data.name;
        return res.data;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}

poblox.requests.get = (url, params) => {
    return new Promise(async (resolve, reject) => {
        await axios.get(url, {
            ...params,
            headers: {
                "cookie": `.ROBLOSECURITY=${this.cookie};`
            }
        }).then((res) => {
            return resolve(res.data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

poblox.requests.post = async (url, params) => {
    return new Promise(async (resolve, reject) => {
        await axios.post(url, {
            ...params,
            headers: {
                "cookie": `.ROBLOSECURITY=${this.cookie};`
            }
        }).then((res) => {
            return resolve(res);
        }).catch((err) => {
            return reject(err);
        });
    });
}

module.exports = poblox;