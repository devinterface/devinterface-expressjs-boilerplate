const s = require('shelljs')

s.rm('-rf', 'build')
s.mkdir('build')
s.cp('.env', 'build/.env')
s.cp('-R', 'public', 'build/public')
s.cp('-R', 'views', 'build/views')
s.cp('-R', 'locales', 'build/locales')
s.cp('-R', 'migrations', 'build/migrations')
