const mongoose = require('mongoose');

const GenericSchema = new mongoose.Schema({
    idVideo: {type: String},
    miniature: { type: String },
    title: { type: String},
    channelTitle: { type: String },
    channelId: {type: String},
    lengthSeconds: {type: String},
    verified: {type: String},
    viewCount: {type: String},
    description: {type: String},
    updated: { type: String},
  });

  const LikeSchema = new mongoose.Schema({
    idVideo: {type: String},
    thumbnail: { type: String },
    channelThumbnail: { type: String},
    title: { type: String},
    channelTitle: { type: String },
    publishDate: {type: String},
    channelId: {type: String},
    subscriberCountText: { type: String },
    lengthSeconds: {type: String},
    verified: {type: String},
    viewCount: {type: String},
    description: {type: String},
    typeLike: {type: String},
    updated: { type: String},
  })

  const SubSchema = new mongoose.Schema({
      channelId: {type: String},
      channelThumbnail: { type: String},
      channelTitle: { type: String },
      numberSubs: { type: String },
      updated: { type: String},
  })

  const LibrarySchema = new mongoose.Schema({
        titlePlaylist: {type: String},
        description: {type: String},
        data: [LikeSchema],
  })

const userSchema = new mongoose.Schema({
    username: { type: String , required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    color: {type: String},
    image: { type: String},
    historyVideos: [GenericSchema],
    likes: [LikeSchema],
    subscriptions: [SubSchema],
    Library: [LibrarySchema]
})   

module.exports = mongoose.model("users", userSchema);
