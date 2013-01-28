publish-to-gh-pages:
	grunt
	cp -r public/* /tmp/estring/
	git co gh-pages
	cp -r /tmp/estring/* .
	git ci -am "updating github page"
	git push
	git co master

.PHONY: publish-to-gh-pages
