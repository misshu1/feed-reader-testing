/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has an url defined and url is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.trim().length).not.toBe(0);
            });
        });

        it('has an name defined and name is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name.trim().length).not.toBe(0);
                expect(feed.name).toBeDefined();
            });
        });
    });


    describe('The menu', function() {

        /* A test that ensures the menu element is hidden by default
         */
        it('menu should be hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true)
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again. 
         */
        it('should toggle class on click', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);


        });
    });


    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            })
        });

        /* The loadFeed function is called and completes its work, there is 
         * at least a single .entry element within the .feed container. 
         */
        it('the feed is not empty', function() {
            expect($('.feed .entry')).toBeDefined();
        });
    });


    /* When a new feed is loaded by the loadFeed 
     * function the content actually changes.
     */
    describe('New Feed Selection', function() {
        let feeds1 = {};
        let feeds2 = {};
        beforeEach(function(done) {
            loadFeed(0, function() {
                feeds1.url = $('.entry-link');
                loadFeed(1, function() {
                    feeds2.url = $('.entry-link');
                    done()
                })
            });
        });
        it('feeds should be different', function() {
            expect(feeds1).not.toBe(feeds2);
        });
    });
}());