# TinyUrl

### Pages

1. Public end user page (/)
   Page where user can create short URLs
2. Admin table overview (/admin/urls)
   Page where Admin can see table of most popular domain searches

### Questions

1.  What is a URL shortening system?
    URL shortening is used to create shorter aliases for long URLs. We call these shortened aliases short links. Users are redirected to the original URL when they hit these short links.
2.  What's the main value? Who needs such a system and why?
    Short links save a lot of space when displayed, printed, messaged, or tweeted. Additionally, users are less likely to mistype shorter URLs.
    Also, those URLs are used as a part of a marketing campaign, they beautifully link, track clicks, and can disguise the real address.
3.  Describe The main mechanism of work and system components.
    The first part would be to implement URL creating system. It consists of our domain and unique ID, that short URL is saved into our database also with date timestamp in order to track searches for the domain in past 24 hours. The second part of the service is
    consuming that short link redirecting to the full URL.
4.  What do you think are the main challenges in implementing and running the system
    The main challenge would be the scaling, in those cases, we would need to consider some important parts as traffic and storage computation, alongside memory and bandwidth consumptions.
    5.Try to suggest some ideas for advanced features.
    In the next features, we could allow customers to choose between our domains base, and also to add some of the parts on the URL that could be customized. We could add registration of the users, so they would have an overview of their shortened URLs. To add authentication and authorization. In Admin panel to add pagination, searching, filtering, and sorting, alongside with some overall statistics.

**My question:** Regarding the tracking of the most popular domains, it’s not quite clear what needs to be tracked: the times that user created a short URL for a single domain or the times that the user clicked on our short URL and being redirected. I decided to track the first case, but the tracking process for the second would be the same or similar.
