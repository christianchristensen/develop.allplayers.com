all: deleteall aptheme

deleteall:
	rm -rf vendor/*

aptheme:
	homedir=`pwd`; git clone git://github.com/AllPlayers/allplayers-theme.git vendor/allplayerstheme; cd vendor/allplayerstheme; git checkout 72b68a7937b5ac0d8f147681e896f867d6541db7; rm -rf .git; cd ${homedir};
