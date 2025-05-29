# wk3_assignment

This is a simple web application that leverages OMDB's API to view details about movies and TV shows.

Setup Instructions
To run this you'll just need to clone this repo, run it using a web server, and access the page by accessing index.htm.

API Integration Details
The integration with OMDB's API uses their ability to search based on movie title and IMDB ID number.  Both are supported by selection the desired option in the GUI.  The API returns JSON data and all key/values are displayed in the results table except for response type and the URL for the poster image.

Limitations / future improvements
While this app does what it sets out to do there are some limitations and improvements that could be implemented:
1. There is a limit to a single movie that appears as a search result even if two have very similar names (A Minecraft Movie & The Minecraft Movie).  It would be great if both could appear - this is a limit of the API mainly but the application could possible account for this. 
2. Auto-complete for movie titles when typing in text box.  This doesn't have the modern experience of something like IMDB.com that tries to guess what you're going to type based on popularity and partial string.

Video Walkthrough link: https://youtu.be/SLmb1aE5iKk