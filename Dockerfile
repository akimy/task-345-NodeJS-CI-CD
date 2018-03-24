FROM node:9

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
ENV LOCAL_PATH_TO_REPO
ENV REPOSITORY_LINK
COPY package.json . 
RUN git clone $REPOSITORY_LINK $LOCAL_PATH_TO_REPO
RUN for branch in  `git --git-dir ./repository/.git branch -r | grep -v 'HEAD\|master'`; do git --git-dir ./repository/.git branch --track ${branch##*/} $branch; done
RUN npm install
COPY . .
RUN npm run build

CMD npm start