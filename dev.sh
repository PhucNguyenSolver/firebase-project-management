cd ./client
docker run -p 3000:3000 --volume $(pwd):/app -it --rm  deltaplus sh -c "npm run start"
cd ..
