FROM node:carbon
WORKDIR /app
ADD . /app
EXPOSE 80
RUN npm install
RUN npm run build
CMD npm run dev -- -p 80
