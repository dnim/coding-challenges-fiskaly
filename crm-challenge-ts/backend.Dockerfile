FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY ./backend/ /app/backend/
COPY ./customer-model/ /app/customer-model/
COPY tsconfig.base.json /app/
WORKDIR /app/backend

RUN npm install

EXPOSE 3001/tcp

CMD ["npm", "run", "dev"]
