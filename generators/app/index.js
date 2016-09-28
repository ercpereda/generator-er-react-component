const generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.argument('appname', {
      type: String, 
      required: false,
      default: this.appname
    });
    this.argument('componentName', {
      type: String, 
      required: false,
      default: 'Component'
    });
    this.argument('description', {
      type: String,
      required: false
    });
    this.argument('version', {
      type: String,
      required: false,
      default: '0.0.0'
    });
    this.argument('license', {
      type: String,
      required: false,
      default: 'MIT'
    });
    this.argument('githubuser', {
      type: String,
      required: false,
    });
    this.argument('authorname', {
      type: String,
      required: false,
    });
    this.argument('authoremail', {
      type: String,
      required: false,
    });
  },

  initializing: { // initialization methods (checking current project state, getting configs, etc)
  },

  prompting: function () { // prompt users for options
    return this.prompt([
      {
        type: 'input',
        name: 'appname',
        message: 'Project name',
        default: this.appname // Default to current folder name
      }, {
        type: 'input',
        name: 'componentName',
        message: 'Component',
        default: this.componentName
      }, {
        type: 'input',
        name: 'description',
        message: 'Project description',
      }, {
        type: 'input',
        name: 'version',
        message: 'Project version',
        default: this.version
      }, {
        type: 'input',
        name: 'license',
        message: 'Project Licence',
        default: this.license
      }, {
        type: 'input',
        name: 'githubuser',
        message: 'Your github user',
        default: this.githubuser,
      }, {
        type: 'input',
        name: 'authorname',
        message: 'Your name',
        default: this.authorname,
      }, {
        type: 'input',
        name: 'authoremail',
        message: 'Your email',
        default: this.authoremail
      }
    ]).then(function (answers) {
      this.appname = answers.appname;
      this.componentName = answers.componentName;
      this.description = answers.description;
      this.version = answers.version;
      this.license = answers.license;
      this.githubuser = answers.githubuser;
      this.authorname = answers.authorname;
      this.authoremail = answers.authoremail;
    }.bind(this));
  },
  
  configuring: function () { // saving configurations and configure the project
    this.config.set({
      "appname": this.appname,
      "componentName": this.componentName,
      "description": this.description,
      "version": this.version,
      "license": this.license,
      "githubuser": this.githubuser,
      "authorname": this.authorname,
      "authoremail": this.authoremail
    });
  },

  default: { // if the method name doesn't match a priority, it will be pushed to this group
  },

  writing: function () { // write the generator specific files (routes, controllers, etc)
    let config = this.config.getAll(); 

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      config);

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      config
    );

    this.fs.copyTpl(
      this.templatePath('.travis.yml'),
      this.destinationPath('.travis.yml'),
      config
    );

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      config
    );

    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore'),
      config
    );

    this.fs.copyTpl(
      this.templatePath('.eslintrc.js'),
      this.destinationPath('.eslintrc.js'),
      config
    );

    this.fs.copyTpl(
      this.templatePath('config'),
      this.destinationPath('config'),
      config
    );
    
    this.fs.copyTpl(
      this.templatePath('src/Component.css'),
      this.destinationPath(`src/${config.componentName}.css`),
      config
    );

    this.fs.copyTpl(
      this.templatePath('src/Component.js'),
      this.destinationPath(`src/${config.componentName}.js`),
      config
    );

    this.fs.copyTpl(
      this.templatePath('src/main.js'),
      this.destinationPath('src/main.js'),
      config
    );

    this.fs.copyTpl(
      this.templatePath('src/index.html'),
      this.destinationPath('src/index.html'),
      config
    );
  },
  
  conficts: { // where conflicts are handled (used internally)
  },

  install: function () { // where installation are run (npm, bower)
    this.log('Installing dependencies...');

    this.npmInstall([
      'classnames',
      'react',
      'react-dom'
    ], 
    { 'save': true });
    
    this.npmInstall([
      'autoprefixer-loader',
      'babel',
      'babel-core',
      'babel-eslint',
      'babel-loader',
      'babel-preset-es2015',
      'babel-preset-react',
      'clean-webpack-plugin',
      'commitizen',
      'copy-webpack-plugin',
      'css-loader',
      'eslint',
      'eslint-config-airbnb',
      'eslint-friendly-formatter',
      'eslint-loader',
      'eslint-plugin-import',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react',
      'extract-text-webpack-plugin',
      'ghooks',
      'postcss-calc',
      'postcss-custom-properties',
      'postcss-loader',
      'style-loader',
      'webpack',
      'webpack-dev-server',
      'webpack-merge'
    ], 
    { 'saveDev': true });
  },
  
  end: { // called last, cleanup, say good bye, etc
  },
});
