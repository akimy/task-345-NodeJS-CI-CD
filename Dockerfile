FROM node:9

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY package.json . 
RUN git clone https://github.com/mrmlnc/micromatch.git repository
RUN for branch in  `git --git-dir ./repository/.git branch -r | grep -v 'HEAD\|master'`; do git --git-dir ./repository/.git branch --track ${branch##*/} $branch; done
RUN npm install
COPY . .
RUN npm run build

CMD npm start