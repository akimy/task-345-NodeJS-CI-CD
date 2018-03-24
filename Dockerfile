FROM node:9

ENV LOCAL_PATH_TO_REPO reporepo
ENV REPOSITORY_LINK https://github.com/lodash/lodash.git
ENV PORT 3000

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY package.json . 
RUN git clone $REPOSITORY_LINK $LOCAL_PATH_TO_REPO
RUN for branch in  `git --git-dir ./repository/.git branch -r | grep -v 'HEAD\|master'`; do git --git-dir ./repository/.git branch --track ${branch##*/} $branch; done
RUN npm install
COPY . .
RUN npm run build

CMD npm start