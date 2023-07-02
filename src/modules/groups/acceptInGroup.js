module.exports = {
  name: 'acceptInGroup',
  description: 'Accept player(s) into a group',
  execute: async (requests, groupId, userId) => {
    return new Promise(async (resolve, reject) => {
      if (!userId) return reject("No user(s) specified");
      if (!userId.length || userId.length == 0)
        userId = [userId]

      if (userId.length > 100) return reject('You can only accept 100 users at a time');
      
      await requests.post(`https://groups.roblox.com/v1/groups/${groupId}/join-requests`, { userIds: userId }, {
        timeout: 15000,
        headers: {
          'Cookie': `.ROBLOSECURITY=${global.poblox.cookie}`,
          'x-csrf-token': global.poblox.xcsrf_token
        },
      }).then((res) => {
        let data = res.data;

        if (Object.keys(data).length === 0) return resolve('Accepted');
        return reject('Failed to accept that user. Make sure they\'re pending.');
      }).catch((err) => {
        if (!err.response) return reject('Roblox did not respond in time');
        if (err.response.status == 400) return reject('Failed to accept that user');
        if (err.response.status == 403) return reject('Insufficient permissions or token validation failed');
        if (err.response.status == 429) return reject('Ratelimit error');

        return reject('An error occurred while accepting the join request(s)');
      });
    });
  }

}
