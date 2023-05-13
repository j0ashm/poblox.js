# poblox.js
A promise-respecting API wrapper for Roblox's Web APIs

### Why?
Other Roblox API's out there don't fully utilize Promises in their functions, therefore when running into errors, all you get is a useless console error, instead of a Promise rejection to state that a connection could not be established.

### Use
This library currently powers all bots and internal API services for [Blueprint](https://www.roblox.com/groups/13320442/lueprint#!/about) communities and it's games.

### Plans
- [ ] Update existing modules rejection statements to contain information about failure in-case of rate limit
- [ ] Implement more common endpoints into the library - such as `setRank` 
- [ ] TBD
