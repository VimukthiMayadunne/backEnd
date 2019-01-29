const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Emp = require('../modules/emp');
const config = require('../config/database');

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Emp.findById(jwt_payload.data._id, (err, emp) => {
      if(err) {
        return done(err, false);
      }
      if(emp) {
        return done(null, emp);
      } else {
        return done(null, false);
      }
    });
  }));
}

