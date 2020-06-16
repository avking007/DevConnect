const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  skills: {
    type: [String],
    required: true,
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },

      company: {
        type: String,
        required: true,
      },

      location: {
        type: String,
        required: true,
      },

      from: {
        type: Date,
        required: true,
      },

      to: {
        type: Date,
      },

      current: {
        type: Boolean,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },

      fieldofstudy: {
        type: String,
        required: true,
      },

      degree: {
        type: String,
        required: true,
      },

      from: {
        type: Date,
        required: true,
      },

      to: {
        type: Date,
        required: true,
      },

      current: {
        type: String,
        required: true,
      },

      description: {
        type: String,
      },
    },
  ],
  social: {
    linkedIn: {
      type: String,
    },
    google: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
