# README

## TODO
* [x] setup heroku cronjob
* [x] convert search to fuzzy find
* [x] pull rating data directly from sites instead of OMDB
    * [x] rotten tomatoes 
    * [x] metacritic 
    * [x] IMDB
* [ ] add tweet collection
* [x] add movie search
* [ ] add ML model
* [x] show highest-box-office-rank next to movie title in index (cache this in movie table)
* [x]  show days-at-X-rank next to movie title / highest-box-office-rank
* [x] allow user to signup and login
* [x] allow user to mark movies as "seen" / "favorited"
* [x] resolve issue with scraper not grabbing data for some movies (could be from some studios not reporting numbers at the same time?)
* [ ] implement sign out (you can check in any time you like but you can never leave)

## runbook:
bundle install
rake assets:precompile
rails s
yarn start
