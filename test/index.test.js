'use strict';
const path = require('path');
const sut = require('../index.js');
const expect = require('chai').expect;

function fixture(f) {
  return path.join(__dirname, './fixture', f);
}

describe('when request esmodule with default', function() {
  it('should return module directly', function() {
    const esmoduleWithDefault = fixture('esmodule_default');
    const mod = sut(esmoduleWithDefault);
    expect(mod.name === 'Hello').to.be.ok;
    expect(new mod().world()).to.eq('hello world');
  });
});

describe('when request esmodule without default', function() {
  it('should return origin module', function() {
    const esmoduleWithoutDefault = fixture('esmodule_no_default');
    const mod = sut(esmoduleWithoutDefault);
    expect(mod.hello.name === 'hello').to.be.ok;
    expect(mod.hello()).to.eq('world');
  });
});

describe('when request common module', function() {
  it('should return default as property', function() {
    const commonModuleWithDefault = fixture('common_export_default');
    const mod = sut(commonModuleWithDefault);
    expect(mod.default.name === 'hello').to.be.ok;
    expect(mod.default()).to.eq('world');
  });

  it('should return module', function() {
    const commonModuleWithoutDefault = fixture('common_no_default');
    const mod = sut(commonModuleWithoutDefault);
    expect(mod.hello.name === 'hello').to.be.ok;
    expect(mod.hello()).to.eq('world');
  });
});

