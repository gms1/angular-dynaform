
TYPE ?= prod

BUILDFLAGS = -- --$(TYPE)

all: build
#-------------------------------------------------------------
.PHONY: build test e2e

build: basic-example material-example # nativescript
test:  test-core test-basic test-material
e2e:   e2e-basic-example e2e-material-example

#-------------------------------------------------------------
.PHONY: core-nodeps core-depsonly core test-core

core-nodeps:
	npm run build:core $(BUILDFLAGS)

core-depsonly:

core: core-depsonly
	@$(MAKE) core-nodeps --no-print-directory

test-core:
	npm run test:core

#-------------------------------------------------------------
.PHONY: basic-nodeps basic-depsonly basic test-basic

basic-nodeps:
	npm run build:basic $(BUILDFLAGS)

basic-depsonly: core

basic: basic-depsonly
	@$(MAKE) basic-nodeps --no-print-directory

test-basic:
	npm run test:basic

#-------------------------------------------------------------
.PHONY: material-nodeps material-depsonly material test-material

material-nodeps:
	npm run build:material $(BUILDFLAGS)

material-depsonly: core

material: material-depsonly
	@$(MAKE) material-nodeps --no-print-directory

test-material:
	npm run test:material

#-------------------------------------------------------------
.PHONY: nativescript-nodeps nativescript-depsonly nativescript

nativescript-nodeps:
	npm run build:nativescript $(BUILDFLAGS)

nativescript-depsonly: core

nativescript: nativescript-depsonly
	@$(MAKE) nativescript-nodeps --no-print-directory

#-------------------------------------------------------------
.PHONY: basic-example-nodeps basic-example-depsonly basic-example

basic-example-nodeps:
	npm run build:basic-example $(BUILDFLAGS)

basic-example-depsonly: basic

basic-example: basic-example-depsonly
	@$(MAKE) basic-example-nodeps --no-print-directory

e2e-basic-example:
	npm run e2e:basic-example

#-------------------------------------------------------------
.PHONY: material-example-nodeps material-example-depsonly material-example

material-example-nodeps:
	npm run build:material-example $(BUILDFLAGS)

material-example-depsonly: material

material-example: material-example-depsonly
	@$(MAKE) material-example-nodeps --no-print-directory

e2e-material-example:
	npm run e2e:material-example

#-------------------------------------------------------------
