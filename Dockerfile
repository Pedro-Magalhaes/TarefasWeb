FROM node:lts
RUN  apt update -y && apt install -y \
    git \
    python3 \
    make g++
RUN apt clean & apt autoclean
RUN npm update -g npm
RUN npm install -g @angular/cli
# ENV NODE_ENV=production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 4000
# RUN chown -R node /usr/src/app
# USER node
# CMD ["node", "index.js"]
