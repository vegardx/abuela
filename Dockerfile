FROM node:13-stretch

ARG PORT=80
ARG APP_URL="http://localhost:${PORT}/"

ENV PORT=${PORT}
ENV APP_URL=${APP_URL}

RUN mkdir /abuela

ADD . /abuela

WORKDIR /abuela
RUN npm install
RUN npm run build

EXPOSE ${PORT}
CMD ["npm", "run", "start"]