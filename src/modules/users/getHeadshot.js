module.exports = {
  name: 'getHeadshot',
  description: 'Get a user\'s headshot URI',
  execute: async (requests, userId) => {
    return new Promise(async (resolve, reject) => {
      if (isNaN(userId)) return reject("UserId must be a number");
    
      await requests.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=png`).then(res => {
        let data = res.data.data;

        if (!data.length) return reject("No users found");

        return resolve(data[0].imageUrl + ".png");
      }).catch((err) => {
        if (!err.response) return reject("Roblox did not respond");
        if (err.response.status == 404) return reject("Roblox user not found. Check your UserID.");
        if (err.response.status == 429) return reject("You are being rate limited");

        return reject("An error occurred while trying to get the headshot.");
      });
    }); 
  }
}
