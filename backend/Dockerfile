FROM node:16.16-alpine3.15

WORKDIR /dashboard

COPY package.json .

RUN npm install --legacy-peer-deps; \
    npx prisma init --datasource-provider=mysql;\
    npx prisma db pull;\
    npm run build



COPY . .


EXPOSE 4000


CMD ["npm","run","start"]