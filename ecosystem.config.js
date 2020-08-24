module.exports = {
  apps: [
    {
      name: "Admin Services | TrazeTrip",
      script: "npx",
      args: "serve -s build -l $PORT",
      cwd: "/var/www/admin-trace-trip/",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      env: {
        NODE_ENV: "development",
        PORT: 3002,
      },
      env_staging: {
        NODE_ENV: "production",
        PORT: 3002,
      },
    },
  ],
  deploy: {
    staging: {
      user: "root",
      host: "64.227.61.21",
      ref: "origin/stage",
      repo: "git@github.com/admin-trace-trip.git",
      path: "/var/www/admin-trace-trip",
      ssh_options: ["StrictHostKeyChecking=no", "PasswordAuthentication=no"],
      "pre-setup": "rimraf node_modules && rimraf build",
      "post-setup": "npm install --unsafe-perm && npm run build",
      "post-deploy": "pm2 start ecosystem.config.js  --env staging",
    },
  },
};
