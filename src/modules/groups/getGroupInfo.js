module.exports = {
    name: 'getGroupInfo',
    description: 'Gets detailed group information from its Group ID',
    execute: async (requests, groupId) => {
        return new Promise(async (resolve, reject) => {
            await requests.get(`https://groups.roblox.com/v1/groups/${groupId}`).then((res) => {
                return resolve(res);
            }).catch(() => {
                return reject(null);
            });
        });
    }
}