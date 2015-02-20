# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'responsive_images/version'

Gem::Specification.new do |spec|
  spec.name          = "responsive_images"
  spec.version       = ResponsiveImages::VERSION
  spec.authors       = ["John Koht"]
  spec.email         = ["john@kohactive.com"]
  spec.description   = "A responsive image gem for Rails and Carrierwave"
  spec.summary       = "A responsive image gem for Rails and Carrierwave"
  spec.homepage      = "https://github.com/johnkoht/responsive-images"
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_dependency "mobvious", "~> 0.3"
end
