VAGRANTFILE_API_VERSION = "2"


ENV['VAGRANT_DEFAULT_PROVIDER'] ||= 'docker'
Vagrant.configure("2") do |config|
	config.vm.define "mongo" do |v|
  		v.vm.provider "docker" do |d|
  			d.vagrant_vagrantfile = "./Vagrantfile.proxy"
    		d.image = "mongo"
    		d.name =  "mongodb"
		end
	end


	config.vm.define "web" do |v|
	    v.vm.provider 'docker' do |d|
	      d.vagrant_vagrantfile = "./Vagrantfile.proxy"
	      d.build_dir       = '.'
	      d.name            = 'web'
	      d.create_args     = ['-d']
	      d.remains_running = false
	      d.ports           = ['3000:8888']
	      d.link('mongodb:mongodb')
	    end
		v.vm.synced_folder "./site/", "/usr/src/app/site/"
	end
end