# Stage 1: Build the React Application
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
#to be able to install Airbus Design css framework, nexus repository needs to be configured:
COPY .npmrc ./.npmrc  
RUN npm install
COPY . .
RUN npm run build
RUN npm run export

# Stage 2: Setup the Nginx Server to serve the React Application
FROM nginx:1.25.0-alpine as production
COPY --from=build /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]