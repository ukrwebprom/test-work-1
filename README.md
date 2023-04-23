# test-work-1
This is a test project, made on **Career skills. Tech part** course.

## Used technologies
The project is created on React. The initial projet was created with Create React App. \
Used [Single Page Apps for GitHub Pages](https://github.com/rafgraph/spa-github-pages) to prevent 404 when refreshing on GitHub Pages \
Styling with SASS for simplification of nested styles. (https://www.npmjs.com/package/sass) \
Combining styles with CLSX library. (https://www.npmjs.com/package/clsx) \
Getting data from backend with AXIOS. (https://www.npmjs.com/package/axios#axios-api) \
Also used ready components from [Material UI](https://mui.com/)

## Why not use paginated requests?
While we show All the cards, paginated requests work like a charm. Mockapi backend allows requests with searchParams, such as ```/tweeter-users?page=1&limit=3``` so we are able to load a new portion of data each time when the user clicks Load more.
But, in combination with filtering, the logic becomes more complex. I would need to send unjustifiably many requests to the backend in order to find next portion of Follow or Following cards. Usually such tasks are solved using complex requests to the server, but Mockupy doesn't provide such option.
Comparing all the pros and cons I decided to load all the card on mounting.