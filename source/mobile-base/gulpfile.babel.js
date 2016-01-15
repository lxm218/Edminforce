'use strict';

// Include Gulp & Tools
import fs from 'fs';
import path from 'path';
import cp from "child_process";

import gulp from 'gulp';

gulp.task("submodule:framework-ui", ()=>{
    cp.execSync("git submodule init");
    cp.execSync("git submodule update");
    // Update to specify version
    cp.execSync("git checkout 9a587b9e377be88ac8e043661b885e5bbdca50c4", { cwd: "./iHealthLab-framework-ui"});
});
