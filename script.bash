EC2_HOST="ubuntu@ec2-3-90-232-231.compute-1.amazonaws.com"
SSH_KEY="path_to_your_ssh_key.pem"

# SSH into the EC2 instance and execute commands
ssh -i "$SSH_KEY" "$EC2_HOST" << EOF
  cd roum

  git fetch origin master

  git reset --hard origin/master

  npm install

  pm2 restart 0
EOF
