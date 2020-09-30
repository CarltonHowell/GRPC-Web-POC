for f in ./src/proto/*
do
    echo '/* eslint-disable */' | cat - "${f}" > temp && mv temp "${f}"
done