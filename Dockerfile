FROM node:latest

WORKDIR /usr/src/app/graphqlApp
COPY . /usr/src/app/graphqlApp
RUN npm install
EXPOSE 3000
CMD npm start
