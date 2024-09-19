const { readFileSync, writeFileSync, readFile, writeFile } = require("fs");
const { join } = require("path");

const logDuration = (label, startTime) => {
  console.log(`${label} levou ${Date.now() - startTime}ms`);
};

const copyFileBlocking = (source, dest) => {
  const startTime = Date.now();
  console.log("Lendo blocking conteudo");
  const content = readFileSync(source);

  console.log("Escrevendo blocking conteudo");
  writeFileSync(dest, content);
  logDuration("copyFileBlocking", startTime);
};

const sourcePath = join(__dirname, "files", "example.txt");
const destPath = join(__dirname, "files", "example.copy.blocking.txt");

copyFileBlocking(sourcePath, destPath);

console.log("copy blocking width success");
console.log("*".repeat(5));

const copyFileNonBlocking = (source, dest) => {
  const startTime = Date.now();
  console.log("start copy non-blocking");

  readFile(source, (err, data) => {
    console.log("terminou de ler non-blocking");

    writeFile(dest, data, (err) => {
      console.log("terminou de escrever non-blocking");
      logDuration("copyFileNonBlocking", startTime);
    });
  });
};

const destPathNonBloking = join(
  __dirname,
  "files",
  "example.copy.non-blocking.txt"
);

copyFileNonBlocking(sourcePath, destPathNonBloking);

console.log("terminou mesmo");
