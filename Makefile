all:
	pkg -t node16-win-x64 package.json
	./backend.exe