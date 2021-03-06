
TYPE ?= prod

BUILDFLAGS = -- --$(TYPE)

all: release

#-------------------------------------------------------------
clean:
	@-rm -rf dist

#-------------------------------------------------------------
.PHONY: build test e2e

build: basic-example material-example nativescript
test:  test-core test-basic test-material
e2e:   e2e-basic-example e2e-material-example

#-------------------------------------------------------------
.PHONY: core test-core

core:
	npm run build:core $(BUILDFLAGS)

test-core:
	npm run coverage:core

#-------------------------------------------------------------
.PHONY: basic test-basic

basic: core
	npm run build:basic $(BUILDFLAGS)

test-basic:
	npm run coverage:basic

#-------------------------------------------------------------
.PHONY: material test-material

material: core
	npm run build:material $(BUILDFLAGS)

test-material:
	npm run coverage:material

#-------------------------------------------------------------
.PHONY: nativescript

nativescript:
	npm run build:nativescript $(BUILDFLAGS)

#-------------------------------------------------------------
.PHONY: basic-example e2e-basic-example

basic-example: basic
	npm run build:basic-example $(BUILDFLAGS)

e2e-basic-example:
	npm run e2e:basic-example

#-------------------------------------------------------------
.PHONY: material-example e2e-material-example

material-example: material
	npm run build:material-example $(BUILDFLAGS)

e2e-material-example:
	npm run e2e:material-example

#-------------------------------------------------------------
# release build

.PHONY: release

lint:
	@npm run lint:core
	@npm run lint:basic
	@npm run lint:material
	@npm run lint:basic-example
	@npm run lint:material-example

coverage:
	@npm run coverage:core
	@npm run coverage:basic
	@npm run coverage:material

release: clean lint build coverage
	@./build/publish-prepare
	@echo RELEASE BUILD SUCCEEDED


