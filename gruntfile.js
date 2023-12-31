module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less:{
            dev:{
                files:{
                    './dev/styles/main.css':'./src/styles/main.less'
                }
            },
            dist:{
                options:{
                    compress:true
                },
                files:{
                    './dist/styles/main.min.css':'./src/styles/main.less'
                }
            }
        },
        htmlmin:{
            dist:{
                options:{
                    removeComments:true,
                    collapseWhitespace:true
                },
                files:{
                    './dist/index.html':'./prebuild/index.html'
                }
            }
        },
        replace:{
            dev:{
                options:{
                    patterns:[
                        {
                            match:'ENDERECO_DO_CSS',
                            replacement:'./styles/main.css'
                        },
                        {
                            match:'ENDERECO_DO_JS',
                            replacement:'./scripts/main.min.js'
                        }
                    ]
                },
                files:[
                    {
                        expand:true,
                        flatten:true,
                        src:['./src/index.html'],
                        dest:'./dev'
                    },
                    {
                        src:['src/scripts/main.js'],
                        dest:'./dev/scripts/main.min.js'
                    }
                ]
            },
            dist:{
                options:{
                    patterns:[
                        {
                            match:'ENDERECO_DO_CSS',
                            replacement:'./styles/main.min.css'
                        },
                        {
                            match:'ENDERECO_DO_JS',
                            replacement:'./scripts/main.min.js'
                        }
                    ]
                },
                files:[
                    {
                        expand:true,
                        flatten:true,
                        src:['src/index.html'],
                        dest:'prebuild'
                    }
                ]
            }
        },
        clean:['prebuild'],
        uglify:{
            target:{
                files:{
                    './dist/scripts/main.min.js':'./src/scripts/main.js'
                }
            }
        },
        watch:{
            less:{
                files:['./src/styles/*.less'],
                tasks:['less:dev']
            },
            htmlmin:{
                files:['./src/index.html'],
                tasks:['replace:dev']
            },
            js:{
                files:['./src/scripts/main.js'],
                tasks:['replace:dev']
            }
        },
        imagemin:{
            dev:{
                options:{
                    optimizationLevel:3,
                },
                files: {
                    'dev/img/facebook.png': 'src/img/facebook.png',
                    'dev/img/instagram.png': 'src/img/instagram.png',
                    'dev/img/linkedin.png': 'src/img/linkedin.png',
                    'dev/img/twitter.png': 'src/img/twitter.png',
                }
            },
            dist:{
                options:{
                    optimizationLevel:3,
                },
                files: {
                    'dist/img/facebook.png': 'src/img/facebook.png',
                    'dist/img/instagram.png': 'src/img/instagram.png',
                    'dist/img/linkedin.png': 'src/img/linkedin.png',
                    'dist/img/twitter.png': 'src/img/twitter.png',
                }
            }
        }

    })

    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-htmlmin')
    grunt.loadNpmTasks('grunt-replace')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-imagemin')

    grunt.registerTask('default',['watch'])
    grunt.registerTask('build',['less:dist','uglify:target','replace:dist','htmlmin:dist','clean','imagemin:dist'])
}