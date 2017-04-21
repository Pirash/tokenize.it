FROM nginx
COPY src/ /www/data/
COPY nginx.conf /etc/nginx/nginx.conf
RUN echo "$(date)" > /www/data/buildinfo.html

