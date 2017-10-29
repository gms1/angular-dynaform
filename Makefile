
TYPE ?= prod

BUILDFLAGS = --$(TYPE) 

#-------------------------------------------------------------
.PHONY: all

all: basic-example material-example nativescript
test-all: test-core test-basic test-material

#-------------------------------------------------------------
.PHONY: core-nodeps core-depsonly core test-core

core-nodeps:
	cd packages/core && gulp rebuild $(BUILDFLAGS)
	
core-depsonly:

core: core-depsonly
	@$(MAKE) core-nodeps --no-print-directory
	
test-core:
	cd packages/core && gulp test $(BUILDFLAGS)

#-------------------------------------------------------------
.PHONY: basic-nodeps basic-depsonly basic test-basic

basic-nodeps:
	cd packages/basic && gulp rebuild $(BUILDFLAGS)
	
basic-depsonly: core

basic: basic-depsonly
	@$(MAKE) basic-nodeps --no-print-directory
	
test-basic:
	cd packages/basic && gulp test $(BUILDFLAGS)

#-------------------------------------------------------------
.PHONY: material-nodeps material-depsonly material test-material

material-nodeps:
	cd packages/material && gulp rebuild $(BUILDFLAGS)
	
material-depsonly: core

material: material-depsonly
	@$(MAKE) material-nodeps --no-print-directory

test-material:
	cd packages/material && gulp test $(BUILDFLAGS)

#-------------------------------------------------------------
.PHONY: nativescript-nodeps nativescript-depsonly nativescript

nativescript-nodeps:
	cd packages/nativescript && gulp rebuild $(BUILDFLAGS)
	
nativescript-depsonly: core

nativescript: nativescript-depsonly
	@$(MAKE) nativescript-nodeps --no-print-directory

#-------------------------------------------------------------
.PHONY: basic-example-nodeps basic-example-depsonly basic-example

basic-example-nodeps:
	cd packages/basic-example && gulp rebuild $(BUILDFLAGS)
	
basic-example-depsonly: basic

basic-example: basic-example-depsonly
	@$(MAKE) basic-example-nodeps --no-print-directory

#-------------------------------------------------------------
.PHONY: material-example-nodeps material-example-depsonly material-example

material-example-nodeps:
	cd packages/material-example && gulp rebuild $(BUILDFLAGS)
	
material-example-depsonly: material

material-example: material-example-depsonly
	@$(MAKE) material-example-nodeps --no-print-directory

#-------------------------------------------------------------
.PHONY: nativescript-example-nodeps nativescript-example-depsonly nativescript-example

nativescript-example-nodeps:
	cd packages/nativescript-example && npm run build
	
nativescript-example-depsonly: nativescript

nativescript-example: nativescript-example-depsonly
	@$(MAKE) nativescript-example-nodeps --no-print-directory


