FROM node:18-alpine

ENV NEXT_PUBLIC_API_URL='http://localhost:5000'

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
