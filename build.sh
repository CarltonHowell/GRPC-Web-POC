# Add es-lint disable to all proto generated JS/TS files to prevent eslint errors
for f in ./src/proto/*
do
    echo '/* eslint-disable */' | cat - "${f}" > temp && mv temp "${f}"
done