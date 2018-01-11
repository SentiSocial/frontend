FROM node:carbon

WORKDIR /app

ADD ./package.json /app/package.json
RUN npm install
ADD . /app
RUN npm run build

EXPOSE 80

CMD npm start -- -p 80
