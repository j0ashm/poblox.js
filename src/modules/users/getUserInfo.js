module.exports = {
    name: 'getUserInfo',
    description: 'Gets detailed user information from their User ID',
    execute: async (requests, userId) => {
        return new Promise(async (resolve, reject) => {
            await requests.get(`https://users.roblox.com/v1/users/${userId}`).then((res) => {
                return resolve({
                    id: res.id,
                    name: res.name,
                    description: res.description,
                });
            }).catch(() => {
                return reject(null);
            });
        });
    }
}