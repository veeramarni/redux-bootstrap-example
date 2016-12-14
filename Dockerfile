FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy Source
COPY ./index.html /usr/src/app/
COPY ./dist/bundle.js /usr/src/app/dist/

# Install app dependencies
RUN npm install

# Run CI
RUN npm test
