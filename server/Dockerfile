FROM nginx:alpine3.18-slim

WORKDIR /var/www/html

RUN rm /etc/nginx/conf.d/default.conf
COPY ./conf/ /etc/nginx/conf.d/

RUN mkdir -p /var/www/html && touch /var/www/html/index.html
