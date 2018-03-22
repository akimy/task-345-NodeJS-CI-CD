FROM node:9

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY package.json . 

RUN git clone https://github.com/mrmlnc/scandir-native.git --mirror repository
RUN npm install
COPY . .
RUN npm run build

CMD npm start