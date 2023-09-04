const secretKey = 'acd264eeece9a981302f9530c9be556d8e8b50db74063a37a2653153cf6db726';

// eslint-disable-next-line no-useless-escape
const RegExp = /https?:\/\/(www.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

module.exports = {
  secretKey,
  RegExp,
};
