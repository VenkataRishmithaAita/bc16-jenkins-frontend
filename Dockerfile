FROM node:10-alpine as baseimage
RUN mkdir /app
WORKDIR /app 
COPY ["package.json","."]
RUN npm install 
#RUN mv ./node_modules /app    
COPY . . 
EXPOSE 8080
RUN npm run build-prod



FROM nginx:alpine
COPY --from=baseimage /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
