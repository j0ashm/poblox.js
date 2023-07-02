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

    global.poblox = poblox;
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
        poblox.cookie = cookie;

        await poblox.getGeneralXCSRF(cookie).then((res) => {
          poblox.xcsrf_token = res;
        }).catch((err) => { throw new Error("Failed to get X-CSRF token") });
        return res.data;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}

/**
  * Get X-CSRF token
  * @param {String} cookie
*/ 
poblox.getGeneralXCSRF = async (cookie) => {
  return new Promise(async (resolve, reject) => {
    axios.post(`https://auth.roblox.com/v2/logout`, {}, {
      timeout: 12000,
      headers: {
        Cookie: `.`
      },
      validateStatus: () => { return true; }
    }).then((res) => {
      let headers = response.headers;
      let token = headers['x-csrf-token'];

      if (!token) return reject('An error occurred while trying to get XCSRF token!');
      return resolve(token);
    }).catch((err) => {
      if (!err.response) return reject('Roblox did not respond in time.');
      return reject('An error occurred while trying to get your XCSRF token.');
    });
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
