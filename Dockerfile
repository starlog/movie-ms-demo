FROM public.ecr.aws/bitnami/node:14

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

ENV NODE_ENV=production
#ENV NODE_ENV=development

EXPOSE 8080

CMD [ "node", "index.js" ]
