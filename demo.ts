// https://github.com/marketplace/actions/jest-coverage-comment
import fs from 'node:fs';
import path from 'node:path';

export type LcovData = { lines: { hit: number; found: number } }[];
export type FileList = { packageName: string; path: string }[];
export type LvocList = { packageName: string; lcov: LcovData }[];

const getLcovFiles = (dir: string, filelist?: FileList, deepness = 0) => {
  let fileArray = filelist || [];

  fs.readdirSync(dir).forEach((file) => {
    const isDir = fs.statSync(path.join(dir, file)).isDirectory();

    if (isDir && file !== 'node_modules' && deepness < 10) {
      fileArray = getLcovFiles(path.join(dir, file), fileArray, deepness + 1);
    } else if (!isDir && file.endsWith('lcov.info')) {
      const packageName = dir.split('/')[1];
      const existing = fileArray.find((f) => f.packageName === packageName);

      if (existing) {
        console.warn(`found more than one lcov file for ${packageName}: ${path.join(dir, file)}`);
      }

      fileArray.push({ packageName, path: path.join(dir, file) });
    }
  });

  return fileArray;
};

const getLcovBaseFiles = (dir, filelist: Array<{ path: string; name: string }> = []) => {
  let fileArray = filelist || [];

  fs.readdirSync(dir).forEach((file) => {
    fileArray = fs.statSync(path.join(dir, file)).isDirectory()
      ? getLcovBaseFiles(path.join(dir, file), fileArray)
      : fileArray
          .filter((f) => f.path.includes('lcov-base.info'))
          .concat({ name: dir.split('/')[1], path: path.join(dir, file) });
  });

  return fileArray;
};

function main(monorepoBasePath: string) {
  let lcovArray = [];
  let lcovBaseArray = [];

  if (monorepoBasePath) {
    console.log(`Processing monorepoBasePath '${monorepoBasePath}' `);
    const parts = monorepoBasePath.split(',');
    console.log(`Parsed monorepoBasePath '${parts}' `);
    parts.forEach((item) => {
      console.log(`Part monorepoBasePath '${item}' `);
      const lcovFiles = getLcovFiles(item);
      console.log({ lcovFiles });
      lcovArray = lcovArray.concat(lcovFiles);
      console.log({ lcovArray });
      const lcovBaseFiles = getLcovBaseFiles(item);
      console.log({ lcovBaseFiles });
      lcovBaseArray = lcovBaseArray.concat(lcovBaseFiles);
      console.log({ lcovBaseArray });
    });
  }
}

// const files = getLcovFiles('./tests,./packages', []);
// console.log('files: ', files);

main('./tests,./packages');
