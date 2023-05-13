module.exports = {
    name: 'getFollowerCount',
    description: 'Gets a user\'s follower count',
    execute: async (requests, userId) => {
        return new Promise(async (resolve, reject) => {
            if (isNaN(userId)) return reject("UserID must be a number");
            await requests.get(`https://friends.roblox.com/v1/users/${userId}/followers/count`).then((res) => {
                return resolve(res.count);
            }).catch(() => {
                return reject(null);
            });
        });
    }
}