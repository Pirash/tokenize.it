docker build -t front-tokenizer-it .
docker stop tokenizer-frontend
docker rm tokenizer-frontend
docker run -d --name tokenizer-frontend -p 80:80 --link affectionate_ardinghelli:backend1 front-tokenizer-it