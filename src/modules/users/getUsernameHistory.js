module.exports = {
    name: 'getUsernameHistory',
    description: 'Gets a user\'s username history',
    execute: async (requests, userId) => {
        return new Promise(async (resolve, reject) => {
            if (isNaN(userId)) return reject("UserID must be a number");
            await requests.get(`https://users.roblox.com/v1/users/${userId}/username-history`).then((res) => {
                console.log(res);
                return resolve(res.data);
            }).catch(() => {
                return reject(null);
            });
        });
    }
}