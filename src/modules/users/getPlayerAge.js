module.exports = {
    name: 'getPlayerAge',
    description: 'Gets a user\'s age',
    execute: async (requests, userId) => {
        return new Promise(async (resolve, reject) => {
            if (isNaN(userId)) return reject("UserID must be a number");
            await requests.get(`https://users.roblox.com/v1/users/${userId}`).then((res) => {
                return resolve({timestamp: Math.floor(new Date(res.created).getTime() / 1000), age: Math.floor((new Date() - new Date(res.created)) / (1000 * 60 * 60 * 24))})
            }).catch(() => {
                return reject(null);
            });
        });
    }
}