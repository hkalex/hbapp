if [ ! -d "imports" ]; then
	ln -s ../hbapp/imports imports
fi

if [ ! -d "node_modules" ]; then
	ln -s ../hbapp/node_modules node_modules
fi

