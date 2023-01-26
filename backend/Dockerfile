FROM node:16.16-alpine3.15

WORKDIR /usr/irw


COPY . .

RUN npm install; \
    npx prisma init --datasource-provider=mysql;\
    npx prisma db pull;\
    npm run build



EXPOSE 3000


CMD ["npm","run","start"]