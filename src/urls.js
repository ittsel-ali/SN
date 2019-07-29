import {config} from './env'

export const urls = {
  api_url: config.url.API_URL,
  
  signup: function() {
    return this.api_url+"/users";
  },

  signin: function() {
    return this.api_url+"/oauth/token";
  },

  me: function() {
    return this.api_url+"/users/me";
  },
  
  update_user: function(){
    return this.api_url+"/users/update_user";
  },

  users: function() {
    return this.api_url+"/users";
  },

  user_search: function(search) {
    return this.api_url+"/users/search/:search".replace(":search", search);
  },

  friend_info: function(friend_id) {
    return this.api_url+"/friends/:friend_id/friend_info".replace(":friend_id", friend_id);
  },

  friends: function() {
    return this.api_url+"/friends";
  },

  friend_requests: function() {
    return this.api_url+"/friends/requests";
  },

  inviteFriend: function(friend_id) {
    return this.api_url+"/friends/:friend_id/invite_friend".replace(":friend_id", friend_id);
  },

  confirmFriend: function(friend_id) {
    return this.api_url+"/friends/:friend_id/confirm_friend".replace(":friend_id", friend_id);
  },

  timeline: function(user_id) {
    return this.api_url+"/users/:user_id/timeline".replace(":user_id", user_id);
  },

  posts: function() {
    return this.api_url+"/posts";
  },

  post: function(id) {
    return this.api_url+"/post/:id".replace(":id", id);
  },

  comments: function(postId) {
    return this.api_url+"/posts/:postId/comments".replace(":postId", postId);
  },

  comment: function(postId, id) {
    return this.api_url+"/posts/:postId/comments/:id".replace(":postId", postId).replace(":id", id);
  }
}
