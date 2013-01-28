publish-to-gh-pages:
	grunt
	cp -r public /tmp/estring
	git co gh-pages
	cp -r /tmp/estring/public/* .
	git ci -am "updating github page"
	git push origin gh-pages
	git co master

.PHONY: publish-to-gh-pages
