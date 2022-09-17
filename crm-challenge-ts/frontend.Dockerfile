FROM node:14-alpine

WORKDIR /app
COPY ./frontend /app/frontend
COPY ./customer-model /app/customer-model
COPY tsconfig.base.json /app/
WORKDIR /app/frontend

RUN npm install

EXPOSE 3000/tcp

CMD ["npm", "run", "dev"]
