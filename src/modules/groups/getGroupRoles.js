module.exports = {
  name: 'getGroupRoles',
  description: 'Get a list of rolesets in the group',
  execute: async (requests, groupId) => {
    return new Promise(async (resolve, reject) => {
      await requests.get(`https://groups.roblox.com/v1/groups/${groupId}/roles`, { timeout: 12000 }).then(res => {
        let data = res.data;

        if (!data.roles) return reject('An error occurred while trying to get the group roles');
        return resolve(data.roles);
      }).catch(err => {
        if (!err.response) return reject('Roblox did not respond in time.');
        if (err.response.status == 400) return reject('The group is invalid or does not exist!');
        
        return reject('An error occurred while trying to get the group roles');
      })
    });
  }
}
