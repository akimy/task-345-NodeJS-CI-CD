FROM node:9

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY package.json . 
COPY getbranches.sh .
RUN git clone https://github.com/mrmlnc/scandir-native.git repository
RUN npm install
COPY . .
RUN npm run build

CMD npm start