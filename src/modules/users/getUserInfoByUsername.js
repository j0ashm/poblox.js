module.exports = {
    name: 'getUserInfoByUsername',
    description: 'Gets detailed user information from their username',
    execute: async (requests, username) => {
        return new Promise(async (resolve, reject) => {
            /**
             * Username here can be a string or an array of strings - if there's multiple, we return all of them.
             */

            if (!Array.isArray(username)) {
                username = [username];
            }
            
            await requests.post(`https://users.roblox.com/v1/usernames/users`, {
                usernames: username
            }).then((res) => {
                return resolve(res.data.data);
            }).catch(() => {
                return reject(null);
            });
        });
    }
}