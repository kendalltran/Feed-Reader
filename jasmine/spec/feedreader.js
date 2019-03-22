/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application (app.js)
 */

/* Placing all tests within the $() function, since some of these tests may
 * require DOM elements. We want to ensure they don't run until the DOM is ready.
 */

$(function() {

    // test suite testing the RSS feeds
    describe('RSS Feeds', function() {

         //spec that tests that allFeeds is defined and non-empty array
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // spec that loops through each feed and ensures each has a defined and non-empty url
         it('have a defined and non-empty URL', function() {
            for (let feed of allFeeds) {
              expect(feed.url).toBeDefined();
              expect(feed.url).not.toBe('');
            }
         });

         //spec that loops through each feed and ensures each has a defined and non-empty Name
         it('have a defined and non-empty Name', function() {
            for (let feed of allFeeds) {
              expect(feed.name).toBeDefined();
              expect(feed.name).not.toBe('');
            }
         });
    });

    //test suite that tests the menu
    describe('The menu', function(){

         //spec that tests that the menu is hidden by default
         it('is hidden by default', function(){
           // expect($('.menu-hidden').is(':visible')).toBe(true);
           let isHidden = document.body.classList.contains('menu-hidden');
           expect(isHidden).toBe(true);

         });

          //spec that ensures functionality of hamburger icon clicking
          it('changes visibility when menu icon is clicked', function(){
            // $('menu-icon-link').trigger('click');
            // expect($('.menu-hidden').is(':visible')).toBe(true);

            // $('menu-icon-link').trigger('click').trigger('click');
            // $('menu-icon-link').trigger('click');
            // expect($('.menu-hidden').is(':visible')).toBe(true);
            // $(x), making x a jquery object
            // let isHidden = document.body.classList.contains('menu-hidden');
            document.querySelector('a.menu-icon-link').click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            document.querySelector('a.menu-icon-link').click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
          });
        });
    // test suite for initial entries
    describe('Intial Entries', function(){

         // when the loadFeed function is called and completes its work, there is at least
         //  a single .entry element within the .feed container.
         // loadFeed() is asynchronous so test requires
         //  the use of Jasmine's beforeEach and asynchronous done() function.

         beforeEach(function(done) {
           loadFeed(3, done); //why is id/cb 1/done?
         })

         it('have at least a single entry in feed container', function(done) {

           let feedContainer = document.querySelector('div.feed');
           let entries = feedContainer.querySelectorAll('article.entry')
           expect(entries.length).not.toBe(0);
           for (let entry of entries) {
             expect($(entry)).toBeDefined();
           }
           done();
         })

       });
    //test suite for New Feed Selection
    describe('New Feed Selection', function() {

         //spec to test that when new feed is loaded, contatent actually changes
         let oldFeed, newFeed;
         //must use beforeEach for asynchronous
         beforeEach(function(done) {
           // let oldFeed = document.querySelector('div.feed');  cannot defined oldFeed locally here.
           loadFeed(1, function() {
             oldFeed = document.querySelector('div.feed').innerHTML;
             //why must i use ".innerHTML"
             loadFeed(2, function() {
               newFeed = document.querySelector('div.feed').innerHTML;
               done();
             })
           });
         });

         it('has new content', function () {
           expect(oldFeed).not.toBe(newFeed);
         })
       });
}());
