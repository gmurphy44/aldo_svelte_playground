

## Instructions

1. Inside shoe-store-websocket, run the text inside startup.txt. This requires ruby. 

```
cd show-store-websocket
./bin/websocketd --port=8044 ruby inventory.rb

```


2. Install node modules

```
npm install

```


3. Run the server

```
npm run dev

```


4. The main page should be running on localhost:5173 and should show a pre-loaded sunburst chart. Sometimes there's a websocket connect error due to the way sveltekit loads browser resources. You may need to reload the page. Haven't found a good workaround yet. 


5. The sunburst is updating with each websocket event. If you click on one of the outer rows, you'll see the entire store inventory, sorted by lowest -> highest. The leaf sections of the sunburst are sizes to the inventory as well, so you should see the lowest inventory as the largest sections. 

6. You can click the middle section of the sunburst and see a single store's inventory in a subset layout. The updates/ animations are still a bit janky. The updates are paused if you open this view, and will resume after you click again. 

7. NB: There is some SQLite based DB stuff I was going to use to record all the websocket events but this was my first time playing with sveltekit and it seems to have strong opinions about routing / apis. I gave up, for now, trying to send the websocket events directly to the DB. I also haven't found a good central place to 
subscribe to the aldo_store yet, so that when you leave a page it doesn't stop listening to the socket. This is probably better off as a server listener, but I'd have to spend more time looking into it. 









