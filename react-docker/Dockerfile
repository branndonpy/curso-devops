# Set the base image to create the image for the react app
FROM node:20-alpine

# Create a user with permisions to run the app
# -S create a system user
# -G add user to a group
RUN addgroup app && adduser -S -G app app

USER app

WORKDIR /app

COPY package*.json ./

USER root

RUN chown -R app:app .

USER app

RUN npm install

COPY . .

EXPOSE 5173

CMD npm run dev