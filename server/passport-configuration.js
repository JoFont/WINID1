const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

const Player = require('./models/player');
const bcryptjs = require('bcryptjs');

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  Player.findById(id)
  .then(user => {
    callback(null, user);
  })
  .catch(error => {
    callback(error);
  });
});

passport.use(
  'local-sign-up',
  new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, (req, email, password, callback) => {
    const name = req.body.name;
    bcryptjs
      .hash(password, 10)
      .then(hash => {
        return Player.create({
          name,
          email,
          passwordHash: hash
        });
      })
      .then(user => {
        callback(null, user);
      })
      .catch(error => {
        callback(error);
      });
  })
);

passport.use(
  'local-sign-in',
  new LocalStrategy({ usernameField: 'email' }, (email, password, callback) => {
    let user;
    Player.findOne({
      email
    })
      .then(document => {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      })
      .then(passwordMatchesHash => {
        if (passwordMatchesHash) {
          callback(null, user);
        } else {
          callback(new Error('WRONG_PASSWORD'));
        }
      })
      .catch(error => {
        callback(error);
      });
  })
);

passport.use(
  'github',
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/authentication/github-callback',
      scope: 'user:email'
    },
    (accessToken, refreshToken, profile, callback) => {
      const {
        displayName: name,
        emails,
        photos: [{ value: photo } = {}] = []
      } = profile;
      const primaryEmail = emails.find(email => email.primary).value;
      Player.findOne({ email: primaryEmail })
        .then(user => {
          if (user) {
            return Promise.resolve(user);
          } else {
            return Player.create({
              email: primaryEmail,
              photo,
              name,
              githubToken: accessToken
            });
          }
        })
        .then(user => {
          callback(null, user);
        })
        .catch(error => {
          callback(error);
        });
    }
  )
);
