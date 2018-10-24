#!/usr/bin/env bash

declare -a components=( $(cat package.json | grep '"name":' | sed 's/\s*"name": "\(.*\)",/\1/') )

echo "----------------------------------------------"
echo "Packing components"
echo "----------------------------------------------"
for i in "${components[@]}"; do
	package=${i//@axway\//}
	if [ $? -ne 0 ]; then
		echo "Error no package: $package"
		exit -1
	fi
	npm pack
	if [ $? -ne 0 ]; then
		echo "Error packing: $package"
		exit -1
	fi
done

echo "----------------------------------------------"
echo "Installing components"
echo "----------------------------------------------"
rm -rf security
mkdir security
if [ -e ".npmrc" ]; then
	echo "Copying ../.npmrc"
	cp .npmrc ./security
	if [ $? -ne 0 ]; then
		echo "Error with: .npmrc"
		exit -1
	fi
fi

pushd security
npm init -y

for i in "${components[@]}"; do
	pkg="$(echo -e "${i}" | tr -d '[:space:]')"
	# package=${pkg//@axway\//}
	tgzname="../$pkg-*.tgz"

	if [[ $i == @axway/* ]]; then
		# scoped package
		tgzname="../axway-${pkg//@axway\//}-*.tgz"
	fi

	npm install $tgzname --save
	if [ $? -ne 0 ]; then
		echo "Error installing: $tgzname"
		exit -1
	fi
	rm $tgzname
	if [ $? -ne 0 ]; then
		echo "Error with: $tgzname"
		exit -1
	fi
done

echo "----------------------------------------------"
echo "Scanning"
echo "----------------------------------------------"
retire --exitwith 0 --package --outputformat json --outputpath ../scan-retire.json
if [ $? -ne 0 ]; then
	echo "Error running retirejs scan; ./security directory remains for debugging"
	exit -1
fi
echo "wrote: scan-retire.json"

# npm has a bug somewhere.  this should after install, but it does not, returning an error:
#   npm ERR! code E400
#   npm ERR! 400 Bad Request - POST https://registry.npmjs.org/-/npm/v1/security/audits
# it is possibly to add some console.log to submitForFullReport, here:
# /usr/local/lib/node_modules/npm/lib/install/audit.js
# The first time, the request JSON that is sent seems to be correct, but it seems npm audit does
# not like the axway-flow-sdk dependency (did a small test with just the plugin/sdk).  Doing
# another npm install /directly/ from the package lock yields a sub node_module in the plugin and
# npm audit is happier with this.
rm -rf node_modules
npm install --from-package-lock
npm audit --registry https://registry.npmjs.org --json &> ../scan-audit.json
# ------------------------------------------------------------
# FIXME: there is currently no way to ignore npm-audit results
# ------------------------------------------------------------
# if [ $? -ne 0 ]; then
# 	echo "Error running npm audit scan; ./security directory remains for debugging"
# 	exit -1
# fi
echo "wrote: scan-audit.json"

popd
rm -rf security

echo "----------------------------------------------"
echo "Results"
echo "----------------------------------------------"
cat scan-retire.json
echo
cat scan-audit.json
