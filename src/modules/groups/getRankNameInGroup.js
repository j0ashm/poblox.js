module.exports = {
    name: 'getRankNameInGroup',
    description: 'Gets a user\'s rank name in a group',
    execute: async (requests, userId, groupId) => {
        return new Promise(async (resolve, reject) => {
            await requests.get(`https://groups.roblox.com/v2/users/${userId}/groups/roles`).then((res) => {
                console.log(res)
                let role;     
                for (const group in res.data) {
                    if (res.data[group].group.id == groupId) {
                        role = res.data[group].role;
                    }
                }

                return resolve(role ? role.name : 'Guest');
            }).catch(() => {
                return reject(null);
            });
        });
    }
}