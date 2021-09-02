cd server
tsc
cd ..

git add .
echo Type commit message
read msg
git commit -m "$msg"
git push

cd client
npm run deploy

echo --------
echo All done!


