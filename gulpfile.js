'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

// ### Instrucciones para hacer uso del Webpack bundle analyzer y ver dependencias de los bundles que sobran
const path = require('path');
const bundleAnalyzer = require('webpack-bundle-analyzer');


//### Instrucciones para usar 'npm run serve' sustituyendo a 'gulp serve' para hacer debug más rápido al usar el paquete de Sergei Sergeev (https://www.npmjs.com/package/spfx-fast-serve y https://github.com/s-KaiNet/spfx-fast-serve)
const argv = build.rig.getYargs().argv;
const useCustomServe = argv['custom-serve'];
const fs = require("fs");
const workbenchApi = require("@microsoft/sp-webpart-workbench/lib/api");

if (useCustomServe) {
  build.tslintCmd.enabled = false;

  const ensureWorkbenchSubtask = build.subTask('ensure-workbench-task', function (gulp, buildOptions, done) {
    this.log('Creating workbench.html file...');
    try {
      workbenchApi.default["/workbench"]();
    } catch (e) { }

    done();
  });

  build.rig.addPostBuildTask(build.task('ensure-workbench', ensureWorkbenchSubtask));

  build.configureWebpack.mergeConfig({
    additionalConfiguration: (generatedConfiguration) => {
      fs.writeFileSync("./temp/_webpack_config.json", JSON.stringify(generatedConfiguration, null, 2));

      // ### Instrucciones para hacer uso del Webpack bundle analyzer y ver dependencias de los bundles que sobran
      const lastDirName = path.basename(__dirname);
      const dropPath = path.join(__dirname, 'temp', 'stats');
      generatedConfiguration.plugins.push(new bundleAnalyzer.BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'static',
        reportFilename: path.join(dropPath, `${lastDirName}.stats.html`),
        generateStatsFile: true,
        statsFilename: path.join(dropPath, `${lastDirName}.stats.json`),
        logLevel: 'error'
      }));

      return generatedConfiguration;
    }
  });

}

build.initialize(require('gulp'));

