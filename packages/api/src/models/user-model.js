const { Schema, Types, model } = require("mongoose");
const { isEmail, isDate, isURL } = require("validator");
const { getHash } = require("../services/crypto");

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: (value) => isEmail(value),
        message: (props) => `The email ${props.value} is not valid`,
      },
    },
    firstname: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    lastname: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    username: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 250,
    },
    birth_date: {
      type: String,
      trim: true,
      validate: {
        validator: (value) =>
          value ? isDate(value, { strictMode: true, format: "YYYY-MM-DD" }) : true,
        message: () => `Date is not valid`,
      },
    },
    thumbnails: {
      url_default: {
        type: String,
        trim: true,
        validate: {
          validator: (value) => (value ? isURL(value) : true),
          message: () => `URL for default thumbnail is invalid`,
        },
      },
      url_medium: {
        type: String,
        trim: true,
        validate: {
          validator: (value) => (value ? isURL(value) : true),
          message: () => `URL for medium thumbnail is invalid`,
        },
      },
      url_large: {
        type: String,
        trim: true,
        validate: {
          validator: (value) => (value ? isURL(value) : true),
          message: () => `URL for large thumbnail is invalid`,
        },
      },
    },
    liked_albums: {
      type: [Types.ObjectId],
      ref: "album",
    },
    liked_tracks: {
      type: [Types.ObjectId],
      ref: "track",
    },
    followed_playlists: {
      type: [Types.ObjectId],
      ref: "playlist",
    },
    followed_users: {
      type: [String],
      ref: "user",
    },
    followers: {
      type: [String],
      ref: "user",
    },
    deleted_at: {
      type: Date,
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;

        delete ret._id;
      },
    },
  },
);

UserSchema.virtual("num_liked_albums").get(function () {
  return this.liked_albums.length;
});

UserSchema.virtual("num_liked_tracks").get(function () {
  return this.liked_tracks.length;
});

UserSchema.virtual("num_followed_playlists").get(function () {
  return this.followed_playlists.length;
});

UserSchema.virtual("num_followed_users").get(function () {
  return this.followed_users.length;
});

UserSchema.virtual("num_followers").get(function () {
  return this.followers.length;
});

/* Query Helpers */

UserSchema.query.notDeleted = function () {
  return this.where({ deleted_at: { $exists: false } });
};

/* Statics */

UserSchema.statics.getNumPages = function () {
  const limit = 10;

  return this.countDocuments()
    .notDeleted()
    .then((count) => {
      return Math.floor(count / limit) + (count % limit ? 1 : 0);
    });
};

UserSchema.statics.getUser = function (id, extend = false) {
  const populate = [
    {
      path: "liked_albums",
      select: "title",
      match: { deleted_at: { $exists: false } },
    },
    {
      path: "liked_tracks",
      select: "title",
      match: { deleted_at: { $exists: false } },
    },
    {
      path: "followed_playlists",
      select: "title",
      match: { deleted_at: { $exists: false } },
    },
    {
      path: "followed_users",
      // select: "username",
      match: { deleted_at: { $exists: false } },
    },
    {
      path: "followers",
      // select: "username",
      match: { deleted_at: { $exists: false } },
    },
  ];

  return this.findById(id)
    .notDeleted()
    .populate(extend ? populate : undefined);
};

UserSchema.statics.getUsers = function (page = 1, sort = "created_at", order = "asc") {
  const limit = 10;
  const start = (page - 1) * limit;

  return this.find()
    .notDeleted()
    .sort({ [sort]: order })
    .skip(start)
    .limit(limit);
};

UserSchema.statics.updateUser = function (id, data) {
  const { firstname, lastname, username, description, thumbnails } = data;

  return this.findOneAndUpdate(
    { _id: id, deleted_at: { $exists: false } },
    { $set: { firstname, lastname, username, description, thumbnails } },
    { new: true, runValidators: true },
  );
};

UserSchema.statics.deleteUser = function (id) {
  return this.findOneAndUpdate(
    { _id: id, deleted_at: { $exists: false } },
    {
      $set: { deleted_at: Date.now(), _id: getHash(id) },
      $unset: { username: "", firstname: "", lastname: "", email: "" },
    },
    { new: true },
  );
};

UserSchema.statics.switchValueInList = async function (id, listName, value) {
  const user = await this.findById(id).notDeleted();

  if (!user) return null;

  if (user[listName].indexOf(value) === -1) {
    return await this.findOneAndUpdate(
      { _id: id, deleted_at: { $exists: false } },
      { $push: { [listName]: value } },
      { new: true, runValidators: true },
    );
  } else {
    return await this.findOneAndUpdate(
      { _id: id, deleted_at: { $exists: false } },
      { $pull: { [listName]: value } },
      { new: true, runValidators: true },
    );
  }
};

UserSchema.statics.likeAlbum = async function (id, idAlbum) {
  return await this.switchValueInList(id, "liked_albums", idAlbum);
};

UserSchema.statics.likeTrack = async function (id, idTrack) {
  return await this.switchValueInList(id, "liked_tracks", idTrack);
};

UserSchema.statics.followUser = async function (id, idFollowed) {
  return await this.switchValueInList(id, "followed_users", idFollowed);
};

UserSchema.statics.followPlaylist = async function (id, idPlaylist) {
  return await this.switchValueInList(id, "followed_playlists", idPlaylist);
};

UserSchema.statics.getFollowed = async function (id, idFollower) {
  return await this.switchValueInList(id, "followers", idFollower);
};

const User = model("user", UserSchema);

module.exports = User;
