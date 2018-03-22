FROM node:9

ADD ./ /app
WORKDIR /app

COPY . .

ENV NODE_ENV=production
RUN git clone https://github.com/mrmlnc/scandir-native.git --mirror repository
RUN npm install
RUN npm run build

CMD npm start