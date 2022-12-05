FROM node:12.16.3-alpine3.9

RUN mkdir -p /var/www/deli-front
WORKDIR /var/www/deli-front

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=80

CMD [ "npm", "start" ]
