module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '0b70a5d062da2cb1b63ca6e59f87fd51'),
  },
});
