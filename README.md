


### A note on filter by article topic

This service filters articles by topic with different topics having an independent nav element -> fetch request -> display jsx componnent.

This means each of these jsx components need to be altered to accomodate changes to the article component.

An alternative method which avoids this and rpeating code would be to have a form to select the topic state in articles and then pass this info down to a lower level to fetch the articles array prior to displaying any results to the end user.