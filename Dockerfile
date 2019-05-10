FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @angular/cli

COPY . .

EXPOSE 4200

CMD ["ng", "build", "--prod"]