# Readable Web Pages

These are some ideas on making web pages more readable, with examples.

## My Vision

The big idea is that most of your text shouldn't be so fancy and should give the user more control. Crudely speaking, make the bulk of your website more like an Amazon Kindle reader. Any size the user likes, and word wrap works.

I'm currently focused on a specific aspect of this project. If the web page is too wide, the content should be available in [snaking, newspaper-like columns](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Multiple-column_Layout). So the user's eyes don't have to go too far back and forth, but we don't waste any space.

This is a place where I totally disagree with some common practices. I believe if a user makes his web browser really wide or really thin, it's because he wants the content to be that width. I think the user knows better than the content creator how wide something should be, just like the user should be able to pick a font size.

I want to have some good built in defaults. But the user can change a few things. Like which type of scroll bar you want.

One of my ideas (that _should be_ obvious) is that you should have at most one scroll bar. Either horizontal or vertical, but never both. If you zoom into a picture you might need both scroll bars. But for text you should **never** have both.

Here's where I ran into trouble. It's surprisingly hard to make newspaper style columns work with scroll bars! I don't know why. That seems like a reasonable combination. I had to do some work, and what you see is proof that it can be done. I plan to clean it up more, but the proof is good.

## Status

Very early.
I'm just getting some samples together.

## Samples

- [Horizontal Scrolling Text](https://tradeideasphilip.github.io/readable-web-pages/top-level.html)
- [Internal Table of Contents](https://tradeideasphilip.github.io/readable-web-pages/internal-table-of-contents.html)
