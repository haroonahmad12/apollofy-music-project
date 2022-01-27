const { Schema, Types, model } = require("mongoose");
const { isURL } = require("validator");

const AlbumSchema = Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "user",
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      trim: true,
    },
    url_image: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => (value ? isURL(value) : true),
        message: () => `Image URL is invalid`,
      },
    },
    url_thumbnail: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => (value ? isURL(value) : true),
        message: () => `Image thumbnail URL is invalid`,
      },
    },
    genres: {
      type: [Types.ObjectId],
      ref: "genre",
      trim: true,
    },
    num_likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    liked_by: {
      type: [Types.ObjectId],
      ref: "user",
      trim: true,
    },
    tracks: {
      type: [Types.ObjectId],
      ref: "track",
      trim: true,
    },
    deleted_at: {
      type: Date,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Album = model("album", AlbumSchema);

module.exports = Album;
