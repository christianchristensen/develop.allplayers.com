desc "Generate the html files for the site"
task :gensite do
  if system("type jekyll > /dev/null 2>&1")
    exec "jekyll --auto"
  else
    abort "Please `gem install jekyll`"
  end
end

# TODO: Add rake task to call/manipulate scripts/getwadltohtml.sh

task :default => :gensite
