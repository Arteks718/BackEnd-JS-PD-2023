// считать файлы из конкретной директории (например текущей папки) с определенным расширением (например только js файлы)
import fs from 'fs';

const files: string[] = fs.readdirSync('./', {
  encoding: 'utf8',
});
const filesJS: string[] = [];

files.forEach(file => {
  if(file.split('.').at(-1) == 'js') {
    filesJS.push(file);
  }
})
export { filesJS }