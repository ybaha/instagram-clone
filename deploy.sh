echo Type commit message
read msg


cd server
tsc
cd ..

git add .
git commit -m "$msg"
git push

cd client
npm run deploy

echo --------
echo All done!


