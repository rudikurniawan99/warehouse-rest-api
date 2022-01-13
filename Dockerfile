FROM node:alpine as warehouse_rest_api_app
WORKDIR /usr/src/app
COPY yarn.lock .
COPY package.json .
RUN yarn install
COPY . .
CMD [ "yarn", "dev" ]